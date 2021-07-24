import Accepted from "../Methods/Accepted";
import After from "../Methods/BeforeAfter/After";
import AfterOrEqual from "../Methods/BeforeAfter/AfterOrEqual";
import Alpha from "../Methods/Alpha";
import Array from "../Methods/Array";
import Before from "../Methods/BeforeAfter/Before";
import BeforeOrEqual from "../Methods/BeforeAfter/BeforeOrEqual";
import Between from "../Methods/Between";
import Boolean from "../Methods/Boolean";
import Confirmed from "../Methods/Confirmed";
import Date from "../Methods/Date/Date";
import DateEquals from "../Methods/Date/DateEquals";
import DateFormat from "../Methods/Date/DateFormat";
import Distinct from "../Methods/Distinct";
import Ipaddress from "../Methods/IpAddress/Ipaddress";
import Ipv4 from "../Methods/IpAddress/Ipv4";
import Ipv6 from "../Methods/IpAddress/Ipv6";
import Required from "../Methods/Required";
import Different from "../Methods/Different";
import Digits from "../Methods/Digits/Digits";
import DigitsBetween from "../Methods/Digits/DigitsBetween";
import Email from "../Methods/Email";
import EndsWith from "../Methods/EndsWith";
import Min from "../Methods/Size/Min";
import Max from "../Methods/Size/Max";
import Phone from "../Methods/Phone";

export default class Methods {
    /**
     * @var
     * @protected
     */
    protected BAIL = "bail";

    /**
     * @var
     * @protected
     */
    protected EXCLUDE_IF = "excludeIf";

    /**
     * @var
     * @protected
     */
    protected methods: Record<any, any> = {
        Accepted,
        After,
        AfterOrEqual,
        Alpha,
        Array,
        Before,
        BeforeOrEqual,
        Between,
        Boolean,
        Confirmed,
        Date,
        DateEquals,
        DateFormat,
        Different,
        Digits,
        DigitsBetween,
        Distinct,
        Email,
        EndsWith,
        Ipaddress,
        Ipv4,
        Ipv6,
        Required,
        Min,
        Max,
        Phone
    };

    /**
     * @var
     * @protected
     */
    protected excluded: Array<string> = [
        this.BAIL,
        this.EXCLUDE_IF
    ];

    /**
     * @var
     * @protected
     */
    protected changers: Array<any> = [
        this.EXCLUDE_IF
    ];

}