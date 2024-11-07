import $api from "../../http";

export const patchComplaint = (
    id, 
    refusal_date, 
    operating_time,
    failure_node,
    failure_description,
    recovery_method,
    spare_parts_used,
    recovery_date,
    machine,
    service_company
) => {
    const updateData = {
        refusal_date, 
        operating_time,
        failure_node,
        failure_description,
        recovery_method,
        spare_parts_used,
        recovery_date,
        machine,
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

    return $api.patch(`api/v1/autoservice/complaint/${id}/`, updateData)
        .catch(err => {
            console.error(err);
            throw err;
        });
};