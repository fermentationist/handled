# handled

__handled__ is a convenient and simple error handler for node.js. It is a function wrapper that returns a Promise, an array of Promises, or an asynchronous function, wrapped in a try/catch. 

__handled__ is set up to use a shortcut, allowing it to be invoked as a property of the global *Object*, using dot notation. This makes it easy to add error handling without the need to enclose blocks of code in parentheses.

## Install

``` bash
$ npm install handled
```

## Using handled

```javascript
const handled = require("handled");

(Promise.reject("errorMessage")).ø

```