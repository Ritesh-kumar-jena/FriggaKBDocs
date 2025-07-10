
# FriggaKBDocs - Backend

A simple Express.js + MongoDB backend for managing users and documents with JWT authentication, role-based access, and public/private document sharing.

---

## 📂 Project Structure

```
/Controller
  ├── userRoutes.js
  ├── documentRoutes.js

/Model
  ├── userModel.js
  ├── documentModel.js

/Middleware
  ├── auth.js

db.js
index.js
.env
```

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **dotenv** for environment config
- **CORS**

---

## 🚀 How to Run Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Ritesh-kumar-jena/FriggaKBDocs.git
cd FriggaKBDocs-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup `.env` file

Create a `.env` file in the root folder:

```
port=YOUR_PORT_NUMBER
key=YOUR_JWT_SECRET_KEY
database=YOUR_MONGODB_CONNECTION_STRING
```

### 4️⃣ Start the server

```bash
node index.js
```

Server will run on `http://localhost:<PORT>`.

---

## 🗃️ API Endpoints

### ✅ **Public Routes**

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/`                 | Test route (Welcome)       |
| POST   | `/users/signIn`     | Register new user          |
| POST   | `/users/login`      | Login user & get JWT token |
| GET    | `/documents/public` | Get all public documents   |

---

### 🔒 **Protected Routes** (Requires `Authorization` header)

Header format: `Authorization: Bearer <token>`

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| GET    | `/users/logout`        | Logout & blacklist JWT token      |
| PATCH  | `/users/edit/:id`      | Edit user info                    |
| DELETE | `/users/delete/:id`    | Delete user account               |
| POST   | `/documents/create`    | Create a new document             |
| GET    | `/documents`           | Get documents user can access     |
| PUT    | `/documents/edit/:id`  | Edit a document (if author)       |
| GET    | `/documents/search?q=` | Search documents (title/content)  |

---

## 🔑 Auth Flow

- **Register:** `/users/signIn`
- **Login:** `/users/login` → returns JWT token
- **Auth Middleware:** verifies JWT & checks blacklisted tokens
- **Logout:** `/users/logout` → adds token to blacklist

---

## 📝 Document Model

```js
{
  title: String,
  content: String,
  author: ObjectId (ref: "user"),
  visibility: "public" | "private",
  sharedWith: [ObjectId (ref: "user")]
}
```

---

## 🧑‍💻 Author :- Ritesh Kuamr Jena

**Project:** FriggaKBDocs  
**Description:** Simple Knowledge Base Docs backend with user authentication and document sharing.

---

## ⚡ Tips

✅ Use [Postman](https://www.postman.com/) to test routes.  
✅ Always send the JWT token in the `Authorization` header for protected routes.  
✅ Passwords are hashed with bcrypt.  
✅ Make sure your MongoDB Atlas connection string is valid.

---

## 📃 License

Free to use for learning and projects!
