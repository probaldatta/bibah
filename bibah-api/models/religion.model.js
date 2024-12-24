const mongoose = require('mongoose');

const religionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    caste: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Caste',
        }
    ],
}, { timestamps: true });

const Religion = mongoose.model('Religion', religionSchema);
module.exports = Religion;