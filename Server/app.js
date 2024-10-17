const connectDB = require('./config/config.js');

connectDB(); // Call the function to connect to the database

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
