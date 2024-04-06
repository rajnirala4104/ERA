const { model, Schema, Types } = require("mongoose");

//story schema
const storySchema = Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        require: true
    },
    caption: {
        type: String,
        lowercase: true
    }
}, { timestamps: true }
);

//story model
const Story = model('Story', storySchema);
module.exports = { Story }