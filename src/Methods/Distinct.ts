import GetDuplicatesFromArray from "../Utils/Array/GetDuplicatesFromArray";
import IsArray from "../Utils/Array/IsArray";
import {EMPTY_ARRAY, NO_ARRAY_PROVIDED} from "../Constants/Array";
import Message from "../Helpers/Message";
import IsObjectEmpty from "../Utils/Object/IsObjectEmpty";

export default function (ruleValue: boolean, value: Array<any>, key: string): Record<any, any> {
    if(!IsArray(value)){
        throw new Error(NO_ARRAY_PROVIDED);
    }

    let status = true,
        message: string | null = null;

    if (ruleValue) {
        if(!value.length) {
            throw new Error(EMPTY_ARRAY);
        }

        const duplicates = GetDuplicatesFromArray(value);

        if(!IsObjectEmpty(duplicates)) {
            status = false;
            message = Message(key, "has duplicates.");
        }
    }

    return {
        status,
        message
    };
}