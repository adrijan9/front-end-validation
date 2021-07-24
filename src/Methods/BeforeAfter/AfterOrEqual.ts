import moment from "moment";
import Message from "../../Helpers/Message";
import UcFirst from "front-end-utils/utils/string/UcFirst";
import GetRuleValue from "./Helpers/GetRuleValue";

export default function (ruleValue: string, value: any, key: string, model: Record<any, any>) {
    let status = false,
        message: string | null = Message(key, `is not greater or equal than ${UcFirst(ruleValue)}`);

    const dateFromModel = moment(value),
        dateFromRule = GetRuleValue(ruleValue, model);

    if (dateFromModel >= dateFromRule) {
        status = true;
        message = null;
    }

    return {
        status,
        message
    };
}