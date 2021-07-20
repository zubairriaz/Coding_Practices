function foo(a){
    console.log(a);
}

foo(2);

//RHS Lookup is when we are retreivng and value and LSH lookup os when we are assigning a value to the variable.
//Nested Scopes Just like we have nested blocks and functions we also have nested scopes if a variable cannot be found in the immediate scope the engine consults the outer scope untl it is found or until the outermost scope is reached.

var b =4;
function foo(a){
     console.log(a+b)
}

//b is not present inside the function foo scope but it present outside of it so it is in global scope.

//LHS and RHS lookup behave differnetly
// when RHS lookup fails we get refernce error
//if LHS lookup fails and woulf not found the required variable in the global scopr it will create one in the global scope i.e  b = 4
// In strict mode Javascript disallow this implicit variable decleration in the global scope in that case also refernce error is produced.

//Refernce error is when scope resolution fails 
//type error when scope resolution succeeds but the operation on the reloved variable is not of the type of variable, i.e executing a non function

//Lexical scope is the scope which is defined at lexing time and based on where variables and block of scope are defined at the write time of code.

// When an item is found in the inner most scope bubble, then the outer one to that is not explored.

//Shadowing the inner identifier shadows the outer identifier. 

//Cheating lexical scope

//eval and new Function constructor can be used to dynamically generate code but it modifies the lexical scope in which they are executed. soi they are avaoided for performance reasons.
//with can be explained  as shorthand for using multiple property refrences against the obj without repeating the object refernce itself each time.

var obj = {a:1,b:2,c:3}

obj.a =2
obj.b = 3
obj.c=5

with(obj){
    a =2,
    c=5,
    b=3
}

// with statement create a new lexical scope from the object you passed
// with with passing object is treated as a scope and if some property does not exit in the passing object making LHS lookup on that property will leak the identifier to the global scope i.e

function foo(obj){
    with (obj){
        a =2
    }
}
let o1= {b=2}
foo(o1)
console.log(o1.a) //undefined
console.log(a) // a == 2   Opps global leakage

// In strict mode with is disallowed and various forms of eval are dissalllowed

// with and eval effect performance as javascript engine does not perform lexing time optimization in the code

//A function creates a new scope for that function which can be used for hiding plain object and collision avaoidance.

//IIFE can be used enclosed any function or variable declartion wothout affeting the global namespace

//IIFE uses

(function IIFE(undefined){
    var a;
    if(a === undefined){

    }
})()


(function checksomething(){
    for (var i=0; i<10; i++) {
        console.log( i );
    }
    console.log( i );

})()

//var has function scope while let has block scope/
//variable in catch is block scoped and only available in catch block i.e catch(err){} err only available in catch block
//const is alos block scoped but with fixed value

//Both var and let should be used , var as function scope and let as block scoped


/*hoisting declaration are excuted first
Engine compliles the code before executing it
It is part of compilation to find all declaration and associate them with their scopes
 var a = 2 , javascript sees it as two statments var a, a= 2 , var a is proceessed during complitation and a = 2 is left for execution phsae
 only declaration are hoisted not assignments and executable logic
 ** hoisting happens as per scope e.g 
  variable declared in a function is hoisted in the top of that function not on the top of global scope

 ** function decleration are hoisted but func expression are not

foo()
var func =  foo(){
     console.log("A")
 }  //Error


 ** functions are hoisted first then the variables  
     
 foo() results in 1

 var foo;

 function foo(){
     return 1
 }

 */

 /*
 Closure is when function is able to remeber and access its ;exocal scope even when called pit side of it lexical scope.

 ** function bar{
     let a = 2
     function baz(){
         console.log(a)
     }
     return baz
 }

 let baa = foo()
 baa()

  ** var func ;
     function bar{
     let a = 2
     function baz(){
         console.log(a)
     }
     func = baz
 }

 func() // closure observer
 
 */

 /*
 for (var i =0 ; i<5 ;i++){
     setTimeout(function timer(){
         console.log(i)
     },i*1000)
 }
 */
//6 is printed in all cases, six functions with the name timer are created and all closes over the same shared scope and modifies the same variable var i
// it can be remitted by using IIFE

 /*
 for (var i =0 ; i<5 ;i++){
     (function(){
     setTimeout(function timer(){
         console.log(i)
     },i*1000)
     })()
 }  
 */  // this will not work as the variable i is still in the samhe shared scope

  /*
 for (var i =0 ; i<5 ;i++){
     (function(i){
     setTimeout(function timer(){
         console.log(i)
     },i*1000)
     })(i)
 }  
 */  //this works

 //let declares a variable for each iteration of the loop and initialized with the previous value used in the loop

 //dynamic scope is a cousin to this

 // dynamic scope is not related to where variables and functions are defined during author time instead it related to where the function are called

 // dynamic scope walks up the call stack instead of the nested lexical scope

 // arrow function do not behave like normal functions when it comes to this binding, they discard all bindling rules for this and takes the value of this what it was in the immediate enclosing scope whatever it was.
 //arrow function gives us lexical this.




















