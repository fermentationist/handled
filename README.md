# handled

__handled__ is a convenient and simple error handler for node.js. You can pass __handled__ a Promise, an array of Promises, or an asynchronous function, and it will return the input, wrapped in a try/catch. 

__handled__ is set up to use a shortcut, allowing it to be invoked as a property of the global `Object`, using dot-notation. This makes it easy to add error handling without the need to enclose blocks of code in parentheses.

---

## Installation

``` bash
$ npm install handled
```

---

## Using handled

After installation, you will need to require __handled__ in your file in order to use it. If you would like to access any or all the four functions that comprise the package individually, you should use a destructuring assignment like so:

```javascript
const {	handlePromise, handleAll, handleAsyncFn, assignDotShortcut} = require("handled");
```

### The Dot-Notation Shortcut - ø

Though you can import and use the included functions separately, *__handled__ is designed to be used with a dot-notation shortcut*, so you need not break out the individual functions. By default, the lowercase "slashed o" symbol– `ø`  is set as the shortcut (Option-o on Mac). To use this way, simply require the package, and you are ready to go:

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

---

## API Reference

### `handlePromise(myPromise)` -or- `myPromise.ø`

Accepts a `Promise` and returns it, chained with a `.catch()` statement for error handling.

### `handleAll(promiseArray)` -or- `promiseArray.ø`

Accepts an `Array` of `Promises`, and returns a new `Array`, with a `.catch()` statement chained to each of the constituent elements, in their original order.

### `handleAsyncFn(myFunction)` -or- `myFunction.ø`

Accepts an `async function` and returns a new `async function` wrapper, with the original `function` nested within a `try/catch` block.

### `assignDotShortcut(myShortcut)` -or- `myShortcut.ø`

Allows the user to implement a custom dot-notation shortcut for __handled__, in addition to the default slashed-o (`ø`) shortcut. This is done by defining a new property on the global `Object`, which invokes a "getter" that identifies the type of input as either a `Promise`, an `Array` of `Promises`, or and `asyc function` and invokes the appropriate __handled__ method to handle it. (If the value passed is none of the above, the original input is returned unchanged).

---

## License

### Copyright © 2018 [Dennis Hodges](fermentationist@gmail.com)

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

