const { model, Schema, Types } = require("mongoose");

const storySchema = Schema({

    // 
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

const Story = model('Story', storySchema);
module.exports = { Story }