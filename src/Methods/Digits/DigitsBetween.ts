import IsNumber from "front-end-utils/utils/numbers/IsNumber";
import {ONLY_NUMBERS} from "../../Constants/Number";
import Message from "../../Helpers/Message";
import IsObject from "front-end-utils/utils/object/IsObject";
import {OBJECT_NOT_PROVIDED} from "../../Constants/Object";
import Isset from "front-end-utils/utils/object/Isset";
import DigitsBetweenInterface from "./Interfaces/DigitsBetweenInterface";

export default function (ruleValue: DigitsBetweenInterface, value: any, key: string) {
    if (!IsObject(ruleValue)) {
        throw new Error(OBJECT_NOT_PROVIDED);
    }

    if (!Isset(ruleValue, "min") || !Isset(ruleValue, "max")) {
        throw new Error("Min and maximum must be provided.");
    }

    if (!IsNumber(value)) {
        throw new Error(ONLY_NUMBERS);
    }

    let status = false,
        message: string | null = Message(key, `must be minimum ${ruleValue.min} and maximum ${ruleValue.max}`);

    if (value >= ruleValue.min && value <= ruleValue.max) {
        status = true;
        message = null;
    }

    return {
        status,
        message
    };
}