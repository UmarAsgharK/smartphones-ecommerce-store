import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
    name: { type: String, required: true },
});

const Test = mongoose.model('Test', testSchema);

export default Test;
