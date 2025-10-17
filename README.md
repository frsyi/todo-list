# TodoList RESTful API (Express.js + MongoDB)

## Deskripsi

API ini digunakan untuk **manajemen daftar tugas (Todo List)** menggunakan **Express.js** sebagai backend framework dan **MongoDB** sebagai database.  
API ini juga sudah menerapkan **authentication dan authorization** menggunakan **JWT (JSON Web Token)**.

## Features

- Register user baru
- Login dengan JWT
- Membuat todo baru (authenticated)
- Melihat semua todo (authenticated)
- Melihat todo berdasarkan ID (authenticated)
- Mengubah todo (authenticated)
- Menghapus todo (authenticated)
- Menghapus semua todo (authenticated)
- Middleware untuk verifikasi token JWT

## API Endpoints

### Base URL

```
https://todo-list-xi-mocha.vercel.app
```

### Root Endpoint

- **Method**: `GET`
- **URL**: `/`
- **Deskripsi**: Endpoint root untuk memeriksa apakah API berjalan.
- **Response Success (200)**:

```json
{
  "message": "Welcome to ToDoList API!"
}
```

## Auth API

### 1. Register

- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Deskripsi**: Mendaftarkan pengguna baru.
- **Request Body**:

```json
{
  "email": "osyi@gmail.com",
  "password": "password123"
}
```

- **Response Success (201)**:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "68efa89c941e624dc1bb9538",
    "name": "osyi",
    "email": "osyi@gmail.com"
  }
}
```

- **Response Error (409)**:

```json
{
  "message": "User with this email already exists"
}
```

### 2. Login

- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Deskripsi**: Login pengguna dan mendapatkan token JWT.
- **Request Body**:

```json
{
  "email": "osyi@gmail.com",
  "password": "password123"
}
```

- **Response Success (200)**:

```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjIwMjk5NTAyYjMzODQ1YzdkZmQzMSIsIm5hbWUiOiJmYWhtYSIsImVtYWlsIjoiZmFobWFAZ21haWwuY29tIiwiaWF0IjoxNzYwNjkxNDkzLCJleHAiOjE3NjA2OTUwOTN9.LfuDPrFxsf7F4cFrSRxNZdHonH3GiED-nF1dRlUQl94",
  "user": {
    "id": "68efa89c941e624dc1bb9538",
    "name": "osyi",
    "email": "osyi@gmail.com"
  }
}
```

- **Response Error (404)**:

```json
{
  "message": "User not found"
}
```

## Todo API

### 1. Create Todo

- **Method**: `POST`
- **URL**: `/api/todos`
- **Deskripsi**: Membuat todo baru.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:

```json
{
  "title": "Belajar RESTful API",
  "description": "Membuat RESTful API menggunakan Express.js dan MongoDB",
  "completed": false
}
```

- **Response Success (201)**:

```json
{
  "message": "Todo created successfully",
  "todo": {
    "title": "Belajar RESTful API",
    "description": "Membuat RESTful API menggunakan Express.js dan MongoDB",
    "completed": false,
    "userId": "68f20299502b33845c7dfd31",
    "_id": "68f20b1c862184a376174d6c",
    "createdAt": "2025-10-17T09:23:40.151Z",
    "updatedAt": "2025-10-17T09:23:40.151Z",
    "__v": 0
  }
}
```

- **Response Error (400)**:

```json
{
  "message": "Error creating todo"
}
```

- **Response Error (401)**:

```json
{
  "message": "Access denied. No token provided."
}
```

### 2. Get All Todos

- **Method**: GET
- **URL**: /api/todos
- **Deskripsi**: Mendapatkan semua todo.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response Success (200)**:

```json
{
  "message": "Todos retrieved successfully",
  "todos": [
    {
      "_id": "68f20ffc862184a376174d6f",
      "title": "Belajar Frontend",
      "description": "Membuat tampilan frontend menggunakan Next.js",
      "completed": false,
      "userId": "68f20299502b33845c7dfd31",
      "createdAt": "2025-10-17T09:44:28.678Z",
      "updatedAt": "2025-10-17T09:44:28.678Z",
      "__v": 0
    },
    {
      "_id": "68f20b1c862184a376174d6c",
      "title": "Belajar RESTful API",
      "description": "Membuat RESTful API menggunakan Express.js dan MongoDB",
      "completed": false,
      "userId": "68f20299502b33845c7dfd31",
      "createdAt": "2025-10-17T09:23:40.151Z",
      "updatedAt": "2025-10-17T09:23:40.151Z",
      "__v": 0
    }
  ]
}
```

- **Response Error (401)**:

```json
{
  "message": "Access denied. No token provided."
}
```

### 3. Get Todo by ID

- **Method**: `GET`
- **URL**: `/api/todos/:id`
- **Deskripsi**: Mendapatkan todo berdasarkan ID.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response Success (200)**:

```json
{
  "message": "Todo retrieved successfully",
  "todo": {
    "_id": "68f20ffc862184a376174d6f",
    "title": "Belajar Frontend",
    "description": "Membuat tampilan frontend menggunakan Next.js",
    "completed": false,
    "userId": "68f20299502b33845c7dfd31",
    "createdAt": "2025-10-17T09:44:28.678Z",
    "updatedAt": "2025-10-17T09:44:28.678Z",
    "__v": 0
  }
}
```

- **Response Error (401)**:

```json
{
  "message": "Access denied. No token provided."
}
```

### 4. Update Todo

- **Method**: `PUT`
- **URL**: `/api/todos/:id`
- **Deskripsi**: Memperbarui todo berdasarkan ID.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Request Body**:

```json
{
  "title": "Belajar Frontend",
  "description": "Membuat tampilan frontend menggunakan Next.js",
  "completed": true
}
```

- **Response Success (200)**:

```json
{
  "message": "Todo updated successfully",
  "todo": {
    "_id": "68f20ffc862184a376174d6f",
    "title": "Belajar Frontend",
    "description": "Membuat tampilan frontend menggunakan Next.js",
    "completed": true,
    "userId": "68f20299502b33845c7dfd31",
    "createdAt": "2025-10-17T09:44:28.678Z",
    "updatedAt": "2025-10-17T09:54:46.669Z",
    "__v": 0
  }
}
```

- **Response Error (401)**:

```json
{
  "message": "Access denied. No token provided."
}
```

### 5. Delete Todo

- **Method**: `DELETE`
- **URL**: `/api/todos/:id`
- **Deskripsi**: Menghapus todo berdasarkan ID.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response Success (200)**:

```json
{
  "message": "Todo deleted successfully",
  "todo": {
    "_id": "68f20ffc862184a376174d6f",
    "title": "Belajar Frontend",
    "description": "Membuat tampilan frontend menggunakan Next.js",
    "completed": true,
    "userId": "68f20299502b33845c7dfd31",
    "createdAt": "2025-10-17T09:44:28.678Z",
    "updatedAt": "2025-10-17T09:54:46.669Z",
    "__v": 0
  }
}
```

- **Response Error (401)**:

```json
{
  "message": "Access denied. No token provided."
}
```

### 6. Delete All Todos

- **Method**: `DELETE`
- **URL**: `/api/todos`
- **Deskripsi**: Menghapus semua todo.
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response Success (200)**:

```json
{
  "message": "All todos deleted successfully",
  "deletedCount": 1
}
```

- **Response Error (401)**:

```json
{
  "message": "Access denied. No token provided."
}
```
