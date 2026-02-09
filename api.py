from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yt_dlp
import os
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Enable CORS for all routes with specific configuration
CORS(app, resources={
    r"/*": {
        "origins": ["*"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Create downloads directory
DOWNLOADS_DIR = Path('downloads')
DOWNLOADS_DIR.mkdir(exist_ok=True)

@app.route('/')
def index():
    return jsonify({
        'status': 'running',
        'message': 'Video Downloader API is running successfully! ✅',
        'version': '1.0',
        'endpoints': {
            'POST /download': 'Download a video from URL',
            'GET /get_file/<filename>': 'Retrieve downloaded file',
            'GET /health': 'Check API health status'
        }
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running'
    })

@app.route('/download', methods=['POST', 'OPTIONS'])
def download_video():
    # Handle preflight request
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        url = data.get('url')
        quality = data.get('quality', 'best')
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        logger.info(f'Downloading video from: {url} with quality: {quality}')
        
        # Configure yt-dlp options
        ydl_opts = {
            'format': f'bestvideo[height<={quality}]+bestaudio/best[height<={quality}]/best' if quality != 'best' else 'best',
            'outtmpl': str(DOWNLOADS_DIR / '%(title)s.%(ext)s'),
            'quiet': False,
            'no_warnings': False,
            'merge_output_format': 'mp4',
            'postprocessors': [{
                'key': 'FFmpegVideoConvertor',
                'preferedformat': 'mp4',
            }],
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                filename = ydl.prepare_filename(info)
                
                # Handle case where file extension might change after post-processing
                base_filename = os.path.splitext(filename)[0]
                if not os.path.exists(filename):
                    filename = base_filename + '.mp4'
                
                actual_filename = os.path.basename(filename)
                
                logger.info(f'Download successful: {actual_filename}')
                
                return jsonify({
                    'message': 'Video downloaded successfully!',
                    'filename': actual_filename,
                    'title': info.get('title', 'Unknown'),
                    'duration': info.get('duration', 0),
                    'uploader': info.get('uploader', 'Unknown')
                })
        except yt_dlp.utils.DownloadError as e:
            logger.error(f'Download error: {str(e)}')
            return jsonify({'error': f'Failed to download video: {str(e)}'}), 400
        
    except Exception as e:
        logger.error(f'Server error: {str(e)}')
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/get_file/<path:filename>')
def get_file(filename):
    try:
        file_path = DOWNLOADS_DIR / filename
        if not file_path.exists():
            logger.error(f'File not found: {filename}')
            return jsonify({'error': 'File not found'}), 404
        
        logger.info(f'Serving file: {filename}')
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        logger.error(f'Error serving file: {str(e)}')
        return jsonify({'error': str(e)}), 404

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print('\n' + '='*60)
    print('🎥 VIDEO DOWNLOADER API SERVER')
    print('='*60)
    print(f'✅ Server starting on http://localhost:5000')
    print(f'✅ CORS enabled for all origins')
    print(f'✅ Downloads folder: {DOWNLOADS_DIR.absolute()}')
    print('='*60 + '\n')
    
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
