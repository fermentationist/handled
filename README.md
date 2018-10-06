---

# handled

__handled__ is a convenient and simple asynchronous error handler for node.js. You can pass __handled__ a `Promise`, an `Array` of `Promises`, or an `async function`, and it will return it with basic error handling added. Avoid the dreaded `unhandledPromiseRejectionWarning`!

__handled__ is set up to use a shortcut, allowing it to be invoked like an object property, using dot-notation. This makes it easy to add error handling without the need for further nesting of code.

---

## Installation

``` bash
$ npm install handled
```

---

## Using handled

After installation, you will need to `require` __handled__ in your file in order to use it. If you would like to access any or all of the methods that comprise the package individually, it is convenient to use a destructuring assignment like so:

```javascript
const {	handlePromise, handleAll, handleAsyncFn, assignDotShortcut, assignPromiseHandler, assignFnHandler} = require("handled");
```

### The Dot-Notation Shortcut - ø

Though you can import and use the included methods separately, *__handled__ is designed to be used with a convenient dot-notation shortcut*. By default, the lowercase "slashed-o" symbol– `ø`  is set as the shortcut (Option-o on Mac). To use __handled__ this way, simply require the package, and you are ready to go:

```javascript
const handled = require("handled");

const examplePromise = Promise.reject("example error message");
const handledPromise = examplePromise.ø;

```

The shortcut will recognize the type of argument passed, and will work whether it is used on a `Promise`, `array of Promises`, or an asynchronous `function`, by deciding whether to invoke `handlePromise()`, `handleAll()`, or `handleAsyncFn()`, respectively.

You can add a different dot-notation shortcut if you want, by passing the desired shortcut, as a string, to the `assignDotShortcut()` function thusly:

```javascript
const {assignDotShortcut} = require("handled");

assignDotShortcut("myShortcut");

const exampleFunction = async function (){
	return await //async stuff
}
const handledFunction = exampleFunction.myShortcut;
```

---

## API Reference

---

### `handlePromise(myPromise, [errorHandler], [finallyCallback])` 
##### Alias: `myPromise.ø`


Accepts a `Promise` and returns it, chained with a `.catch()` statement for error handling. 

* *myPromise*: An `Array` of `Promises` to apply the error handler to.
* *errorHandler* (optional): a custom error handling `function` to be used in place of the default. 
* *finallyCallback* (optional): a callback `function` to be called in a `finally` block after the `try` and/or `catch` blocks have executed. This callback will run regardless of whether an exception is encountered.

---

### `handleAll(promiseArray, [errorHandler], [finallyCallback])` 
##### Alias:  `promiseArray.ø`

Accepts an `Array` of `Promises`, and returns them in a new `Array`, with a `.catch()` statement chained to each of them, in their original order. 

* *promiseArray*: An `Array` of `Promises` to apply the error handler to.
* *errorHandler* (optional): a custom error handling `function` to be used in place of the default. 
* *finallyCallback* (optional): a callback `function` to be called in a `finally` block after the `try` and/or `catch` blocks have executed. This callback will run regardless of whether an exception is encountered.

---

### `handleAsyncFn(myFunction, [errorHandler], [finallyCallback])` 
##### Alias:  `myFunction.ø`

Accepts an `async function` (or a standard `function`) and returns a new `async function` wrapper, which will execute the original `function` nested within a `try/catch` block.

* *myFunction*: the `async function` or `function` to apply the error handler to.
* *errorHandler* (optional): a custom error handling `function` to be used in place of the default. 
* *finallyCallback* (optional): a callback `function` to be called in a `finally` block after the `try` and/or `catch` blocks have executed. This callback will run regardless of whether an exception is encountered.

---

### `assignDotShortcut(myShortcut)`

Allows the user to implement a custom dot-notation shortcut for __handled__, in addition to the default "slashed-o" (`ø`) shortcut. This is done by defining a new property on `Object.prototype`, which invokes a "getter" that identifies the type of input as either a `Promise`, an `Array` of `Promises`, or an `async function` and invokes the appropriate __handled__ method to handle it. (If the value passed is none of the above, the original input is returned unchanged).

* *myShortcut*: a `String`, to be set as a property name on Object.prototype, and used as a shortcut to call `handlePromise()`, `handleAll()`, or `handleAsyncFn()`.

---

### `assignPromiseHandler(myErrorHandler)`

Allows the user to set a new default error handler `function` for `Promises`, to be used in calls to `handlePromise()` and `handleAll()`, when the optional *errorHandler* parameter is not passed.

* *myErrorHandler*: an error handling `function`, that accepts one argument– the `Error` that has been thrown.

---

### `assignPromiseHandler(myErrorHandler)`

Allows the user to set a new default error handler `function` to be used in calls to `handleAsyncFn()`, when the optional *errorHandler* parameter is not passed.

* *myErrorHandler*: an error handling `function`, that accepts one argument– the `Error` that has been thrown.

---

---

## License

#### Copyright © 2018 [Dennis Hodges](https://github.com/fermentationist) 


__The MIT License__

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

