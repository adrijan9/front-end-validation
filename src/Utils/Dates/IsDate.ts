/**
 * Check if string is date
 *
 * @param value
 */
export default function (value: any) {
    return !isNaN(new Date(value).getDate());
}