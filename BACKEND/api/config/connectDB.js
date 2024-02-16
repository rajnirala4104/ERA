const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongo has connected - ${connection.connection.host}`.blue);
    } catch (e) {
        console.log(`Oops!! something went wrong,  - ${e.message}`.red.bold);
        process.exit();
    }
};

module.exports = connectDatabase;