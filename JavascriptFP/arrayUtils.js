let array = [1,2,3,4,5,6]

const average = (arr)=>arr.reduce((acc,val,index,array)=>{
    if (index == array.length -1){
        return acc.sum / acc.count
    }
    acc.sum += val;
    acc.count+=1;
    return acc;

  

},{sum:0,count:0})



let stringToReverse  = "hello";

const reverseString = (str)=>{
    return str.split("").reduceRight((x,y)=>x+y,"")
}

//console.log(reverseString(stringToReverse))


const range = (start, stopIndex)=>{
    return new Array(stopIndex - start).fill(0).map((val, index)=> (start+1) + index)
}

// console.log(range(0,5))


const myMap = (arr, fn) => {
	return arr.reduce((x, y) => {
        console.log(x , y);
         x.push(fn(y))
         return x;
    }, []);
};

//console.log(myMap(array,(v)=>v*2));

const names = [
    "Zubair Riaz",
    "Umair Riaz",
    "Bilal Riaz Riaz",
    "Ahmad"
]

const namesA = [
    ["Zubair Riaz",["Adeel",["Jawad"]]],
    ["Umair Riaz"],
    "Bilal Riaz Riaz",
    "Ahmad"
]

const myFlat = (arr)=>{
   return arr.reduce((x,y)=>{
        if (Array.isArray(y)){
             return x.concat(myFlat(y))
        }
        else return x.concat(y)
    },[])
}

const getLastName = (strArray) =>{
    return strArray.flatMap(x=>{
           const s  = x.split(" ");
           return s.length === 1 ? [] : s.splice(1);
    })
}

const myFilter = (array, func) => {
	return array.reduce((x, y) => (func(y) ? x.concat(y) : x), []);
};

const myFind = (arr, func)=>{
    return arr.reduce((x,y)=>func(y) ? y : x , undefined)
}

const myFindIndex = (arr, func)=>{
    return arr.reduce((x,y,index)=> x=== -1 && func(y) ? index : x , -1)
}


const fakeApi = (delay, value)=>{
     return new Promise(res=>setTimeout(()=>res(value),delay))
}

// (async ()=>{
// console.log("Start");
// console.log(new Date())
// let result = await fakeApi(1000, 45);
// console.log(new Date(), result)
// console.log("End");
// })()

const forEachAsync = (arr, fn) =>{
   let val = arr.reduce((x,y)=>x.then(()=>fn(y)),Promise.resolve())
   console.log(val);
    return val
}

// (async () => {
// 	console.log("Start");
// 	 await forEachAsync([1,2,3,4],async (n) => {
// 		console.log(new Date());
// 		let result = await fakeApi(n * 500, 45);
// 		console.log(new Date(), result);
// 	});
// 	console.log("End");
// })();


const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

(async () => {
	console.log("Start");
	 console.log(await mapAsync([1,2,3,4],async (n) => {
		console.log(new Date());
		let result = await fakeApi(n * 500, 45);
		console.log(new Date(), result);
        return result;
	}))
	console.log("End");
})();











//console.log(myFilter(names,x=>x.length > 5));