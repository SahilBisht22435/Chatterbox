# Pingzo 💬

**Pingzo** is a real-time web-based chat application that allows users to communicate through instant messaging. It is built using modern web technologies with a React frontend, Node.js and Express backend, MongoDB for data storage, and Socket.IO for real-time communication.

## 🚀 Features

* User registration and login
* Secure password authentication
* One-to-one real-time messaging
* Real-time message notifications
* Typing indicators
* Group chat
* Add and remove users from group chats
* Rename group chats
* Search for users
* Chat history
* Responsive and interactive interface
* MongoDB-based persistent data storage
* Real-time communication using Socket.IO

## 🛠️ Technologies Used

### Frontend

* React.js
* Chakra UI
* Axios
* React Router
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcrypt.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Netlify — Frontend
* Render — Backend
* MongoDB Atlas — Database

## 🏗️ System Architecture

```text
                 ┌──────────────────┐
                 │   Pingzo User    │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ React Frontend   │
                 │    Netlify       │
                 └────────┬─────────┘
                          │
                   REST API / Socket.IO
                          │
                          ▼
                 ┌──────────────────┐
                 │ Node + Express   │
                 │     Render       │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  MongoDB Atlas   │
                 └──────────────────┘
```

## 📁 Project Structure

```text
Chatterbox/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .npmrc
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/SahilBisht22435/Chatterbox.git
cd Chatterbox
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

Start the backend:

```bash
npm start
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

## 🌐👀 Live Application

**Pingzo:** https://pingzo.netlify.app/

## 🎓 Project

Pingzo is developed as an MCA academic project demonstrating full-stack web development, REST APIs, database integration, authentication, and real-time communication using WebSockets.

## 👨‍💻 Developer

**Sahil Bisht**

GitHub: https://github.com/SahilBisht22435

---

⭐ If you find this project useful, consider giving the repository a star!
