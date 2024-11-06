import { 
    idComplaintRetrieveAction, idMaintenanceRetrieveAction, idMachineRetrieveAction,
    idLeadRetrieveAction, idEngineRetrieveAction, idTMTypeRetrieveAction,
    idControlRetrieveAction, idFailureNodeRetrieveAction, idMachineModelRetrieveAction,
    idTransmissionRetrieveAction, idRecoveryMethodRetrieveAction, idServiceCompanyRetrieveAction
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

// export const fetchComplaintIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/complaints/' + id)
//             .then(response => dispatch(idComplaintRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchTransmissionIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/transmission/' + id)
//             .then(response => dispatch(idTransmissionRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchMachineModelIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/machinemodel/' + id)
//             .then(response => dispatch(idMachineModelRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchControlIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/control/' + id)
//             .then(response => dispatch(idControlRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchEngineIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/engine/' + id)
//             .then(response => dispatch(idEngineRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchFailureNodeIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/failurenode/' + id)
//             .then(response => dispatch(idFailureNodeRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

// export const fetchLeadIdRetrieve = (id) => {
//     return function(dispatch) {
//         $api.get('main/lead/' + id)
//             .then(response => dispatch(idLeadRetrieveAction(response.data)))
//             .catch(err => console.log(err))
//     }
// }

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

