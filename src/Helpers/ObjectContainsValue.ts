import ObjectValues from "front-end-utils/utils/object/ObjectValues";

export default function (object: Record<any, any>, key: any) {
    return ObjectValues(object).indexOf(key) !== -1;
}