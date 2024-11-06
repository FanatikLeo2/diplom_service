const initialState = [];
const initMachines = 'initMachines';
const addMachine = 'addMachine';
export const machineReducer = (state = initialState, action) => {
    switch (action.type) {
        case initMachines:
            return [...action.payload];
        case addMachine:
            return [...state, action.payload];
        default:
            return state;
    }
};

export const initMachinesAction = (payload) => ({type: initMachines, payload});
export const addMachineAction = (payload) => ({type: addMachine, payload});