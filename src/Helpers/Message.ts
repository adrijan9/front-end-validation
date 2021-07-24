import UcFirst from '../Utils/String/UcFirst';

export default function (key: string, message: string) {
    return `${UcFirst(key)} ${message}`;
}