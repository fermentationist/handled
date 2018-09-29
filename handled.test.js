const {handlePromise, handleAll, handleAsyncFn, assignDotShortcut} = require("./handled.js");

/*=============*** Functions to Aid Testing ***=============*/

// returns a promise that will resolve, with a setTimeout to simulate an asynchronous response
let resolvingPromise = async (input, timeout = 250) => {
	const delayedOutput = await new Promise((resolve, reject) => {
		return setTimeout(() => resolve(input), timeout);
	})
	return delayedOutput;
};

// returns a promise that will reject, with a setTimeout to simulate an asynchronous response
let rejectingPromise = async (input, timeout = 250) => {
	const delayedOutput = await new Promise((resolve, reject) => {
		setTimeout(() => reject(input), timeout)
	})
	return delayedOutput;
};


describe("*** Helper function tests ***", () => {
	// test for resolvingPromise function
	test("resolvingPromise(testInput) returns a Promise,\n and that Promise resolves with the value testInput", () => {
		const testInput = "testValue";
		const testPromise = resolvingPromise(testInput);
		expect(testPromise instanceof Promise).toBe(true);
		testPromise.then(data => expect(data).toEqual(testInput));
	});

	// test for rejectingPromise function
	test("rejectingPromise(testInput) returns a Promise,\n and that Promise rejects with the error value testInput", () => {
		const testInput = "testValue";
		const testPromise = rejectingPromise(testInput);
		expect(testPromise instanceof Promise).toBe(true);
		testPromise.then(data => {
			expect(data instanceof Error).toBe(true);
			expect(data.message).toBe(testInput);

		});
	});
});
/*=============*** Tests for handlePromise ***=============*/

// some test values
const testInput = "testValue";
const rejectedPromise = rejectingPromise(testInput);
const resolvedPromise = resolvingPromise(testInput);

describe("*** Tests for handlePromise ***", () => {
	test("handlePromise(resolvingPromise(testInput)) returns a Promise,\n and that Promise resolves with the value testInput", () => {
		expect(handlePromise(resolvedPromise) instanceof Promise).toBe(true);
		resolvedPromise.then(data => expect(data).toEqual(testInput));
	});

	test("handlePromise(resolvingPromise(testInput)) returns a Promise,\n and that Promise rejects with the error value testInput", () => {
		expect(rejectedPromise instanceof Promise).toBe(true);
		rejectedPromise.then(data => {
			expect(data instanceof Error).toBe(true);
			expect(data.message).toBe(testInput);
		});
	});
});

/*=============*** Tests for handleAll ***=============*/

// more test values
const resolvedPromise2 = resolvingPromise("resolved 2");
const rejectedPromise2 = rejectingPromise("rejected 2");
const promiseArray = [resolvedPromise, rejectedPromise, resolvedPromise2, rejectedPromise2]

describe("*** Tests for handleAll ***", () => {
	test("handleAll(promiseArray) returns an array of Promises", () =>{
		expect(handleAll(promiseArray) instanceof Array).toBe(true);
		expect(handleAll(promiseArray).every(arrayItem => arrayItem instanceof Promise)).toBe(true);
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



