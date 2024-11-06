import $api from "../../http";
import { setTokenAction, getUserAction } from "./currentUserReducer";

export const login = (username, password) => {
    return function(dispatch) {
        $api.post('api/token/', 
        {
            username: username,
            password: password
        })
            .then(response => dispatch(setTokenAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const getUser = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/user/')
            .then(response => dispatch(getUserAction(response.data)))
            .catch(err => console.log(err))
    }
}
