import Message from "../Helpers/Message";

export default function (ruleValue: boolean, value: string, key: string) {
    let status = true,
        message: string | null = null;

    if (ruleValue) {
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        status = pattern.test(value);

        if (!status) {
            message = Message(key, "is not a valid email address.");
        }
    }

    return {
        status,
        message
    };
}