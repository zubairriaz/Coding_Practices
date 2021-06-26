describe("pipeTwoFunctions",()=>{
    beforeEach(()=>{
        fn1=()=>{};
        fn2=()=>{}
    })

    it("works with single Arguemnts",()=>{
        spyOn(window,"fn1").and.returnValue(1);
        spyOn(window,"fn2").and.returnValue(2);
        let pipe = pipeTwo(fn1,fn2);
        let result = pipe(33);

        expect(fn1).toHaveBeenCalledWith(33);
        expect(fn1).toHaveBeenCalledTimes(1);
        expect(fn2).toHaveBeenCalledWith(1);
        expect(fn2).toHaveBeenCalledTimes(1);
        expect(result).toBe(2);
    })
})

describe("pipeLine function",()=>{
    beforeEach(()=>{
        fn1=()=>{};
        fn2=()=>{};
        fn3=()=>{}

    })

    it("works with single Arguemnts",()=>{
        spyOn(window,"fn1").and.returnValue(1);
        spyOn(window,"fn2").and.returnValue(2);
        spyOn(window,"fn3").and.returnValue(3);

        let pipe = pipeline(fn1,fn2,fn3);
        let result = pipe(33);

        expect(fn1).toHaveBeenCalledWith(33);
        expect(fn1).toHaveBeenCalledTimes(1);
        expect(fn2).toHaveBeenCalledWith(1);
        expect(fn2).toHaveBeenCalledTimes(1);
        expect(fn3).toHaveBeenCalledWith(2);
        expect(fn3).toHaveBeenCalledTimes(1);
        expect(result).toBe(3);
    })
})

