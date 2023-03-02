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

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
// logging
app.use(morgan('dev'));

// app.use((req, res, next) => {
    
//     console.log('method:',req.method);
//     console.log('url:',req.url);
//     console.log('headers:')
//     Object.keys(req.headers).forEach( k => console.log(`\t${k}:`, req.headers[k]) );

//     next();
// });

app.get('/api', function (req, res) {
    return res.send("/api");
})

/*
https://bootstrap-autocomplete.readthedocs.io/en/latest/index.html
https://raw.githack.com/xcash/bootstrap-autocomplete/master/dist/latest/index.html
*/
/*
                <select class="form-select" id="selectEmployeeName" placeholder="Type the employee's name..." autocomplete="off">
                    <option>Choose an employee</option>
                    <% employees.forEach(function(employee) { %>
                        <option value="<%= employee.id %>" data-first-name="<%= employee.firstName %>" data-last-name="<%= employee.lastName %>"><%= employee.displayName %></option>
                    <% }); %>
                </select>

app.get('/widgets/find_employee', (req, res) => {

    // make async call to BambooHr's API
    (async () => {

        // console.log('headers',req.headers)

        // return UNAUTHORIZED [401] if the request is missing the x-bamboohr-subdomain or x-bamboohr-api-key headers
        // if (!req.headers['companydomain'] ) {
        //     res.status(401).send({message: 'missing subdomain'});
        // }
        // else if (!req.headers['apikey'] ) {
        //     res.status(401).send({message: 'missing API key'});
        // }

        // const url = `https://api.bamboohr.com/api/gateway.php/${ req.headers['companydomain'] }/v1/employees/directory`
        const url = `https://api.bamboohr.com/api/gateway.php/${ process.env.BAMBOOHR_API_SUBDOMAIN }/v1/employees/directory`
        const headers = {
            Accept: 'application/json',
            // Authorization: "Basic " + Buffer.from(req.headers['apikey'] + ":password").toString('base64')
            Authorization: "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
        }

        const bhr =  await fetch(url, { method: 'GET', headers: headers})

        if (bhr.ok) {
            const data = await bhr.json();

            res.render(`${__dirname}/widgets/com.bamboohr.find_employee.ejs`, {employees: data.employees})
        }

    })()

});
*/

app.get('/widgets/find_employee', (req, res) => {
    res.sendFile(`${__dirname}/widgets/com.bamboohr.find_employee.html`)
    // res.render(`${__dirname}/widgets/com.bamboohr.find_employee.ejs`)
});

app.get('/widgets/find_places', (req, res) => {
    res.sendFile(`${__dirname}/widgets/com.google.find_places.html`)
});

app.get('/widgets/full_name', (req, res) => {
    res.sendFile(`${__dirname}/widgets/com.lorenzbus.full_name.html`)
});

/*
Querystrings:
    q - the text to use to filter the displayName
*/
/*
app.get('/employees/directory', (req, res) => {

    // https://stackoverflow.com/questions/25462717/cache-control-for-dynamic-data-express-js#25464645
    // const age = 5 * 60 // five minutes as seconds
    // res.set('Cache-Control', `public, max-age=${age}`);

    // make async call to BambooHr's API
    (async () => {

        const url = `https://api.bamboohr.com/api/gateway.php/${ process.env.BAMBOOHR_API_SUBDOMAIN }/v1/employees/directory`
        const headers = {
            Accept: 'application/json',
            Authorization: "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
        }

        console.log('/data/employees.json/fetch()')
        const bhr =  await fetch(url, { method: 'GET', headers: headers})

        if (bhr.ok) {
            const data = await bhr.json();

            console.log("req.query['q']",req.query['q'])
            const filtered = data.employees.filter( e => e.displayName.toLowerCase().includes(req.query['q'].toLowerCase()) );

            res.status(200).json(filtered)
        }

    })()

});
*/

/*
// use if there are multiple, distinct /api/bamboohr endpoints
app.use("/api/bamboohr*", (req, res, next) => {

    console.log('***** /api/bamboohr* *****')

    // return UNAUTHORIZED [401] if the request is missing the x-bamboohr-subdomain or x-bamboohr-api-key headers
    if (!req.headers['x-bamboohr-subdomain'] ) {
        res.status(401).send({message: 'missing subdomain'});
    }
    else if (!req.headers['x-bamboohr-api-key'] ) {
        res.status(401).send({message: 'missing API key'});
    }

    // process the next middleware
    next();
});
*/

app.use("/api/bamboohr", 
    createProxyMiddleware({
        // target: `https://api.bamboohr.com/api/gateway.php/${process.env.BAMBOOHR_API_SUBDOMAIN}/v1`,
        target: `https://api.bamboohr.com/api/gateway.php/dummy/v1`,
        changeOrigin: true,
        headers: {
            Accept: 'application/json',
            // Authorization: "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
        },
        pathRewrite: {
            [`^/api/bamboohr`]: '',
        },
        router: function(req) {
            console.log('***** router *****')
            console.log('x-bamboohr-subdomain',req.headers['x-bamboohr-subdomain'])

            // modify the target to include the subdomain
            // const target = `https://api.bamboohr.com/api/gateway.php/${process.env.BAMBOOHR_API_SUBDOMAIN}/v1`;
            const target = `https://api.bamboohr.com/api/gateway.php/${req.headers['x-bamboohr-subdomain']}/v1`;
            console.log('target:',target);
            return target;
        },
        onProxyReq(proxyReq, req, res) {

            console.log('***** onProxyReq *****');

            // log the request
            // Object.keys(req.headers).forEach( k => console.log(`${k}:`, req.headers[k]) );

            // return UNAUTHORIZED [401] if the request is missing the x-bamboohr-subdomain or x-bamboohr-api-key headers
            if (!req.headers['x-bamboohr-subdomain'] ) {
                res.status(401).send({message: 'missing subdomain'});
            }
            else if (!req.headers['x-bamboohr-api-key'] ) {
                res.status(401).send({message: 'missing API key'});
            }
        
            // add an authorization header
            // const authorization = "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
            const authorization = "Basic " + Buffer.from(req.headers['x-bamboohr-api-key'] + ":password").toString('base64')
            console.log('authorization:',authorization)
            proxyReq.setHeader('Authorization', authorization);

        },
        selfHandleResponse: true, // so that the onProxyRes takes care of sending the response
        onProxyRes: function(proxyRes, req, res) {
            console.log('***** onProxyRes *****');

            let body = [];
            proxyRes.on('data', function(data) {
                body.push(data);
            });
            proxyRes.on('end', function() {
                // create JSON from raw
                data = JSON.parse(Buffer.concat(body).toString());
                
                // filter the employees node
                // const employees = req.query['q'] ? data.employees.filter( e => e.displayName.toLowerCase().includes(req.query['q'].toLowerCase()) ) : data.employees;

                // return the employees
                res.status(200).json(data.employees);
            });
        }
    })
);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});