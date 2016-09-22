/**
 * Created by franc on 22/09/2016.
 */
/**
 * Created by franc on 20/09/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    type: String,
    created: Date,
    data: Object,
    url: String,
    response: String
});

module.exports = mongoose.model('Log', LogSchema);