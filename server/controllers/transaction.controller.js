const dbconn = require('../model/config');

const getSum = (req,res) => {
    const userId = req.query.userId
    let sql = 'SELECT SUM(amount) AS sumTransaction FROM transaction';
    dbconn.query(sql , (err,result) => {
        if(err){
            console.log(err);
        }
        res.send(result)
    })
}

const addOne = (req,res) => {
    console.log('Detected')
    
    const { userId , amount , category , description , startdate , source , paymentMethod} = req.body;
    let sql = 'INSERT INTO transaction (user_id , amount, category, description, payment_method, payee , date) VALUES (?, ? , ?, ?, ? , ? , ?)';
    
    dbconn.query(sql , [userId , amount , category , description , paymentMethod , source , startdate] , (err , result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
}
const getAll = (req, res) => {
    let sql = 'SELECT * FROM transaction';
    dbconn.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
}

module.exports = {
    addOne,
    getAll,
    getSum
}