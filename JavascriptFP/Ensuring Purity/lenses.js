const author = {
    user: "fkereki",
    name: {
      first: "Federico",
      middle: "",
      last: "Kereki",
    },
    books: [
      {name: "Google Web Toolkit", year: 2010},
      {name: "Functional Programming", year: 2017},
      {name: "Javascript Cookbook", year: 2018},
    ],
  };

  const lens = (getters,setters)=>({getters,setters})
  const lensProp = attr => lens(getField(attr), setField(attr));

  const lens1 = lens(getField("user"), setField("user"));

  const lens1 = lensProp("user");

