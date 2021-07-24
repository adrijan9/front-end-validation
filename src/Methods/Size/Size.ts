import IsNumber from "front-end-utils/utils/numbers/IsNumber";

/**
 * Get size
 * @param value
 */
export default function (value: Array<any>): number {
    if (IsNumber(value) ) {
        return Number(value);
    }

    return value.length;
}