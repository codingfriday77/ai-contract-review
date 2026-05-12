import sys
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import os
from typing import Dict
import logging

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from Backend.utils import create_openai_client, get_contract_review_response

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Contract Review API",
    description="API for AI-powered contract analysis",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/api/review")
async def review_contract(file: UploadFile = File(...)) -> Dict:
    """API endpoint to review a contract PDF"""
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file selected")
        
        if not file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Save file temporarily
        file_path = UPLOAD_DIR / file.filename
        
        try:
            # Read and save file
            contents = await file.read()
            with open(file_path, 'wb') as f:
                f.write(contents)
            
            # Extract text from PDF
            with pdfplumber.open(file_path) as pdf:
                contract_text = ""
                for page in pdf.pages:
                    text = page.extract_text() or ""
                    contract_text += text + "\n"
            
            if not contract_text.strip():
                raise HTTPException(
                    status_code=400, 
                    detail="No text found in PDF. The file may be scanned or encrypted."
                )
            
            # Get AI review
            client = create_openai_client()
            review = get_contract_review_response(client, contract_text)
            
            return {
                'review': review,
                'filename': file.filename,
                'status': 'success'
            }
        
        finally:
            # Clean up uploaded file
            if file_path.exists():
                file_path.unlink()
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Contract review error: {type(e).__name__}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check() -> Dict:
    """Health check endpoint"""
    return {
        'status': 'ok',
        'message': 'Backend is running'
    }

@app.get("/")
async def root() -> Dict:
    """Root endpoint with API info"""
    return {
        'name': 'AI Contract Review API',
        'version': '1.0.0',
        'endpoints': {
            'POST /api/review': 'Upload and review a PDF contract',
            'GET /api/health': 'Check API health status',
            'GET /docs': 'Interactive API documentation (Swagger UI)',
            'GET /redoc': 'Alternative API documentation (ReDoc)'
        }
    }

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=5000)