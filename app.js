const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');


const app = express();
let accesstoken = '';
let requestId = '';

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let temp=[];
app.get('/getJWTtokens', (req, res) => {
  console.log("Processing request to get JWT tokens");
  const {requestId}=req.query;
  console.log(requestId);

  if(temp.length==0){
    throw new Error('Cannot divide by zero');
  }
  
  const foundObj = temp.find(obj => obj.requestId === requestId);
console.log(temp);
if (foundObj) {
  // print("milgya ");
  const phone = foundObj.user.phone;
  const userId = foundObj.user.userId;
  const response = {
    type: 'success',
  };
  
  

 
  response.user={
      id: 24979,
      full_name: 'Abhinav Sahai',
      email: 'sahai.abhinav99@gmail.com',
      phone: '919667863831',
      truecaller_request_id: 'fc34179d-63ae-4ba1-ac48-90981d6d58b3',
    
  };
  // Check if the user's updated_at is not more than 10 minutes ago
  
  const token = jwt.sign(
    {
      userId: userId,
      phoneNumber: phone,
    },
    'shhhhh',
    {
      expiresIn: '900s',
    }
  );
  //generate refreshToken
  const refreshToken = jwt.sign(
    {
      userId: userId,
      phoneNumber: phone,
    },
    'shhhhh',
    {
      expiresIn: '1080h',
    }
  );
  response.user.token = token;
  response.user.refreshToken = refreshToken;

  // response.user.vehicles = await getVehiclesFromDb(response.user.id);

  return res.json(response);

  // Do something with phone and userId
}
return res.json({'error':"ygdgchvcf"});

  
});

// Truecaller callback endpoint
app.post('/truecaller', (req, res) => {
  // get the access token from the request body
  try {
    const { accessToken, requestId } = req.body;
    console.log(req.body);
    // if (!accessToken) {
    //   return next(createError(400, 'accessToken missing'));
    // }
    // if (!requestId) {
    //   return next(createError(400, 'requestId missing'));
    // }
    temp.push({requestId:requestId,user:{userId:24979,phone:9667863831}});
    
    res.json({ type: 'success' });
  } catch (err) {
    console.error(err);
  }

  
});







app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});
