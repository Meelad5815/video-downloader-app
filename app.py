from flask import Flask, render_template_string, request, jsonify, send_file
import yt_dlp
import os
import re
from pathlib import Path

app = Flask(__name__)

# Create downloads directory
DOWNLOADS_DIR = Path('downloads')
DOWNLOADS_DIR.mkdir(exist_ok=True)

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Downloader</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 600px;
            width: 100%;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .input-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
        }
        input[type="text"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
        }
        select {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            background: white;
            cursor: pointer;
        }
        button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        .message {
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            display: none;
        }
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
            display: none;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .info {
            background: #e7f3ff;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            color: #004085;
        }
        .info ul {
            margin-left: 20px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎥 Video Downloader</h1>
        
        <div class="info">
            <strong>Supported platforms:</strong>
            <ul>
                <li>YouTube</li>
                <li>Vimeo</li>
                <li>Twitter/X</li>
                <li>And many more!</li>
            </ul>
        </div>

        <form id="downloadForm">
            <div class="input-group">
                <label for="url">Video URL</label>
                <input type="text" id="url" name="url" placeholder="https://youtube.com/watch?v=..." required>
            </div>
            
            <div class="input-group">
                <label for="quality">Quality</label>
                <select id="quality" name="quality">
                    <option value="best">Best Quality</option>
                    <option value="1080">1080p</option>
                    <option value="720">720p</option>
                    <option value="480">480p</option>
                    <option value="360">360p</option>
                </select>
            </div>
            
            <button type="submit" id="submitBtn">Download Video</button>
        </form>
        
        <div class="loader" id="loader"></div>
        <div class="message" id="message"></div>
    </div>

    <script>
        const form = document.getElementById('downloadForm');
        const loader = document.getElementById('loader');
        const message = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const url = document.getElementById('url').value;
            const quality = document.getElementById('quality').value;
            
            loader.style.display = 'block';
            message.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Downloading...';
            
            try {
                const response = await fetch('/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url, quality })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    message.className = 'message success';
                    message.textContent = data.message;
                    message.style.display = 'block';
                    
                    // Create download link
                    if (data.filename) {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = `/get_file/${data.filename}`;
                        downloadLink.download = data.filename;
                        downloadLink.textContent = 'Click here to download';
                        message.innerHTML = `${data.message}<br><br>`;
                        message.appendChild(downloadLink);
                    }
                } else {
                    message.className = 'message error';
                    message.textContent = data.error || 'Download failed';
                    message.style.display = 'block';
                }
            } catch (error) {
                message.className = 'message error';
                message.textContent = 'An error occurred: ' + error.message;
                message.style.display = 'block';
            } finally {
                loader.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Download Video';
            }
        });
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

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
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            
        return jsonify({
            'message': 'Video downloaded successfully!',
            'filename': os.path.basename(filename)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_file/<filename>')
def get_file(filename):
    try:
        file_path = DOWNLOADS_DIR / filename
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
