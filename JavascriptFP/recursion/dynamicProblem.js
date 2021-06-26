let makechange = (n, bills)=>{
    if(n < 0){
        return 0
    }
    else if( n == 0){
        return 1
    }
    else if (bills.length ==0 ){
        return 0
    }
    else{
        return makechange(n, bills.slice(1)) +  makechange(n-bills[0], bills)
    }
}


const memoizefunc = fn =>{
    let cache ={};
    return (...args)=>{
        let stringyArgs= JSON.stringify(args);
     
        return cache[stringyArgs] ? cache[stringyArgs]: (cache[stringyArgs] = fn(...args))
    }
}

 makechange = memoizefunc(makechange);


const mapR = (arr, cb)=>{
    return arr.length == 0 ? [] : [cb(arr[0])].concat(mapR(arr.slice(1),cb))
}




    
console.log(mapR([1,2], (val)=>console.log(val)));
