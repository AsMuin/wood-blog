import mongoose from 'mongoose';

let isConnected = false; // 标记连接状态

async function connectToMongoDB() {
    try {
        if (isConnected) {
            console.log('Using existing database connection');
            return Promise.resolve();
        }
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB🙌');
            isConnected = true;
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`);
    } catch (err) {
        console.error(err);
    }
}
export default connectToMongoDB;
