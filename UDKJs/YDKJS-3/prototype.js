/*
In JS every object has an internal property called prototype which links to other objects
** the normal get opertion consults the prototype chsin fpr e.g if a property is not foudn on an object protype chain 
is consulted and it goes higher and higher until the property si found or end of chain is reached
End of chain is an Object.prototype object which contains all methods like hasOwnProperty, valueOf, isPrototypeOf

** setting a property on an object appear simple but it is not there are three variations

* if a property is not found on an object and on prototype chain or if property is found in property chain but with writeable property of proeprty set to true
a new property is added on the object

** if a property is found in prototype chain but value writeable to false , it is silengtly ignored and instrict mode error is thrown

*** if a property is found higher in the chain and it has a setter than the setter is called and no property is added 
on the object.

case 2 and 3 can be overrriden with Object.defineProperty (...) method.

JS donot have the blueprints for object and it is one of very few languages where an object can be created directly.
you define behaviours and properties on the objects directly

In JS every function has an internal property called prototype calling new on that function produces an object that object prototype is linked to function name.prtotype object

prototype property allows us to link objects together

we define method only once on protype and all object have access to the method using the prototype chain

This is called behaviour delegation instead of creating copies of properties and functionality in terms of classes we are linking objects in JS
protype delegation

function Foo(name){
    this.name = name;
}

Foo.prototype.getName(){
    this.name;
}

function Bar(name,label){
    Foo.call(this,name)
    this.label = label;
}

Bar.prototype.getLabel(){
    this.label;
}



Bar.prototype = Object.create(Foo.prototype);
*/