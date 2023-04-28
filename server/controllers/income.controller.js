const dbconn = require('../model/config');

const addOne = (req,res) => {
    const { userId , amount , category , description , startdate , source , paymentMethod} = req.body;

    let sql = 'INSERT INTO incomes ( user_id , amount, category, description, payment_method, source , date) VALUES ( ?, ?, ?, ?, ? , ? , ?)';
    
    dbconn.query(sql , [userId , amount , category , description , paymentMethod , source , startdate] , (err , result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
}

const getSum = (req,res) => { 
    const user_id = req.query.userId;
    let sql = 'SELECT SUM(amount) AS sum FROM incomes WHERE user_id = ?';
    dbconn.query(sql , user_id , (err,result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
}
const getAll = (req,res) => {
    try {
    const user_id = req.query.userId;
    let sql = 'SELECT * FROM incomes WHERE user_id = ? ';
    dbconn.query(sql, [user_id] ,  (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    }
    )
    } catch (error) {
        console.log(error)
            
    }
}

module.exports = {
    addOne,
    getAll,
    getSum
}