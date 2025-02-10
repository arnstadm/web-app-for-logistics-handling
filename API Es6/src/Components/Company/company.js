import db from '../../db/db.js';
import bcrypt from 'bcrypt';
const registerCompany = async (req, res) => {
    db.tx(async (t) => {
        const {
            body: { name },
            body: { erp_system },
            body: { first_name },
            body: { last_name },
            body: { password },
            body: { email },
            body: { phone_number },
        } = req;
        const company = {
            name: name,
            erp_system: erp_system,
        };
        const user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            user_level: 'Admin',
            phone_number: phone_number,
        };
        const id = await t.one(
            'INSERT INTO company (${this:name}) VALUES (${this:csv}) RETURNING company_id',
            company
        );
        user.password = await bcrypt.hash(password, 10);
        const userWithCompany = { ...user, company_id: id.company_id };
        return await t.none(
            'INSERT INTO users (${this:name}) VALUES (${this:csv})',
            userWithCompany
        );
    })
        .then((response) => {
            console.log('hei');
            return res.status(200).json({
                message: 'Bruker opprettet!',
                result: response,
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error: error,
                message: 'Kunne ikke registrere bedriften!',
            });
        });
};
module.exports = {
    registerCompany,
};
