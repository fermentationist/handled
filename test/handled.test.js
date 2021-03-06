const {handlePromise, handleAll, handleAsyncFn, assignDotShortcut} = require("../lib/handled.js");

// create a mock of console.error to test error logging side effects
const spy = jest.spyOn(global.console, "err");
beforeEach(() => spy.mockClear());

/*=============*** Functions to Aid Testing ***=============*/

// returns a promise that will resolve, with a setTimeout to simulate an asynchronous response
const asyncFnResolves = async (input, timeout = 0) => {
	const delayedOutput = await new Promise((resolve, reject) => {
		return setTimeout(() => resolve(input), timeout);
	})
	return delayedOutput;
};

// returns a promise that will reject, with a setTimeout to simulate an asynchronous response
const asyncFnRejects = async (input, timeout = 0) => {
	const delayedOutput = await new Promise((resolve, reject) => {
		setTimeout(() => reject(input), timeout)
	})
	return delayedOutput;
};

// some test values
const testInput = "testValue";
const errorText = "errorText";
const resolvedPromise = asyncFnResolves(testInput);
const rejectedPromise = asyncFnRejects(errorText);

describe("*** Helper function tests ***", () => {
	// test for asyncFnResolves function
	test("01 asyncFnResolves(testInput) returns a Promise that resolves with the value testInput", async () => {
		expect.assertions(1);
		return await expect(resolvedPromise).resolves.toEqual(testInput);
	});
	// test for asyncFnRejects function
	test("02 asyncFnRejects(testInput) returns a Promise that rejects with the value errorText", async () => {
		expect.assertions(1);
		return await expect(rejectedPromise).rejects.toEqual(errorText);
	});
});

/*=============*** Tests for handlePromise ***=============*/

describe("*** Tests for handlePromise ***", () => {

	test("01 handlePromise(resolvedPromise) returns a Promise that resolves to the value testInput", async () => {
		expect.assertions(1);
		return await expect(handlePromise(resolvedPromise)).resolves.toEqual(testInput);
	});

	test("02 (dot-property shortcut test using default shortcut .ø) \nresolvedPromise.ø returns a Promise that resolves to the value testInput", async () => {
		expect.assertions(1);
		return await expect(resolvedPromise.ø).resolves.toEqual(testInput);
	});

	test("03 handlePromise(resolvedPromise) returns a Promise that *resolves*, printing errorText to console.error", async function (){
		expect.assertions(1);
		const handledPromise = handlePromise(rejectedPromise);
		const log = spy.mock.calls;
		return await handledPromise.then(() => expect(log[0][0]).toEqual(errorText));
	});

	test("04 (shortcut test) \nrejectedPromise.ø returns a Promise that *resolves*, printing errorText to console.error", async () => {
		expect.assertions(2);
		const handledPromise = handlePromise(rejectedPromise);
		expect(rejectedPromise.ø).toEqual(handledPromise);
		const log = spy.mock.calls;
		return await rejectedPromise.ø.then(() => expect(log[0][0]).toEqual(errorText));
	});

});

/*=============*** Tests for handleAll ***=============*/

// more test values
const resolvedPromise2 = asyncFnResolves("resolved 2");
const rejectedPromise2 = asyncFnRejects("rejected 2");
const promiseArray = [resolvedPromise, rejectedPromise, resolvedPromise2, rejectedPromise2];

describe("*** Tests for handleAll ***", () => {
	test("01 handleAll(promiseArray) returns an array of Promises", () =>{
		expect.assertions(2);
		expect(handleAll(promiseArray) instanceof Array).toBe(true);
		expect(handleAll(promiseArray).every(arrayItem => arrayItem instanceof Promise)).toBe(true);
	});

	test("02 handleAll(promiseArray) returns an array of Promises that resolve to an array containing the return value of each promise in the original array, in order. Rejecting promises cause errors to be printed to console.error", async () => {
		expect.assertions(2);
		const handledAll = handleAll([...promiseArray]);
		const log = spy.mock.calls;
		return await Promise.all(handledAll)
			.then(outputArray => {
				expect(outputArray).toEqual(["testValue", undefined, "resolved 2", undefined]);
				expect(log).toEqual([[errorText], ["rejected 2"]]);
			});
	});

	test("03 (shortcut test) promiseArray.ø returns an array of Promises that resolve to an array containing the return value of each promise in the original array, in order. Rejecting promises cause errors to be printed to console.error", async () => {
		expect.assertions(2);
		const handledAll = promiseArray.ø;
		// expect(promiseArray.ø).toEqual(handledAll);
		const log = spy.mock.calls;
		return await Promise.all(handledAll)
			.then(outputArray => {
				expect(outputArray).toEqual(["testValue", undefined, "resolved 2", undefined]);
				expect(log).toEqual([[errorText], ["rejected 2"]]);
			});
	});

});

/*=============*** Tests for handleAsyncFn ***=============*/

describe("*** Tests for handleAsyncFn ***", () => {
	test("01 handleAsyncFn(asyncFnResolves) returns a Function", () =>{
		expect.assertions(1);
		expect(handleAsyncFn(asyncFnResolves) instanceof Function).toBe(true);
	});

	test("02 (shortcut test) asyncFnResolves.ø returns a Function", () =>{
		expect.assertions(2);
		expect(asyncFnResolves.ø instanceof Function).toBe(true);
		expect(JSON.stringify(asyncFnResolves.ø)).toEqual(JSON.stringify(handleAsyncFn(asyncFnResolves)));
	});

	test("03 handleAsyncFn(asyncFnRejects) returns a Function", () =>{
		expect.assertions(1);
		expect(handleAsyncFn(asyncFnRejects) instanceof Function).toBe(true);
	});

	test("04 (shortcut test) asyncFnRejects.ø returns a Function",() =>{
		expect.assertions(2);
		expect(asyncFnRejects.ø instanceof Function).toBe(true);
		expect(JSON.stringify(asyncFnRejects.ø)).toEqual(JSON.stringify(handleAsyncFn(asyncFnRejects)));
	});

	test("05 the result of handleAsyncFn(asyncFnRejects), invoked, will handle Promise rejection error, printing errorText to console.error", async () =>{
		const handledFn = await handleAsyncFn(asyncFnRejects);
		const handledAndCalledFn = handledFn(errorText);
		expect.assertions(1);
		const log = spy.mock.calls;
		return await handledAndCalledFn.then(() => expect(log[0][0]).toEqual(errorText));
	});

	test("06 (shortcut test) the result of asyncFnRejects.ø, invoked, will handle Promise rejection error, printing errorText to console.error", async () =>{
		const log = spy.mock.calls;
		const handledFn = await handleAsyncFn(asyncFnRejects);
		const handledFnSC = asyncFnRejects.ø;
		const handledAndCalledFn = handledFn(errorText);
		const handledAndCalledFnSC = handledFnSC(errorText);
		expect.assertions(2);
		await handledAndCalledFnSC.then(async () => {
			expect(log[0][0]).toEqual("errorText");
			expect(JSON.stringify(await handledAndCalledFn)).toEqual(JSON.stringify(await handledAndCalledFnSC))
		})
		
	});
});

/*=============*** Tests for assignDotShortcut ***=============*/

describe("*** Tests for assignDotShortcut ***", () =>{
	const shortcut = "SC";
	assignDotShortcut(shortcut);

	test("01 new dot-property shortcut assigned and functioning for resolvedPromise", async () => {
		expect.assertions(2);
		await expect(resolvedPromise.SC).resolves.toEqual(testInput);
		return await expect(resolvedPromise[shortcut]).resolves.toEqual(testInput);
	});
});



