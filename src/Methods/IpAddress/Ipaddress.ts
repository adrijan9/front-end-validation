import Message from "../../Helpers/Message";

export default function (ruleValue: boolean, value: any, key: string) {
    let status = true,
        message: string | null = null;

    if(ruleValue){
        status = false;
        message = Message(key, "must be valid ip address!");

        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
            status = true;
            message = null;
        }
    }

    return {
        status,
        message
    };
}