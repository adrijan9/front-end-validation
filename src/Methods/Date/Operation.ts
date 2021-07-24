import moment from "moment";
import Message from "../../Helpers/Message";

export default function (
    ruleValue: any,
    value: string,
    key: string,
    operation: string
) {
    let status = false,
        message: string | null = null;

    switch (operation) {
        case "valid":
            message = Message(key, `is invalid!`);
            if (value && moment(value).isValid()) {
                status = true;
                message = null;
            }
            break;
        case "equals":
            const ruleDateValue = moment(ruleValue, true),
                propertyDateValue = moment(value, true);

            message = Message(key, `is not equal to ${ruleValue}!`);
            if (value && ruleDateValue.isSame(propertyDateValue, "date")) {
                status = true;
                message = null;
            }
            break;
        case "format":
            message = Message(key, `has a incorrect format.`);
            if (value && moment(value, ruleValue, true).isSame(value)) {
                status = true;
                message = null;
            }
            break;
    }

    return {
        status,
        message
    };
}