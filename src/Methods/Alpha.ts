import Message from "../Helpers/Message";
import IsBoolean from "front-end-utils/utils/boolean/IsBoolean";

export const OPERATION_ALPHABETIC = "alphabetic";
export const OPERATION_DASH = "dash";
export const OPERATION_NUM = "num";

export default function (ruleValue: any, value: any, key: string) {
    let status = false,
        message: string | null = null;
    const type = !ruleValue || IsBoolean(ruleValue) ? OPERATION_ALPHABETIC : ruleValue;

    switch (type) {
        case OPERATION_ALPHABETIC:
            status = /^[a-zA-Z]+$/.test(value);
            message = !status ? Message(key, "must contains only alphabetically characters.") : null;
            break;
        case OPERATION_DASH:
            status = /^(\w|_|-)+$/.test(value);
            message = !status ? Message(key, "must contains only alphabetically, numeric, dashes and underscore characters.") : null;
            break;
        case OPERATION_NUM:
            status = /^\d+$/.test(value);
            message = !status ? Message(key, "must contains only numeric characters.") : null;
            break;
    }

    return {
        status,
        message
    };
}