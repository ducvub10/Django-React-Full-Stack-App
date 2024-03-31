from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView #import the CreateUserView class from views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #import pre-built views for getting access and refresh tokens

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name = "register"), #when we go to this url, we will be able to register a user
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), #when we go to this url, we will be able to get a token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"), #when we go to this url, we will be able to refresh a token
    path("api-auth/", include("rest_framework.urls")), #when we go to this url, we will be able to see the login page
    path("api/", include("api.urls")), #include the urls from the api app
]
