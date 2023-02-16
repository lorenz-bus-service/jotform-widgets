/*

## Installation
npm install --save express http-proxy-middleware morgan

## Dependencies
- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/http-proxy-middleware
- https://www.npmjs.com/package/morgan

*/

const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = 3000
const HOST = 'localhost'

const app = express();
app.use(express.json());
// logging
app.use(morgan('dev'));

app.get('/widgets/find_employee', (req, res) => {
    res.sendFile(`${__dirname}/widgets/com.bamboohr.find_employee.html`)
});

app.get('/api', (req, res) => {
    res.send('API root');
});

app.use("/api/bamboohr", 
    createProxyMiddleware({
        target: `https://api.bamboohr.com/api/gateway.php/${process.env.BAMBOOHR_API_SUBDOMAIN}/v1`,
        changeOrigin: true,
        headers: {
            Accept: 'application/json',
            Authorization: "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
        },
        pathRewrite: {
            [`^/api/bamboohr`]: '',
        },    
    })
);

app.listen(PORT, HOST, () => {
    console.log(`Service running at http://${HOST}:${PORT}`);
});
