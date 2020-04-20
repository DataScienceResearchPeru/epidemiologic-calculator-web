# epidemiologic-calculator-web

## Installation

Start by updating the packages list by typing and install curl

```bash
$ sudo apt update && sudo apt install curl
```

Install nodejs using curl and apt package manager

```bash
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```
 
```bash
$ sudo apt install nodejs
```
To verify the installation execute the following command
```bash
$ node -v
$ npm -v
```

### Start project

- Clone repository and install dependencies:
    
```sh
$ git clone git@github.com:DataScienceResearchPeru/epidemiologic-calculator-web.git
$ cd epidemiologic-calculator-web
$ npm install
```

- Run application:
    
```sh
$ npm start
```

Open the browser at http://localhost:3000/
