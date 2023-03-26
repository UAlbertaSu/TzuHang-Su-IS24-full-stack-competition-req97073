from django.contrib import admin
from .models import Product, Developer, ScrumMaster
# Register your models here.


admin.site.register(Product)
admin.site.register(Developer)
admin.site.register(ScrumMaster)