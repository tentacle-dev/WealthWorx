const dbconn = require('../model/config');

const addOne = (req,res) => {
    console.log('Detected')
    const { amount , category , description , startdate , source , paymentMethod} = req.body;

    let sql = 'INSERT INTO budget (amount, category, description, payment_method, source , date) VALUES (?, ?, ?, ? , ? , ?)';
    
    dbconn.query(sql , [amount , category , description , paymentMethod , source , startdate] , (err , result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
        console.log(result)
    })
}

const getAll = (req,res) => {
    let sql = 'SELECT * FROM income';
    dbconn.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);            
        }
    }
    )
}

module.exports = {
    addOne,
    getAll
}