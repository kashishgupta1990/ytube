# It's yTube just like a youtube #

It's build just for learning purpose.

#### Try Now [yTube Application](http://ytube.kashishgupta.in) ####

### Prerequisite ##

- `NodeJs v4.x` and above required.

## Installation ##

This library is available for **Node v4** and above. See the installation steps below:

### Download(GIT) ###
```bash
$ git clone git@github.com:kashishgupta1990/ytube.git
```
### NPM Install(npm) ###
```bash
$ npm install
$ node app.js (By Default you can see server running on Address http://localhost:8899)
```

### Bower Install ###
```bash
$ bower install
```

# Cloud Platform Support ##

We support `Heroku` cloud platform as a service (PaaS). It's very easy to deploy on `Heroku` server just update your application `config.json` file with appropriate environment name, server, cookies and database settings. Finally push your code to heroku `master` branch rest will automatically done by `Heroku`.

# Docker Support #

We support `Docker` Container as a service (CaaS). It's very easy to build the `Hapi Api Boilerplate` docker image with updated codebase and run the container on any type production environment.

#### Step-1 Create docker image ####

To create docker image we need to run simple docker command `docker build -t kashishgupta1990/hapiapi . `. Here `kashishgupta1990/hapiapi` is the name of the image you can the change the image name on your own. This command use the `Dockerfile` present in `root` folder of the project and build the `Docker Image` of current project state.
 ```bash
 docker build -t kashishgupta1990/hapiapi .
 ```

#### Step-2 Test the docker container ####

To test the newly created docker image, we need to execute the command `docker run --name "hapiapi" -p 9999:9999  kashishgupta1990/hapiapitest`. This will create `docker container` and you can test your `Docker Image` via just check the server listening on PORT: `9999`. If `YES` then your did well :) 
```bash
docker run --name "hapiapitest" -p 9999:9999  kashishgupta1990/hapiapitest
```
#### Step-3 Execute the docker container on background ####

Run the command to execute on background `docker run -d --name "hapiapi" -p 9999:9999  kashishgupta1990/hapiapitest`
```bash
docker run -d --name "hapiapiprod" -p 9999:9999  kashishgupta1990/hapiapitest
```

#### Step-4 Check the docker container `LOGS` ####

- Check the existing container running on system
```bash
docker ps -a
```
- Select the CONTAINER ID / NAMES (look like -> aea8bf1d2562) and copy it. Run the following command. It will return you container terminal.
```bash
docker exec -it hapiapi /bin/bash
```
```bash
docker exec -it aea8bf1d2562 /bin/bash
```
- Type command: `pm2 logs`
```bash
pm2 logs
```

## Lets Build Together ##

Just open an issue in case found any bug(There is always a scope of improvement). We are always open for suggestion / issue / add new feature request. Fork and start creating pull request. :-)
