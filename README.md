# Epidemicalk Web

## Installation

Make sure that you have installed node 13.x.x or later.

It wil be better if you can handle your node versions with [nvm](https://github.com/nvm-sh/nvm).

Is mandatory to make the dependency handling with [yarn](https://yarnpkg.com/)

### A note before doing anything

If you have nvm here a trick to have yarn working globaly

```
nvm install 13.13.0
nvm use 13.13.0
npm install -g yarn
```

This will put yarn in the correct path to run directly from your terminal. Any other GLOBAL package must be installed with npm, BUT all project dependencies needs to be installed with yarn.

### Start project

```sh
git clone git@github.com:DataScienceResearchPeru/epidemiologic-calculator-web.git
```

Enter the project directory

```sh
 cd epidemiologic-calculator-web
```

Install all the dependencies

```sh
$ yarn install
```

Run project

```sh
$ yarn serve
```

Open the browser at `http://127.0.0.1:3000/`

### Environment variables!

Create and `.env` file according to the example in `.env.template`.

## Development and code quality

Every time you want to commit, you will have many error alerts.

Some of these errors will be easy to solve, you can do it automatically with

```
$ yarn lint --fix
```

Other errors will be more complex you will have to correct them manually before uploading your changes.
