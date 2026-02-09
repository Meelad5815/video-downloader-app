// API Configuration - Automatically detects environment
const getApiUrl = () => {
    // Check if we're on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    
    // Production: Use deployed backend
    // UPDATE THIS after deploying backend to Render/Railway/Heroku
    return 'https://video-downloader-api.onrender.com';
};

const API_URL = getApiUrl();

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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(API_URL, { 
            method: 'GET',
            mode: 'cors',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            console.log('✅ Backend connection successful');
            const data = await response.json();
            console.log('📡 API Status:', data);
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn('⚠️ Backend connection timeout');
        } else {
            console.warn('⚠️ Backend not connected:', error.message);
        }
        
        // Only show error on localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            showMessage('⚠️ Local backend not running. For local development, run: python api.py', 'error');
        }
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
        downloadBtn.querySelector('.btn-text').textContent = 'Processing...';
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
        
        const response = await fetch(`${API_URL}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            signal: controller.signal,
            body: JSON.stringify({ url, quality })
        });
        
        clearTimeout(timeoutId);
        
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
                
                if (data.duration) {
                    const duration = document.createElement('div');
                    duration.style.fontSize = '0.9em';
                    duration.style.marginTop = '5px';
                    duration.textContent = `Duration: ${formatDuration(data.duration)}`;
                    message.appendChild(duration);
                }
                
                message.appendChild(document.createElement('br'));
                message.appendChild(downloadLink);
            }
        } else {
            showMessage(`❌ ${data.error || 'Download failed. Please try again with a different URL.'}`, 'error');
        }
    } catch (error) {
        console.error('Download error:', error);
        
        let errorMessage = '❌ ';
        
        if (error.name === 'AbortError') {
            errorMessage += 'Download timeout. The video might be too large or the server is busy. Please try again.';
        } else if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
            errorMessage += 'Cannot connect to server. ';
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                errorMessage += 'Please make sure backend is running: python api.py';
            } else {
                errorMessage += 'The backend service might be starting up. Please wait a moment and try again.';
            }
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

// Format duration from seconds to readable format
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Show Message Function
function showMessage(text, type) {
    message.innerHTML = text.replace(/\n/g, '<br>');
    message.className = `message ${type} active`;
    
    // Auto hide success messages after 15 seconds
    if (type === 'success') {
        setTimeout(() => {
            message.classList.remove('active');
        }, 15000);
    }
}

// URL Validation Function
function isValidUrl(string) {
    try {
        const url = new URL(string);
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
%cEnvironment: ${window.location.hostname === 'localhost' ? 'Development' : 'Production'}
`, 
'color: #667eea; font-size: 20px; font-weight: bold;',
'color: #764ba2; font-size: 14px;',
'color: #10b981; font-size: 12px;'
);
