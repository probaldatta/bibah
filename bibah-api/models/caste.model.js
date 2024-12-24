const mongoose = require('mongoose');

const casteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  active: {
    type: Boolean,
    required: true,
  },
  parentReligion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Religion',
  },
  subCaste: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcaste',  // Reference should be 'Subcaste', not 'subCaste'
    }
  ],
}, { timestamps: true });

const Caste = mongoose.model('Caste', casteSchema);
module.exports = Caste;