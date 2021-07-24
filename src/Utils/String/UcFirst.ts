import IsString from "./IsString";

/**
 * Make string with first character as uppercase
 * @param value
 */
export default function (value: any) {
    if(!IsString(value)){
        return null;
    }
    return value.charAt(0).toUpperCase() + value.slice(1)
}