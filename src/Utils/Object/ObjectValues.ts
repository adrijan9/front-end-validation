import IsObject from "./IsObject";

/**
 * Get all values from object
 * This is short polyfill for Object.values
 * @param object
 * @return {*[]}
 */
export default function (object: any) {
    if (!IsObject(object)) {
        throw new Error('Given value must be object.');
    }

    let values: any = [];
    for(const key in object) {
        values = [
            ...values,
            object[key]
        ];
    }

    return values;
}