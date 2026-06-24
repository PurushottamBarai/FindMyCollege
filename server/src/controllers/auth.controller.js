import User from '../models/users.model.js';

export const login = async (req, res, next) => {
    try {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail || !password) {
            return res.status(400).json({ success: false, message: 'Username/email and password are required' });
        }

        const lowered = usernameOrEmail.toLowerCase();
        const user = await User.findOne({
            password,
            $or: [{ email: lowered }, { username: lowered }]
        });

        if (user && user.role === 'user') {
            return res.json({ success: true, message: 'User login successful', role: 'user' });
        }

        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!password || !pwRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters, include uppercase, lowercase, and a number.'
            });
        }

        const loweredEmail = email.toLowerCase();
        const existing = await User.findOne({ email: loweredEmail });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        const user = new User({
            email: loweredEmail,
            password,
            username: loweredEmail,
            role: 'user'
        });
        await user.save();

        return res.json({ success: true, message: 'Registration successful. You can login now.' });
    } catch (error) {
        next(error);
    }
};
