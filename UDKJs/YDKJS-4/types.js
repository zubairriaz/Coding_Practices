/*
Javascript has seven built types
null
undefined
object,
number
boolean
string
symbol

variable have not types its the value that is typed

undeclared vs undefined undefined are those variables which are declared but value is not assigned to them undecalred are 
those whichj are not even declared.

undeclared give refernce error

type of undeclared gives undefined

checking typeof null,null gives typeof object to chek typeof correctly
if(!a && typeof(a)=='object')

typeof on undeclared variable gives undefined byt this is safety guard can help us to check undeclared variables

like loading variables from multiple files
 
we want to use DEBUG but it is in another file may be loaed ot not
 we cannot check like this if(DEBUG)

 this will give error

 we can check like this if(typeof DEBUG !== undefined)
*/

/*
Arrays and String 
There are some DOM elements representations
that are not actually arrays but look loikr it 
they can be converted to Arrays with Array.from(...)

String and Arrays have some common methods like
concat etc but Arrays values are mutable and string values are immutable. so we can use the methods
of arrays that return new arrays on the strings also like
map

Array.prototype.map.call(string,---args);


but we cannot use this appraoch with arrays modifier that mutates the array.


*/


/*
Numbers

toFixed is used for restricting large numbers to fix digits
toPrecision is similar to tofixed but specifies how many significant digits should be used for 
numbers

octal and binary numbers are also supported in ES6
 0.2 + 0.1 ==3 false
 because it will be equal to 0.30000000004
 because it JS the numbers are stored in binary floating point numbers
 and the representation of 0.1 and 0.2 is not accurate

 so what should be done 
 The most commonly accepted practise is to use a tiny value as the Rounding Error
 which is Number.EPSILON

 Math.abs(a-b)<Number.EPSILON

*/

/*Symbols are not objects they ae scalar
they cannot called with  new


literal syntax should be preferrred for Object, Array and String 

unbloxing can be done by using value of

boxing can be used for refernce in functions

JSON.stringify can also be used to stringify the primitive values but it does not work on objects with circular refrences
Also if an object has toJson method on it it will be called first to serailize the object
if you intend to stringify an object that contain illegal values and is not approprate for stringification you can define your own toJson method on it.

parseInt vs number
parseInt is tolerant of numeric characters in the input while the number is not

var b = 42px

Number(b) //NaN

parseInt(b) 42






*/