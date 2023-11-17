const db = require('../database');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res, next) => {
        try {
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;

            var [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);
            if (rows.length > 0) {
                return res.status(400).json({
                    status: false,
                    message: 'bad request',
                    error: 'email already used',
                    data: null
                });
            }

            var result = db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password]);
            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: result
            });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            var email = req.body.email;
            var password = req.body.password;

            var [users] = await db.query('SELECT * FROM users WHERE email=?', [email]);
            if (users.length == 0) {
                return res.status(400).json({
                    status: false,
                    message: 'bad request',
                    error: 'email not registered',
                    data: null
                });
            }

            if (users[0].password !== password) {
                return res.status(400).json({
                    status: false,
                    message: 'bad request',
                    error: 'wrong password',
                    data: null
                });
            }

            var token = jwt.sign(users[0], 'nayla');

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: { token }
            });
        } catch (err) {
            next(err);
        }
    }
};