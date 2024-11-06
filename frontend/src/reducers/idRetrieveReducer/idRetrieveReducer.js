const initialState = {
    machine : null,
    maintenance : null,
    complaint : null,
    machineModel: null,
    control: null,
    engine: null,
    failureNode: null,
    lead: null,
    recoveryMethod: null,
    serviceCompany: null,
    tmType: null,
    transmission: null,
}
const idMachineRetrieve = 'idMachineRetrieve'
const idMaintenanceRetrieve = 'idMaintenanceRetrieve'
const idComplaintRetrieve = 'idComplaintRetrieve'
const idMachineModelRetrieve = 'idMachineModelRetrieve'
const idControlRetrieve = 'idControlRetrieve'
const idEngineRetrieve = 'idEengineRetrieve'
const idFailureNodeRetrieve = 'idFailureNodeRetrieve'
const idLeadRetrieve = 'idLeadRetrieve'
const idRecoveryMethodRetrieve = 'idRecovertMethodRetrieve'
const idServiceCompanyRetrieve = 'idServiceCompanyRetrieve'
const idTMTypeRetrieve = 'idTMTypeRetrieve'
const idTransmissionRetrieve = 'idTransmissionRetrieve'

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

        case idControlRetrieve:
            return {...state, control : action.payload}

        case idEngineRetrieve:
            return {...state, engine : action.payload}

        case idFailureNodeRetrieve:
            return {...state, failureNode : action.payload}

        case idLeadRetrieve:
            return {...state, lead : action.payload}

        case idRecoveryMethodRetrieve:
            return {...state, recoveryMethod : action.payload}

        case idServiceCompanyRetrieve:
            return {...state, serviceCompany : action.payload}

        case idTMTypeRetrieve:
            return {...state, serviceCompany : action.payload}

        case idTransmissionRetrieve:
            return {...state, transmission : action.payload}
        default:
            return state
    }
}

export const idMachineRetrieveAction = (payload) => ({type: idMachineRetrieve, payload})
export const idMaintenanceRetrieveAction = (payload) => ({type: idMaintenanceRetrieve, payload})
export const idComplaintRetrieveAction = (payload) => ({type: idComplaintRetrieve, payload})
export const idMachineModelRetrieveAction = (payload) => ({type: idMachineModelRetrieve, payload})
export const idControlRetrieveAction = (payload) => ({type: idControlRetrieve, payload})
export const idEngineRetrieveAction = (payload) => ({type: idEngineRetrieve, payload})
export const idFailureNodeRetrieveAction = (payload) => ({type: idFailureNodeRetrieve, payload})
export const idLeadRetrieveAction = (payload) => ({type: idLeadRetrieve, payload})
export const idRecoveryMethodRetrieveAction = (payload) => ({type: idRecoveryMethodRetrieve, payload})
export const idServiceCompanyRetrieveAction = (payload) => ({type: idServiceCompanyRetrieve, payload})
export const idTMTypeRetrieveAction = (payload) => ({type: idTMTypeRetrieve, payload})
export const idTransmissionRetrieveAction = (payload) => ({type: idTransmissionRetrieve, payload})
