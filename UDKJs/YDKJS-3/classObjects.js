/*
JS do not have classes
it is just a class like syntax
classes in othe languages behave differntly than the classes in JS

A class is a blueprint just like an architectural plan we cannot  interact with the class 

to actually get an object which we can interact with we need to instantiate the class with 

In traditional programming language classes and subclasses exits to copy behaviour from the parent to child but in JS
this functionality do not exists so mixins are used for copy behaviour

mixin pattern are used to emulate copy behaviour is Js object

i.e 

function Vehicle (){
    this.engine = 1;
}
Vehicle.protype.ignition = function(){
    console.log("this is starting")
}
Vehicle.prototype.drive= function(){
    console.log("Rolling Down")
}

function Car (){
    var car = new Vehicle();
    car.wheels =4;
    car.engine=2;
    var vehDrive = car.drive;
    car.drive =function(){
        vehDrive.call(this);
        console.log("rolling and moving")

    }

    return car;
}

*/