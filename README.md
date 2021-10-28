# API integration tests with postman_TODOIST

It covers the API integration tests.

## Tools to Automate

* Postman + Newman

### Prerequisites

* Nodejs
* NPM

### Setting up

Clone the repository and run the following command in order to install the dependencies:

```
npm install
```

## Running the tests for API Test:

Go to the `package.json` and search for the api/newman scripts (i.e. api-tests). In order to run them you can use npm as follows:

```
npm run api-tests
```

You will see the postman/newman execution in the console showing a result of the tests passing or failing and; a log error message in case of failing and the passing tests as well.
