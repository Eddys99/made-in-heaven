const mongoose = require('mongoose');
const Logger = require('src/commons/logger/logger-config');

mongoose.connect('mongodb+srv://Eduard:1999RONAV@made-in-heaven.cavfxih.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((response) => {
        Logger.info(`connected to MongoDB: `, response);
    })
    .catch((error) => {
        Logger.error("couldn't connect to MongoDB: ", error);
    })
