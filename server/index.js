const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express()

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use(cookieParser());
app.use(cors()); 
const userRoutes =  require('./routes/user.routes') 
const incomeRoutes =  require('./routes/income.routes') 
const transactionRoutes =  require('./routes/transaction.routes') 
const goalRoutes =  require('./routes/goal.routes') 

app.use(express.json());
app.use(userRoutes);
app.use(incomeRoutes);
app.use(transactionRoutes);
app.use(goalRoutes);

app.listen(3003, () => {
  console.log('Example app listening on port 3003!')
})