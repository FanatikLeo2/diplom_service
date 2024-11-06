const initialState = {}
const getToken = 'getToken'
const getUser = 'getUser'

export const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case getToken:
            localStorage.setItem('silantToken', action.payload.access)
            return state
         case getUser:
             return {...action.payload}
        default:
            return state
    }
}

export const setTokenAction = (payload) => ({type: getToken, payload})
export const getUserAction = (payload) => ({type: getUser, payload})

