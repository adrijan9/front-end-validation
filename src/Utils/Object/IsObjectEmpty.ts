import IsObject from "./IsObject";

/**
 * Check if object is empty
 *
 * @param object
 */
export default function (object: any) {
    if (!IsObject(object)) {
        throw new Error('Value must be object.');
    }

    return Object.keys(object).length === 0 && object.constructor === Object;
}