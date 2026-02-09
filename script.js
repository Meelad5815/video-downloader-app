// API Configuration
// For local development, use: http://localhost:5000
// For production, replace with your deployed backend URL
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000' 
    : 'http://localhost:5000'; // Update this with your production API URL

// DOM Elements
const downloadForm = document.getElementById('downloadForm');
const videoUrl = document.getElementById('videoUrl');
const quality = document.getElementById('quality');
const downloadBtn = document.getElementById('downloadBtn');
const loader = document.getElementById('loader');
const message = document.getElementById('message');

// Check if backend is running on page load
window.addEventListener('load', checkBackendConnection);

async function checkBackendConnection() {
    try {
        const response = await fetch(API_URL, { 
            method: 'GET',
            mode: 'cors'
        });
        if (response.ok) {
            console.log('✅ Backend connection successful');
        }
    } catch (error) {
        console.warn('⚠️ Backend not connected. Make sure to run: python api.py');
        showMessage('⚠️ Backend server not running. Please start the server with: python api.py', 'error');
    }
}

// Form Submit Handler
downloadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = videoUrl.value.trim();
    const selectedQuality = quality.value;
    
    if (!url) {
        showMessage('❌ Please enter a valid video URL', 'error');
        return;
    }
    
    // Validate URL format
    if (!isValidUrl(url)) {
        showMessage('❌ Please enter a valid URL (e.g., https://youtube.com/watch?v=...)', 'error');
        return;
    }
    
    await downloadVideo(url, selectedQuality);
});

// Download Video Function
async function downloadVideo(url, quality) {
    try {
        // Show loader
        loader.classList.add('active');
        message.classList.remove('active');
        downloadBtn.disabled = true;
        downloadBtn.querySelector('.btn-text').textContent = 'Downloading...';
        
        const response = await fetch(`${API_URL}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ url, quality })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('✅ Video downloaded successfully!', 'success');
            
            // Create download link
            if (data.filename) {
                const downloadLink = document.createElement('a');
                downloadLink.href = `${API_URL}/get_file/${encodeURIComponent(data.filename)}`;
                downloadLink.download = data.filename;
                downloadLink.className = 'download-link';
                downloadLink.textContent = '📥 Click here to download your video';
                downloadLink.target = '_blank';
                
                message.innerHTML = '';
                const successText = document.createElement('div');
                successText.innerHTML = `<strong>✅ ${data.title || 'Video'} is ready!</strong>`;
                message.appendChild(successText);
                message.appendChild(document.createElement('br'));
                message.appendChild(downloadLink);
            }
        } else {
            showMessage(`❌ ${data.error || 'Download failed. Please try again with a different URL.'}`, 'error');
        }
    } catch (error) {
        console.error('Download error:', error);
        
        let errorMessage = '❌ Connection error. ';
        
        if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
            errorMessage += 'Backend server is not running. Please follow these steps:\n\n';
            errorMessage += '1. Open terminal/command prompt\n';
            errorMessage += '2. Navigate to project folder\n';
            errorMessage += '3. Run: pip install -r requirements.txt\n';
            errorMessage += '4. Run: python api.py\n';
            errorMessage += '5. Refresh this page';
        } else {
            errorMessage += error.message;
        }
        
        showMessage(errorMessage, 'error');
    } finally {
        loader.classList.remove('active');
        downloadBtn.disabled = false;
        downloadBtn.querySelector('.btn-text').textContent = 'Download Video';
    }
}

// Show Message Function
function showMessage(text, type) {
    message.innerHTML = text.replace(/\n/g, '<br>');
    message.className = `message ${type} active`;
    
    // Auto hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            message.classList.remove('active');
        }, 10000);
    }
}

// URL Validation Function
function isValidUrl(string) {
    try {
        const url = new URL(string);
        // Check if it's http or https
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Clear error message when user starts typing
videoUrl.addEventListener('input', () => {
    if (message.classList.contains('error')) {
        message.classList.remove('active');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add download link styling
const style = document.createElement('style');
style.textContent = `
    .download-link {
        display: inline-block;
        margin-top: 15px;
        padding: 12px 24px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        text-decoration: none;
        border-radius: 10px;
        font-weight: 600;
        transition: all 0.3s;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    .download-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
    .message {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;
document.head.appendChild(style);

// Add helpful console message
console.log(`
%c🎥 Video Downloader App
%cBackend API: ${API_URL}
%cMake sure backend is running: python api.py
`, 
'color: #667eea; font-size: 20px; font-weight: bold;',
'color: #764ba2; font-size: 14px;',
'color: #10b981; font-size: 12px;'
);
