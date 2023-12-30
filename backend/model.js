const mongoose = require('mongoose');



const categorySchema = new mongoose.Schema({
  name: String,
  infoList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Info' }],
});


const Category = mongoose.model('Category', categorySchema);

module.exports = { Info, Category };
