pip install django djangorestframework django-cors-headers

django-admin startproject backend

cd backend

python manage.py startapp api

python manage.py makemigrations

python manage.py migrate

python manage.py runserver