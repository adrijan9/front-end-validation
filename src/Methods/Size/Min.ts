import Size from "./Size";
import SizeMessage from "./SizeMessage";

/**
 * Validate minimum
 * @param ruleValue
 * @param value
 * @param key
 */
export default function (ruleValue: any, value: Array<any>, key: string): Record<any, any> {
    const size: number = Size(value);
    let status = true,
        message: string | null = null;

    if (ruleValue && size < ruleValue) {
        status = false;
        message = SizeMessage(ruleValue, key, "min");
    }

    return {
        status,
        message
    };
}