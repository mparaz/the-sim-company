The SIM Company - Cart
======================

By: Miguel Paraz 

Requirements
------------
* Node.js 6 LTS. Developed using `6.11.1`.

Running
-------
* `npm install` to download external Node.js modules the first time.
* `npm start` to run.

Development
-----------
* `npm test` to run tests.
* Travis CI is used for builds. ![Travis CI Status](https://api.travis-ci.org/mparaz/the-sim-company.svg?branch=master)
  [https://travis-ci.org/mparaz/the-sim-company]
* Mocha is used as the test runner.
* Chai is used as the assertion library.
* Sinon is used as the test spy provider.

Description
-----------
This project provides the `ShoppingCart` module and the `offer` module for the domain-specific
language used for creating offers in the pricing rules.

The `scripts/the-sim-company.js` program provides a worked example of using the modules 
by fulfilling the requirements of the programming assignment.

Internally, all money is stored in cents to avoid decimal accuracy problems.
For rounding for the discount, numbers are rounded down to the nearest cent.