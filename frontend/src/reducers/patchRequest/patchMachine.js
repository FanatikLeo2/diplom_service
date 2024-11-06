import $api from "../../http";

export const patchMachine = (
    id, 
    machine_factory_num, 
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
    service_company
) => {
    const updateData = {
        machine_factory_num,
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
        service_company
    };

    Object.keys(updateData).forEach(key => {
        if (!updateData[key]) {
            delete updateData[key];
        }
    });

    if (Object.keys(updateData).length === 0) {
        console.error("Нет данных для обновления");
        return Promise.reject(new Error("Нет данных для обновления"));
    }

    return $api.patch(`api/v1/autoservice/machine/${id}/`, updateData)
        .catch(err => {
            console.error(err);
            throw err;
        });
};