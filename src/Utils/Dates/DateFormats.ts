import moment from 'moment';
import IsDate from "./IsDate";

/**
 * Get data by format
 *
 * @param formatType (date, yesterday, tomorrow, today)
 */
export default function (formatType: any) {
    if (IsDate(formatType)) {
        return moment(formatType);
    }

    let date = null;

    switch (formatType) {
        case 'yesterday':
                date = moment().subtract(1, "day");
            break;
        case 'tomorrow':
                date = moment().add(1, "day");
            break;
        case 'today':
                date = moment();
            break;
    }

    return date;
}