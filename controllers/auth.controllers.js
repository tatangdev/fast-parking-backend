const db = require('../database');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
    register: async (req, res, next) => {
        try {

            let { full_name, mobile, location_id, gender, password, is_admin } = req.body;

            var [rows] = await db.query('SELECT * FROM users WHERE full_name=?', [full_name]);
            if (rows.length > 0) {
                return res.status(400).json({
                    status: false,
                    message: 'bad request',
                    error: 'email already exist',
                    data: null
                });
            }

            var results = await db.query('INSERT INTO users (full_name, mobile, location_id, gender, password, is_admin) VALUES (?,?,?,?,?,?)', [full_name, mobile, location_id, gender, password, is_admin]);
            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: {
                    user_id: results[0].insertId.toString().padStart(6, '0')
                }
            });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            let { user_id, password } = req.body;

            var [users] = await db.query('SELECT * FROM users WHERE id=?', [parseInt(user_id, 10)]);
            if (users.length == 0) {
                return res.status(400).json({
                    status: false,
                    message: 'bad request',
                    error: 'user not registered',
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

            users[0].id = user_id
            var token = jwt.sign(users[0], JWT_SECRET_KEY);

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: { token }
            });
        } catch (err) {
            next(err);
        }
    },

    whoami: async (req, res) => {
        res.json({
            status: true,
            message: 'OK',
            error: null,
            data: req.user
        });
    }
};