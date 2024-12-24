const mongoose = require('mongoose');

const subcasteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  active: {
    type: Boolean,
    required: true,
  },
  parentCaste: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caste',
  },
}, { timestamps: true });

const Subcaste = mongoose.model('Subcaste', subcasteSchema);
module.exports = Subcaste;