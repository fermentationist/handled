# handled ø

__handled__ is a convenient and simple error handler for node.js. You can pass __handled__ a Promise, an array of Promises, or an asynchronous function, and it will return the input, wrapped in a try/catch. 

__handled__ is set up to use a shortcut, allowing it to be invoked as a property of the global `Object`, using dot-notation. This makes it easy to add error handling without the need to enclose blocks of code in parentheses.

## Install

``` bash
$ npm install handled
```

## Using handled

After installation, you will need to require __handled__ in your file in order to use it. If you would like to access any or all the four functions that comprise the package individually, you should use a destructuring assignment like so:

```javascript
const {	handlePromise, handleAll, handleAsyncFn, assignDotShortcut} = require("handled");
```

## The Dot-Notation Shortcut - ø

Though you can import and use the included functions separately, __handled__ is designed to be used with a dot-notation shortcut, so you need not break out the individual functions. By default, the symbol "ø" (Option-o) is set as the shortcut. To use this way, simply require the package, and you are ready to go:

```javascript
const handled = require("handled");

const examplePromise = Promise.reject("example error message");
const handledPromise = examplePromise.ø;

```

The shortcut will recognize the type of argument passed, and will work whether it is used on a Promise, array of Promises, or an asychronous function, deciding whether to invoke `handlePromise`, `handleAll`, or `handleAsyncFn`, respectively.

You can add a different dot-notation shortcut if you want, by passing the desired shortcut, as a string, to the `assignDotShortcut` function thusly:

```javascript
const {assignDotShortcut} = require("handled");

assignDotShortcut("myShortcut");

const exampleFunction = async function (){
	return await //async stuff
}
const handledFunction = exampleFunction.myShortcut;
```


