const logging = (fn) => {
	return (...args) => {
		console.log("Starting function with parameters", ...args);
		const result = fn(...args);
		console.log(result);
		console.log("End Function");
	};
};

const logging2 =
	(fn) =>
	(...args) => {
		console.log("Starting function with parameters", ...args);

		try {
			const result = fn(...args);
			console.log(result);
			console.log("End Function");
		} catch (error) {
			console.log("error thrown is" + " " + error);
			throw error;
		}
	};

const pureLogging =
	(fn, logger = console.log) =>
	(...args) => {
		console.log("Starting function with parameters", ...args);

		try {
			const result = fn(...args);
			logger(result);
			logger("End Function");
		} catch (error) {
			logger("error thrown is" + " " + error);
			throw error;
		}
	};


	const getTime =()=>performance.now()

	const addTiming =
		(fn, timmer = ()=>new Date().getTime(), logger = console.log) =>
		(...args) => {

			try {
				let start = timmer();
				logger("Starting Function at" + start);
				const result = fn(...args);
				logger(`Ending Function at ${timmer() - start}`);
				return result
			} catch (error) {
				logger("error thrown is" + " " + error);
				throw error;
			}
		};	

const memoizingFunc = (fn) => {
	let cache = {};

	return (x) => {
		return x in cache ? cache[x] : (cache[x] = fn(x));
	};
};

function fib(n) {
	if (n == 0) {
		return 0;
	} else if (n == 1) {
		return 1;
	} else {
		return fib(n - 2) + fib(n - 1);
	}
}
// addTiming(fib)(35);
// addTiming(fib)(35);
// let memoizedFib = addTiming(memoizingFunc(fib));
// memoizedFib(38)
// memoizedFib(35)
// console.log(memoizedFib(40))

let onceRevisited = (fn)=>{
	let done = false;
	let result;
	return (...args)=>{
		if(!done){
			done = true
			result = fn(...args);
		}
		return result;
	}
}


let onceRevisited2 = (f,g)=>{
	let done = false;
	return (...args)=>{
		if(!done){
			done = true
			return f(...args);
		}else{
			return g(...args);
		}
	}
}

let onceRevisited3 = (f,g)=>{
	let toCall = f;
	return (...args)=>{
	      let result =toCall(...args);
		  toCall =g;
		  return result;
	}
}


let invert = fn =>(...args)=> -fn(...args);


let uniary = fn=>(...args)=>fn(args[0]);
let airy = (fn,n) =>(...args)=>fn(args.slice(0,n));

const binaryOP=(op)=>{
	switch(op){
		case "+":
			return (x,y) => x+ y;
	}
}
let sum =(arr)=>arr.reduce(binaryOP("+"),0);


//converting function to promises

const promisify = fn => (...args)=> new Promise((res ,rej)=> fn(...args,(err,data)=>err ? rej(err):res(data)));


const getField = attr =>obj=>obj[attr]


const demethodize = fn => (arg0, ...args)=>fn.apply(arg0, args);

const demethodizeWithBind = fn => (...args)=>fn.bind(...args)();


const some = demethodizeWithBind(Array.prototype.some);

console.log(some("hello",x=>x=="w"))


const radmomize = (...fns)=>(...args)=>{
	let index = Math.floor(Math.random()* fns.length)
	return fns[index](...args);
}

// const fn1 = ()=>console.log("fn1");
// const fn2 = ()=>console.log("fn2");

// const fn3 = ()=>console.log("fn3");
// const fn4 = ()=>console.log("fn4");


// let ran = radmomize(fn1,fn2,fn3, fn4);
// ran();


