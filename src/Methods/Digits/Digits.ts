import IsNumber from "../../Utils/Numbers/IsNumber";
import {ONLY_NUMBERS} from "../../Constants/Number";
import Message from "../../Helpers/Message";

export default function (ruleValue: any, value: any, key: string) {
    let status = false,
        message: string | null = Message(key, `length does not match defined length!`);

    if(!IsNumber(value)){
        throw new Error(ONLY_NUMBERS);
    }

    if ((value.toString()).length === Number(ruleValue)) {
        status = true;
        message = null;
    }

    return {
        status,
        message
    };
}