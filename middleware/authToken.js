const jwt = require('jsonwebtoken');
const pool=require("../db/conn")

const authenticateToken = (req, res, next) => {
    
    const token=req.cookies.token;
    

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.SECRET_KEY, async(err, user) => {
        if (err){ 
            return res.status(403).json({ error: 'Invalid token' });}
            try {
                const sql = 'SELECT token FROM users WHERE user_id = ?';
                const [rows] = await pool.execute(sql, [user.user]);
                if (rows.length === 0 || rows[0].token !== token) {
                    return res.status(403).json({ error: 'Invalid token' });
                }
    
                req.user = user;
                next();
            } catch (error) {
                return res.status(500).json({ error: 'Database error' });
            }
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = {authenticateToken,authorizeAdmin};