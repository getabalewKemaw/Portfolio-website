# 🚀 Deployment Guide

This project is now ready for deployment! Here is how to set everything up.

## 1. Environment Variables

### Backend (`server/.env`)
Make sure these are set in your hosting provider (e.g., Render, Railway, Vercel):
- `DATABASE_URL`: Your Neon PostgreSQL URL.
- `PORT`: `4000` (or the provider's default).
- `GITHUB_PAT`: Your GitHub Personal Access Token.
- `ADMIN_EMAIL`: `depprogech@gmail.com`
- `ADMIN_PASSWORD`: `1234ABCDabcd`
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API Key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret.

### Frontend (`GechProtifoio/.env`)
Set this variable in your frontend hosting:
- `VITE_API_URL`: The URL where your backend is hosted (e.g., `https://your-api.onrender.com`).

---

## 2. Deployment Steps

### Frontend (Vercel/Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables: Add `VITE_API_URL`.

### Backend (Render/Railway)
1. Start command: `npm start`
2. Root directory: `server`
3. Environment variables: Add all the ones listed above.

---

## 3. Local Testing
To test your frontend with the new environment variable locally:
1. Make sure `GechProtifoio/.env` has `VITE_API_URL=http://localhost:4000`.
2. Restart your frontend terminal (`npm run dev`).
3. Your frontend will now look at the environment variable instead of a hardcoded string.

---

## ✅ Final Checklist
- [x] Admin Login fixed (Trimming & typo fix).
- [x] GitHub Stats fixed (Followers, Forks, Following).
- [x] Focus Philosophy section added (Momentum & Strategy).
- [x] CORS enabled for Authorization headers.
- [x] Threaded comments implemented.
