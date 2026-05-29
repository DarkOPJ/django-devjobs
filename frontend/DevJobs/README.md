# React + Vite + Django Rest Framework

## 1. Pull project

## 2. Install dependencies
`npm install` and `pip install -r requirements.txt`

## 3. Run migrations
`python manage.py migrate`

## 4. Collect static
`python manage.py collectstatic`

## 5. Build project
`npm run build`

## 6. Run gunicorn
`gunicorn devjobs.wsgi:application`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
