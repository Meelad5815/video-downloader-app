// API Configuration
const API_URL = 'http://localhost:5000'; // Change this to your deployed API URL

// DOM Elements
const downloadForm = document.getElementById('downloadForm');
const videoUrl = document.getElementById('videoUrl');
const quality = document.getElementById('quality');
const downloadBtn = document.getElementById('downloadBtn');
const loader = document.getElementById('loader');
const message = document.getElementById('message');

// Form Submit Handler
downloadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = videoUrl.value.trim();
    const selectedQuality = quality.value;
    
    if (!url) {
        showMessage('Please enter a valid video URL', 'error');
        return;
    }
    
    // Validate URL format
    if (!isValidUrl(url)) {
        showMessage('Please enter a valid URL', 'error');
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
            body: JSON.stringify({ url, quality })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('✅ Video downloaded successfully!', 'success');
            
            // Create download link
            if (data.filename) {
                const downloadLink = document.createElement('a');
                downloadLink.href = `${API_URL}/get_file/${data.filename}`;
                downloadLink.download = data.filename;
                downloadLink.className = 'download-link';
                downloadLink.textContent = '📥 Click here to download your video';
                
                message.innerHTML = '';
                message.appendChild(document.createTextNode('✅ Video ready! '));
                message.appendChild(downloadLink);
            }
        } else {
            showMessage(`❌ ${data.error || 'Download failed. Please try again.'}`, 'error');
        }
    } catch (error) {
        console.error('Download error:', error);
        showMessage('❌ An error occurred. Please check if the backend server is running.', 'error');
    } finally {
        loader.classList.remove('active');
        downloadBtn.disabled = false;
        downloadBtn.querySelector('.btn-text').textContent = 'Download Video';
    }
}

// Show Message Function
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type} active`;
    
    // Auto hide after 5 seconds for error messages
    if (type === 'error') {
        setTimeout(() => {
            message.classList.remove('active');
        }, 5000);
    }
}

// URL Validation Function
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

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
        margin-top: 10px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s;
    }
    .download-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
`;
document.head.appendChild(style);
