const getUtil = require('src/commons/getUtil');

class FindByManyFields {
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
    }
}

module.exports = FindByManyFields;
