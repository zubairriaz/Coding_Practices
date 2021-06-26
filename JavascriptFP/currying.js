//currying is the process of transforming an m array function into a sequence of m unary functions which receive only one argument of the original function
//final one does all the calculations

const make3 =a=>b=>c=>a+b+c;

const addVAT = (rate, amount) => amount * (1 + rate / 100);


let addVATCur = rate => amount => amount * (1 + rate / 100);

addVATCur = addVATCur(20);


const curryingByHand = (x,y)=>{
    if(x!=null && y!= null){
        return x+y
    }
    else if(x!=null && y == null){
        return z=>curryingByHand(x,z)
    }
    else{
        return curryingByHand
    }
}

const curryByBind = fn =>{
    console.log(fn, fn.length)
    return fn.length == 0 ? fn() : p=>{return curryByBind(fn.bind(this,p))}
}


const PartialApplicationsWithClosures = (fn, ...args)=>{
    const partialize = (...args1)=>(...args2)=>{
        for(let i=0; i<args1.length && args2.length ; i++){
            if(args1[i] == undefined){
                args1[i] = args2.shift()
            }
        }

        const allParams = [...args1, ...args2]
        return (allParams.includes(undefined) || allParams.length < fn.length ? partialize : fn)(...allParams)
    }

    return partialize(...args)
}

const partialCurrying = fn => fn.length ==0 ? fn():(...p)=>partialCurrying(fn.bind(this,...p));

// const partialCurrtingWithlosures;


const flipTwo = fn => (a,b)=>fn(b,a);

let funct = (a,b) => console.log(`${a}:${b}`)

funct = flipTwo(funct)


const sumMany =(total)=>{
return x=>{
        return x === undefined ? total : sumMany(total + x)
    }
}



const PartialCurryingWithClosures = (fn,len = fn.length)=>{
    const currying = (...args)=>(...args1)=>{
        const allParams = [...args, ...args1];
        return (allParams.length < len ? currying:fn)(...allParams)
    }

    return currying
}



const three3 = (a,b=10,c=10,d=10)=>a+b+c+d;
// let threePartialieWithClosures = PartialCurryingWithClosures(three3);
// threePartialieWithClosures = threePartialieWithClosures(2);
// console.log(threePartialieWithClosures(4)(2,4))

const unary = fn => x=>fn(x)
let unaryThree = unary(three3);
console.log(unaryThree(10))




// const three = (a,b,c) => a+b+c;
// let make3Partialize = PartialApplicationsWithClosures(three, 2,undefined,2);
// console.log(make3Partialize(3))






const applyStyle = (style)=>str=>{
   return `<${style}>${str}</${style}>`
}

let makeBold = applyStyle("b");
console.log(makeBold("Constatntinopole"))