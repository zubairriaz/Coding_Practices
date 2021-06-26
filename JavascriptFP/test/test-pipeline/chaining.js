describe("chainingFunction",()=>{
    beforeEach(()=>{
      let city = new City("Zubair",22,23)
      myCity = chaining(city)
    })

    it("works on chaining",()=>{
        expect(myCity.setName("bilal")).toBeInstanceOf(City)
        expect(myCity.setLat(22)).toBeInstanceOf(City)


    });

    it("works on get",()=>{
        expect(myCity.getLon()).toBe(22)
        expect(myCity.getLat()).toBe(23)
 })
})