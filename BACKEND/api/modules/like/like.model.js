const { Schema, model } = require("mongoose");

const likeSchema = Schema({

}, { timestamp: true });

const Like = model('Like', likeSchema);
module.exports = { Like };

