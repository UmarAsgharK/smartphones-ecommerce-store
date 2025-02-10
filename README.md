# MERN Stack E-Commerce Platform

## 🚀 Project Overview
This is a **full-stack e-commerce web application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. The platform allows users to **buy and sell mobile phones** with role-based authentication. The primary focus of this project was **learning and implementing new technologies** rather than just expanding CRUD functionality.

## 🛠️ Tech Stack
### **Frontend:**
- **React.js (Vite)** – Fast and optimized frontend development
- **Context API** – Global state management
- **Fetch & Axios** – API requests and data fetching
- **Cloudinary** – Image upload and storage
- **JWT Authentication (Cookies)** – Secure login system

### **Backend:**
- **Node.js & Express.js** – Scalable REST API
- **MongoDB & Mongoose** – Database management
- **Redis** – Refresh token storage for authentication
- **Role-Based Access Control (RBAC)** – Different permissions for Admin, Seller, and Buyer
- **CORS Configuration** – Handling frontend-backend communication securely

### **Deployment & DevOps:**
- **Frontend:** Deployed on **Vercel**
- **Backend:** Deployed on **Render**
- **Environment Variables:** Managed `.env` files for local and production environments

## 🔑 Key Features
✅ **User Authentication:** JWT-based login with refresh tokens stored in Redis  
✅ **Role-Based Access:** Admin, Buyer, and Seller permissions  
✅ **Product Management:** Sellers can add, edit, and delete mobile phone listings  
✅ **Image Uploads:** Integrated Cloudinary for secure file storage  
✅ **Secure API:** Protected routes and middleware for authentication  
✅ **Deployment Ready:** Environment configurations for local and production servers  

## 📂 Project Structure
```
/ecommerce-project
   ├── frontend/        # React app (Vite-based)
   │    ├── src/
   │    ├── .env
   │
   ├── backend/        # Express.js server
   │    ├── models/    # Mongoose models
   │    ├── routes/    # API endpoints
   │    ├── controllers/
   │    ├── config/
   │    ├── .env
```

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/ecommerce-project.git
cd ecommerce-project
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install
```
- Create a `.env` file in `/backend` and add:
```env
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key
CLOUDINARY_API_KEY=your-key
REDIS_URL=your-redis-url
```
- Run the backend server:
```sh
npm start
```

### **3️⃣ Setup Frontend**
```sh
cd frontend
npm install
```
- Create a `.env` file in `/frontend` and add:
```env
VITE_API_URL=http://localhost:5000/api
```
- Run the frontend:
```sh
npm run dev
```

## 🌍 Deployment
### **Frontend Deployment (Vercel)**
1. Push the frontend code to GitHub.
2. Connect the repository to **Vercel**.
3. Add **environment variables** (same as `.env`).
4. Deploy!

### **Backend Deployment (Render)**
1. Push the backend code to GitHub.
2. Connect the repository to **Render**.
3. Add **environment variables** in Render dashboard.
4. Deploy the backend API.

## 🛠️ Future Enhancements
- 🔹 Implement **payment gateway integration**
- 🔹 Add **order history & tracking system**
- 🔹 Improve **UI/UX for better experience**
- 🔹 Optimize **performance and security**

## 🤝 Contributing
Want to contribute? Feel free to **fork this repository**, submit pull requests, or open issues!

## 📜 License
This project is **open-source** and available under the **MIT License**.

---

### 📬 Contact
💼 **LinkedIn:** [linkedin.com/in/umar-asghar-khan](https://www.linkedin.com/in/umar-asghar-khan)  
📧 **Email:** umarasgharpro@gmail.com  
🚀 **GitHub:** [github.com/yourusername](https://github.com/yourusername)  

