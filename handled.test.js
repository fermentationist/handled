const {handlePromise, handleAll, handleAsyncFn, assignDotShortcut} = require("./handled.js");

/*=============*** Functions to Aid Testing ***=============*/

// returns a promise that will resolve, with a setTimeout to simulate an asynchronous response
let resolvingPromise = async (input, timeout = 500) => {
	const delayedOutput = await new Promise((resolve, reject) => {
		return setTimeout(() => resolve(input), timeout);
	})
	return delayedOutput;
};

// returns a promise that will reject, with a setTimeout to simulate an asynchronous response
let rejectingPromise = async (input, timeout = 500) => {
	const delayedOutput = await new Promise((resolve, reject) => {
		setTimeout(() => reject(input), timeout)
	})
	return delayedOutput;
};

// some test values
const testInput = "testValue";
const errorText = "errorText";
const resolvedPromise = resolvingPromise(testInput);
const rejectedPromise = rejectingPromise(errorText);

describe("*** Helper function tests ***", () => {
	// test for resolvingPromise function
	test("01 resolvingPromise(testInput) returns a Promise that resolves with the value testInput", async () => {
		expect.assertions(1);
		await expect(resolvingPromise(testInput)).resolves.toEqual(testInput);
	});
	// test for rejectingPromise function
	test("02 rejectingPromise(testInput) returns a Promise that rejects with the value errorText", () => {
		expect.assertions(1);
		expect(rejectedPromise).rejects.toThrow(Error(errorText));
	});
});

/*=============*** Tests for handlePromise ***=============*/

describe("*** Tests for handlePromise ***", () => {

	test("01 handlePromise(resolvedPromise) returns a Promise that resolves to the value testInput", async () => {
		expect.assertions(1);
		return await expect(handlePromise(resolvedPromise)).resolves.toEqual(testInput);
	});

	test("02 (dot-property-shortcut test using default shortcut .ø) \nresolvedPromise.ø returns a Promise that resolves to the value testInput", async () => {
		expect.assertions(1);
		return await expect(resolvedPromise.ø).resolves.toEqual(testInput);
	});

	test("03 handlePromise(resolvedPromise) returns a Promise that *resolves* with the value errorText", async () => {
		expect.assertions(2);
		expect(handlePromise(rejectedPromise) instanceof Promise).toBe(true);
		return await expect(handlePromise(rejectedPromise)).resolves.toEqual("errorText");
	});

	test("04 (dot-property-shortcut test using default shortcut .ø) \nrejectedPromise.ø returns a Promise that *resolves* to the value testInput", async () => {
		expect.assertions(1);
		return await expect(rejectedPromise.ø).resolves.toEqual(errorText);
	});

});

/*=============*** Tests for handleAll ***=============*/

// more test values
const resolvedPromise2 = resolvingPromise("resolved 2");
const rejectedPromise2 = rejectingPromise("rejected 2");
const promiseArray = [resolvedPromise, rejectedPromise, resolvedPromise2, rejectedPromise2];

describe("*** Tests for handleAll ***", () => {
	test("01 handleAll(promiseArray) returns an array of Promises", () =>{
		expect(handleAll(promiseArray) instanceof Array).toBe(true);
		expect(handleAll(promiseArray).every(arrayItem => arrayItem instanceof Promise)).toBe(true);
	});

	test("02 handleAll(promiseArray) returns an array of Promises that resolve to an array containing the return value of each promise in the original array, in order", async () => {
		expect.assertions(1);
		return await Promise.all(handleAll(promiseArray))
			.then(outputArray => {
				expect(outputArray).toEqual(["testValue", "errorText", "resolved 2", "rejected 2"])
			});
	});

	test("03 (shortcut test) promiseArray.ø returns an array of Promises that resolve to an array containing the return value of each promise in the original array, in order", async () => {
		expect.assertions(1);
		return await Promise.all(promiseArray.ø)
			.then(outputArray => {
				expect(outputArray).toEqual(["testValue", "errorText", "resolved 2", "rejected 2"])
			});
	});

});


/*=============*** Tests for handleAsyncFn ***=============*/

// // even more test values
// const resolvedPromise2 = resolvingPromise("resolved 2");
// const rejectedPromise2 = rejectingPromise("rejected 2");
// const promiseArray = [resolvedPromise, rejectedPromise, resolvedPromise2, rejectedPromise2]

// describe("*** Tests for handleAll ***", () => {
// 	test("handleAll(promiseArray) returns an array of Promises", () =>{
// 		expect(handleAll(promiseArray) instanceof Array).toBe(true);
// 		expect(handleAll(promiseArray).every(arrayItem => arrayItem instanceof Promise)).toBe(true);
// 	});
// });
