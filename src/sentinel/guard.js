const Guard = require('../models/guard');
const { auth } = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const header_authorization = req.get('Authorization');
    if (header_authorization) {
        const token = header_authorization.split(' ')[1];
        try {
            const decoded_token = jwt.verify(token, auth.token);
            if (decoded_token) {
                const args = { person: decoded_token.person };
                const {
                rows: [person], 
                } = await Guard.person(args);
                if (person) {
                    req.person = { ...person };
                    return next();
                }
            }
        } catch (error) {
            return res.status(403).json({
                message: 'Unauthorized',
            });
        }
    }
    return res.status(403).json({
        message: 'Unauthorized',
    });
};