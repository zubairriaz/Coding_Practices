const onceImproved = (f, d) => {
	let done = false;
	return (...args) => {
		if (!done) {
			done = true;
			f(...args);
		} else {
			d(...args);
		}
	};
};

const onceImproved2 = (f, n) => {
	return (...args) => {
		if (n) {
			n--;
			f(...args);
		} 
	};
};

const onceImproved3 = (f, g) => {
    let done = false;
	return (...args) => {
		if (!done) {
			done = true
			f(...args);
		} else{
            done = false
            g(...args)
        }
	};
};


const alternator = (f1,f2) =>{
    return(...args) =>{
        f1(...args)
        [f1,f2] = [f2,f1]
    }
}

const withoutVariables = (f, d) => {
	let done = false;
	return (...args) => {
		if (!done) {
			done = true;
			f(...args);
		} else {
			d(...args);
		}
	};
};