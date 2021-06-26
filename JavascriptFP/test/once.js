describe("once", () => {
	beforeEach(() => {
		window.myFn = () => {};
		spyOn(window, "myFn");
	});
	it("without once a function always runs", () => {
		myFn();
		myFn();
		myFn();
		expect(myFn).toHaveBeenCalledTimes(3);
	});

	it("without once a function always runs", () => {
		window.onceFn = once(window.myFn);
		spyOn(window, "onceFn").and.callThrough();
		onceFn();
		onceFn();
		onceFn();
		expect(myFn).toHaveBeenCalledTimes(1);
		expect(onceFn).toHaveBeenCalledTimes(3);
	});
});
