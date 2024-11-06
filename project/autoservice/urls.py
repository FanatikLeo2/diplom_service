from rest_framework import routers
from django.urls import path, include
from .views import (
    MachinesViewSet,
    MaintenancesViewSet,
    ComplaintsViewSet,
    UserViewSet,
    MachineModelViewSet,
    SteeringAxleModelViewSet,
    DrivingAxleModelViewSet,
    EngineModelViewSet,
    TransmissionModelViewSet,
    RecoveryMethodViewSet,
    FailureNodeViewSet,
    MaintenanceTypeViewSet,
    ServiceCompanyViewSet)

router = routers.DefaultRouter()
router.register(r'machine', MachinesViewSet)
router.register(r'maintenance', MaintenancesViewSet)
router.register(r'complaint', ComplaintsViewSet)
router.register(r'user', UserViewSet)
router.register(r'machine_model', MachineModelViewSet)
router.register(r'steering_axle_model', SteeringAxleModelViewSet)
router.register(r'driving_axle_model', DrivingAxleModelViewSet)
router.register(r'engine_model', EngineModelViewSet)
router.register(r'transmission_model', TransmissionModelViewSet)
router.register(r'recovery_method', RecoveryMethodViewSet)
router.register(r'failure_node', FailureNodeViewSet)
router.register(r'maintenance_type', MaintenanceTypeViewSet)
router.register(r'service_company', ServiceCompanyViewSet)

urlpatterns = [
    path('autoservice/', include(router.urls)),
    path('autoservice/user/all/', UserViewSet.as_view({'get': 'list_all'}), name='user-list-all'),
]