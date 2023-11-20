import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true
    },    
}, { timestamps: true })

const userDb = mongoose.model('User', userSchema);
export default userDb;