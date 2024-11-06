const initialState = []
const initMaintenances = 'initMaintenances'
const addMaintenance = 'addMaintenance';
const deleteMaintenance = 'deleteMaintenance'
export const maintenanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case initMaintenances:
            return [...action.payload]
        case addMaintenance:
            return [...state, action.payload];
        default:
            return state
    }
}

export const initMaintenancesAction = (payload) => ({type: initMaintenances, payload})
export const addMaintenanceAction = (payload) => ({type: addMaintenance, payload});