from django.urls import path
from .views import MyAPIView, MakeRecListView

urlpatterns = [
    path('', MyAPIView.as_view(), name='my-api'),
    path('search/', MakeRecListView.as_view(), name='make-reclist'),
]