import $api from "../../http";
import {
    initMachineModelAction, 
    initEngineModelAction,
    initTransmissionModelAction,
    initSteeringAxlenModelsAction,
    initDrivingAxlenModelsAction,
    initServiceCompanyModelsAction,
    initUserAllAction,
    initMaintenanceTypeModelAction,
    initFailureNodeModelAction,
    initRecoveryMethodModelAction,
    } from "./otherModelsReducer";

export const getMachineModel = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/machine_model/')
            .then(response => dispatch(initMachineModelAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getEngineModel = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/engine_model/')
            .then(response => dispatch(initEngineModelAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getTransmissionModel = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/transmission_model/')
            .then(response => dispatch(initTransmissionModelAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getSteeringAxleModel = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/steering_axle_model/')
            .then(response => dispatch(initSteeringAxlenModelsAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getDrivingAxleModel = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/driving_axle_model/')
            .then(response => dispatch(initDrivingAxlenModelsAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getServiceCompanyModel = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/service_company/')
            .then(response => dispatch(initServiceCompanyModelsAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getUserAll= () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/user/all/')
            .then(response => dispatch(initUserAllAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getMaintenanceTypeModel= () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/maintenance_type/')
            .then(response => dispatch(initMaintenanceTypeModelAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getFailureNodeModel= () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/failure_node/')
            .then(response => dispatch(initFailureNodeModelAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getRecoveryMethodTypeModel= () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/recovery_method/')
            .then(response => dispatch(initRecoveryMethodModelAction(response.data)))
            .catch(err => console.log(err))
    }
}

