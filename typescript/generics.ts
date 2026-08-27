

function car<T> (model:T):T {

    return model
}

console.log(car("The model is BMW"))
console.log(car(123))

function IT<A> (subject:A):A {

    return subject
}

console.log(IT("The subject is AI"))
console.log(IT(124))

console.log(IT([1,2,3,4]))
console.log(IT({specialisation: "LLM"}))


// interface

interface employee<T,U> {
    id: T,
    address: U
}

let emp1: employee<string,number> = {
    id: 'KO66',
    address: 123
}

console.log(emp1)


interface department<T,U> {
    deptId: T,
    salary: U
}

let emp2: department <string, number> = {
    deptId: 'computers',
    salary: 2000
}

console.log(emp2)


// class

class Container<T> {

  val: T

  constructor(value :T){
    this.val = value    
  }

  getVal ():T{
    return this.val

  }

}

let containerObj = new Container(7777)


console.log("========================")
console.log("The value inside the class is:", containerObj)
