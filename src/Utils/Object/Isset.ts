import IsObject from "./IsObject";

/**
 * Check if key exists in object
 *
 * @param object
 * @param key
 */
export default function (object: any, key: string) {
    if (!IsObject(object)) {
        throw new Error('Value must be object.');
    }

    return object.hasOwnProperty(key);
}