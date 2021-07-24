import IsBoolean from "../Utils/Boolean/IsBoolean";
import Message from "../Helpers/Message";

export default function (ruleValue: boolean, value: any, key: string) {
    let status = true,
        message: string | null = null;

    if (ruleValue) {
        const isBoolean = IsBoolean(value);

        status = isBoolean;
        message = !isBoolean ? Message(key, "must be boolean") : null;
    }

    return {
        status,
        message
    };
}