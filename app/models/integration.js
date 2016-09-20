/**
 * Created by franc on 20/09/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntegrationSchema = new Schema({
    type: String,
    created: Date,
    data: Object
});

module.exports = mongoose.model('Integration', IntegrationSchema);