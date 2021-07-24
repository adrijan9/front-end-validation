export default function (_: any, value: any, key: string): Record<any, any> {
    let status = true,
        message: string | null = null;

    const testValue = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(value);
    if (!testValue) {
        status = false;
        message = `Attribute ${key} is not valid phone number.`;
    }

    return {
        status,
        message
    };
}