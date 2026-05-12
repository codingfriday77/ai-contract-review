# AI Contract Review

An AI-powered full-stack web app that analyzes PDF contracts under Indian law using GPT-4 and returns a structured, clause-by-clause risk report — instantly.

Upload any freelance agreement, employment contract, vendor agreement, real estate document, or startup legal document and get a focused risk breakdown in seconds.

---

## Features

- 🔴 **Clause-by-clause risk ratings** — red / yellow / green per clause
- 📋 **Plain-English explanations** — what each clause actually means
- ⚠️ **Missing clause detection** — flags absent IP, dispute resolution, payment terms, etc.
- 🇮🇳 **Indian law notes** — cites relevant acts (Contract Act, IT Act, etc.) where applicable
- ✍️ **Suggested rewrites** — fairer wording for high-risk clauses
- 📊 **Overall risk score** — Low / Moderate / High with downloadable JSON report
- 📱 **Responsive UI** — works on desktop and mobile

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, Axios             |
| Backend  | FastAPI, pdfplumber, Python 3.8+, uvicorn       |
| AI       | OpenAI GPT-4 via openai Python SDK              |

---

## Project Structure

```
ai-contract-review/
├── Backend/
│   ├── __init__.py
│   ├── app.py              # FastAPI server and API endpoints
│   ├── utils.py            # OpenAI client and GPT-4 prompt logic
│   └── requirements.txt    # Python dependencies
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContractUpload.jsx   # Drag-and-drop PDF upload
│   │   │   └── ContractReview.jsx   # Risk report display
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── .env                    # Environment variables (create this)
```

---

## Prerequisites

- Python 3.8+
- Node.js 16+ and npm
- OpenAI API key with GPT-4 access

---

## Setup & Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-contract-review.git
cd ai-contract-review
```

### 2. Create your `.env` file

In the project root:

```bash
echo "OPENAI_API_KEY=sk-your-api-key-here" > .env
```

### 3. Backend setup

```bash
cd Backend
pip install -r requirements.txt
```

Start the backend server:

```bash
cd Backend
uvicorn app:app --reload --host localhost --port 5000
```

The API will be available at `http://localhost:5000`
Interactive docs at `http://localhost:5000/docs`

### 4. Frontend setup

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`
All `/api` calls are automatically proxied to `http://localhost:5000`

---

## API Endpoints

### `POST /api/review`
Upload a PDF contract for analysis.

```bash
curl -X POST http://localhost:5000/api/review \
  -F "file=@contract.pdf"
```

**Response:**
```json
{
  "review": "{...structured JSON analysis...}",
  "filename": "contract.pdf",
  "status": "success"
}
```

### `GET /api/health`
Health check.

```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## Environment Variables

| Variable         | Description                        |
|------------------|------------------------------------|
| `OPENAI_API_KEY` | Your OpenAI API key (GPT-4 access) |

---

## Troubleshooting

**"No text found in PDF"**
The PDF is likely scanned or image-based. Only text-based PDFs are supported. Use OCR software to convert before uploading.

**OpenAI API errors**
- Confirm `OPENAI_API_KEY` is set correctly in `.env`
- Confirm your key has GPT-4 access (not just GPT-3.5)
- Check remaining API credits

**CORS errors**
- Confirm the backend is running on port 5000
- The Vite proxy in `vite.config.js` handles `/api` routing automatically

**Port already in use**
```bash
# Use a different port
uvicorn app:app --reload --host localhost --port 8000
# Then update vite.config.js target to http://localhost:8000
```

---

## Production Deployment

### Backend

```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker Backend.app:app --bind 0.0.0.0:5000
```

### Frontend

```bash
cd Frontend
npm run build
# Deploy the dist/ folder to Vercel, Netlify, or any static host
```

---

## Disclaimer

This tool is for review assistance only. The output is AI-generated and should not be treated as legal advice. Always consult a qualified legal professional before signing any contract.

---

## License

MIT License
