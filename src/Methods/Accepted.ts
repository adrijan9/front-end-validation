import Message from "../Helpers/Message";

export default function (ruleValue: boolean, value: any, key: string) {
    let status = false,
        message: string | null = Message(key, "field is not accepted.");

    if (ruleValue) {
        switch (value) {
            case "yes":
            case "on":
            case 1:
            case true:
                status = true;
                message = null;
        }
    }

    return {
        status,
        message
    };
}