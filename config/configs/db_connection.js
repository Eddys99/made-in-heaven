const mongoose = require('mongoose');

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((response) => {
        console.log(`connected to MongoDB: `, { response });
    })
    .catch((error) => {
        console.error("couldn't connect to MongoDB: ", { error });
    })
