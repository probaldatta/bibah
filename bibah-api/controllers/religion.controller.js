const Religion = require('../models/religion.model');

exports.addReligion = async (req, res) => {
    try {
        if (req.body.name) {
            // Split the names by space if there are any spaces, otherwise treat it as a single name
            const namesArray = req.body.name.trim().split(/\s+/);

            if (namesArray.length === 1) {
                // If there's only one name, create a single religion
                const name = namesArray[0];
                let religion = await Religion.findOne({ name });

                if (religion) {
                    return res.status(400).json({ message: `Religion name "${name}" already exists` });
                } else {
                    religion = new Religion({
                        name,
                        active: req.body.active,  // Assuming active status is common for all religions
                    });

                    await religion.save();
                    res.status(201).json({ message: 'Religion created successfully', religion });
                }
            } else {
                // If there are multiple names, create multiple religions
                let createdReligions = [];
                let errors = [];

                for (let name of namesArray) {
                    // Check if the religion already exists
                    let religion = await Religion.findOne({ name });

                    if (religion) {
                        errors.push(`Religion name "${name}" already exists`);
                    } else {
                        // Create a new religion
                        religion = new Religion({
                            name,
                            active: req.body.active,  // Assuming active status is common for all religions
                        });

                        await religion.save();
                        createdReligions.push(name);
                    }
                }

                // Respond with the results
                if (createdReligions.length > 0) {
                    res.status(201).json({
                        message: 'Religions created successfully',
                        createdReligions
                    });
                }

                if (errors.length > 0) {
                    res.status(400).json({
                        message: 'Some religions were not created',
                        errors
                    });
                }

                if (createdReligions.length === 0 && errors.length === 0) {
                    res.status(400).json({ message: 'No valid religions to create' });
                }
            }
        } else {
            res.status(400).json({ message: 'Religion names are required' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.listReligions = async (req, res) => {
    try {
        const religions = await Religion.find().populate('caste');
        res.status(200).json(religions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getReligionById = async (req, res) => {
    try {
        const religion = await Religion.findById(req.params.id).populate('caste');
        if (!religion) {
            return res.status(404).json({ message: 'Religion not found' });
        }
        res.status(200).json(religion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateReligion = async (req, res) => {
    try {
        let religion = await Religion.findById(req.params.id);
        if (!religion) {
            return res.status(404).json({ message: 'Religion not found' });
        }
        religion = await Religion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(religion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteReligion = async (req, res) => {
    try {
        const religion = await Religion.findById(req.params.id);
        if (!religion) {
            return res.status(404).json({ message: 'Religion not found' });
        }
        await Religion.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Religion deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

