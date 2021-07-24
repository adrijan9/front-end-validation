import ObjectValues from "../Utils/Object/ObjectValues";

export default function (object: Record<any, any>, key: any) {
    return ObjectValues(object).indexOf(key) !== -1;
}