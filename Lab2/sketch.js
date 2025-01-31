let friend01 = {name:"Fred", age:66, bowling:true };
let friend02 = {name:"Mary", age:59, bowling:false };
let friend03 = {name:"Susan", age:28, bowling:true };
let friend04 = {name:"Larry", age:160, bowling:true};
let friend05 = {name:"Bevin", age:27, bowling:false};

let friends = [];
let friendsAges = [];
let friendsBowlingAges = [];
let para = document.getElementById("para");

friends.push(friend01)
friends.push(friend02)
friends.push(friend03)
friends.push(friend04)
friends.push(friend05)


console.log(friends);
console.log('You have ' + friends.length + ' friends');

// for (let i = 0; i < friends.length; i++){
//     console.log(friends[i].name + '. He is ' + friends[i].age + ' years old')
//     if (friends[i].bowling == true){
//         console.log(friends[i].name + ' likes bowling')
//     }
//     else {
//         console.log(friends[i].name + ' does not like bowling')
//     }
// }


for (let i=0; i < friends.length; i++){
    friendsAges.push(friends[i].age)
}

for (let i=0; i < friends.length; i++){
    if (friends[i].bowling){
    friendsBowlingAges.push(friends[i].age)
    }
}

console.log(+ friendsBowlingAges.length + ' of them like bowling. ');

//No parametres
// function calcAvg() {
//     let initial = 0;
//     for (let i = 0; i < friendsBowlingAges.length; i++) {
//         initial = initial + friendsBowlingAges[i]
//     }
//     initial = initial / friendsBowlingAges.length;
//     console.log(initial)
// }

//With parametres
function calcAvg(numberArray) {
    let initial = 0;
    for (let i = 0; i < numberArray.length; i++) {
        initial = initial + numberArray[i]
    }
    return initial / numberArray.length;
}

// for (let i = 0; i < 100; i++){
    
//     if (i%5 == 0){
//         console.log(i)
//     };
// }

friendsAges.sort((a,b) => (a-b));
friendsBowlingAges.sort();
console.log(friendsAges);

function median(arrayNums){
    arrayNums .sort((a,b) => (a-b))
    if (arrayNums.length%2==0){
        x = arrayNums.length/2;
        y = x - 1;
    
        return (arrayNums[x] + arrayNums[y])/2

        // return (arrayNums[arrayNums.length/2-1]+arrayNums[(arrayNums.length/2)])
    }
    else 
        return arrayNums[Math.floor(arrayNums.length/2)]
}