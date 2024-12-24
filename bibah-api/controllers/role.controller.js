
const Role = require('../models/role.model');

exports.addRole = async (req, res) => {
    try {
        if(req.body.name){
            let role = await Role.findOne({ name: req.body.name });
            if (role) {
                return res.status(400).json({ message: 'Role already exists' });
            }else{
                role = new Role({
                    name: req.body.name
                });
                await role.save();
                res.status(201).json({ message: 'Role created successfully' });
            }
        }
        
    } catch (err) {
        res.status(500).send('Server error');
    }
};


