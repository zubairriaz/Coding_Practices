const searchArray = (arr, key)=>{
    if(arr.length == 0){
        return false
    }
    else if(arr[0] == key){
        return true
    }
    else{
        return searchArray(arr.slice(1), key)
    }
}

const powerN = (base, power)=>{
    if(power ==0){
        return 1
    }
    else if(power % 2){
        return base * powerN(base,power-1)
    }
    else{
        return powerN(base*base, power/2)
    }
}

console.log(powerN(2,500))