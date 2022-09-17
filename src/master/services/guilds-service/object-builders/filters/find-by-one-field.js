class FindByOneField {
    constructor(field, value) {
        this[field] = value;

        return this;
    }
}

module.exports = FindByOneField;
