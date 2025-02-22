from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Place, RecList
from .serializers import MySerializer
from django.http import HttpResponse

class MyAPIView(APIView):
    def get(self, request):
        data = Place.objects.all()
        serializer = MySerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class PlaceSearchView(APIView):
    def get(self, request):
        return render(request, 'place_search.html')

    def post(self, request):
        start_place_name = request.POST.get('start_place')
        end_place_name = request.POST.get('end_place')

        if not start_place_name or not end_place_name:
            return HttpResponse("출발지와 도착지를 모두 입력해주세요.")
        if start_place_name == end_place_name:
            return HttpResponse("출발지와 도착지를 다른 곳으로 입력해주세요.")

        start_place = get_object_or_404(Place, name=start_place_name)
        end_place = get_object_or_404(Place, name=end_place_name)

        start_lat = float(start_place.latitude)
        start_lon = float(start_place.longitude)
        end_lat = float(end_place.latitude)
        end_lon = float(end_place.longitude)

        places_between = Place.objects.filter(
            latitude__gte=min(start_lat, end_lat),
            latitude__lte=max(start_lat, end_lat),
            longitude__gte=min(start_lon, end_lon),
            longitude__lte=max(start_lon, end_lon)
        )

        rec_list = RecList.objects.create()
        rec_list.places.add(*places_between)

        return render(request, 'results.html', {'rec_list': rec_list})

