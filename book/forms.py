from django import forms
import re
from django.contrib.auth.models import User


class RegisterForm(forms.Form):
   
   first_name=forms.CharField(widget=forms.TextInput(attrs={'class':"form-row",'placeholder':'First Name'}),required=True)
   last_name=forms.CharField(widget=forms.TextInput(attrs={'class':"form-row",'placeholder':'Last Name'}),required=True)
   username=forms.CharField(widget=forms.TextInput(attrs={'class':"form-group",'placeholder':'Username'}),required=True)
   email=forms.EmailField(widget=forms.EmailInput(attrs={'class':"form-group",'placeholder':'Email'}),required=True)
   password=forms.CharField(widget=forms.PasswordInput(attrs={'class':"form-group",'placeholder':'Password'}),required=True)
   reset_password=forms.CharField(widget=forms.PasswordInput(attrs={'class':"form-group",'placeholder':'Reset Password'}),required=True)
   
   def clean_first_name(self):
         value=self.cleaned_data['first_name']

         if value is None:
            raise forms.ValidationError("Ismni kiritish majburiy")
         
         if re.fullmatch(r"[A-Za-z]+", value) is None:
            raise forms.ValidationError("Ism faqat harflardan tashkil topishi kerak")
         
         return value
   
   def clean_last_name(self):
      value=self.cleaned_data['last_name']

      if value is None:
         raise forms.ValidationError("Ismni kiritish majburiy")
      
      if re.fullmatch(r"[A-Za-z]+", value) is None:
         raise forms.ValidationError("Ism faqat harflardan tashkil topishi kerak")
      
      return value
   
   def clean_username(self):
      value=self.cleaned_data['username']

      if value is None:
         raise forms.ValidationError("Ismni kiritish majburiy")
      
      if re.fullmatch(r"[A-Za-z]+", value) is None:
            raise forms.ValidationError("Ism faqat harflardan tashkil topishi kerak")

      if User.objects.filter(username=value):
         raise forms.ValidationError('Bunday username alaqachon mavjud iltimos boshqa kiriting')
      
      return value
   
   def clean_email(self):
      value=self.cleaned_data['email']

      if value is None:
         raise forms.ValidationError("email kiritish majburiy")
      
      email=User.objects.filter(email=value)

      if email.exists():
         raise forms.ValidationError("bunday email alaqachon mavjud , iltimot boshqa kiriting")
      
      return value
   
   def clean_reset_password(self):
         value=self.cleaned_data['reset_password']
         value2=self.cleaned_data['password']

         if value is None:
            raise forms.ValidationError("password kiritish majburiy")
         
         if value != value2:
            raise forms.ValidationError('Passwordlar bir xil bolishi kerak')
         
         return value
      


  
