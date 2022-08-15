const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Eduard:1999RONAV@made-in-heaven.z8gfmkw.mongodb.net/made-in-heaven?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((response) => {
    console.log('connection successful');
}).catch((error) => {
    console.log(error);
})
