/*
Call back are used for executing some part of code now and osme part lter in time
its possible to do syncrnous call with ajax but it should be avoided as it blocks the UI

console.log is an IO operation an dit can be defered by JS engine

setTimeout creates an event which is the timer that indicates that this part of the code is to be executed
later

Event loop is a mechanism that enables the Js engine to run multiple chunks of the code over time
it can be conceptualized as a queue which continpusly checks for events or callbacks in them and execute them on each tick.
tick can be conceptualized as sigle iteration.

JS call stack which keep tracks of flow of the program and where the current execution is
Event queue in which evnets are added by the External API browser or system incase of Node


Callbacks are the mechanism by which event loop call backs into program they are used for handling asynchrony in the code.
But they have some major problems assocaiated with them 
1 not sequentiality whicj creates a nested strucuture which is hard to reason about difficult to understand and hard to maintain
2 inversion of control give our continuation in callback to somrthird party which can lead to some hard to track and sometimes unexpected behabiours.


Promise is extremly immutable once resolved.
Promise is an object that produces a value in the future which you can code with it in now.


































*/