// let billTheUser = (clicked=>{
//   return (...args)=>{
//       console.log(clicked);
//         if(!clicked){
//             clicked = true
//             console.log("Hello");
//         }
//   }  
// })(false)



const once = (fn) =>{
    return (...args)=>{
        if(fn){
            fn(...args)
            fn = null
        }
    }
}

function logger(n){
  console.log(n);
}



let clickedOnce = once(logger);

clickedOnce(2)
clickedOnce(2)
