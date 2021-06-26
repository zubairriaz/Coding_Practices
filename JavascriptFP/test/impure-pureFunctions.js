describe("getRandomLetter",()=>{
it("it reurns A for small values",()=>{
    const smallLetter = getRandomLetter2(()=>0.001);
    expect(smallLetter).toBe("A");
});

it("number close to 1 produce letter Z", ()=>{
   const letter = getRandomLetter2(()=>0.999);
   expect(letter).toBe("Z");
});

})

describe("getRandomLetter2",()=>{
    it("it reurns A for small values",()=>{
        spyOn(Math,'random').and.returnValue(0.001)
        const smallLetter = getRandomLetter();
        expect(smallLetter).toBe("A");
        expect(Math.random).toHaveBeenCalledTimes(1)
    });
    
    it("number close to 1 produce letter Z", ()=>{
        spyOn(Math,'random').and.returnValue(0.99, 0.98)
        const letter = getRandomLetter();
        const letter2 = getRandomLetter();
        expect(letter).toBe("Z");
        expect(letter2).toBe("Z");
        expect(Math.random).toHaveBeenCalledTimes(2)
    });
    
    })