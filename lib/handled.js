const handledModule = (() => {

	const defaultErrorHandler = (err) => console.error(err);

	const handlePromise = (promiseToBeHandled, errorHandler = defaultErrorHandler) => {
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

	const handleAll = (promisesToBeHandled) => {
		try {
			let handledPromises = promisesToBeHandled.map(promise => handlePromise(promise))
			return handledPromises;
		}
		catch (err) {
			console.error("handled.js error: \"handleAll\" method could not be applied:", err);
			return promisesToBeHandled;
		}
	}

	const handleAsyncFn = (functionToBeHandled, errorHandler = defaultErrorHandler) => {

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

	const assignDotShortcut = (shortcut) => {
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
	const defaultShortcut = () => assignDotShortcut("ø");
	defaultShortcut();
	return {handlePromise, handleAll, handleAsyncFn, assignDotShortcut}
	
})();

module.exports = handledModule;


