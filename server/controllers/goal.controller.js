const dbconn = require('../model/config');

const addOne = (req,res) => {
    const { userId ,amount , goalName , targetDate} = req.body;

    let sql = 'INSERT INTO goals (user_id, name, target_date, amount) VALUES (?, ?, ?, ?)';
    
    dbconn.query(sql , [ userId , goalName , targetDate , amount] , (err , result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
}

const latest = (req,res) => {
    const user_id = req.query.userId;
    let sql = 'SELECT name , amount FROM goals WHERE user_id = ?';
    dbconn.query(sql , user_id , (err,result) => {
        if(err) {
            console.log(err);
        }
        res.send(result)

    })
}
const getAll = (req, res) => {
    let sql = 'SELECT id, name , DATE(target_date) AS target_date, amount FROM goals';
    dbconn.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
}

module.exports = {
    addOne,
    latest,
    getAll
}