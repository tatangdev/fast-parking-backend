const db = require('../database');

module.exports = {
    create: async (req, res, next) => {
        try {
            let { name, tags } = req.body;

            let result = await db.query('INSERT INTO locations (name, tags) VALUES (?,?)', [name, tags.join(',')]);
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

    index: async (req, res, next) => {
        try {
            let { search } = req.query;

            let rows = []
            if (search) {
                [rows] = await db.query("SELECT * FROM locations WHERE tags LIKE ?", [`%${search}%`]);
            } else {
                [rows] = await db.query("SELECT * FROM locations");
            }
            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: rows
            });
        } catch (err) {
            next(err);
        }
    }
};