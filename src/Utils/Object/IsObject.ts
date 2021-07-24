import IsNull from "../IsNull";

/**
 * Check if value is object
 *
 * @param value
 * @return boolean
 */
export default function (value: any) {
    return typeof value === "object" && !IsNull(value);
}