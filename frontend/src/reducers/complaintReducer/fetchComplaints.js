import { initComplaintsAction } from "./complaintReducer";
import $api from "../../http";

export const fetchComplaints = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/complaint/')
            .then(response => dispatch(initComplaintsAction(response.data)))
            .catch(err => console.log(err))
    }
}