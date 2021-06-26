describe("Higher Order Functions Logger",()=>{
    it("logger should be called 2 times",()=>{
        let someThing = (a,b)=>`result:${a}:${b}`;
        someThing = logging2(someThing);
        spyOn(window.console,"log");
        someThing(1,2);
        expect(window.console.log).toHaveBeenCalledTimes(3);
    })

    it("logger report a error",()=>{
        let thorwer = (a,b,c)=>{throw "Catch"};
        thorwer = logging2(thorwer);
        spyOn(window.console,"log");
        expect(thorwer).toThrow();
        try{
        thorwer(1,2,3);
        expect(window.console).toHaveBeenCalledTimes(1);
        }catch(error){
            expect(window.console.log).toHaveBeenCalledTimes(4);

            expect(window.console.log).toHaveBeenCalledWith("error thrown is" + " " + "Catch")

        }
    })

})


describe("Pure Function Logger",()=>{
    let dummy;
    beforeEach(()=>{
         dummy = {logger:()=>{}}
         spyOn(dummy,"logger")
    });
    it("logger should be called 2 times",()=>{
        let someThing = (a,b)=>`result:${a}:${b}`;
        someThing = pureLogging(someThing,dummy.logger);
        someThing(1,2);
        expect(dummy.logger).toHaveBeenCalledTimes(2);
    })

    it("logger report a error",()=>{
        let thorwer = (a,b,c)=>{throw "Catch"};
        thorwer = pureLogging(thorwer,dummy.logger);
        expect(thorwer).toThrow();
        try{
        thorwer(1,2,3);
        expect(dummy.logger).toHaveBeenCalledTimes(1);
        }catch(error){
            expect(dummy.logger).toHaveBeenCalledTimes(2);

            expect(dummy.logger).toHaveBeenCalledWith("error thrown is" + " " + "Catch")

        }
    })

})