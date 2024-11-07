const initialState = {
    machine : null,
    maintenance : null,
    complaint : null,
    machineModel: null,
    steering: null,
    engine: null,
    failureNode: null,
    driving: null,
    recoveryMethod: null,
    serviceCompany: null,
    maintenanceType: null,
    transmission: null,
}
const idMachineRetrieve = 'idMachineRetrieve'
const idMaintenanceRetrieve = 'idMaintenanceRetrieve'
const idComplaintRetrieve = 'idComplaintRetrieve'
const idMachineModelRetrieve = 'idMachineModelRetrieve'
const idSteeringAxleModelRetrieve = 'idSteeringAxleModelRetrieve'
const idEngineModelRetrieve = 'idEngineModelRetrieve'
const idFailureNodeModelRetrieve = 'idFailureNodeModelRetrieve'
const idDrivingAxleModelRetrieve = 'idDrivingAxleModelRetrieve'
const idRecoveryMethodModelRetrieve = 'idRecoveryMethodMOdelRetrieve'
const idServiceCompanyModelRetrieve = 'idServiceCompanyModelRetrieve'
const idMaintenanceTypeModelRetrieve = 'idMaintenanceTypeModelRetrieve'
const idTransmissionModelRetrieve = 'idTransmissionModelRetrieve'

export const idRetrieveReducer = (state = initialState, action) => {
    switch (action.type) {
        case idMachineRetrieve:
            return {...state, machine : action.payload}

        case idMaintenanceRetrieve:
            return {...state, maintenance : action.payload}

        case idComplaintRetrieve:
            return {...state, complaint : action.payload}

        case idMachineModelRetrieve:
            return {...state, machineModel : action.payload}

        case idSteeringAxleModelRetrieve:
            return {...state, steering : action.payload}

        case idEngineModelRetrieve:
            return {...state, engine : action.payload}

        case idFailureNodeModelRetrieve:
            return {...state, failureNode : action.payload}

        case idDrivingAxleModelRetrieve:
            return {...state, driving : action.payload}

        case idRecoveryMethodModelRetrieve:
            return {...state, recoveryMethod : action.payload}

        case idServiceCompanyModelRetrieve:
            return {...state, serviceCompany : action.payload}

        case idMaintenanceTypeModelRetrieve:
            return {...state, serviceCompany : action.payload}

        case idTransmissionModelRetrieve:
            return {...state, transmission : action.payload}
        default:
            return state
    }
}

export const idMachineRetrieveAction = (payload) => ({type: idMachineRetrieve, payload})
export const idMaintenanceRetrieveAction = (payload) => ({type: idMaintenanceRetrieve, payload})
export const idComplaintRetrieveAction = (payload) => ({type: idComplaintRetrieve, payload})
export const idMachineModelRetrieveAction = (payload) => ({type: idMachineModelRetrieve, payload})
export const idSteeringAxleModelRetrieveAction = (payload) => ({type: idSteeringAxleModelRetrieve, payload})
export const idEngineModelRetrieveAction = (payload) => ({type: idEngineModelRetrieve, payload})
export const idFailureNodeModelRetrieveAction = (payload) => ({type: idFailureNodeModelRetrieve, payload})
export const idDrivingAxleModelRetrieveAction = (payload) => ({type: idDrivingAxleModelRetrieve, payload})
export const idRecoveryMethodModelRetrieveAction = (payload) => ({type: idRecoveryMethodModelRetrieve, payload})
export const idServiceCompanyModelRetrieveAction = (payload) => ({type: idServiceCompanyModelRetrieve, payload})
export const idMaintenanceTypeModelRetrieveAction = (payload) => ({type: idMaintenanceTypeModelRetrieve, payload})
export const idTransmissionModelRetrieveAction = (payload) => ({type: idTransmissionModelRetrieve, payload})
