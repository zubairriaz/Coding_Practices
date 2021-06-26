describe("onceAndAfter", () => {
	beforeEach(() => {
		window.myFn1 = () => {};
		window.myFn2 = () => {};
		spyOn(window, "myFn1");
		spyOn(window, "myFn2");
	});
	it("once and after check", () => {
		let oneAndAfter = onceImproved(window.myFn1, window.myFn2);
		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(1);
		expect(myFn2).toHaveBeenCalledTimes(0);

		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(1);
		expect(myFn2).toHaveBeenCalledTimes(1);

		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(1);
		expect(myFn2).toHaveBeenCalledTimes(2);
	});
});

describe("onceAndAfterNTimes", () => {
	beforeEach(() => {
		window.myFn1 = () => {};
		spyOn(window, "myFn1");
	});
	it("once and after check n times", () => {
		let oneAndAfter = onceImproved2(window.myFn1, 2);
		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(1);

		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(2);

		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(2);
	});
});



describe("onceAndAfter3", () => {
	beforeEach(() => {
		window.myFn1 = () => {};
		window.myFn2 = () => {};
		spyOn(window, "myFn1");
		spyOn(window, "myFn2");
	});
	it("once and after check", () => {
		let oneAndAfter = onceImproved3(window.myFn1, window.myFn2);
		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(1);
		expect(myFn2).toHaveBeenCalledTimes(0);

		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(1);
		expect(myFn2).toHaveBeenCalledTimes(1);

		oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(2);
		expect(myFn2).toHaveBeenCalledTimes(1);

        oneAndAfter();
		expect(myFn1).toHaveBeenCalledTimes(2);
		expect(myFn2).toHaveBeenCalledTimes(2);
	});
});
