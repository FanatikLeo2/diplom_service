import { initMaintenancesAction, addMaintenanceAction, deleteMaintenanceAction } from "./maintenanceReducer";
import $api from "../../http";

export const fetchMaintenances = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/maintenance/')
            .then(response => dispatch(initMaintenancesAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchMaintenanceCreate = ( machine,
                                        maintenance_type,
                                        event_date,
                                        operating_time,
                                        order_id,
                                        order_date,
                                        service_company,
    ) => {
    return function(dispatch) {
        $api.post('api/v1/autoservice/maintenance/', 
        {
            machine: machine,
            maintenance_type: maintenance_type,
            event_date: event_date,  
            operating_time: operating_time,
            order_id: order_id,
            order_date: order_date,
            service_company: service_company
        })
        .then(response => {
            dispatch(addMaintenanceAction(response.data));
            return response.data;
        })
        .catch(err => console.log(err))
    }
}
