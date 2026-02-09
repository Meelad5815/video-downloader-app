# 🚀 Complete Setup Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 2: Start Backend Server
```bash
python api.py
```

You should see:
```
============================================================
🎥 VIDEO DOWNLOADER API SERVER
============================================================
✅ Server starting on http://localhost:5000
✅ CORS enabled for all origins
✅ Downloads folder: /path/to/downloads
============================================================
```

### Step 3: Open Website

**Option A: Direct File (Simple)**
- Just double-click `index.html` to open in browser
- Or right-click → Open with → Your Browser

**Option B: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

**Option C: Use VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → Open with Live Server

---

## Troubleshooting Common Errors

### Error: "Backend server is not running"

**Solution:**
1. Open a new terminal/command prompt
2. Navigate to project folder:
   ```bash
   cd path/to/video-downloader-app
   ```
3. Start backend:
   ```bash
   python api.py
   ```
4. Keep this terminal open
5. Refresh the website

### Error: "No module named 'flask'"

**Solution:**
```bash
pip install -r requirements.txt
```

If still not working:
```bash
pip install flask flask-cors yt-dlp
```

### Error: "Port 5000 already in use"

**Solution:**
Edit `api.py` and change the port:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Changed to 5001
```

Then edit `script.js` and update:
```javascript
const API_URL = 'http://localhost:5001';  // Changed to 5001
```

### Error: "CORS policy blocked"

**Solution:**
1. Make sure backend is running
2. Check that `flask-cors` is installed:
   ```bash
   pip install flask-cors
   ```
3. Restart the backend server

### Download Fails for Specific URL

**Possible Reasons:**
1. Video is private or requires login
2. Video has geographical restrictions
3. Platform has anti-bot protection

**Solution:**
- Try a different video
- Update yt-dlp:
  ```bash
  pip install -U yt-dlp
  ```

---

## Complete Installation from Scratch

### Windows

1. **Install Python:**
   - Download from https://python.org
   - Check "Add Python to PATH" during installation

2. **Download Project:**
   ```bash
   git clone https://github.com/Meelad5815/video-downloader-app.git
   cd video-downloader-app
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Backend:**
   ```bash
   python api.py
   ```

5. **Open Website:**
   - Double-click `index.html`

### macOS/Linux

1. **Install Python (if not installed):**
   ```bash
   # macOS
   brew install python3
   
   # Ubuntu/Debian
   sudo apt-get install python3 python3-pip
   ```

2. **Clone Repository:**
   ```bash
   git clone https://github.com/Meelad5815/video-downloader-app.git
   cd video-downloader-app
   ```

3. **Install Dependencies:**
   ```bash
   pip3 install -r requirements.txt
   ```

4. **Run Backend:**
   ```bash
   python3 api.py
   ```

5. **Open Website:**
   ```bash
   open index.html  # macOS
   xdg-open index.html  # Linux
   ```

---

## Deployment to Production

### Deploy Backend to Render

1. Create account at https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** video-downloader-api
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python api.py`
5. Click "Create Web Service"
6. Copy the URL (e.g., `https://video-downloader-api.onrender.com`)

### Deploy Frontend to Netlify

1. Create account at https://netlify.com
2. Drag and drop these files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Before deploying, edit `script.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.onrender.com';
   ```
4. Deploy!

### Deploy Frontend to GitHub Pages

1. Edit `script.js` with your backend URL
2. Commit changes:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```
3. Go to GitHub repository → Settings → Pages
4. Select branch: `main`
5. Click Save
6. Visit: `https://yourusername.github.io/video-downloader-app`

---

## Testing the API Directly

### Using curl
```bash
curl -X POST http://localhost:5000/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","quality":"best"}'
```

### Using Browser Console
```javascript
fetch('http://localhost:5000/download', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    quality: 'best'
  })
})
.then(r => r.json())
.then(console.log);
```

---

## File Structure

```
video-downloader-app/
├── index.html          # Main website
├── style.css           # Styles
├── script.js           # Frontend logic
├── api.py              # Backend server
├── app.py              # Alternative all-in-one version
├── requirements.txt    # Python dependencies
├── downloads/          # Downloaded videos (auto-created)
├── README.md          # Main documentation
└── SETUP_GUIDE.md     # This file
```

---

## Support

If you still face issues:
1. Check if Python is installed: `python --version`
2. Check if pip is installed: `pip --version`
3. Make sure you're in the correct folder
4. Try running as administrator (Windows) or with sudo (Linux/Mac)
5. Open an issue on GitHub with error details

---

## Tips

- Keep backend terminal open while using the app
- Clear `downloads/` folder periodically
- Update yt-dlp regularly: `pip install -U yt-dlp`
- Use "Best Quality" for most reliable results
- Some platforms may not work due to restrictions

---

Made with ❤️ by Meelad5815
