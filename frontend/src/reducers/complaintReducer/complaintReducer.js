const initialState = []
const initComplaints = 'initComplaints'
export const complaintReducer = (state = initialState, action) => {
    switch (action.type) {
        case initComplaints:
            return [...action.payload]
        default:
            return state
    }
}

export const initComplaintsAction = (payload) => ({type: initComplaints, payload})