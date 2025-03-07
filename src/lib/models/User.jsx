const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: String
})

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel