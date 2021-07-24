import moment from 'moment';

/**
 * Check array has items
 *
 * @param atc
 */
function ArrayHasItems (atc) {
    return !!atc.length;
}

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

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
 * Check if value is array
 *
 * @param atc
 */
function IsArray (atc) {
    return Array.isArray(atc);
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

/**
 * Check if value is boolean
 *
 * @param value
 */
function IsBoolean (value) {
    return typeof value === "boolean";
}

/**
 * Check if value is false
 *
 * @param value
 */
function IsFalsy (value) {
    return value === false || value === 'false';
}

/**
 * Check if value is true
 *
 * @param value
 */
function IsTruthy (value) {
    return value === true || value === 'true';
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

function Parse (value) {
    return JSON.parse(value);
}

/**
 * Clone value
 *
 * @param value
 */
function Clone (value) {
    return Parse(Stringify(value));
}

/**
 * Check if value is number
 *
 * @param value
 */
function IsNumber (value) {
    return typeof value === "number";
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

/**
 * Check if string is empty
 *
 * @param value
 */
function IsEmptyString (value) {
    return value === "";
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

/**
 * Check if value is function
 *
 * @param fnName
 */
function IsFunction (fnName) {
    return typeof fnName === "function";
}

/**
 * Check if value is undefined
 *
 * @param value
 */
function IsUndefined (value) {
    return typeof value === "undefined";
}

export { ArrayHasItems, Clone, DateFormats, GetDuplicatesFromArray, IsArray, IsBoolean, IsDate, IsEmptyString, IsFalsy, IsFunction, IsNull, IsNumber, IsObject, IsObjectEmpty, IsString, IsTruthy, IsUndefined, Isset, ObjectValues, Parse, Stringify, UcFirst };
