# 🎥 Video Downloader - Full Website

A complete, modern video downloader website with a beautiful frontend and powerful backend supporting 1000+ platforms including YouTube, Vimeo, Twitter/X, Facebook, Instagram, TikTok, and more.

## ✨ Features

- **Beautiful Modern UI**: Sleek, responsive design with animations and gradients
- **Multi-platform Support**: Download from YouTube, Vimeo, Twitter/X, Facebook, Instagram, TikTok, and 1000+ sites
- **Quality Selection**: Choose from 360p to 1080p HD or best available quality
- **Fast & Efficient**: Optimized for speed with yt-dlp backend
- **Mobile Responsive**: Works perfectly on all devices
- **No Registration**: Start downloading immediately
- **100% Free**: No hidden costs or premium plans

## 🏗️ Project Structure

```
video-downloader-app/
├── index.html          # Main website HTML
├── style.css           # Styling and animations
├── script.js           # Frontend JavaScript
├── api.py              # Backend API server (Flask)
├── app.py              # Original Flask app with embedded UI
├── requirements.txt    # Python dependencies
├── downloads/          # Downloaded videos (auto-created)
└── README.md          # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Meelad5815/video-downloader-app.git
cd video-downloader-app
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

### Running Locally

**Option 1: Full Website (Separate Frontend & Backend)**

1. Start the backend API server:
```bash
python api.py
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python's built-in server
python -m http.server 8000
```

3. Visit `http://localhost:8000` in your browser

**Option 2: Integrated Flask App**

```bash
python app.py
```
Visit `http://localhost:5000`

## 🌐 Deployment

### Deploy Backend (API)

#### Heroku
```bash
heroku create your-app-name
git push heroku main
```

#### Render
1. Connect your GitHub repository
2. Select `api.py` as the start command: `python api.py`
3. Deploy

#### Railway
1. Connect repository
2. Set start command: `python api.py`
3. Deploy

### Deploy Frontend

#### Netlify
1. Drag and drop `index.html`, `style.css`, `script.js`
2. Update `API_URL` in `script.js` to your backend URL
3. Deploy

#### Vercel
1. Import repository
2. Deploy
3. Update API URL

#### GitHub Pages
1. Push to `gh-pages` branch
2. Enable GitHub Pages in settings
3. Update API URL in `script.js`

### Important: Update API URL

After deploying the backend, update the `API_URL` in `script.js`:
```javascript
const API_URL = 'https://your-backend-url.com';
```

## 📱 Features Breakdown

### Frontend
- Modern gradient design with animations
- Responsive layout (mobile, tablet, desktop)
- Real-time download status
- Form validation
- Smooth scrolling navigation
- FAQ section
- Feature showcase

### Backend
- RESTful API with Flask
- CORS enabled for cross-origin requests
- yt-dlp integration for reliable downloads
- Multiple format support
- Quality selection
- Error handling

## 🎯 Supported Platforms

- 📺 YouTube
- 🎬 Vimeo
- 🐦 Twitter/X
- 📘 Facebook
- 📸 Instagram
- 🎵 TikTok
- 🎥 Dailymotion
- 🔴 Twitch
- 📹 Reddit
- And 1000+ more!

## 🔧 API Endpoints

### POST /download
Download a video from a URL

**Request:**
```json
{
  "url": "https://youtube.com/watch?v=...",
  "quality": "best"
}
```

**Response:**
```json
{
  "message": "Video downloaded successfully!",
  "filename": "video.mp4",
  "title": "Video Title"
}
```

### GET /get_file/<filename>
Retrieve downloaded file

## 🛠️ Troubleshooting

### CORS Issues
If you face CORS errors, ensure:
1. Backend has `flask-cors` installed
2. API URL in `script.js` is correct
3. Backend is running

### Download Fails
1. Check if URL is valid
2. Some platforms may require authentication
3. Try different quality settings
4. Check backend logs for errors

### Port Already in Use
```bash
# Change port in api.py or app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

## ⚠️ Legal Notice

- Respect copyright laws and terms of service
- Only download videos you have permission to download
- This tool is for personal use only
- Not responsible for misuse of this software

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 💡 Tips

- Use "Best Quality" for optimal results
- Some videos may take longer depending on size
- Clear downloads folder periodically
- Keep yt-dlp updated: `pip install -U yt-dlp`

## 📞 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/Meelad5815/video-downloader-app/issues)
- Check existing issues for solutions

## 🎉 Acknowledgments

- Built with [Flask](https://flask.palletsprojects.com/)
- Powered by [yt-dlp](https://github.com/yt-dlp/yt-dlp)
- Icons from emoji

---

Made with ❤️ by [Meelad5815](https://github.com/Meelad5815)

⭐ Star this repo if you find it useful!
