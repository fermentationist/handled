const handledModule = (() => {

	const basicErrorHandler = err => console.error(err);

	this.defaultPromiseHandler = basicErrorHandler;
	this.defaultFnHandler = basicErrorHandler;

	const handlePromise = (promiseToBeHandled, errorHandler = this.defaultPromiseHandler) => {
		try {
			return promiseToBeHandled
				.catch(err => {
					return errorHandler(err);
			});
		}
		catch (err) {
			console.error("handled.js error: \"handlePromise\" method could not be applied:", err);
			return promiseToBeHandled;
		}
	}

	const handleAll = (promisesToBeHandled, errorHandler = this.defaultPromiseHandler) => {
		try {
			let handledPromises = promisesToBeHandled.map(promise => handlePromise(promise, errorHandler))
			return handledPromises;
		}
		catch (err) {
			console.error("handled.js error: \"handleAll\" method could not be applied:", err);
			return promisesToBeHandled;
		}
	}

	const handleAsyncFn = (functionToBeHandled, errorHandler = this.defaultFnHandler) => {
		try {
			return async function () {
				try {
					return await functionToBeHandled.apply(this, Array.from(arguments));
				}
				catch (err) {
					return errorHandler(err);
				}
			}
		}
		catch (err) {
			console.error("handled.js error: \"handleAsyncFn\" method could not be applied:", err);
			return functionToBeHandled;
		}
	}

	const assignDotShortcut = shortcut => {
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
			console.error("handled.js error: \"assignDotShortcut\" failed.", err)
		}
	}

	assignPromiseHandler = errorHandler => {
		if (errorHandler instanceof Function) {
			return this.defaultPromiseHandler = errorHandler;
		}
		return console.error("handled.js error: \"assignPromiseHandler\" failed – argument must be a function")
	}

	assignFnHandler = errorHandler => {
		if (errorHandler instanceof Function) {
			return this.defaultFnHandler = errorHandler;
		}
		return console.error("handled.js error: \"assignFnHandler\" failed – argument must be a function")
	}

	const defaultShortcut = () => assignDotShortcut("ø");
	defaultShortcut();

	return {handlePromise, handleAll, handleAsyncFn, assignDotShortcut, assignPromiseHandler, assignFnHandler}
	
})();

module.exports = handledModule;


