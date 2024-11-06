const initialState = {}
const initMachineModels = 'initMachineModels'
const initEngineModels = 'initEngineModels'
const initTransmissionModels = 'initTransmissionModels'
const initSteeringAxlenModels = 'initSteeringAxlenModels'
const initDrivingAxlenModels = 'initDrivingAxlenModels'
const initServiceCompanyModels = 'initServiceCompanyModels'
const initUserAll = 'initUserAll'
const initMaintenanceTypeModel = 'initMaintenanceTypeModel'

export const otherModelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case initMachineModels:
            return {
                ...state,
                machineModels: { ...action.payload }
            };
        case initEngineModels:
            return {
                ...state,
                engineModels: { ...action.payload }
            };
        case initTransmissionModels:
            return {
                ...state,
                transmissionModels: { ...action.payload }
            };
        case initSteeringAxlenModels:
            return {
                ...state,
                steeringAxleModels: { ...action.payload }
            };
        case initDrivingAxlenModels:
            return {
                ...state,
                drivingAxleModels: { ...action.payload }
                };
        case initServiceCompanyModels:
            return {
                ...state,
                serviceCompany: { ...action.payload }
                };
        case initUserAll:
            return {
                ...state,
                userAll: { ...action.payload }
                };
        case initMaintenanceTypeModel:
            return {
                ...state,
                maintenanceTypeModels: { ...action.payload }
                };
        default:
            return state
    }
}

export const initMachineModelAction = (payload) => ({type: initMachineModels, payload})
export const initEngineModelAction = (payload) => ({type: initEngineModels, payload})
export const initTransmissionModelAction = (payload) => ({type: initTransmissionModels, payload})
export const initSteeringAxlenModelsAction = (payload) => ({type: initSteeringAxlenModels, payload})
export const initDrivingAxlenModelsAction = (payload) => ({type: initDrivingAxlenModels, payload})
export const initServiceCompanyModelsAction = (payload) => ({type: initServiceCompanyModels, payload})
export const initUserAllAction = (payload) => ({type: initUserAll, payload})
export const initMaintenanceTypeModelAction = (payload) => ({type: initMaintenanceTypeModel, payload})