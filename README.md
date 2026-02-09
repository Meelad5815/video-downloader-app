# 🎥 Video Downloader App

A simple and efficient video downloader application that supports multiple platforms including YouTube, Vimeo, Twitter/X, and many more.

## ✨ Features

- **Multiple Platform Support**: Download videos from YouTube, Vimeo, Twitter/X, and 1000+ other sites
- **Quality Selection**: Choose from multiple quality options (360p to 1080p or best available)
- **Web Interface**: Beautiful and user-friendly web interface
- **Fast Downloads**: Powered by yt-dlp for reliable and fast downloads
- **Easy to Use**: Simple URL input and one-click download

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/Meelad5815/video-downloader-app.git
cd video-downloader-app
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

### Running the Application

1. Start the Flask server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Enter a video URL, select your desired quality, and click "Download Video"

## 📝 Usage

1. **Enter Video URL**: Paste the URL of the video you want to download
2. **Select Quality**: Choose from available quality options
3. **Download**: Click the download button and wait for the process to complete
4. **Save**: Your video will be downloaded to the `downloads` folder

## 🌐 Supported Platforms

- YouTube
- Vimeo
- Twitter/X
- Facebook
- Instagram
- TikTok
- Dailymotion
- And 1000+ more sites!

## 🛠️ Technology Stack

- **Backend**: Flask (Python web framework)
- **Downloader**: yt-dlp (powerful video downloader)
- **Frontend**: HTML, CSS, JavaScript

## 📂 Project Structure

```
video-downloader-app/
│
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── downloads/          # Downloaded videos folder (created automatically)
└── README.md          # Project documentation
```

## ⚠️ Important Notes

- Always respect copyright laws and terms of service of the platforms
- Only download videos you have permission to download
- This tool is for personal use only

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Issues

If you encounter any issues or have suggestions, please open an issue on GitHub.

## 🔧 Troubleshooting

### Common Issues:

1. **ModuleNotFoundError**: Make sure you've installed all requirements using `pip install -r requirements.txt`
2. **Download fails**: Some platforms may require additional authentication or may block downloads
3. **Quality not available**: If selected quality isn't available, the app will download the best available quality

## 📞 Support

For support and questions, please open an issue on the GitHub repository.

---

Made with ❤️ by Meelad5815
