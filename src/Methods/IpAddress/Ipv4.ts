import Ipaddress from "./Ipaddress";

export default function (ruleValue: boolean, value: any, key: string) {
    return Ipaddress(ruleValue, value, key);
}