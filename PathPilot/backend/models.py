from django.db import models
from django.contrib.auth.models import User


class Place(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.TextField(null = True, blank = True)
    longitude = models.TextField(null = True, blank = True)
    address = models.TextField(null = True, blank = True)
    coordinate_url = models.TextField(null = True, blank = True)
    address_url = models.TextField(null = True, blank = True)
    photo = models.ImageField(null = True, blank = True)
    video = models.FileField(null = True, blank = True)
    socialmedia_url = models.TextField(null = True, blank = True)
    
    def __str__(self):
	    return self.name


class RecList(models.Model):
    places = models.ManyToManyField(Place)
    
    def __str__(self):
        return ', '.join([place.name for place in self.places.all()])


class MyList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    places = models.ManyToManyField(Place)
    
    def __str__(self):
        return ', '.join([place.name for place in self.places.all()])


class Review(models.Model):
    title = models.CharField(max_length=255)
    post = models.TextField(null = True, blank = True)
    date = models.DateField()

    def __str__(self):
	    return self.title
    

class Blog(models.Model):
    title = models.CharField(max_length=255)
    post = models.TextField(null = True, blank = True)
    date = models.DateField()

    def __str__(self):
	    return self.title