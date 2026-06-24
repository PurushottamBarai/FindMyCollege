// Middleware to check if the user is an admin
export const requireAdmin = (req, res, next) => {
    if (req.headers['x-admin-auth'] === 'true') {
        return next();
    }
    res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
};
