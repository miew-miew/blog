const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur
      ref: "User", // Référence au modèle User
      required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default BlogModel