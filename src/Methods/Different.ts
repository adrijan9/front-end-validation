import IsNull from "front-end-utils/utils/IsNull";
import Message from "../Helpers/Message";
import Isset from "front-end-utils/utils/object/Isset";
import {OBJECT_KEY_NOT_FOUND} from "../Constants/Object";

export default function (ruleValue: any, value: any, key: string, model: Record<any, any>) {
    let status = true,
        message: string | null = null;

    if (!Isset(model, ruleValue)) {
        throw new Error(OBJECT_KEY_NOT_FOUND);
    }

    if (IsNull(value) || value === model[ruleValue].value) {
        status = false;
        message = Message(key, `cannot cannot be null or equal to ${ruleValue}`);
    }

    return {
        status,
        message
    };
}