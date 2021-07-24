import Message from "../Helpers/Message";
import IsArray from "../Utils/Array/IsArray";
import {NO_ARRAY_PROVIDED} from "../Constants/Array";

export default function (ruleValue: Array<number>, value: number, key: string) {
    if (!IsArray(ruleValue)) {
        throw new Error(NO_ARRAY_PROVIDED);
    }

    const minValue = ruleValue[0],
        maxValue = ruleValue[1];

    let status = false,
        message: string | null = Message(key, `must be between ${minValue} and ${maxValue}`);

    if (value >= minValue && value <= maxValue) {
        status = true;
        message = null;
    }

    return {
        status,
        message
    };
}