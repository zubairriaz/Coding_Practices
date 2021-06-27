//Avoid mutating functions
const myObj = {a:21,b:22}
//myObj = {c:24}
myObj.a =22

//freezing
Object.freeze(myObj);
myObj.b = 25;

//freezing is a shallow operation it won't work on object in objects.

const myObj1 = {a:21,b:22,c:{e:21}}
Object.freeze(myObj1);
myObj1.a=22 //won't work
myObj1.c.e=22 //works
console.log(myObj1);

//solution deepFreeze 
// can be used to check a function if it modifies its arguments or not
const deepFreeze=obj=>{
    if(obj && typeof obj == 'object' && !Object.isFrozen(obj)){
        Object.freeze(obj)
        Object.getOwnPropertyNames(obj).forEach(prop => deepFreeze(obj[prop]));
    }
    
    return obj;
}

const myObj2 = {a:21,b:22,c:{e:21}}

deepFreeze(myObj2);
myObj2.a=23 //won't work
myObj2.c.e=23 //now won't works
console.log(myObj2);

//cloning and mutating
//Object.assign and spread operator but they have same shalowness problem
let obj = {a:1,b:2,c:3,d:4,e:{f:4}}
let objCopy = Object.assign({},obj)
let objCopy2 = {...obj}


// for shallowness problem we can work with JSOn.parse

let copy = obj =>JSON.parse(JSON.stringify(obj));

let copy3 = copy(obj);

objCopy.e.f = 6

console.log(objCopy, objCopy2, copy3);

// JSON has problem it wont work correctly with object if any its properties have constructor

let objTest = {a:new Date()}
let objTestCopy = copy(objTest);

console.log(typeof(objTest.a), typeof(objTestCopy.a));

//soltion deepCopy

const deepCopy = obj =>{
    let aux;
    if(obj && typeof(obj)=='object'){
        aux = new Object();
        Object.getOwnPropertyNames(obj).forEach(prop=>aux[prop] = deepCopy(obj[prop]))
    }
    return aux
}

let objTest1 = {a:new Date()}
let objTestCopy1 = deepCopy(objTest);

console.log(typeof(objTest1.a), typeof(objTestCopy1.a));

// updating on recursive
const setIn = (arr, val, obj) => {
    const newObj = Number.isInteger(arr[0]) ? [] : {};
  
    Object.keys(obj).forEach(k => {
      newObj[k] = k !== arr[0] ? obj[k] : null;
    });
  
    newObj[arr[0]] =
      arr.length > 1 ? setIn(arr.slice(1), val, obj[arr[0]]) : val;
    return newObj;
  };
