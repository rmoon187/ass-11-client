# 📦 RecomHub – Product Recommendation Platform

## 🧩 Project Overview  
**RecomHub** is a dynamic product recommendation platform designed to help users make informed and ethical purchasing decisions. Users can post product queries, share alternative recommendations, and engage in meaningful discussions—particularly around products with social, ethical, or sustainability concerns (e.g., boycotting reasons). With a clean interface, responsive design, and robust authentication system, RecomHub provides a secure and user-friendly experience.

---

## 🚀 Features List

- 🔐 **User Authentication**  
  Secure login and registration using Firebase Authentication.

- 🛡️ **JWT Token Verification**  
  Ensures secure access to private routes and user-specific content.

- 📝 **Query Management**  
  - Add, edit, or delete your product queries.  
  - Include detailed "Boycotting Reason" for each query.

- 💡 **Recommendations System**  
  - Submit alternative product suggestions for any query.  
  - Delete your own recommendations.

- 💬 **Commenting Functionality**  
  - Add, update, and remove comments on any recommendation.  
  - Foster community-driven discussions.

- 🔄 **Conditional Navigation**  
  - Dynamic navigation menu based on user login status.  
  - Non-logged-in users: Home, Queries, Login.  
  - Logged-in users: Home, Queries, Recommendations For Me, My Queries, My Recommendations, Logout.

- 📱 **Responsive UI Design**  
  Mobile-first design with a modern blue and green theme for optimal user experience across all devices.

---

## 🛠️ Tech Stack

| Category         | Technology                             |
|------------------|-----------------------------------------|
| Frontend         | React (Vite)                            |
| Styling          | Tailwind CSS, DaisyUI                   |
| Routing          | React Router                            |
| Authentication   | Firebase Authentication                 |
| Authorization    | JSON Web Token (JWT)                    |
| Alerts & Modals  | SweetAlert2                             |
| Icons            | React Icons                             |
| HTTP Requests    | Axios                                   |

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/recomhub.git
   cd recomhub

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set up environment variables**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. **Start the development server**

   ```bash
   npm run dev

   ```
## 🌐 Live Project Link

🔗 [Explore RecomHub (Client)](https://fir-first-p.web.app/)  
_(Click the link to view the live deployed frontend)_      
