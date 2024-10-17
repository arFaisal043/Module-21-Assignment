const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, 'secretKey');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};
