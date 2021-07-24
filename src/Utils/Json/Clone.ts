import Parse from "./Parse";
import Stringify from "./Stringify";

/**
 * Clone value
 *
 * @param value
 */
export default function (value: any) {
    return Parse(Stringify(value));
}