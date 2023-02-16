# jotform-widgets
HTML and JavaScript files to be used as Jotform widgets

## Configuration

### ensure that USER variable exists

```bash
printenv
```

### create HOST variable

```bash
export HOST=jotform.domain.com
```

### copy the deployment script to server

```bash
DIRECTORY=~
scp ./deploy.sh ${USER}@${HOST}:${DIRECTORY}
```

###

```bash
# ssh to the server
ssh ${USER}@${HOST}

# make file executable
chmod +x ./deploy.sh
```

## Usage

### Run the publish task to copy the files to the server then run the deployment script

```bash
make pub
```

## Nginx

`/etc/nginx/sites-available/jotform.lorenzbus.com`:

```
location / {
    # First attempt to serve request as file, then                
    # as directory, then fall back to displaying a 404.
    proxy_pass http://127.0.0.1:3000/;
}
```

## Reference

- [Jotform Widget documentation](https://www.jotform.com/developers/widgets/)
- [Bootstrap Autocomplete](https://bootstrap-autocomplete.readthedocs.io/en/latest/)
- [Bootstrap Autocomplete (github)](https://github.com/xcash/bootstrap-autocomplete)
- [jQuery.ajax()](https://api.jquery.com/Jquery.ajax/)
- [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [NodeJS CORS Guide: What It Is and How to Enable It](https://www.stackhawk.com/blog/nodejs-cors-guide-what-it-is-and-how-to-enable-it/)
- [How to Deploy a Node.js App – From Server Setup to Production](https://www.freecodecamp.org/news/deploy-nodejs-app-server-to-production/)
- [How to use Nginx as a reverse proxy for a Node.js server](https://blog.logrocket.com/how-to-run-a-node-js-server-with-nginx/)