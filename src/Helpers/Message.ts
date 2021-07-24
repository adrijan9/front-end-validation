import UcFirst from "front-end-utils/utils/string/UcFirst";

export default function (key: string, message: string) {
    return `${UcFirst(key)} ${message}`;
}