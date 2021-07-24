import Message from "../Helpers/Message";
import Isset from "../Utils/Object/Isset";

function createConfirmationProperty(key: string, suffix = "confirmation"){
    return `${key}_${suffix}`;
}

export default function (ruleValue: boolean, value: any, key: string, model: Record<any, any>): Record<any, any> {
    const confirmationProperty = createConfirmationProperty(key);
    let status = false,
        message: string | null = null;

    if (ruleValue) {
        if(!Isset(model, confirmationProperty)) {
            message = Message(key, "does not have confirmation property.");
        } else {
            if(model[confirmationProperty].value !== value) {
                message = Message(key, "does not match.");
            } else {
                status = true;
                message = null;
            }
        }
    }

    return {
        status,
        message
    };
}