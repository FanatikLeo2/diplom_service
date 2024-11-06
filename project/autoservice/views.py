from rest_framework import permissions, viewsets, mixins
from .models import (
    Machine,
    Maintenance,
    Complaint,
    MachineModel,
    SteeringAxleModel,
    DrivingAxleModel,
    EngineModel,
    TransmissionModel,
    RecoveryMethod,
    FailureNode,
    MaintenanceType,
    ServiceCompany)
from .serializers import (
    MachineSerializer,
    MaintenanceSerializer,
    ComplaintSerializer,
    ClientSerializer,
    MachineModelSerializer,
    SteeringAxleModelSerializer,
    DrivingAxleModelSerializer,
    EngineModelSerializer,
    TransmissionModelSerializer,
    RecoveryMethodSerializer,
    FailureNodeSerializer,
    MaintenanceTypeSerializer,
    ServiceCompanySerializer)
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Q


class MachinesViewSet(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            if request.user.groups.filter(name='Managers').exists():
                machines = self.get_queryset()
            else:
                machines = self.get_queryset().filter(
                    Q(client=request.user) | Q(service_company__user=request.user)
                )
            serializer = self.get_serializer(machines, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(str(e))
            return Response({'detail': 'Unauthorized'}, status=401)


class MaintenancesViewSet(mixins.ListModelMixin,
                          mixins.CreateModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):
    object = Maintenance
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            if request.user.groups.filter(name='Managers').exists():
                machines = Machine.objects.all()
            else:
                machines = Machine.objects.filter(
                    Q(client=request.user) |
                    Q(service_company__user=request.user)
                )
            maintenances = Maintenance.objects.filter(machine__in=machines)
            serializer = self.get_serializer(maintenances, many=True)
            return Response(serializer.data)
        except:
            return HttpResponse('Unauthorized', status=401)


class ComplaintsViewSet(mixins.ListModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    object = Complaint
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        try:
            if request.user.groups.filter(name='Managers').exists():
                machines = Machine.objects.all()
            else:
                machines = Machine.objects.filter(
                    Q(client=request.user) |
                    Q(service_company__user=request.user)
                )
            complaints = Complaint.objects.filter(machine__in=machines)
            serializer = self.get_serializer(complaints, many=True)
            return Response(serializer.data)
        except:
            return HttpResponse('Unauthorized', status=401)


class UserViewSet(mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user
        print(f'User: {user}')
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    def list_all(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def list(self, request, *args, **kwargs):
    #     user = request.user
    #     user_service_companies = ServiceCompany.objects.filter(user=user)
    #     user_data = self.get_serializer(user).data
    #     print(user_data)
    #     if user_service_companies.exists():
    #         service_company_data = ServiceCompanySerializer(user_service_companies.first()).data
    #         return Response({
    #             'user': user_data,
    #             'service_company': service_company_data
    #         })
    #     else:
    #         return Response(user_data)


class MachineModelViewSet(mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          viewsets.GenericViewSet):
    queryset = MachineModel.objects.all()
    serializer_class = MachineModelSerializer


class SteeringAxleModelViewSet(mixins.ListModelMixin,
                               mixins.RetrieveModelMixin,
                               viewsets.GenericViewSet):
    queryset = SteeringAxleModel.objects.all()
    serializer_class = SteeringAxleModelSerializer


class DrivingAxleModelViewSet(mixins.ListModelMixin,
                              mixins.RetrieveModelMixin,
                              viewsets.GenericViewSet):
    queryset = DrivingAxleModel.objects.all()
    serializer_class = DrivingAxleModelSerializer


class EngineModelViewSet(mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         viewsets.GenericViewSet):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer


class TransmissionModelViewSet(mixins.ListModelMixin,
                               mixins.RetrieveModelMixin,
                               viewsets.GenericViewSet):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer


class RecoveryMethodViewSet(mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer


class FailureNodeViewSet(mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         viewsets.GenericViewSet):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer


class MaintenanceTypeViewSet(mixins.ListModelMixin,
                             mixins.RetrieveModelMixin,
                             viewsets.GenericViewSet):
    queryset = MaintenanceType.objects.all()
    serializer_class = MaintenanceTypeSerializer


class ServiceCompanyViewSet(mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            viewsets.GenericViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
