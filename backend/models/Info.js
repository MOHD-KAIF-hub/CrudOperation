const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
  name: String,
});
const Info = mongoose.model('Info', infoSchema);
module.exports  =Info;