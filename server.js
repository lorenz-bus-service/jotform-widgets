/*
## Installation
npm install --save express express-request-proxy

## Reference
- https://github.com/dvonlehman/express-request-proxy
*/

const express = require('express');

let requestProxy = require("express-request-proxy");

const app = express();
app.use(express.json());

app.get('/widgets/find_employee', (req, res) => {
    res.sendFile(`${__dirname}/widgets/com.bamboohr.find_employee.html`)
});

app.get('/api', (req, res) => {
    res.send('API root');
});

app.get("/api/employees", 
    requestProxy({
        // cache: redis.createClient(),
        // cacheMaxAge: 60,
        url: `https://api.bamboohr.com/api/gateway.php/${process.env.BAMBOOHR_API_SUBDOMAIN}/v1/employees/directory`,
        headers: {
            Accept: 'application/json',
            Authorization: "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
        }
    })
);

app.listen(3000, 'localhost', () => {
  console.log('Service running at http://localhost:3000');
});
