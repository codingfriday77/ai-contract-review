# Quick Start Guide

Follow these steps to get the AI Contract Review application running locally.

## Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key (you'll need it in Step 4)

## Step 2: Set Up Environment Variables

Create a `.env` file in the project root (`e:\Ai contract review\.env`):

```env
OPENAI_API_KEY=sk-your-api-key-here
```

Replace `sk-your-api-key-here` with your actual OpenAI API key.

## Step 3: Install Backend Dependencies

```bash
# Open PowerShell or Command Prompt
# Navigate to the Backend folder
cd "e:\Ai contract review\Backend"

# Install required Python packages
pip install -r requirements.txt
```

## Step 4: Install Frontend Dependencies

```bash
# Navigate to the Frontend folder
cd "e:\Ai contract review\Frontend"

# Install npm packages
npm install
```

## Step 5: Start the Backend Server

```bash
# From Backend directory
python app.py

# You should see:
# * Running on http://localhost:5000
```

Keep this terminal open while using the app.

## Step 6: Start the Frontend Development Server

```bash
# Open a NEW terminal/command prompt
# Navigate to Frontend folder
cd "e:\Ai contract review\Frontend"

# Start the development server
npm run dev

# You should see:
# Local: http://localhost:5173/
```

## Step 7: Open the Application

Open your web browser and go to:

```
http://localhost:5173
```

You should see the AI Contract Review application loaded.

## Step 8: Test the Application

1. **Upload a Contract**: 
   - Click "browse files" or drag-and-drop a PDF
   - Click "Analyze Contract"

2. **View Results**: 
   - The AI analysis will appear on the right side
   - Review the contract analysis and insights

3. **Download Results**: 
   - Click "Download Review" to save as text file

## Troubleshooting

### Backend won't start
```
Error: OPENAI_API_KEY is not set
```
- Make sure `.env` file is in the project root
- Verify the API key is correct
- Try restarting the backend

### Frontend won't connect to backend
```
Error: Network request failed or 404
```
- Ensure backend is running on port 5000
- Check firewall isn't blocking port 5000
- Verify vite.config.js has correct proxy settings

### PDF upload fails
- Make sure file is a PDF (not DOCX or other format)
- File should be text-based, not a scanned image
- Check file isn't corrupted
- Max file size is 10 MB

### "No text found in PDF" error
- The PDF might be a scanned image
- Try using an OCR tool to convert it first
- Or test with a different PDF that has selectable text

## Stopping the Application

1. Press `Ctrl+C` in the backend terminal to stop the Flask server
2. Press `Ctrl+C` in the frontend terminal to stop the dev server

## Next Steps

- Modify UI components in `Frontend/src/components/`
- Update backend logic in `Backend/app.py` or `Backend/utils.py`
- Read the full README.md for deployment instructions

## Need Help?

- Check README.md for more detailed documentation
- Verify all environment variables are set correctly
- Ensure both servers are running (port 5000 and 5173)
- Check browser console (F12) for frontend errors
- Check terminal output for backend errors
