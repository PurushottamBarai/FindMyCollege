let a= Array.prototype.myMap = function(cb) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};

let numbers = [1, 2, 3, 4];
let doubled = numbers.myMap(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]

let words = ['hello', 'world'];
let upperCase = words.myMap(word => word.toUpperCase());
console.log(upperCase); // ['HELLO', 'WORLD']