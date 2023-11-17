const db = require('../database.js');

function createUser(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    db.query(
        'INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, password],
        function (err, results) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Server error',
                    error: err.message,
                    data: null
                });
            }

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: null
            });
        }
    );
}

function getUsers(req, res) {
    db.query(
        'SELECT * FROM users',
        function (err, results) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Server error',
                    error: err.message,
                    data: null
                });
            }

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: results
            });
        }
    );
}

function getUserDetail(req, res) {
    var userId = req.params.id;

    db.query(
        'SELECT * FROM users WHERE id = ?', [userId],
        function (err, results) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Server error',
                    error: err.message,
                    data: null
                });
            }

            if (results.length === 0) {
                res.status(404).json({
                    status: false,
                    message: 'User not found',
                    error: null,
                    data: null
                });
            } else {
                res.json({
                    status: true,
                    message: 'OK',
                    error: null,
                    data: results[0]
                });
            }
        }
    );
}

function updateUser(req, res) {
    var userId = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    db.query(
        'UPDATE users SET name=?, email=?, password=? WHERE id=?', [name, email, password, userId],
        function (err, results) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Server error',
                    error: err.message,
                    data: null
                });
            }

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: null
            });
        }
    );
}

function deleteUser(req, res) {
    var userId = req.params.id;

    db.query(
        'DELETE FROM users WHERE id = ?', [userId],
        function (err, results) {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Server error',
                    error: err.message,
                    data: null
                });
            }

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: null
            });
        }
    );
}

module.exports = { createUser, getUsers, getUserDetail, updateUser, deleteUser };