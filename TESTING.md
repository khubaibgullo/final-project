# ✅ Local Testing Checklist

Follow these steps in order to run and test the project locally.

---

## STEP 1 — Create your .env file

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and set:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=anyrandomlongsecretstring123!
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

> If you're using MongoDB Atlas instead of local MongoDB, paste your Atlas URI here.

---

## STEP 2 — Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## STEP 3 — Seed the database

```bash
cd backend
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
👤 Created 9 users
📚 Created 9 courses
📝 Created 13 enrollments

══════════════════════════════════════════
  🌱 DATABASE SEEDED SUCCESSFULLY
══════════════════════════════════════════
```

---

## STEP 4 — Start both servers

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# → Server running on port 5000
# → MongoDB Connected
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# → Opens http://localhost:3000
```

---

## STEP 5 — Test each role

### 🔑 Login credentials (from seed)

| Role       | Email                    | Password  |
|------------|--------------------------|-----------|
| Admin      | admin@learnhub.com       | admin123  |
| Instructor | ahmed@learnhub.com       | pass1234  |
| Instructor | sara@learnhub.com        | pass1234  |
| Student    | ali@student.com          | pass1234  |
| Student    | fatima@student.com       | pass1234  |

---

## STEP 6 — Test checklist

### Public (no login needed)
- [ ] Home page loads with featured courses
- [ ] `/courses` shows all 8 published courses
- [ ] Click a course → Course Detail page shows lessons
- [ ] Register a new student account
- [ ] Register a new instructor account
- [ ] Login redirects to correct dashboard by role

### Student (login as ali@student.com)
- [ ] Student dashboard shows enrolled courses with progress bars
- [ ] Enroll in a new course from Course Detail page
- [ ] Profile page loads and can be updated

### Instructor (login as ahmed@learnhub.com)
- [ ] Instructor dashboard shows Ahmed's courses
- [ ] Create a new course
- [ ] Edit an existing course
- [ ] Click "+ Lessons" → Upload a lesson
- [ ] Toggle publish/unpublish via edit form
- [ ] Delete a course

### Admin (login as admin@learnhub.com)
- [ ] Admin dashboard shows all stats + enrollment trend
- [ ] Manage Users → see all 9 users, delete one
- [ ] Manage Courses → see all 9 courses, publish/unpublish, delete

---

## API Testing with Postman / Thunder Client

You can also test the API directly:

**Register:**
```
POST http://localhost:5000/api/auth/register
Body: { "name": "Test", "email": "test@test.com", "password": "123456", "role": "student" }
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Body: { "email": "admin@learnhub.com", "password": "admin123" }
```
→ Copy the `token` from the response

**Get Courses (public):**
```
GET http://localhost:5000/api/courses
```

**Get All Users (admin only):**
```
GET http://localhost:5000/api/users
Headers: Authorization: Bearer <your_token>
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Cannot connect to MongoDB` | Make sure MongoDB is running locally: `mongod` |
| `JWT_SECRET is not defined` | Check your `.env` file exists in `backend/` |
| `CORS error` | Make sure `CLIENT_URL=http://localhost:3000` is in `.env` |
| `Module not found` | Run `npm install` in both `backend/` and `frontend/` |
| Blank page on frontend | Open browser console — likely a missing env variable |
| Port 5000 already in use | Kill the process: `npx kill-port 5000` |
