const handledModule = (() => {

	const handlePromise = (promiseToBeHandled) => {
		try {
			return promiseToBeHandled
				.catch(err => {
					console.error(`${err}`);
					console.error("\x1b[0m"); 
					return;
			});
		}
		catch (err) {
			console.error("\x1b[31m", "error in \"handlePromise\": ", err);
			console.error("\x1b[0m"); 
			return promiseToBeHandled;
		}
	}

	const handleAll = (promisesToBeHandled) => {
		try {
			let handledPromises = promisesToBeHandled.map(promise => handlePromise(promise))
			return handledPromises;
		}
		catch (err) {
			console.error("\x1b[31m", "error in \"handleAll\": ", err);
			console.error("\x1b[0m"); 
			return promisesToBeHandled;
		}
	}

	const handleAsyncFn = (functionToBeHandled) => {
		return async function () {
			try{
				return await functionToBeHandled.apply(this, Array.from(arguments));
			}
			catch(err){
				console.error("\x1b[31m", "ø error:", err);
				console.error("\x1b[0m"); 
				return functionToBeHandled;
			}
		}
	}

	const assignDotShortcut = (shortcut) => {
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
	const defaultShortcut = () => assignDotShortcut("ø");
	defaultShortcut();
	return {handlePromise, handleAll, handleAsyncFn, assignDotShortcut}
	
})();

module.exports = handledModule;


