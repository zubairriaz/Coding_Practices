const hanoi = (disks,from,to,extra)=>{
    if(disks>0){
        hanoi(disks -1, from, extra, to)
        console.log(`move disks ${disks} from post ${from} to ${to}`)
        hanoi(disks-1, extra, to,from)
    }
}




const quickSort = (array) => {
	if (array.length < 2) {
		return array;
	} else {
		const pivot = array[0];
		const smaller = array.slice(1).filter((x) => x < pivot);
		const greater = array.slice(1).filter((x) => x >= pivot);
		return [...quickSort(smaller), pivot, ...quickSort(greater)];
	}
};

console.log(quickSort([4,1,5,3,7]))