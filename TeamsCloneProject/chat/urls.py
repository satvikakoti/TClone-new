from django.urls import path
from .views import main_view, video_view

urlpatterns = [
    path('', main_view, name='main_view'),
    path('video/', video_view, name='video_view'),
]