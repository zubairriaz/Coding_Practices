let sum = (n)=>{
    return n == 0 ? 0 : n + sum(n-1);
}

let sum2 = (n, cont) => {
	return n == 0 ? ()=>cont(0) : ()=>sum2(n - 1, (v) =>()=> cont(v + n));
};

function Thunk(fn) {
    this.fn = fn;
  }
  
  const trampoline = (fn) => {
    while (typeof fn === 'function') {
      fn = fn();
    }
    return fn;
  };

  const sumAll3 = n => {
    const sumAllT = (n, cont) =>
      n === 0 ? () => cont(0) : () => sumAllT(n - 1, v => () => cont(v + n));
  
    return trampoline(sumAllT(n, x => x));
  };


console.log(sumAll3(30000))