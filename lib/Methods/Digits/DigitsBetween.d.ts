import DigitsBetweenInterface from "./Interfaces/DigitsBetweenInterface";
export default function (ruleValue: DigitsBetweenInterface, value: any, key: string): {
    status: boolean;
    message: string | null;
};
