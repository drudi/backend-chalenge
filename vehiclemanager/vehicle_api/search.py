"""
Search module. Perform search based on Manufacturer, Model, Type, etc
returning the resulting queryset
"""

from vehicle_api.models import Vehicle


def filter_by_request(request_args):
    """
    Get a dictionary with kw arguments for filtering
    returns a queryset
    """
    queryset = Vehicle.objects.all()
    found = False
    for key in request_args:
        term = request_args[key]
        if key == 'type':
            queryset = queryset.filter(vehicle_type__type_slug=term)
            found = True
        elif key == 'manufacturer':
            queryset = queryset.filter(manufacturer__manufacturer_name=term)
            found = True
        elif key == 'model':
            queryset = queryset.filter(model__model_name=term)
            found = True
        elif key == 'kmsgte':
            queryset = queryset.filter(kms__gte=term)
            found = True
        elif key == 'kmslte':
            queryset = queryset.filter(kms__lte=term)
            found = True
        elif key == 'enginegte':
            queryset = queryset.filter(engine__gte=term)
            found = True
        elif key == 'enginelte':
            queryset = queryset.filter(engine__lte=term)
            found = True
        elif key == 'color':
            queryset = queryset.filter(color__color_name=term)
            found = True
    if not found:
        queryset = Vehicle.objects.none()
    return queryset
