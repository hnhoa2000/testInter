import mongoose from "mongoose";

const uri = process.env.MONGO_URL;
//mongoose.set('strictQuery', false);
async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successly!!!!');
    } catch (error) {
        console.log(error);
    }
}

export default { connect };