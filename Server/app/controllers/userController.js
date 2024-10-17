// Student Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});


// Student Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).send('Login successful');
    } catch (error) {
        res.status(400).send('Error logging in');
    }
});



// Read Profile
app.get('/profile', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});



// Update Profile
app.put('/profile', authenticate, async (req, res) => {
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(400).send('Error updating profile');
    }
});
