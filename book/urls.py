from django.urls import path
from .views import Dashboard,Contact,BookDetails,Account,AboutPage,LoginUser,Register,UpdatePassword,LogOut

urlpatterns = [ 
   path("",Dashboard.as_view(),name="dashboard"),
   path("book_detail/<int:id>/",BookDetails.as_view(),name="book"),
   path("contact/",Contact.as_view(),name="contact"),
   path("account/",Account.as_view(),name="account"),
   path("about/",AboutPage.as_view(),name="about"),
   path("login/",LoginUser.as_view(),name="login_user"),
   path("register/",Register.as_view(),name="register"),
   path("update/",UpdatePassword.as_view(),name="password"),
   path("logout/",LogOut.as_view(),name="logout")
]