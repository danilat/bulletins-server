var mongoose = require('mongoose');
module.exports = mongoose.model('Bulletin', { name: String, body: String, created_at: Date});