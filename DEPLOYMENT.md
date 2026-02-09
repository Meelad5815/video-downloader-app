# 🚀 Permanent Deployment Guide

Yeh guide aapko dikhayega kaise app ko permanently deploy karen taake locally run na karna pade.

## 🎯 Best Free Hosting Options

### Option 1: Render (Recommended - Easiest)

#### Backend Deployment

1. **Render Account Banayein:**
   - https://render.com par jayein
   - GitHub se sign up karen

2. **New Web Service:**
   - Dashboard pe "New" > "Web Service" click karen
   - Apni GitHub repository select karen: `video-downloader-app`

3. **Configuration:**
   ```
   Name: video-downloader-api
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python api.py
   Instance Type: Free
   ```

4. **Deploy:**
   - "Create Web Service" click karen
   - Wait 5-10 minutes for deployment
   - Aapko URL milega jaise: `https://video-downloader-api.onrender.com`

5. **Copy API URL:**
   - URL copy karen
   - Repository mein jayein

#### Frontend Deployment

1. **Netlify Account:**
   - https://netlify.com par jayein
   - GitHub se sign up karen

2. **Deploy:**
   - "Add new site" > "Import an existing project"
   - GitHub repository select karen
   - Build settings:
     ```
     Build command: (leave empty)
     Publish directory: .
     ```

3. **Update API URL:**
   - Netlify pe Site Settings > Environment Variables
   - Add: `API_URL` = `https://video-downloader-api.onrender.com`

4. **Done!**
   - Aapka site live hai: `https://your-site.netlify.app`

---

### Option 2: Railway (Fast & Reliable)

#### Backend Deployment

1. **Railway Account:**
   - https://railway.app par jayein
   - GitHub se sign up karen

2. **New Project:**
   - "New Project" > "Deploy from GitHub repo"
   - Repository select karen

3. **Configuration:**
   ```
   Start Command: python api.py
   ```

4. **Generate Domain:**
   - Settings > Generate Domain
   - URL milega: `https://your-app.up.railway.app`

5. **Frontend:**
   - Same as Render - Use Netlify for frontend

---

### Option 3: One-Click Deployment

#### Deploy to Render (Backend)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

#### Deploy to Netlify (Frontend)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

---

## 📝 Step-by-Step Complete Process

### Phase 1: Backend Deployment (5 minutes)

1. **Render.com pe jayein**
2. GitHub se login karen
3. "New Web Service" select karen
4. Repository connect karen: `Meelad5815/video-downloader-app`
5. Ye settings enter karen:
   - Name: `video-downloader-api`
   - Build: `pip install -r requirements.txt`
   - Start: `python api.py`
6. "Create Web Service" click karen
7. **Wait for deployment** (5-10 min)
8. URL copy karen (jaise: `https://video-downloader-api.onrender.com`)

### Phase 2: Frontend Setup (2 minutes)

1. **GitHub repository mein jayein**
2. `script.js` file edit karen
3. Line 11 pe apna backend URL paste karen:
   ```javascript
   return 'https://video-downloader-api.onrender.com';
   ```
4. Commit and push

### Phase 3: Frontend Deployment (3 minutes)

1. **Netlify.com pe jayein**
2. "Add new site" > "Import an existing project"
3. GitHub repository select karen
4. Settings:
   - Build command: (empty)
   - Publish directory: `.`
5. "Deploy site" click karen
6. **Done!** Site live hai

---

## ⚡ Quick Commands

### Update Code
```bash
git add .
git commit -m "Update"
git push
```

Auto-deploy hoga Render aur Netlify dono pe!

---

## 🔥 Free Tier Limits

### Render Free Tier:
- ✅ 750 hours/month
- ✅ Auto-sleep after 15 min inactivity
- ✅ Wakes up on request (slow first load)
- ✅ 1GB storage

### Netlify Free Tier:
- ✅ 100GB bandwidth/month
- ✅ Unlimited sites
- ✅ Auto SSL certificate
- ✅ Fast CDN

### Railway Free Tier:
- ✅ $5 credit/month
- ✅ No sleep
- ✅ Fast performance

---

## 🛠️ Troubleshooting

### Backend not responding
1. Check Render dashboard - service running?
2. Check logs for errors
3. Free tier sleeps - first request is slow (30 seconds)

### CORS errors
1. Make sure backend deployed successfully
2. Check API_URL in script.js is correct
3. Wait for backend to wake up

### Download fails
1. Check backend logs on Render
2. Some videos need login/authentication
3. Try different video URL

---

## 📊 Monitoring

### Check Backend Status:
```
https://your-backend-url.onrender.com/health
```

Should return:
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

### Check Logs:
- Render: Dashboard > Logs tab
- Railway: Project > Deployments > View logs

---

## 🎉 Your App URLs

After deployment:

- **Frontend**: `https://your-site.netlify.app`
- **Backend**: `https://video-downloader-api.onrender.com`
- **API Health**: `https://video-downloader-api.onrender.com/health`

---

## 💡 Pro Tips

1. **Keep backend active:**
   - Use UptimeRobot (free) to ping every 5 minutes
   - Prevents auto-sleep

2. **Custom domain:**
   - Netlify: Settings > Domain management
   - Free SSL included

3. **Update yt-dlp:**
   - Edit `requirements.txt`
   - Change version number
   - Push to GitHub

4. **Monitor usage:**
   - Check Render dashboard monthly
   - Free tier usually enough

---

## 🆘 Need Help?

1. Check Render/Netlify status pages
2. View deployment logs
3. Test backend directly: `curl https://your-api.onrender.com`
4. Open GitHub issue

---

## 🎯 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Update API URL in script.js
3. ✅ Deploy frontend to Netlify
4. ✅ Test the live site
5. ✅ Share with friends!

---

Made with ❤️ by Meelad5815
