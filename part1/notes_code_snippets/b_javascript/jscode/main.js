// `This` in object's methods (functions)
const arto = {
    name: "Arto Hellas",
    age: 35,
    education: "PhD",

    greet: function () {
        console.log("hello, my name is " + this.name);
    },
    doAddition: function (a, b) {
        console.log(a + b);
    },
};

arto.greet(); // "hello, my name is Arto Hellas" gets printed
arto.doAddition(1, 4); // 5 is printed
const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15); // 25 is printed

const referenceToGreet = arto.greet;
// `this` become the `Global Object` not arto object.
//referenceToGreet(); // prints "hello, my name is undefined"

// `JS engine` calling the greet method so `this` refers to the `Global Object`
//setTimeout(arto.greet, 1000); // prints "hello, my name is undefined"

// Fixing the `this` issue using the `bind` method
//setTimeout(arto.greet.bind(arto), 1000); // prints "hello, my name is Arto Hellas"

// -------------------------------------------------------
// Classes
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log("hello, my name is " + this.name);
    }
}

const adam = new Person("Adam Ondra", 29);
adam.greet();

const janja = new Person("Janja Garnbret", 23);
janja.greet();

setTimeout(adam.greet.bind(adam), 1000);
setTimeout(janja.greet.bind(janja), 1000);
