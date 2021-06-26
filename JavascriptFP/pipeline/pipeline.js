const curry = fn =>{
    return fn.length == 0 ? fn():(...p)=>curry(fn.bind(this,...p))
}

const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));

const filterOdt = curry(filterByText)(".dt")

let array = ["hello.dt","heeloo","heeeelo.dt"]

const count = array => array.length;


const partTwo = (f,g)=>(...args)=>g(f(...args));


const pipeline =
	(...fns) =>
	(...args) => {
		let result = fns[0](...args);
		for (let i = 1; i < fns.length; i++) {
			result = fns[i](result);
		}

		return result;
	};

    const pipelineReduce = (...fns) =>(...args)=>{
        return fns.reduce((x,y)=>y(x),fns[0](...args))
    }

    const pipelineReduce2= (...fns)=>fns.reduce(pipeTwo);

    const pipeTwo =(a,b)=>(...args)=>b(a(...args))

    const tee = args=>{
        console.log(args)
        return args;
    }

    const tap = curry((fn,x)=>(fn(x),x))

    let tap3 = tap(console.log)




console.log(pipelineReduce2(filterOdt,tap3,count)(array))

