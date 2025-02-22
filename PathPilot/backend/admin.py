from django.contrib import admin
# ID: admin / PW:20242024
from .models import Place, RecList, MyList, Review, Blog

admin.site.register(Place)
admin.site.register(RecList)
admin.site.register(MyList)
admin.site.register(Review)
admin.site.register(Blog)