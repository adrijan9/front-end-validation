import IsDate from "../../../Utils/Dates/IsDate";
import moment from "moment";
import DateFormats from "../../../Utils/Dates/DateFormats";
import ObjectContainsKey from "../../../Helpers/ObjectContainsValue";
import {OBJECT_KEY_NOT_FOUND} from "../../../Constants/Object";

export default function (ruleValue: string, model: Record<any, any>){
    let date: any;

    if (IsDate(ruleValue)) {
        date = moment(ruleValue);
    } else {
        date = DateFormats(ruleValue);
        if(!date) {
            if (!ObjectContainsKey(model, ruleValue)) {
                throw new Error(OBJECT_KEY_NOT_FOUND);
            }
            date = moment(model[ruleValue].value);
        }
    }

    return date;
}