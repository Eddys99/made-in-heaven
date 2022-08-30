'use strict';

class NxDate {
    constructor(date = null, timezone = 'UTC', timezoneType = 3 ) {
        const _date = (date) ? date : new Date();

        this.setTimestamp(_date);
        this.setDate(_date);
        this.setTimezone(timezone);
        this.setTimezoneType(timezoneType, _date);
    }

    getTimestamp() {
        return this.timestamp;
    }

    getDate() {
        return this.date;
    }

    getTimezoneType() {
        return this.timezone_type;
    }

    getTimezone() {
        return this.timezone;
    }

    setTimestamp(date) {
        this.timestamp = date.getTime().toString();
    }

    setDate(date) {
        this.date = this.getDatePretty(date);
    }

    setTimezoneType(timezoneType, date) {
        this.timezone_type = (timezoneType)
            ? timezoneType
            : -(date.getTimezoneOffset() / 60);
    }

    setTimezone(timezone) {
        this.timezone = (timezone) ? timezone : 'UTC';
    }

    getDatePretty (date) {
        const _date = (date)
            ? date
            : new Date();

        let d = _date.toJSON()
            .replace('T', ' ')
            .replace('\.', '')
            .replace('Z', '');

        return d.slice(0, d.length - 3);
    }

    getTsToDateObj(ts) {
        const date = new Date(ts);

        return {
            timestamp: date.getTime().toString(),
            date: this.getDatePretty(date),
            timezone_type: 3,
            timezone: 'UTC'
        };
    }

    toObject() {
        return {
            timestamp: this.getTimestamp(),
            date: this.getDate(),
            timezone_type: this.getTimezoneType(),
            timezone: this.getTimezone()
        };
    }
}

module.exports = NxDate;
