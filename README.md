# 📚 E-book Platform

This project is an **E-book platform** built with **Django**. It allows users to view, manage, and explore books, along with book images, details, and comments.

---

## ✨ Key Features

* **Book Management:** Add, edit, delete, and view books.
* **Media Handling:** Upload and display book images.
* **Template Rendering:** Uses Django templates for dynamic HTML pages.
* **Comments / Reviews:** Users can leave comments or reviews on books.
* **Static Files:** Supports CSS, JavaScript, and images.
* **Database:** SQLite used for storing book and comment data.

---

## 🔹 Project Structure

```
E-book/
├── book/                 # Django app for book management
│   ├── models.py         # Book and Comment models
│   ├── views.py          # Views for books and comments
│   ├── urls.py
│   └── admin.py
├── config/               # Django settings and configuration
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── media/                # Uploaded book images
├── static/               # CSS, JS, images
├── templates/            # HTML templates
├── manage.py             # Django management script
└── requirements.txt      # Python dependencies
```

---

## 🛠 Tech Stack

* **Python 3.10+**
* **Django 4.x**
* **SQLite**
* **HTML, CSS, JavaScript**
* **Git / GitHub**

---

## 👤 User Flow

1. Users access the platform via web browser.
2. Users can view available books with images and details.
3. Users can leave comments or reviews on books.
4. Admin can add, edit, or delete books using Django admin panel.
5. Admin can view and manage user comments.
6. Static files and templates provide a user-friendly interface.

---

## 🔑 Environment Variables (.env)

```
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///db.sqlite3
```

---

## 📄 License

Private project, intended for learning and personal portfolio.

---

## 👨‍💻 Author

Developed by **Muhammadumar Umarov**
Telegram: @Muhammadumar_umarov
Python Developer
