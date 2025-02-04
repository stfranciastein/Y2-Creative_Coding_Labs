// class Friend {
//     constructor (){
//         this.name = "John";
//         this.number = 239;
//     }
// }

class Friend {
    constructor(_name, _number){
        this.name = _name;
        this.number =  _number;
    }

    report(){
        console.log(this.name, this.number)
    }
}

let friends = [];
friends.push(new Friend("Dave", 291));
friends.push(new Friend("David", 292));
friends.push(new Friend("Davide", 293));