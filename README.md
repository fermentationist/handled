---

# handled

__handled__ is a convenient and simple asynchronous error handler for node.js. You can pass __handled__ a `Promise`, an `Array` of `Promises`, or an `async function`, and it will return it with basic error handling added. 

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

Though you can import and use the included methods separately, *__handled__ is designed to be used with a dot-notation shortcut*, so you need not break out the individual methods. By default, the lowercase "slashed-o" symbol– `ø`  is set as the shortcut (Option-o on Mac). To use __handled__ this way, simply require the package, and you are ready to go:

```javascript
const handled = require("handled");

const examplePromise = Promise.reject("example error message");
const handledPromise = examplePromise.ø;

```

The shortcut will recognize the type of argument passed, and will work whether it is used on a `Promise`, `array of Promises`, or an asynchronous `function`, by deciding whether to invoke `handlePromise`, `handleAll`, or `handleAsyncFn`, respectively.

You can add a different dot-notation shortcut if you want, by passing the desired shortcut, as a string, to the `assignDotShortcut` function thusly:

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

### `handlePromise(myPromise, [errorHandler])` -or- `myPromise.ø`

Accepts a `Promise` and returns it, chained with a `.catch()` statement for error handling. Optional *errorHandler* parameter allows user to pass a custom error handling `function` to be used in place of the default.

### `handleAll(promiseArray, [errorHandler])` -or- `promiseArray.ø`

Accepts an `Array` of `Promises`, and returns them in a new `Array`, with a `.catch()` statement chained to each of them, in their original order. Optional *errorHandler* parameter allows user to pass a custom error handling `function` to be used in place of the default.

### `handleAsyncFn(myFunction, [errorHandler])` -or- `myFunction.ø`

Accepts an `async function` (or a standard `function`) and returns a new `async function` wrapper, which will execute the original `function` nested within a `try/catch` block. Optional *errorHandler* parameter allows user to pass a custom error handling `function` to be used in place of the default.

### `assignDotShortcut(myShortcut)`

Allows the user to implement a custom dot-notation shortcut for __handled__, in addition to the default "slashed-o" (`ø`) shortcut. This is done by defining a new property on the global `Object`, which invokes a "getter" that identifies the type of input as either a `Promise`, an `Array` of `Promises`, or an `async function` and invokes the appropriate __handled__ method to handle it. (If the value passed is none of the above, the original input is returned unchanged).

### `assignPromiseHandler(myErrorHandler)`

Allows the user to set a new default error handler (a `function`) for `Promises`, to be used in calls to `handlePromise()` and `handleAll()`, if the optional *errorHandler* parameter is not passed.

### `assignPromiseHandler(myErrorHandler)`

Allows the user to set a new default error handler `function` to be used in calls to `handleAsyncFn()`, if the optional *errorHandler* parameter is not passed.

---

## License

### Copyright © 2018 [Dennis Hodges](https://github.com/fermentationist) 


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

