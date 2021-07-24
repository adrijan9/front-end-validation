import IsUndefined from "../Utils/IsUndefined";
import IsNull from "../Utils/IsNull";
import IsEmptyString from "../Utils/String/IsEmptyString";
import IsArray from "../Utils/Array/IsArray";
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