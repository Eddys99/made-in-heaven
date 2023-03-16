const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Eduard:admin@made-in-heaven.cavfxih.mongodb.net/made-in-heaven', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((response) => {
        console.log(`connected to MongoDB`);
    })
    .catch((error) => {
        console.error("couldn't connect to MongoDB: ", { error });
    })
