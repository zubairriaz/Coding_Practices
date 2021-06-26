function ShowItself(identity) {
	this.identity = identity;

	setTimeout(function () {
		console.log(this.identity);
	}, 1000);
}


function ShowItself2(identity) {
	this.identity = identity;
	setTimeout(function () {
		console.log(this.identity);
	}.bind(this), 1000);

    let that = this;

    setTimeout(function () {
		console.log(that.identity);
	}, 2000);

    setTimeout(()=> {
		console.log(that.identity);
	}, 3000);
}

console.log(xyz);

const xyz = 0

function SomeFunction(someData){
	return SomeOtherFunction(someData)
}    // can be replaced with

SomeOtherFunction(someData);




