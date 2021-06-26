//pure functions are those functions which do not depends and (modify) anything outside of their scope and thay always provide the same result foe same inout
//Global State Change
let limitYear = 1999;
const OldEnough = (birthYear) => birthYear <= limitYear;

console.log(OldEnough(2000), OldEnough(1998));

const OldEnough2 = (birthYear) => birthYear <= new Date().getFullYear() - 18;

// Inner State Changes
const roundNext = (function () {
	let acc = 0;
	return (n) => {
		let nRounded = Math[acc > 0 ? "ceil" : "floor"](n);
		acc += n - nRounded;
		return nRounded;
	};
})();

// Argument Mutation

let maxString = (a) => [...a].sort().pop();

let countries = ["abc", "def", "ghi", "jkl", "mno"];

console.log(maxString(countries));
console.log(countries);

//pure functions are self documented, easy to understand , maintain and test, and are predictable.

// tow ways of avoiding impure functions
// Avoiding the usage of state
//Using a common pattern injection

//Avoiding the use of state

//Provide the part of the state as argument to he function

const OldEnough3 = (cuurentYear, birthYear) => birthYear <= cuurentYear - 18;

let accum = 0;
const roundNext2 = (acc, n) => {
	let nRounded = Math[acc > 0 ? "ceil" : "floor"](n);
	acc += n - nRounded;
	return { acc, nRounded };
};

let { a, r } = roundNext2(accum, 3.14);
accum = a;

//if a function uses another impure function then inject this imoure function into the functions
// const getRandomFileName = (fileExtension = "") => {

//     for (let i = 0; i < NAME_LENGTH; i++) {
//       namePart[i] = getRandomLetter();
//     }

//   };

const getRandomFileName = (fileExtension = "", randomFileNameGenerator) => {
	for (let i = 0; i < NAME_LENGTH; i++) {
		namePart[i] = randomFileNameGenerator();
	}
};

const getRandomLetter = () => {
	let min = "A".charCodeAt();
	let max = "Z".charCodeAt();
	return String.fromCharCode(Math.floor(Math.random() * (1 + max - min)) + min);
};

// Testable GetRandomLetter
const getRandomLetter2 = (getRandomFun = Math.random) =>{
    let min = "A".charCodeAt();
	let max = "Z".charCodeAt();
	return String.fromCharCode(Math.floor(getRandomFun() * (1 + max - min)) + min);
}

console.log(getRandomLetter2(()=>0.99));