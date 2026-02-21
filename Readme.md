# 📊 Analytics Dashboard (Self-Tracking)

A full-stack analytics dashboard that not only visualizes user behavior but also tracks its own interactions in real-time. Built using Node.js, Express, PostgreSQL, Prisma, React (Vite), and Tailwind CSS.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 📈 Feature Usage Analytics (Bar Chart)
* 📅 Time-based Trends (Line Chart)
* 🎯 Dynamic Filtering (Date, Age, Gender)
* 🔄 Persistent Filters (LocalStorage)
* 🧠 Self-Tracking System (Tracks user interactions like clicks & filters)
* ⚡ Scalable Backend with Prisma ORM

---

## 🧩 Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication

### Frontend

* React (Vite)
* Tailwind CSS
* Recharts

---

## 🏗️ Project Structure

```
root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── prisma/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-url>
cd analytics_dashboard
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL=your_postgres_url
SECRET_URI=your_jwt_secret
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Run migrations:

```
npx prisma migrate dev
```

Seed database:

```
node prisma/seed.js
```

Start backend:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔄 How It Works (Core Logic)

### 1. Data Seeding

Initial dummy data is inserted to populate charts.

### 2. Filtering

Users can filter analytics by:

* Date Range
* Age Group
* Gender

### 3. Tracking System (Core Twist 🚀)

Every interaction is tracked:

| Action       | Event Logged          |
| ------------ | --------------------- |
| Apply Filter | `filter_apply`        |
| Bar Click    | `bar_click:<feature>` |
| Line Click   | `line_chart_click`    |

These events are:

1. Sent via `POST /track`
2. Stored in database
3. Aggregated in `/analytics`
4. Reflected in charts

---

## 📡 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Tracking

* `POST /api/track`

### Analytics

* `GET /api/analytics`

---

## 🧪 Testing Checklist

* [x] User can register/login
* [x] JWT authentication works
* [x] Data is seeded
* [x] Filters work correctly
* [x] Events are stored in DB
* [x] Charts update based on tracked data
* [x] Filters persist after refresh

---

## 📸 Screenshots

(Add screenshots here before submission)

---

## 🚀 Deployment

* Backend: Render / Railway
* Frontend: Vercel / Netlify

---

## 👨‍💻 Author

Vasu Dhiman

---

## 📌 Note

This project demonstrates real-world analytics behavior where the system tracks and visualizes its own usage, making it scalable for product analytics and user behavior tracking.
