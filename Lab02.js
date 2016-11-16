/*********************************************/
/* Kyle Reitsma, CS336, Lab 02               */
/*********************************************/
function Person(firstname, birthdate, friends) {
	this.firstname = firstname;
	this.birthdate = birthdate;
	this.friends = friends;
}

//Change name
Person.prototype.changeName = function(newname) {
	this.firstname = newname;
}

// Compute age - by Naveen Jose
Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//Add friend to friends array
Person.prototype.addFriend = function(newFriend) {
	this.friends.push(newFriend);
}

//Print friends
Person.prototype.printFriends = function() {
	for (i = 0; i < this.friends; i++) {
		console.log(this.friends[i]);
	}
}

//Display a message
Person.prototype.sayHello = function() {
	console.log("Hello, my name is " + this.firstname);
}

var p1 = new Person("Kyle", "1996/04/17", ["Trevor"]);
p1.sayHello();

var p1age = p1.getAge();
console.log("Age is " + p1age);

p1.addFriend("Mitch");
console.log("Friends: " + p1.friends);




//Create student subclass
function Student(firstname, birthdate, friends, subject) {
	Person.call(this, firstname, birthdate, friends);
	this.subject = subject;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.sayHello = function() {
	console.log("Hello, my name is " + this.firstname + " and I'm a student");
}

var s1 = new Student("Trevor", "1995/04/06", ["Kyle"], "Information Systems");

//Check if it is a subclass
s1 instanceof Person;

s1.sayHello();

var s1age = s1.getAge();
console.log("Age is " + s1age);

s1.addFriend("Andrew");
s1.addFriend("D Wood");
console.log("Friends: " + s1.friends);


















