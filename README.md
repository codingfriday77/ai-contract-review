# AI Contract Review Application

A full-stack application for AI-powered contract analysis using React frontend and Python Flask backend.

## Project Structure

```
Ai contract review/
├── Backend/
│   ├── app.py                 # Flask API server
│   ├── utils.py               # OpenAI integration utilities
│   ├── requirements.txt        # Python dependencies
│   ├── upload_pdf/            # Sample PDFs for testing
│   └── uploads/               # Temporary upload directory (created at runtime)
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContractUpload.jsx    # File upload component
│   │   │   └── ContractReview.jsx    # Review display component
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind CSS imports
│   ├── index.html              # HTML template
│   ├── package.json            # npm dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── postcss.config.js       # PostCSS configuration
└── .env                        # Environment variables (create this)
```

## Prerequisites

- Python 3.8+
- Node.js 16+ and npm
- OpenAI API key

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to Backend directory
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file in the project root
# Add your OpenAI API key:
echo "OPENAI_API_KEY=your_key_here" > ../.env
```

### 2. Frontend Setup

```bash
# Navigate to Frontend directory
cd Frontend

# Install npm dependencies
npm install

# Build Tailwind CSS
npm run build  # (optional, for production)
```

## Running the Application

### Start Backend Server

```bash
# From Backend directory
python app.py

# Server will run at http://localhost:5000
```

The Flask app will:
- Listen on `http://localhost:5000`
- Provide `/api/review` endpoint for contract uploads
- Provide `/api/health` endpoint for health checks

### Start Frontend Development Server

```bash
# From Frontend directory
npm run dev

# Development server will run at http://localhost:5173
# The app will automatically proxy /api calls to http://localhost:5000
```

## API Endpoints

### POST /api/review
Upload a PDF contract for analysis

**Request:**
```bash
curl -X POST http://localhost:5000/api/review \
  -F "file=@contract.pdf"
```

**Response:**
```json
{
  "review": "AI-generated contract analysis...",
  "filename": "contract.pdf",
  "status": "success"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

### GET /
API info endpoint

## Features

- **PDF Upload**: Drag-and-drop or browse file upload
- **AI Analysis**: Uses OpenAI to analyze contract terms, risks, and key points
- **Beautiful UI**: Built with React and Tailwind CSS
- **Real-time Processing**: Shows loading state while analyzing
- **Download Results**: Export analysis as text file
- **Error Handling**: Comprehensive error messages for failed uploads
- **Responsive Design**: Works on desktop and mobile

## Environment Variables

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

## Troubleshooting

### "No text found in PDF" error
- The PDF might be a scanned image. Currently, only text-based PDFs are supported
- Consider using OCR software to convert scanned PDFs to text-based

### CORS errors
- Ensure backend is running on `localhost:5000`
- The frontend proxy in `vite.config.js` should redirect `/api` requests correctly

### File upload fails
- Check file size (ensure it's not too large)
- Verify file is actually a PDF
- Check backend `uploads` directory has write permissions

### OpenAI API errors
- Verify `OPENAI_API_KEY` is set correctly in `.env`
- Check API key has sufficient credits
- Verify model name in `Backend/utils.py` is available

## Development

### Frontend Changes
- Modify components in `Frontend/src/components/`
- Changes will hot-reload in development mode

### Backend Changes
- Modify `Backend/app.py` or `Backend/utils.py`
- Restart Flask server to apply changes

### Styling
- Use Tailwind CSS classes in components
- Reference: https://tailwindcss.com/docs

## Production Deployment

### Backend
```bash
# Use gunicorn for production
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 Backend.app:app
```

### Frontend
```bash
# Build for production
npm run build

# Deploy dist/ folder to your hosting service
```

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please check:
1. Backend is running on port 5000
2. Frontend is running on port 5173
3. `.env` file has valid OpenAI API key
4. All dependencies are installed
