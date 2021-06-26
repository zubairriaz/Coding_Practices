const unaryOp = (sign) => (fn) => {
	switch (sign) {
		case "!":
			return (...args) => !fn(...args);
		case "-":
			return (...args) => -fn(...args);
	}
};

let invert = fn =>(...args)=> -fn(...args);
const renverseOperation = unaryOp("-");

const operaton = arr=>-arr.sort();

const reverseSortOperation = invert(operaton);


let composeTwo = (f,g)=>(...args) =>g(f(...args))
let compose = fns=>fns.reduce(composeTwo);







