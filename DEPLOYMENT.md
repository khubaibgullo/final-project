# 🚀 Free Deployment Guide — LearnHub LMS

Deploy your full MERN stack app 100% free using:
- **MongoDB Atlas** — free cloud database (512 MB)
- **Render** — free Node.js backend hosting
- **Vercel** — free React frontend hosting

---

## ✅ Prerequisites (do these first)

- [ ] A [GitHub](https://github.com) account
- [ ] Your project pushed to a GitHub repository

### Push to GitHub
```bash
cd lms
git init
git add .
git commit -m "Initial commit - LearnHub LMS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/learnhub-lms.git
git push -u origin main
```

---

## STEP 1 — MongoDB Atlas (Database)

> Free tier: 512 MB storage, no credit card needed.

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) and **Sign Up** (free)
2. Click **"Build a Database"** → choose **"Free"** (M0 Sandbox)
3. Select a cloud provider (AWS) and region (closest to you) → click **"Create"**
4. **Create a database user:**
   - Username: `lmsadmin`
   - Password: generate a strong password → **copy it somewhere safe**
   - Click **"Create User"**
5. **Set up network access:**
   - Click **"Add IP Address"**
   - Select **"Allow Access from Anywhere"** → `0.0.0.0/0`
   - Click **"Confirm"**
6. **Get your connection string:**
   - Click **"Connect"** → **"Connect your application"**
   - Copy the URI — it looks like:
     ```
     mongodb+srv://lmsadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add your database name:
     ```
     mongodb+srv://lmsadmin:YOURPASSWORD@cluster0.xxxxx.mongodb.net/lms?retryWrites=true&w=majority
     ```
   - **Save this URI** — you'll need it in the next step.

---

## STEP 2 — Render (Backend / Node.js)

> Free tier: 750 hours/month. Note: free services sleep after 15 min of inactivity (first request may take ~30 seconds to wake up).

1. Go to [https://render.com](https://render.com) → **Sign Up with GitHub**
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo → select `learnhub-lms`
4. Configure the service:

   | Setting | Value |
   |---------|-------|
   | **Name** | `learnhub-backend` |
   | **Root Directory** | `backend` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `node server.js` |
   | **Plan** | `Free` |

5. Scroll down to **"Environment Variables"** → click **"Add Environment Variable"** for each:

   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | your MongoDB Atlas connection string |
   | `JWT_SECRET` | any long random string e.g. `mySuperSecretKey2024!abc123xyz` |
   | `JWT_EXPIRES_IN` | `7d` |
   | `NODE_ENV` | `production` |
   | `CLIENT_URL` | (leave blank for now — add after Vercel deploy) |

6. Click **"Create Web Service"**
7. Wait 2–3 minutes for the build to finish
8. **Copy your backend URL** — it looks like:
   ```
   https://learnhub-backend.onrender.com
   ```
   ✅ Test it: open `https://learnhub-backend.onrender.com` in browser — you should see `{"message":"LMS API Running"}`

---

## STEP 3 — Vercel (Frontend / React)

> Free tier: unlimited deployments, free custom domain, global CDN.

1. Go to [https://vercel.com](https://vercel.com) → **Sign Up with GitHub**
2. Click **"Add New Project"** → import `learnhub-lms`
3. Configure the project:

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | `Create React App` |
   | **Root Directory** | `frontend` |

4. Expand **"Environment Variables"** → add:

   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_URL` | `https://learnhub-backend.onrender.com/api` |

5. Click **"Deploy"**
6. Wait 1–2 minutes — Vercel will give you a URL like:
   ```
   https://learnhub-lms.vercel.app
   ```

---

## STEP 4 — Connect Frontend ↔ Backend (CORS Fix)

Now that you have both URLs, go back to Render and update the `CLIENT_URL` environment variable:

1. Open your Render dashboard → click on `learnhub-backend`
2. Go to **"Environment"** tab
3. Find `CLIENT_URL` → set it to your Vercel URL:
   ```
   https://learnhub-lms.vercel.app
   ```
4. Click **"Save Changes"** — Render will automatically redeploy

---

## STEP 5 — Create an Admin User

Your app is live but has no admin account. Create one manually:

**Option A — Use the API directly:**
```bash
# Register normally via the app, then update role in Atlas
# Go to MongoDB Atlas → Browse Collections → users
# Find your user → edit → change role to "admin"
```

**Option B — Use a seed script:**
Create `backend/seed.js` and run it once:
```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.create({
    name: 'Admin',
    email: 'admin@learnhub.com',
    password: 'admin123456',
    role: 'admin'
  });
  console.log('Admin created!');
  process.exit();
});
```
```bash
cd backend && node seed.js
```

---

## 🎯 Your Live URLs

After completing all steps:

| Service | URL |
|---------|-----|
| 🌐 **Frontend** | `https://learnhub-lms.vercel.app` |
| 🔌 **Backend API** | `https://learnhub-backend.onrender.com` |
| 🗄️ **Database** | MongoDB Atlas Dashboard |

---

## 🔄 Auto-Deployments

Both Render and Vercel watch your GitHub repo. Every time you push:
```bash
git add .
git commit -m "Update feature"
git push
```
Both frontend and backend **automatically redeploy** — no manual steps needed!

---

## ⚠️ Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Backend returns 502/503 | Wait 30 sec — free tier sleeps after inactivity |
| CORS error in browser | Make sure `CLIENT_URL` in Render matches your exact Vercel URL |
| MongoDB connection failed | Check that `0.0.0.0/0` is in Atlas Network Access |
| Blank page on Vercel | Check `vercel.json` exists in `frontend/` folder |
| `REACT_APP_API_URL` not working | Must start with `REACT_APP_` — redeploy after adding |
| Login returns 401 | Make sure `JWT_SECRET` is set in Render environment |

---

## 📊 Free Tier Limits

| Platform | Free Limit | Notes |
|----------|-----------|-------|
| MongoDB Atlas | 512 MB storage | More than enough for a portfolio project |
| Render | 750 hrs/month | Sleeps after 15 min inactivity |
| Vercel | Unlimited deploys | No sleep, always fast |

---

## 🎓 For Your Submission

Once deployed, include in your submission:
- ✅ GitHub Repo URL: `https://github.com/YOUR_USERNAME/learnhub-lms`
- ✅ Live Frontend URL: `https://learnhub-lms.vercel.app`
- ✅ Backend API URL: `https://learnhub-backend.onrender.com`
