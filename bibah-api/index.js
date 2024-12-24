const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const authRoutes = require('./routes/auth.route');
const roleRoutes = require('./routes/role.route');
const languageRoutes = require('./routes/language.route');
const casteRoutes = require('./routes/caste.route');
const religionRoutes = require('./routes/religion.route');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI,{})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center">Hello World</h1>');
});

app.use('/api/account', authRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/language', languageRoutes);
app.use('/api/religion', religionRoutes);
app.use('/api/caste', casteRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});