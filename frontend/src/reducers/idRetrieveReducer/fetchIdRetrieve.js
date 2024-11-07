import { 
    idComplaintRetrieveAction, idMaintenanceRetrieveAction, idMachineRetrieveAction,
    idDrivingAxleModelRetrieveAction, idEngineModelRetrieveAction, idTMTypeRetrieveAction,
    idSteeringAxleModelRetrieveAction, idFailureNodeRetrieveAction, idMachineModelRetrieveAction,
    idTransmissionModelRetrieveAction, idRecoveryMethodRetrieveAction, idServiceCompanyRetrieveAction
} from "./idRetrieveReducer";
import $api from "../../http";

export const fetchMachineIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/machine/' + id + '/')
            .then(response => dispatch(idMachineRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchMaintenanceIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/maintenance/' + id + '/')
            .then(response => dispatch(idMaintenanceRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchComplaintIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/complaint/' + id + '/')
            .then(response => dispatch(idComplaintRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchMachineModelIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/machine_model/' +  + id + '/')
            .then(response => dispatch(idMachineModelRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchTransmissionModelIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/transmission_model/' +  + id + '/')
            .then(response => dispatch(idTransmissionModelRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchSteeringAxleModelIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/steering_axle_model/' +  + id + '/')
            .then(response => dispatch(idSteeringAxleModelRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchEngineModelIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/engine_model/' + id + '/')
            .then(response => dispatch(idEngineModelRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

// export const fetchFailureNodeIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/failurenode/' + id)
//             .then(response => dispatch(idFailureNodeRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

export const fetchDrivingAxleModelIdRetrieve = (id) => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/driving_axle_model/' + id + '/')
            .then(response => dispatch(idDrivingAxleModelRetrieveAction(response.data)))
            .catch(err => console.log(err))
    }
}

// export const fetchRecoveryMethodIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/recoverymethod/' + id)
//             .then(response => dispatch(idRecoveryMethodRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchServiceCompanyIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/servicecompany/' + id)
//             .then(response => dispatch(idServiceCompanyRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchTMTypeIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/tmtype/' + id)
//             .then(response => dispatch(idTMTypeRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

