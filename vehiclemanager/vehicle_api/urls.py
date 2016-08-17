from django.conf.urls import url
from vehicle_api import views

urlpatterns = [
    url(r'^vehicles/?$', views.VehicleList.as_view()),
    url(r'^vehicles/(?P<pk>[0-9]+)/?$', views.VehicleDetail.as_view()),
    url(r'^models/?$', views.VehicleModelList.as_view()),
    url(r'^models/(?P<pk>[0-9]+)/?$', views.VehicleModelDetail.as_view()),
    url(r'^manufacturers/?$', views.ManufacturerList.as_view()),
    url(r'^manufacturers/(?P<pk>[0-9]+)/?$', views.ManufacturerDetail.as_view()),
    url(r'^vehicles/search/?$', views.SearchList.as_view()),
]
