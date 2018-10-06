const handledModule = (() => {

	// Custom logging function to add formatting to console output. 
	console.err = input => {
		// log input to console, in magenta
		console.log("\x1b[35m", `Error handled: ${input}`);
		// reset console formatting
		console.log("\x1b[0m");
	}

	// The default error handler
	const basicErrorHandler = err => console.err(`${err}`);

	// Variables to set the error handlers and callbacks that will be used by default. User may change these defaults with the assignPromiseHandler(), assignFnHandler(), and assignCallback() methods.
	this.defaultPromiseHandler = basicErrorHandler;
	this.defaultFnHandler = basicErrorHandler;
	this.defaultCallback = () => {}


	//====================//Primary *handled* Methods//====================//

	// Accepts a Promise and returns it, chained with a `.catch()` statement for error handling. 
	const handlePromise = (promiseToBeHandled, errorHandler = this.defaultPromiseHandler, finallyCallback = this.defaultCallback) => {

		errorHandler = errorHandler || this.defaultPromiseHandler;
		try {
			return promiseToBeHandled
				.catch(err => errorHandler(err))
				.finally(() => finallyCallback ? finallyCallback() : null);
		}
		catch (err) {
			console.err("handled.js- \"handlePromise\" method could not be applied:", err);
			return promiseToBeHandled;
		}
	}

	// Accepts an array of Promises, and returns them in a new array, with a .catch() statement chained to each of them, in their original order. 
	const handleAll = (promisesToBeHandled, errorHandler = this.defaultPromiseHandler, finallyCallback = this.defaultCallback) => {

		errorHandler = errorHandler ? errorHandler: this.defaultPromiseHandler;
		try {
			let handledPromises = promisesToBeHandled.map(promise => handlePromise(promise, errorHandler, finallyCallback))
			return handledPromises;
		}
		catch (err) {
			console.err("handled.js- \"handleAll\" method could not be applied:", err);
			return promisesToBeHandled;
		}
	}

	// Accepts an async function (or a standard function) and returns a new async function wrapper, which will execute the original function nested within a try/catch block.
	const handleAsyncFn = (functionToBeHandled, errorHandler = this.defaultFnHandler, finallyCallback = this.defaultCallback) => {

		errorHandler = errorHandler ? errorHandler: this.defaultPromiseHandler;
		try {
			return async function () {
				try {
					return await functionToBeHandled.apply(this, Array.from(arguments));
				}
				catch (err) {
					return errorHandler(err);
				}
				finally {
					finallyCallback();
				}
			}
		}
		catch (err) {
			console.err("handled.js- \"handleAsyncFn\" method could not be applied:", err);
			return functionToBeHandled;
		}
	}

	//====================//Secondary Methods//====================//

	// Assigns a custom dot-notation shortcut by defining a new property on Object.prototype.
	const assignDotShortcut = shortcut => {
		const usedNames = Object.getOwnPropertyNames(Object.prototype);
		const nameTaken = usedNames.some(name => name === shortcut);
		if (nameTaken) {
			return console.err(`handled.js- "assignDotShortcut" failed. The selected property name, ${shortcut}, is already in use.`);
		}
		try {
		Object.defineProperty(Object.prototype, shortcut, {
			get: function (){
				const isPromise = this instanceof Promise;
				const isFunction = typeof this === "function";
				const isPromiseArray = Array.isArray(this) && this.every(x => x instanceof Promise);
				return isPromise ? handlePromise(this) : 
					isFunction ? handleAsyncFn(this) : 
					isPromiseArray  ? handleAll(this):
					this;
			}
		});
		}
		catch (err) {
			console.err("handled.js- \"assignDotShortcut\" failed.", err)
		}
	}

	// Assigns a new default error handler for Promises, to be used in calls to handlePromise() and handleAll().
	const assignPromiseHandler = errorHandler => {
		if (errorHandler instanceof Function) {
			return this.defaultPromiseHandler = errorHandler;
		}
		return console.err("handled.js- \"assignPromiseHandler\" failed – argument must be a function")
	}

	// Assigns a new default error handler for async functions, to be used in calls to handleAsyncFn().
	const assignFnHandler = errorHandler => {
		if (errorHandler instanceof Function) {
			return this.defaultFnHandler = errorHandler;
		}
		return console.err("handled.js- \"assignFnHandler\" failed – argument must be a function")
	}

	// Allows the user to set a new default error handler to be used in calls to handleAsyncFn(), when the optional *errorHandler* parameter is not passed.
	const assignCallback = callbackFn => {
		if (callbackFn instanceof Function) {
			return this.defaultCallback = callbackFn;
		}
		return console.err("handled.js- \"assignDefaultCallback\" failed – argument must be a function")
	}

	// Set ø as default dot-notation shortcut
	const defaultShortcut = () => assignDotShortcut("ø");
	defaultShortcut();

	// Return public API
	return {handlePromise, handleAll, handleAsyncFn, assignDotShortcut, assignPromiseHandler, assignFnHandler, assignCallback}
	
})();

module.exports = handledModule;


