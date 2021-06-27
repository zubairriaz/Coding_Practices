const getFiled =attr=>obj=>obj[attr];
//but a more general solution would be to get by path

const getbyPath = (arr, obj)=>{
    if (arr[0] in obj){
           return arr.length >1 ? getbyPath(arr.slice(1),obj[arr[0]]) : deepCopy(arr[0])
    }
    else{
        return undefined
    }
}

const setByPath = (arr, value, obj) => {
    if (!(arr[0] in obj)) {
      obj[arr[0]] =
        arr.length === 1 ? null : Number.isInteger(arr[1]) ? [] : {};
    }
  
    if (arr.length > 1) {
      return setByPath(arr.slice(1), value, obj[arr[0]]);
  
    } else {
      obj[arr[0]] = value;
      return obj;
    }
  };