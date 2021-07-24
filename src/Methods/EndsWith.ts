import Message from "../Helpers/Message";
import IsArray from "front-end-utils/utils/array/IsArray";
import IsString from "front-end-utils/utils/string/IsString";
import {EMPTY_ARRAY} from "../Constants/Array";

/**
 * Check if value ends with given rule value
 *
 * @param ruleValue
 * @param value
 */
function checkValueEndsWith (ruleValue: string | Array<number>, value: any): boolean {
    return value.substr(-(ruleValue.length)) === ruleValue;
}

/**
 * Ends with
 *
 * @param ruleValue
 * @param value
 * @param key
 */
export default function (ruleValue: string | Array<number>, value: any, key: string) {
    if (!IsString(ruleValue) && !IsArray(ruleValue)) {
        throw new Error("Value of the rule must be string or array!");
    }

    let status = false,
        message: string | null = Message(key, `does not ends with`);

    if (IsString(ruleValue)) {
        status = checkValueEndsWith(ruleValue, value);

        if (!status) {
            message = `${message} ${ruleValue}!`;
        }
    } else if (IsArray(ruleValue)) {
        if (!ruleValue.length) {
            throw new Error(EMPTY_ARRAY);
        }

        // @ts-ignore
        status = ruleValue.filter((item: any) => checkValueEndsWith(item, value)).length;
        if (!status) {
            // @ts-ignore
            message = `${message} ${ruleValue.join(",")}!`;
        }
    }

    return {
        status,
        message
    };
}