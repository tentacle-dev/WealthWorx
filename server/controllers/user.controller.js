const dbconn = require('../model/config');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
// Push this secret to ENV
const SECRET = 'ThanushWealthWorx01'

const createToken = ({id}) => {
  return jwt.sign({id} , SECRET)
}


const login = async (req,res) => {

  const {email, password} = req.body

  if(!email || !password){
    res.send({err : 'All fields must be entered'})
  } else {
    let sql = 'SELECT * FROM users WHERE email =  ? LIMIT 1'
    dbconn.query(sql, email, async (err,results) => {
      if (err) {
        res.send({err : "User not found" })
      } else {
        const match = await bcrypt.compare(password , results[0].password);
        if(match){
          console.log(match);
          const userId = results[0].id
          const username = results[0].username
          session = req.session;
          req.session.username = username;
          const token = jwt.sign({name : username, userId} , SECRET)
          res.send({msg : "User Found" , success:true , token})
        } else {
          res.send({err : "Invalid Email and/or Password"})
        }
      }
    }
    )
  }
}



const register = async (req,res) => {

  const {email , password , username} = await req.body;
  console.log(req.body);
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  
  if(!email || !password){

    return res.send({err:"All fields are required"});

  } else if(!validator.isEmail(email)){

    return res.send({err:"Email must be a valid email"});

  } else if(!validator.isStrongPassword(password)){

    return res.send({err:"Password is not strong enough"});

  } else {

    try {
      
      let sql = "SELECT * FROM users WHERE email = ?";

      dbconn.query(sql , email , (err,results) => {
        if (err) {
          alert('Error getting users' , err)

        } else if (results.length > 0) {

          return  res.send({err: "User already exists"})

        } else {

          let sql2 = "INSERT INTO users (email, password , username) VALUES (?,?,?)";

          dbconn.query(sql2 , [email, hashedPassword , username] , (err , result) => {

            if(err){

              return  res.send({err:"Error"})

            }
            lastInsertId = result.insertId
            const token = createToken({lastInsertId})

           return res.send({msg : "Registration Success" , success:true ,  token })

          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

 const getUsers = (req, res) => {
      try {
        dbconn.query('SELECT * FROM users', (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while retrieving users' });
          } else {
            res.json(results);
          }
        });
      } catch (error) {
        
      }
};

module.exports = {
    getUsers,
    login,
    register

}