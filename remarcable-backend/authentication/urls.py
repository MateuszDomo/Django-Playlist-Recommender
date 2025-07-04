from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authentication.views import LoginView, RegisterView

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
]