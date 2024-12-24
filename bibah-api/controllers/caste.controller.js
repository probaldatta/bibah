const Caste = require('../models/caste.model');
const Religion = require('../models/religion.model');  // Assuming your Religion model is in models/Religion.js

exports.addCaste = async (req, res) => {
    try {
        if (req.body.name && req.body.religionId) {
            // Split the names by space to create an array of caste names
            const namesArray = req.body.name.trim().split(/\s+/); // Split by space, trimming extra spaces
            const religionId = req.body.religionId;  // The religion ID to associate the caste with

            // Check if the religion exists
            let religion = await Religion.findById(religionId);
            if (!religion) {
                return res.status(404).json({ message: 'Religion not found' });
            }

            let createdCastes = [];
            let errors = [];

            // Process each caste name in the namesArray
            for (let name of namesArray) {
                // Check if the caste already exists
                let caste = await Caste.findOne({ name });

                if (caste) {
                    errors.push(`Caste name "${name}" already exists`);
                } else {
                    // If caste doesn't exist, create a new one
                    caste = new Caste({
                        name,
                        active: req.body.active,  // Assuming active status is passed in the request
                        parentReligion: religionId
                    });

                    await caste.save();  // Save the caste

                    // Add the caste ID to the religion's caste array
                    religion.caste.push(caste._id);
                    createdCastes.push(caste._id);
                }
            }

            // Save the updated religion with new caste(s)
            await religion.save();

            // Respond with the results
            if (createdCastes.length > 0) {
                res.status(201).json({
                    message: 'Castes created and added to religion successfully',
                    createdCastes
                });
            }

            if (errors.length > 0) {
                res.status(400).json({
                    message: 'Some castes were not created',
                    errors
                });
            }

            if (createdCastes.length === 0 && errors.length === 0) {
                res.status(400).json({ message: 'No valid castes to create' });
            }
        } else {
            res.status(400).json({ message: 'Religion ID and caste names are required' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.listCastes = async (req, res) => {
  try {
      const Castes = await Caste.find();
      res.status(200).json(Castes);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};

exports.updateCaste = async (req, res) => {
    console.log(req.body);
    try {
        const { casteId, newName } = req.body; // Get casteId and new name from request body

        // Validate the request body
        if (!casteId || !newName) {
            return res.status(400).json({ message: 'Caste ID and new name are required' });
        }

        // Find the caste by ID
        let caste = await Caste.findById(casteId);
        if (!caste) {
            return res.status(404).json({ message: 'Caste not found' });
        }

        // Check if the new caste name already exists
        let existingCaste = await Caste.findOne({ name: newName });
        if (existingCaste) {
            return res.status(400).json({ message: `Caste name "${newName}" already exists` });
        }

        // Update the caste name
        caste.name = newName;
        await caste.save(); // Save the updated caste

        res.status(200).json({
            message: 'Caste updated successfully',
            caste
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.deleteCaste = async (req, res) => {
    console.log(req.body);
    try {
        const { casteId, religionId } = req.body; // Get casteId and religionId from request body

        // Validate the request body
        if (!casteId || !religionId) {
            return res.status(400).json({ message: 'Caste ID and Religion ID are required' });
        }

        // Find the caste by ID
        let caste = await Caste.findById(casteId);
        if (!caste) {
            return res.status(404).json({ message: 'Caste not found' });
        }

        // Find the religion by ID
        let religion = await Religion.findById(religionId);
        if (!religion) {
            return res.status(404).json({ message: 'Religion not found' });
        }

        // Remove the caste from the religion's caste array
        religion.caste = religion.caste.filter(casteId => casteId.toString() !== casteId);

        // Save the updated religion
        await religion.save();

        // Delete the caste
        await caste.remove();

        res.status(200).json({
            message: 'Caste deleted and removed from religion successfully'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.getCasteByReligionId = async (req, res) => {
    try {
        const { religionId } = req.params; // Get religionId from request params

        // Validate the request
        if (!religionId) {
            return res.status(400).json({ message: 'Religion ID is required' });
        }

        // Find the religion by ID
        let religion = await Religion.findById(religionId).populate('caste');
        if (!religion) {
            return res.status(404).json({ message: 'Religion not found' });
        }

        // Return the castes associated with the religion
        res.status(200).json({
            message: 'Castes retrieved successfully',
            castes: religion.caste
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
