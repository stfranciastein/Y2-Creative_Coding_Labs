const dob = "13/01/1900";

let age=21;

let yob = dob.substring(6, 10);
let mob = dob.substring(3, 5);
let day = dob.substring(0, 2);
let yobNum = parseInt(yob);

// console.log('You were born on ' + yob + '/' + mob + '/' + day);
// console.log()

let friends = ["Kieron", "Ross", "Josh"];

friends.push("Adarsh", "Ryan", "Eduards", "Jeremi", "Chriss");

friends.splice(3, 0, "Rian");

console.log(friends);

for (let i = 0; i < friends.length; i++ )
{ console.log("Your friend at index " + i + " is " + friends.at(i));

}

let myFriend = {
    name: "John", age: "22", address:"7 Woodbine Park", eircode:"A94V5F4"   
}