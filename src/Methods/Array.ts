import Message from "../Helpers/Message";
import IsArray from "front-end-utils/utils/array/IsArray";

export default function (ruleValue: boolean, value: any, key: string) {
    let status = false,
        message: string | null = Message(key, "property must be an array.");

    if (ruleValue) {
        status = IsArray(value);
        if(status){
            message = null;
        }
    }

    return {
        status,
        message
    };
}