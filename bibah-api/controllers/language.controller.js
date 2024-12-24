const Language = require('../models/language.model');

// Add Language function
exports.addLanguage = async (req, res) => {
    try {
        if (req.body.name) {
            // Split the names by space if there are any spaces, otherwise treat it as a single name
            const namesArray = req.body.name.trim().split(/\s+/);

            if (namesArray.length === 1) {
                // If there's only one name, create a single language
                const name = namesArray[0];
                let language = await Language.findOne({ name });

                if (language) {
                    return res.status(400).json({ message: `Language name "${name}" already exists` });
                } else {
                    language = new Language({
                        name,
                        active: req.body.active,  // Assuming active status is common for all languages
                    });

                    await language.save();
                    res.status(201).json({ message: 'Language created successfully', language });
                }
            } else {
                // If there are multiple names, create multiple languages
                let createdLanguages = [];
                let errors = [];

                for (let name of namesArray) {
                    // Check if the language already exists
                    let language = await Language.findOne({ name });

                    if (language) {
                        errors.push(`Language name "${name}" already exists`);
                    } else {
                        // Create a new language
                        language = new Language({
                            name,
                            active: req.body.active,  // Assuming active status is common for all languages
                        });

                        await language.save();
                        createdLanguages.push(name);
                    }
                }

                // Respond with the results
                if (createdLanguages.length > 0) {
                    res.status(201).json({
                        message: 'Languages created successfully',
                        createdLanguages
                    });
                }

                if (errors.length > 0) {
                    res.status(400).json({
                        message: 'Some languages were not created',
                        errors
                    });
                }

                if (createdLanguages.length === 0 && errors.length === 0) {
                    res.status(400).json({ message: 'No valid languages to create' });
                }
            }
        } else {
            res.status(400).json({ message: 'Language names are required' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.listLanguages = async (req, res) => {
    try {
        const languages = await Language.find();
        res.status(200).json(languages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).json({ message: 'Language not found' });
        }
        res.status(200).json(language);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateLanguage = async (req, res) => {
    try {
        let language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).json({ message: 'Language not found' });
        }
        language = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(language);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteLanguage = async (req, res) => {
    try {
        const language = await Language.findById(req.params.id);
        if (!language) {
            return res.status(404).json({ message: 'Language not found' });
        }
        await Language.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Language deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

