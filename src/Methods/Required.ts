import IsUndefined from "front-end-utils/utils/IsUndefined";
import IsNull from "front-end-utils/utils/IsNull";
import IsEmptyString from "front-end-utils/utils/string/IsEmptyString";
import IsArray from "front-end-utils/utils/array/IsArray";
import Message from "../Helpers/Message";

export default function (requiredValue: boolean, value: any, key: string) {
    let status = true;
    let message: string | null = null;

    if(requiredValue) {
        const passes: boolean = !IsUndefined(value)
            && !IsNull(value)
            && !IsEmptyString(value)
            || (IsArray(value) && value.length !== 0);

        status = passes;
        message = !passes ? Message(key, "is required!") : null;
    }

    return {
        status,
        message
    };
}