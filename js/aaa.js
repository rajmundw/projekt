newArr=[['a','2018-12-09'],['a','2017-12-19'],['a','2018-01-09'],['a','2015-12-09'],['a','2016-12-09'],['a','2018-12-09']]


newArr=newArr.map(a=>{
    let b = a[1].replace('-','')

    return [a[0],b]
})
newArr=newArr.map(a=>{
    let b = a[1].replace('-','')

    return [a[0],b]
})
console.log(newArr)

newArr.sort((a,b)=>{
    return Number(b[1])-Number(a[1])
})
console.log(newArr)