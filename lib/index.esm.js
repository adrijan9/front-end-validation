import moment from 'moment';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/**
 * Check array has items
 *
 * @param atc
 */
function ArrayHasItems (atc) {
    return !!atc.length;
}

/**
 * Check if value is null
 *
 * @param value
 */
function IsNull (value) {
    return value === null || value === "null";
}

/**
 * Check if value is object
 *
 * @param value
 * @return boolean
 */
function IsObject (value) {
    return typeof value === "object" && !IsNull(value);
}

/**
 * Check if object is empty
 *
 * @param object
 */
function IsObjectEmpty (object) {
    if (!IsObject(object)) {
        throw new Error('Value must be object.');
    }
    return Object.keys(object).length === 0 && object.constructor === Object;
}

/**
 * Check if key exists in object
 *
 * @param object
 * @param key
 */
function Isset (object, key) {
    if (!IsObject(object)) {
        throw new Error('Value must be object.');
    }
    return object.hasOwnProperty(key);
}

/**
 * Check if value is string
 * @param value
 */
function IsString (value) {
    return typeof value === "string";
}

/**
 * Make string with first character as uppercase
 * @param value
 */
function UcFirst (value) {
    if (!IsString(value)) {
        return null;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function Message (key, message) {
    return UcFirst(key) + " " + message;
}

function Accepted (ruleValue, value, key) {
    var status = false, message = Message(key, "field is not accepted.");
    if (ruleValue) {
        switch (value) {
            case "yes":
            case "on":
            case 1:
            case true:
                status = true;
                message = null;
        }
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Check if string is date
 *
 * @param value
 */
function IsDate (value) {
    return !isNaN(new Date(value).getDate());
}

/**
 * Get data by format
 *
 * @param formatType (date, yesterday, tomorrow, today)
 */
function DateFormats (formatType) {
    if (IsDate(formatType)) {
        return moment(formatType);
    }
    var date = null;
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

/**
 * Get all values from object
 * This is short polyfill for Object.values
 * @param object
 * @return {*[]}
 */
function ObjectValues (object) {
    if (!IsObject(object)) {
        throw new Error('Given value must be object.');
    }
    var values = [];
    for (var key in object) {
        values = __spreadArray(__spreadArray([], values), [
            object[key]
        ]);
    }
    return values;
}

function ObjectContainsKey (object, key) {
    return ObjectValues(object).indexOf(key) !== -1;
}

var OBJECT_KEY_NOT_FOUND = "Object key cannot be found.";
var OBJECT_NOT_PROVIDED = "Object is not provided.";

function GetRuleValue (ruleValue, model) {
    var date;
    if (IsDate(ruleValue)) {
        date = moment(ruleValue);
    }
    else {
        date = DateFormats(ruleValue);
        if (!date) {
            if (!ObjectContainsKey(model, ruleValue)) {
                throw new Error(OBJECT_KEY_NOT_FOUND);
            }
            date = moment(model[ruleValue].value);
        }
    }
    return date;
}

function After (ruleValue, value, key, model) {
    var status = false, message = Message(key, "is not greater than " + UcFirst(ruleValue));
    var dateFromModel = moment(value), dateFromRule = GetRuleValue(ruleValue, model);
    if (dateFromModel > dateFromRule) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

function AfterOrEqual (ruleValue, value, key, model) {
    var status = false, message = Message(key, "is not greater or equal than " + UcFirst(ruleValue));
    var dateFromModel = moment(value), dateFromRule = GetRuleValue(ruleValue, model);
    if (dateFromModel >= dateFromRule) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Check if value is boolean
 *
 * @param value
 */
function IsBoolean (value) {
    return typeof value === "boolean";
}

var OPERATION_ALPHABETIC = "alphabetic";
var OPERATION_DASH = "dash";
var OPERATION_NUM = "num";
function Alpha (ruleValue, value, key) {
    var status = false, message = null;
    var type = !ruleValue || IsBoolean(ruleValue) ? OPERATION_ALPHABETIC : ruleValue;
    switch (type) {
        case OPERATION_ALPHABETIC:
            status = /^[a-zA-Z]+$/.test(value);
            message = !status ? Message(key, "must contains only alphabetically characters.") : null;
            break;
        case OPERATION_DASH:
            status = /^(\w|_|-)+$/.test(value);
            message = !status ? Message(key, "must contains only alphabetically, numeric, dashes and underscore characters.") : null;
            break;
        case OPERATION_NUM:
            status = /^\d+$/.test(value);
            message = !status ? Message(key, "must contains only numeric characters.") : null;
            break;
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Check if value is array
 *
 * @param atc
 */
function IsArray (atc) {
    return Array.isArray(atc);
}

function Array$1 (ruleValue, value, key) {
    var status = false, message = Message(key, "property must be an array.");
    if (ruleValue) {
        status = IsArray(value);
        if (status) {
            message = null;
        }
    }
    return {
        status: status,
        message: message
    };
}

function Before (ruleValue, value, key, model) {
    var status = false, message = Message(key, "is not under than " + UcFirst(ruleValue));
    var dateFromModel = moment(value), dateFromRule = GetRuleValue(ruleValue, model);
    if (dateFromModel < dateFromRule) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

function BeforeOrEqual (ruleValue, value, key, model) {
    var status = false, message = Message(key, "is not under or equal than " + UcFirst(ruleValue));
    var dateFromModel = moment(value), dateFromRule = GetRuleValue(ruleValue, model);
    if (dateFromModel <= dateFromRule) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

var NO_ARRAY_PROVIDED = "No array provided.";
var EMPTY_ARRAY = "Arrays are empty.";

function Between (ruleValue, value, key) {
    if (!IsArray(ruleValue)) {
        throw new Error(NO_ARRAY_PROVIDED);
    }
    var minValue = ruleValue[0], maxValue = ruleValue[1];
    var status = false, message = Message(key, "must be between " + minValue + " and " + maxValue);
    if (value >= minValue && value <= maxValue) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

function Boolean (ruleValue, value, key) {
    var status = true, message = null;
    if (ruleValue) {
        var isBoolean = IsBoolean(value);
        status = isBoolean;
        message = !isBoolean ? Message(key, "must be boolean") : null;
    }
    return {
        status: status,
        message: message
    };
}

function createConfirmationProperty(key, suffix) {
    if (suffix === void 0) { suffix = "confirmation"; }
    return key + "_" + suffix;
}
function Confirmed (ruleValue, value, key, model) {
    var confirmationProperty = createConfirmationProperty(key);
    var status = false, message = null;
    if (ruleValue) {
        if (!Isset(model, confirmationProperty)) {
            message = Message(key, "does not have confirmation property.");
        }
        else {
            if (model[confirmationProperty].value !== value) {
                message = Message(key, "does not match.");
            }
            else {
                status = true;
                message = null;
            }
        }
    }
    return {
        status: status,
        message: message
    };
}

function Operation (ruleValue, value, key, operation) {
    var status = false, message = null;
    switch (operation) {
        case "valid":
            message = Message(key, "is invalid!");
            if (value && moment(value).isValid()) {
                status = true;
                message = null;
            }
            break;
        case "equals":
            var ruleDateValue = moment(ruleValue, true), propertyDateValue = moment(value, true);
            message = Message(key, "is not equal to " + ruleValue + "!");
            if (value && ruleDateValue.isSame(propertyDateValue, "date")) {
                status = true;
                message = null;
            }
            break;
        case "format":
            message = Message(key, "has a incorrect format.");
            if (value && moment(value, ruleValue, true).isSame(value)) {
                status = true;
                message = null;
            }
            break;
    }
    return {
        status: status,
        message: message
    };
}

function Date$1 (ruleValue, value, key) {
    var _a = Operation(ruleValue, value, key, "valid"), status = _a.status, message = _a.message;
    return {
        status: status,
        message: message
    };
}

function DateEquals (ruleValue, value, key) {
    var _a = Operation(ruleValue, value, key, "equals"), status = _a.status, message = _a.message;
    return {
        status: status,
        message: message
    };
}

function DateFormat (ruleValue, value, key) {
    var _a = Operation(ruleValue, value, key, "format"), status = _a.status, message = _a.message;
    return {
        status: status,
        message: message
    };
}

function Stringify (value) {
    return JSON.stringify(value);
}

/**
 * Get all duplicates from array
 *
 * @param items
 */
function GetDuplicatesFromArray (items) {
    var singleValues = [];
    var duplicateValues = {};
    if (items.length > 0) {
        for (var index in items) {
            var value = IsObject(items[index]) || IsArray(items[index]) ? Stringify(items[index]) : items[index];
            if (singleValues.indexOf(value) === -1) {
                singleValues = __spreadArray(__spreadArray([], singleValues), [
                    value
                ]);
            }
            else {
                duplicateValues[index] = items[index];
            }
        }
    }
    return duplicateValues;
}

function Distinct (ruleValue, value, key) {
    if (!IsArray(value)) {
        throw new Error(NO_ARRAY_PROVIDED);
    }
    var status = true, message = null;
    if (ruleValue) {
        if (!value.length) {
            throw new Error(EMPTY_ARRAY);
        }
        var duplicates = GetDuplicatesFromArray(value);
        if (!IsObjectEmpty(duplicates)) {
            status = false;
            message = Message(key, "has duplicates.");
        }
    }
    return {
        status: status,
        message: message
    };
}

function Ipaddress (ruleValue, value, key) {
    var status = true, message = null;
    if (ruleValue) {
        status = false;
        message = Message(key, "must be valid ip address!");
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)) {
            status = true;
            message = null;
        }
    }
    return {
        status: status,
        message: message
    };
}

function Ipv4 (ruleValue, value, key) {
    return Ipaddress(ruleValue, value, key);
}

function Ipv6 (ruleValue, value, key) {
    var status = true, message = null;
    if (ruleValue) {
        status = false;
        message = Message(key, "must be valid ipv6 address!");
        if (/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gm.test(value)) {
            status = true;
            message = null;
        }
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Check if value is undefined
 *
 * @param value
 */
function IsUndefined (value) {
    return typeof value === "undefined";
}

/**
 * Check if string is empty
 *
 * @param value
 */
function IsEmptyString (value) {
    return value === "";
}

function Required (requiredValue, value, key) {
    var status = true;
    var message = null;
    if (requiredValue) {
        var passes = !IsUndefined(value)
            && !IsNull(value)
            && !IsEmptyString(value)
            || (IsArray(value) && value.length !== 0);
        status = passes;
        message = !passes ? Message(key, "is required!") : null;
    }
    return {
        status: status,
        message: message
    };
}

function Different (ruleValue, value, key, model) {
    var status = true, message = null;
    if (!Isset(model, ruleValue)) {
        throw new Error(OBJECT_KEY_NOT_FOUND);
    }
    if (IsNull(value) || value === model[ruleValue].value) {
        status = false;
        message = Message(key, "cannot cannot be null or equal to " + ruleValue);
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Check if value is number
 *
 * @param value
 */
function IsNumber (value) {
    return typeof value === "number";
}

var ONLY_NUMBERS = "Value should contains only numbers!";

function Digits (ruleValue, value, key) {
    var status = false, message = Message(key, "length does not match defined length!");
    if (!IsNumber(value)) {
        throw new Error(ONLY_NUMBERS);
    }
    if ((value.toString()).length === Number(ruleValue)) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

function DigitsBetween (ruleValue, value, key) {
    if (!IsObject(ruleValue)) {
        throw new Error(OBJECT_NOT_PROVIDED);
    }
    if (!Isset(ruleValue, "min") || !Isset(ruleValue, "max")) {
        throw new Error("Min and maximum must be provided.");
    }
    if (!IsNumber(value)) {
        throw new Error(ONLY_NUMBERS);
    }
    var status = false, message = Message(key, "must be minimum " + ruleValue.min + " and maximum " + ruleValue.max);
    if (value >= ruleValue.min && value <= ruleValue.max) {
        status = true;
        message = null;
    }
    return {
        status: status,
        message: message
    };
}

function Email (ruleValue, value, key) {
    var status = true, message = null;
    if (ruleValue) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        status = pattern.test(value);
        if (!status) {
            message = Message(key, "is not a valid email address.");
        }
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Check if value ends with given rule value
 *
 * @param ruleValue
 * @param value
 */
function checkValueEndsWith(ruleValue, value) {
    return value.substr(-(ruleValue.length)) === ruleValue;
}
/**
 * Ends with
 *
 * @param ruleValue
 * @param value
 * @param key
 */
function EndsWith (ruleValue, value, key) {
    if (!IsString(ruleValue) && !IsArray(ruleValue)) {
        throw new Error("Value of the rule must be string or array!");
    }
    var status = false, message = Message(key, "does not ends with");
    if (IsString(ruleValue)) {
        status = checkValueEndsWith(ruleValue, value);
        if (!status) {
            message = message + " " + ruleValue + "!";
        }
    }
    else if (IsArray(ruleValue)) {
        if (!ruleValue.length) {
            throw new Error(EMPTY_ARRAY);
        }
        // @ts-ignore
        status = ruleValue.filter(function (item) { return checkValueEndsWith(item, value); }).length;
        if (!status) {
            // @ts-ignore
            message = message + " " + ruleValue.join(",") + "!";
        }
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Get size
 * @param value
 */
function Size (value) {
    if (IsNumber(value)) {
        return Number(value);
    }
    return value.length;
}

function SizeMessage (value, key, operation) {
    var resolveOperation = operation === "min" ? "less" : "max";
    var message = "must be a " + operation + " " + value + " characters";
    if (IsArray(value)) {
        message = "must have " + operation + " " + value + " items.";
    }
    if (IsNumber(value)) {
        message = "cannot be " + resolveOperation + " than " + value + ".";
    }
    return Message(key, message);
}

/**
 * Validate minimum
 * @param ruleValue
 * @param value
 * @param key
 */
function Min (ruleValue, value, key) {
    var size = Size(value);
    var status = true, message = null;
    if (ruleValue && size < ruleValue) {
        status = false;
        message = SizeMessage(ruleValue, key, "min");
    }
    return {
        status: status,
        message: message
    };
}

/**
 * Validate minimum
 * @param ruleValue
 * @param value
 * @param key
 */
function Max (ruleValue, value, key) {
    var size = Size(value);
    var status = true, message = null;
    if (ruleValue && size > ruleValue) {
        status = false;
        message = SizeMessage(ruleValue, key, "max");
    }
    return {
        status: status,
        message: message
    };
}

function Phone (_, value, key) {
    var status = true, message = null;
    var testValue = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g.test(value);
    if (!testValue) {
        status = false;
        message = "Attribute " + key + " is not valid phone number.";
    }
    return {
        status: status,
        message: message
    };
}

var Methods = /** @class */ (function () {
    function Methods() {
        /**
         * @var
         * @protected
         */
        this.BAIL = "bail";
        /**
         * @var
         * @protected
         */
        this.EXCLUDE_IF = "excludeIf";
        /**
         * @var
         * @protected
         */
        this.methods = {
            Accepted: Accepted,
            After: After,
            AfterOrEqual: AfterOrEqual,
            Alpha: Alpha,
            Array: Array$1,
            Before: Before,
            BeforeOrEqual: BeforeOrEqual,
            Between: Between,
            Boolean: Boolean,
            Confirmed: Confirmed,
            Date: Date$1,
            DateEquals: DateEquals,
            DateFormat: DateFormat,
            Different: Different,
            Digits: Digits,
            DigitsBetween: DigitsBetween,
            Distinct: Distinct,
            Email: Email,
            EndsWith: EndsWith,
            Ipaddress: Ipaddress,
            Ipv4: Ipv4,
            Ipv6: Ipv6,
            Required: Required,
            Min: Min,
            Max: Max,
            Phone: Phone
        };
        /**
         * @var
         * @protected
         */
        this.excluded = [
            this.BAIL,
            this.EXCLUDE_IF
        ];
        /**
         * @var
         * @protected
         */
        this.changers = [
            this.EXCLUDE_IF
        ];
    }
    return Methods;
}());

/**
 * Check if value is function
 *
 * @param fnName
 */
function IsFunction (fnName) {
    return typeof fnName === "function";
}

/**
 * Validator class
 */
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    /**
     * Validator constructor
     * @param model
     */
    function Validator(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        return _this;
    }
    /**
     * Handle validation
     */
    Validator.prototype.handle = function () {
        if (!IsObject(this.model)) {
            throw new Error("Value is not object or null!");
        }
        if (IsObjectEmpty(this.model)) {
            throw new Error("Object cannot be empty!");
        }
        for (var key in this.model) {
            var model = this.model[key], value = model.value, rules = model.rules, errors = this.validateRules(key, value, rules);
            this.model[key]["errors"] = errors;
            if (this.bailExist(errors, rules)) {
                return this.handleResponse();
            }
        }
        return this.handleResponse();
    };
    /**
     * Validate rules
     * @param key
     * @param value
     * @param rules
     */
    Validator.prototype.validateRules = function (key, value, rules) {
        if (ArrayHasItems(rules)) {
            throw new Error("Rules must be defined!");
        }
        var tmpModel = [];
        for (var ruleKey in rules) {
            var ruleValue = rules[ruleKey], ruleFunctionName = this.resolveRuleName(ruleKey);
            if (!ruleFunctionName) {
                throw new Error("Value is not string!");
            }
            var ruleResolver = this.methods[ruleFunctionName];
            if (this.excluded.indexOf(ruleKey) !== -1) {
                if (!IsFunction(ruleResolver)) {
                    throw new Error(ruleFunctionName + " rule does not exists.");
                }
                var passes = ruleResolver(ruleValue, value, key, this.model);
                if (!passes.status) {
                    tmpModel = __spreadArray(__spreadArray([], tmpModel), [
                        passes.message
                    ]);
                }
            }
        }
        return tmpModel;
    };
    /**
     * Get all errors from model
     */
    Validator.prototype.getAllErrors = function () {
        var _a;
        var errors = {};
        for (var item in this.model) {
            var currentItem = this.model[item];
            if (!!currentItem.errors.length) {
                errors = __assign(__assign({}, errors), (_a = {}, _a[item] = currentItem.errors, _a));
            }
        }
        return errors;
    };
    /**
     * Check if model has errors
     */
    Validator.prototype.modelHasErrors = function () {
        return IsObjectEmpty(this.getAllErrors());
    };
    /**
     * Resolve rule name
     * @param name
     */
    Validator.prototype.resolveRuleName = function (name) {
        return UcFirst(name);
    };
    /**
     * @param errors
     * @param rules
     */
    Validator.prototype.bailExist = function (errors, rules) {
        if (errors.length > 0 && Isset(rules, this.BAIL)) {
            return this.handleResponse();
        }
        return {
            status: true,
            errors: [],
            model: this.model
        };
    };
    /**
     * Response
     */
    Validator.prototype.handleResponse = function () {
        return {
            status: this.modelHasErrors(),
            model: this.model,
            errors: this.getAllErrors()
        };
    };
    return Validator;
}(Methods));

/**
 * Validation class
 */
var Validation = /** @class */ (function () {
    /**
     * Validator constructor
     * @param object
     */
    function Validation(object) {
        this.object = object;
    }
    /**
     * Validate
     * @return Promise<any>
     */
    Validation.prototype.validate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var validator = (new Validator(_this.object)).handle();
            validator.status
                ? resolve(validator)
                : reject(validator);
        });
    };
    return Validation;
}());

function validate(object) {
    return (new Validation(object)).validate();
}

export { validate };
