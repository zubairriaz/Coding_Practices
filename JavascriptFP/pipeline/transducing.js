const testOdd = (x) => x % 2 === 1;
const testUnderFifty = (x) => x < 50;
const duplicate = (x) => x + x;
const addThree = (x) => x + 3;

const myArray = [22, 9, 60, 24, 11, 63];

const result = myArray.filter(testOdd).map(addThree);
// console.log(result)

// we are processing the data array by array what if we apply reduce that will apply data element to element

// first lets convert our map and filter to reducers functions

let mapR = fn => reducer=>{console.log(reducer);return (acc, value)=>reducer(acc,fn(value))};
const filterR = fn => reducer=>{console.log(reducer);return(acc, value)=>fn(value) ? reducer(acc,value) : acc};



let testOddR = filterR(testOdd)
let addThreeR = mapR(addThree)
const addToArray = (x,y)=>{
    console.log(x,y)
    x.push(y);
    return x;
}

// let result1 = myArray.reduce(addThreeR(addToArray),[])

// const makeReducer = (array, fns) =>array.reduce(compose(...fns)(addToArray),[])

// const makeReducer2 = (array, fns , reducer=addToArray,initialValue=[])=>array.reduce(compose(...fns)(reducer), initialValue)

 const demethodize = fn => (...args)=>fn.bind(...args)()

 

const strSplit= str =>{
    let result = str.split(" ");
    console.log(result);
    return result
}

const joinFunction = arr =>{
    console.log(arr)
    return arr.join(" ")
}
const captitalize = word=>word[0].toUpperCase()+word.slice(1).toLowerCase();
const map = fn => arr => {
    console.log(arr, fn)
    return arr.map(fn)
}


const curry = fn =>{
    return fn.length == 0 ? fn() : p=>{return curry(fn.bind(this,p))}
}

const flipTwo = fn => (a,b)=>fn(b,a);


const map2 = curry(flipTwo(demethodize(Array.prototype.map)))(captitalize)




let composeTwo = (f,g)=>(...args) =>f(g(...args))
let compose = (...fns)=>fns.reduce(composeTwo);

let headline = compose(joinFunction,map2,strSplit)

console.log(headline("Alice's ADVENTURES in WoNdErLaNd"))


