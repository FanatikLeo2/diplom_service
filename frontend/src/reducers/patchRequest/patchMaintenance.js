import $api from "../../http";

export const patchMaintenance = (
    id,
    machine,
    maintenance_type,
    event_date,
    operating_time,
    order_id,
    order_date,
    service_company,
) => {
    const updateData = {
        machine,
        maintenance_type,
        event_date,
        operating_time,
        order_id,
        order_date,
        service_company,
    };

    Object.keys(updateData).forEach(key => {
        if (!updateData[key]) {
            delete updateData[key];
        }
    });
    console.log(updateData)
    if (Object.keys(updateData).length === 0) {
        console.error("Нет данных для обновления");
        return Promise.reject(new Error("Нет данных для обновления"));
    }

    return $api.patch(`api/v1/autoservice/maintenance/${id}/`, updateData)
        .catch(err => {
            console.error(err);
            throw err;
        });
};