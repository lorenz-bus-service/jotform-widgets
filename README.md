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

## Reference

- [Jotform Widget documentation](https://www.jotform.com/developers/widgets/)
- [Bootstrap Autocomplete](https://bootstrap-autocomplete.readthedocs.io/en/latest/)
- [jQuery.ajax()](https://api.jquery.com/Jquery.ajax/)
