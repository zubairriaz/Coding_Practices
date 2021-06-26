//proxy is an object that wraos another object and intercept its fundamental operations, the fundamental operations include function invocation, property access, property assignment and enumeration.

let object = {
	func: function () {
		console.log("hello");
		return "hello";
	},
	name: "Zubair",
};

let handler = {
	get(target, property, receiver) {
		return target[property];
	},
};

let proxy = new Proxy(object, handler);

proxy.func();

 class City {
	constructor(name, lat, lon) {
		this.name = name;
		this.lat = lat;
		this.lon = lon;
	}

	getName() {
		return this.name;
	}
	setName(name) {
		this.name = name;
	}
	getLat() {
		return this.lat;
	}
	setLat(lat) {
		this.lat = lat;
	}
	getLon() {
		return this.lon;
	}
	setLon(lon) {
		this.lon = lon;
	}
}

getHandler={
    get(target, property, receiver){
        if(typeof target[property] == 'function'){
            return (...args)=>{
                let result = target[property](...args)
                if(result == undefined){
                    console.log(target,receiver)
                }
                return result == undefined ? receiver : receiver
            }
        }else{
            return target[property]
        }
    }
}

let city = new City("Lahore",23.4,42.4);
const chaining = obj => new Proxy(obj, getHandler);

let proxiedCity = chaining(city);

proxiedCity.setName("bilal").getLon().setLon(48).setLat(49);
console.log(city)