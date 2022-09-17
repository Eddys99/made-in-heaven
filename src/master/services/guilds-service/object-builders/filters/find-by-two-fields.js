class FindByTwoFields {
    constructor(fieldOne, fieldTwo, value) {
        this[fieldOne] = value[fieldOne];
        this[fieldTwo] = value[fieldTwo];

        return this;
    }
}

module.exports = FindByTwoFields;
