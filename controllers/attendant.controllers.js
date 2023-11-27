const db = require('../database');
const qr = require('qr-image');

module.exports = {
    index: async (req, res, next) => {
        try {
            let { search } = req.query;

            let query = `SELECT users.id, users.full_name, locations.name AS location
            FROM users
            LEFT JOIN locations ON locations.id = users.location_id
            WHERE NOT users.is_admin`;
            if (search) query += ' AND users.full_name LIKE ?';

            const [results] = await db.query(query, search ? [`%${search}%`] : []);

            const domain = `${req.protocol}://${req.get('host')}`;
            results.map(r => {
                let id = r.id;
                r.qr_code = qr.imageSync(`${domain}/payments/${id}`, { type: 'png' }).toString('base64');
                r.id = r.id.toString().padStart(6, '0');
                return r;
            });

            res.json({
                status: true,
                message: 'OK',
                error: null,
                data: results
            });
        } catch (err) {
            next(err);
        }
    }
};