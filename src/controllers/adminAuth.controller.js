export const login = (req, res, next) => {
    try {
        const { username, password } = req.body;

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
            return res.status(500).json({ success: false, message: 'Admin credentials not configured in environment' });
        }

        if (username === adminUsername && password === adminPassword) {
            return res.json({ success: true, message: 'Admin login successful' });
        }

        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    } catch (error) {
        next(error);
    }
};
