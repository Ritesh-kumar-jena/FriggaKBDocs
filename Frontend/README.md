
# 📄 FriggaKBDocs Frontend

This is the **Frontend** for **FriggaKBDocs** – a document sharing, editing, and searching app built with **React**, **Chakra UI**, and **React Router**.

---

## 🚀 Features

✅ User Authentication (Signup/Login)  
✅ Create, Edit, and Forward Documents  
✅ Private and Public Document Visibility  
✅ Profile Management  
✅ Dark Mode Toggle  
✅ Responsive UI with Chakra UI  
✅ Search Public Documents  
✅ Forward (Share) Documents with other registered users

---

## 📦 Tech Stack

- **React**
- **React Router**
- **Chakra UI**
- **Axios**
- **JWT Decode**
- **Vite** for fast dev build
- **Node.js** & **Express** for Backend (separate)

---

## 🛠️ Setup & Run

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start development server

```
npm run dev
```

By default, the app runs on [http://localhost:5173](http://localhost:5173).

---

## 📁 Project Structure

```
📦 frontend/
 ├── public/
 ├── src/
 │   ├── components/      # Navbar, DarkMode toggle etc.
 │   ├── context/         # AuthContextProvider
 │   ├── pages/           # All pages: Home, Login, Signup, MyDocuments, CreateDocument, EditDocument, ProfilePage, etc.
 │   ├── services/        # API configuration (axios instance)
 │   ├── App.jsx          # Root component
 │   ├── main.jsx         # Entry point
 │   ├── routes/          # AllRoutes.jsx
 ├── package.json
 ├── README.md
 └── vite.config.js
```

---

## ⚙️ Environment Variables

Make sure you set your backend API base URL correctly in `api.js`:
```js
import axios from "axios";

const api = axios.create({
  baseURL: " https://friggakbdocs.onrender.com" 
});

export default api;
```

---

## ✅ Scripts

| Script           | Description                 |
|------------------|-----------------------------|
| `npm run dev`    | Start dev server (Vite)     |
| `npm run build`  | Build for production        |
| `npm run preview`| Preview built app           |

---

## 📚 Useful Links

- [Chakra UI Docs](https://chakra-ui.com/docs)
- [React Router Docs](https://reactrouter.com/en/main)
- [Vite Docs](https://vitejs.dev/)

---

## 👨‍💻 Author

Made with ❤️ by **Ritesh Kumar Jena**

---

## 🗒️ License

MIT License – free to use.

---
