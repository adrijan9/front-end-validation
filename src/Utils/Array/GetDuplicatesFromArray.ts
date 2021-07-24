import IsObject from "../../Utils/Object/IsObject";
import IsArray from "./IsArray";
import Stringify from "../Json/Stringify";

/**
 * Get all duplicates from array
 *
 * @param items
 */
export default function (items: Array<any>): Record<any, any> {
    let singleValues: any = [];
    const duplicateValues: any = {};
    if (items.length > 0) {
        for (const index in items) {
            const value = IsObject(items[index]) || IsArray(items[index]) ? Stringify(items[index]) : items[index];
            if (singleValues.indexOf(value) === -1) {
                singleValues = [
                    ...singleValues,
                    value
                ];
            } else {
                duplicateValues[index] = items[index];
            }
        }
    }
    return duplicateValues;
}