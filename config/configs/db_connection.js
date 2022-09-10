const mongoose = require('mongoose');

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((response) => {
        console.log('connection successful');
    })
    .catch((error) => {
        console.log(error);
    })
