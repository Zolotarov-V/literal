from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, "api/home.html")

def constructor(request):
    return render(request, "api/constructor.html")