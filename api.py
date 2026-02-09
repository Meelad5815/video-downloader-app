from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yt_dlp
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create downloads directory
DOWNLOADS_DIR = Path('downloads')
DOWNLOADS_DIR.mkdir(exist_ok=True)

@app.route('/')
def index():
    return jsonify({
        'message': 'Video Downloader API',
        'version': '1.0',
        'endpoints': {
            'POST /download': 'Download a video',
            'GET /get_file/<filename>': 'Retrieve downloaded file'
        }
    })

@app.route('/download', methods=['POST'])
def download_video():
    try:
        data = request.json
        url = data.get('url')
        quality = data.get('quality', 'best')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        # Configure yt-dlp options
        ydl_opts = {
            'format': f'bestvideo[height<={quality}]+bestaudio/best' if quality != 'best' else 'best',
            'outtmpl': str(DOWNLOADS_DIR / '%(title)s.%(ext)s'),
            'quiet': True,
            'no_warnings': True,
            'merge_output_format': 'mp4',
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            
        return jsonify({
            'message': 'Video downloaded successfully!',
            'filename': os.path.basename(filename),
            'title': info.get('title', 'Unknown')
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_file/<filename>')
def get_file(filename):
    try:
        file_path = DOWNLOADS_DIR / filename
        if not file_path.exists():
            return jsonify({'error': 'File not found'}), 404
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
