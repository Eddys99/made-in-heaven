const getUtil = require('src/commons/getUtil');

class FilterByManyFields {
    constructor(data) {
        if (getUtil.isObjectWithKeys(data)) {
            for (const property in data) {
                this[property] = data[property];
            }
        } else if (getUtil.isArrayWithItems(data)) {
            data.forEach((element, index) => {
                this[element] = data[index];
            });
        }

        return this;
    }
}

module.exports = FilterByManyFields;
