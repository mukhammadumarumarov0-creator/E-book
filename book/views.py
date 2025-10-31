from django.views import View
from django.shortcuts import render,redirect
from .models import Book,Review
from django.db.models import Q
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from .forms import RegisterForm
from django.contrib.auth import authenticate,login,logout



class Dashboard(View):
    def get(self, request):
        q = request.GET.get('q')
        print("bu quesry" ,q)
        books = Book.objects.all()

        if q :
            books = Book.objects.filter(
                Q(title__icontains=q) | Q(author__name__icontains=q)
            )
        return render(request, "book/index.html", context={"books": books})

    
class BookDetails(View):

    def get(self,request,id):
        book=Book.objects.get(id=id)
        books=Book.objects.filter(ganer=book.ganer)
        reviews=Review.objects.filter(Book=book)

        data={
            "book":book,
            "books":books,
            "reviews":reviews
        }
        return render(request,'book/product-detail.html',context=data)
    
    def post(self,request,id:None):
        comment_text=request.POST.get('content')
        if comment_text:
            user=User.objects.get(id=request.user.id)
            book=Book.objects.get(id=id)
            Review.objects.create(
                comment_text=comment_text,
                user=user,
                Book=book
            )

        return redirect('dashboard')


class Contact(LoginRequiredMixin,View):

    def get(self,request):
        return render(request,'book/contact.html')
    
    def post(self,request):
        first_name=request.POST.get('first_name')
        last_name=request.POST.get('last_name')
        email=request.POST.get('email')
        user=User.objects.get(id=request.user.id)
        user.email=""
        user.save()


        if first_name and last_name and email and len(User.objects.filter(email=email)) < 1 :
            user.first_name=first_name
            user.last_name=last_name
            user.email=email
            user.save()
            return redirect('dashboard')
        return render(request,'book/contact.html',context={"message":"bunday email bazada mavjud"})
    

class Account(LoginRequiredMixin,View):
    def get(self,request):
        return render(request,'book/account.html')
      

class AboutPage(View):
    def get(self,request):
        return render(request,'book/about.html')
    


class LoginUser(View):
    def get(self,request):
        return render(request,'book/login.html')
    
    def post(self, request):
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')
        return render(request,"book/login.html")

class LogOut(View):
    def get(self,request):
        logout(request)
        return redirect('dashboard')
          
class Register(View):
    def get(self,request):
        form=RegisterForm()

        return render(request,'book/register.html',context={"form":form})
    
    def post(self,request):
       form=RegisterForm(request.POST)
       if form.is_valid():
           first_name=form.cleaned_data['first_name']
           last_name=form.cleaned_data['last_name']
           username=form.cleaned_data['username']
           email=form.cleaned_data['email']
           password=form.cleaned_data['password']

           user=User(
               first_name=first_name,
               last_name=last_name,
               username=username,
               email=email
           )
           user.set_password(password)
           user.save()
           
           return redirect('login_user')
    

       return render(request,'book/register.html',context={"form":form})
    
class UpdatePassword(LoginRequiredMixin,View):
    def get(self,request):
        return render(request,'book/password.html')
    
    def post(self,request):

        current_password=request.POST.get('current_password')
        new_password=request.POST.get('new_password')
        new_password2=request.POST.get('new_password2')
        user=User.objects.get(id=request.user.id)

        if current_password and new_password and new_password2:
            if user.check_password(current_password) and new_password == new_password2:
                user.set_password(new_password)
                user.save()
                return redirect('login_user')
            
            return render(request,'book/password.html',context={'message':"Password xato kiritilgan yoki yangi passwordlar bir biriga mos emas"})
        
        return render(request,'book/password.html',context={'message':"Password kiritilmagan"})
        