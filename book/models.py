from django.db import models
from django.contrib.auth.models import User

#################     Book  Releated Models    #################
choice=(
    ('Uzbek','Uzbek'),
    ('Rus','Rus'),
    ('Ingiliz','Ingiliz')
)

ganer=(
    ("Fiction","Fiction"),
    ("Romance","Romance"),
    ("Scince","Scince"),
    ("History","History"),
    ("Mystery","Mystery")
)


class Author(models.Model):
    name=models.CharField(max_length=200)
    birth_date=models.DateField()
    country=models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Book(models.Model):
    title=models.CharField(max_length=200)
    page=models.PositiveIntegerField()
    image=models.ImageField(upload_to="book_images/",null=True,blank=True)
    language=models.CharField(max_length=15,choices=choice)
    ganer=models.CharField(max_length=20,choices=ganer)
    publisher=models.CharField(max_length=200)
    published_date=models.DateField()
    description=models.TextField()
    author=models.ForeignKey(Author,on_delete=models.CASCADE ,related_name='book')

    def __str__(self):
        return self.title
    
##################################################################




##################  Review Model  ################################

class Review(models.Model):
    comment_text=models.TextField()
    user=models.ForeignKey(User,on_delete=models.CASCADE, related_name='reviews')
    Book=models.ForeignKey(Book,on_delete=models.CASCADE)

    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s comment"
    
##################################################################


