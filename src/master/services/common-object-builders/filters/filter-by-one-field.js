class FilterByOneField {
    constructor(field, value) {
        this[field] = value;

        return this;
    }
}

module.exports = FilterByOneField;
