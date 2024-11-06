import { addMachineAction, initMachinesAction } from "./machineReducer";
import $api from "../../http";

export const fetchMachines = () => {
    return function(dispatch) {
        $api.get('api/v1/autoservice/machine/')
            .then(response => dispatch(initMachinesAction(response.data)))
            .catch(err => console.log(err))
    }
}

export const fetchMachineCreate = ( machine_factory_num,
                                    machine_model,
                                    engine_factory_num,
                                    engine_model,
                                    transmission_factory_num,
                                    transmission_model,
                                    steering_axle_factory_num,
                                    steering_axle_model,
                                    driving_axle_factory_num,
                                    driving_axle_model,
                                    delivery_contract_num,
                                    date_of_shipment,
                                    customer,
                                    delivery_address,
                                    equipment,
                                    client,
                                    service_company) => {
    return function(dispatch) {
        $api.post('api/v1/autoservice/machine/', 
        {
            machine_factory_num: machine_factory_num,
            machine_model: machine_model,
            engine_factory_num: engine_factory_num,
            engine_model: engine_model,
            transmission_factory_num: transmission_factory_num,
            transmission_model: transmission_model,
            steering_axle_factory_num: steering_axle_factory_num,
            steering_axle_model: steering_axle_model,
            driving_axle_factory_num: driving_axle_factory_num,
            driving_axle_model: driving_axle_model,
            delivery_contract_num: delivery_contract_num,
            date_of_shipment: date_of_shipment,
            customer: customer,
            delivery_address: delivery_address,
            equipment: equipment,
            client: client,
            service_company: service_company
        })
            .then(response => {
                dispatch(addMachineAction(response.data));
                return response.data;
            })
            .catch(err => console.log(err))
    }
}