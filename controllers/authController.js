const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Mock user
    const mockUser = {
        username: 'admin',
        password: await bcrypt.hash('password123', 10)
    };

    if (username !== mockUser.username) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, mockUser.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};

module.exports = { loginUser };
