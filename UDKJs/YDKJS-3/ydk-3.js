//This mechanism allows to implicitly bind an object refernce to a function
//arguments.callee references the function object inside the function
/*
`This` does not refers to the function object inside the function
`This` does not refers to the function lexical scope and it cannot create bridge
*/


/*
SO what is THIS
`This` depends on the how the function was called and from where it was called, it is not an author time binding but a runtime binding.
it depends on the call site and the call stack of the function
This has four rules with which it works 

1- default binding 
*When a function is called simply then the default binding rules apply and in default binding this refer to the global object.
**if the contents of the function are runnning in strict mode the this default bindling to global object does not happen and instead this refer to undefined

2- Implicit Binding
When a function is called with a refernce to some object or called as a property of some object than the this refers to that object
But when that refernce is  assingned to some other variable then default binding rules apply

var obj = {
    a: 1,
    foo:function foo(){ console.log(this.a)}
}
var a = 2;
var bar = obj.foo;
bar()  // output will be 2 because bar is just a reference to foo not the obj and call site is nust plain and undecorated function so default binding rules applu
The This referce is lost
Similar is when we pass the function and it is called simply


3 Explicit binding
Call and apply allow to explicity bind the this with the object that you passed as an argument.
for e.g
function foo(){console.log(this.a)}
var obj = {a:1, b:2}
foo.call(obj) // output 1

4 Hard binding
When you wrapp the function so it binding cannot be changed it called hard binding

function foo(){console.log(this.a)}
var obj = {a:1, b:2}
fcuntion bar(){foo.call(obj)}

bar() // out put is 1

bar.call(window) output is 1
settimeout(bar,100) output is 1

bar hardbinded the function to obj

javascript bind function also do the same


4 one is new Binding
when a function is called with new it creates a new object out of thin air
the newly created object is assigned to this inside the function call
the newly created object is returend automatically unless fucction return other object

function cons(a){
    this.a = a;
}
var a = new Const (2);

So this binding rules are
if a function is called with new operator this is binds to the new object to be returned from the function
if this is explicity bound then this bounds to the passiong object in call or aply
other eise this a function is called with reernce of object then this refers of the obj
other wise defaulr binding rules apply
if function content are in strict mode this refer to undefind

**When passing null and unndeined to the call, apply and bind method the default binding rules apply which mutate the global object
and can lead to hard to track down bugs in third party libraries

so we should use a Safer this in these case

var so = Object.create(null);
foo.call(so);

Arrow functions provide lexical this means they inherit the this as it is from the enclosing scope whatever it is
they do not abide by the rules of chaging the this 


*/



/*
OBJECTS

function is special subtype of object can be called as callable object functions are first class objects
type of null gives object but this is a bug in the language or a mistake
Arrays are also typeof object in javascript

There are other functions in javascript like String, Number, Date, Boolean, Date, RegExp which are constructor functions and which can generate a new object

typeof "hello world" is "string"
typeof new String("hello world") is object

while accessing propertiuies on string with . like 'hello'.length the JS automatically coercies the primitive to the corresponding object
it is recommnded to use the literal form

Some of the Objects methods

Object.getOwnPropertyDescriptor(obj, 'a')

Object.defineProperty(obj,"b",{
    value:2,
    writable:true,
    configurable:true,
    enumerable:true,
})

Writeble define weather a property can be modified or not if writable is false value cannot be modified and remain same and in strict-mode gives TypeError
Configurable define weather a property can be configured again with definePropert methid again or not
enumerable defines weather a property should be listed in Object.keys method or for in loop of objects.

for(let property in object) check for ll properties of the object even the ones in the prototype chain
Object.keys check for properties but exclude the ones that are set to be enumerable false
Object.getOwnProperty names return all properties of the ibject weather enumerable or not
Object.hasOwnProperty check if the object has property not consulting the protype chain and it check the property weather it is enumerable or not

Object.preventExtension prevents to have object define other properties
Object.Seal is a native method which do not let define any more properties also sets the configurable descriptor on object to false so basically it calls the Object.preventExtension method on object
Object.Freeze calls the object.seal method and also sets the writable property descriptor on all the object to false

Seal object cannot define any more properties and cannot change the configuration
Freezed Object cannot modify the existing properties also is also sealed.

property in obj checks to see if the property is in prototype chain or not

getter and setter can be defined on object as 

let obj = {
get a(){
    return this._a_
}

set a(val){
    this._a_ = val
}}

*/



