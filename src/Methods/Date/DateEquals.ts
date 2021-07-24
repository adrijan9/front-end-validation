import Operation from "./Operation";

export default function (ruleValue: any, value: any, key: string) {
    const { status, message } = Operation(
        ruleValue,
        value,
        key,
        "equals"
    );

    return {
        status,
        message
    };
}