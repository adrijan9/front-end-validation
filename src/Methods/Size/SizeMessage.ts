import IsArray from "../../Utils/Array/IsArray";
import IsNumber from "../../Utils/Numbers/IsNumber";
import Message from "../../Helpers/Message";

export default function (value: any, key: string, operation: string): string {
    const resolveOperation = operation === "min" ? "less" : "max";
    let message = `must be a ${operation} ${value} characters`;

    if (IsArray(value)) {
        message = `must have ${operation} ${value} items.`;
    }

    if (IsNumber(value)) {
        message = `cannot be ${resolveOperation} than ${value}.`;
    }

    return Message(key, message);
}