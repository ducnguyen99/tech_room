const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    content: String,
    createdAt: { type: Date, default: Date.now },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Blog', blogSchema);