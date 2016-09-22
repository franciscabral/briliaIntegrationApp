/**
 * Created by franc on 22/09/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    type: String,
    created: Date,
    id: String,
    url: String,
    response: String
});

module.exports = mongoose.model('Log', LogSchema);