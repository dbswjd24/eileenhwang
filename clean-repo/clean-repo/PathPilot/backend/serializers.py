from rest_framework import serializers
from .models import Place

class MySerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'


