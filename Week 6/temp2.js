let a = 20;
let b = 10;

function add(val1, val2) {
  let total = val1 + val2;
  console.log(total);
}

function whatIsMyGrade(marks) {
  if (marks > 80) {
    return "HD";
  } else if (marks < 40) {
    return "FAIL";
  } else {
    return "PASS";
  }
}

function subtract(val1, val2) {
  let res = val1 - val2;
  return res;
}

let score = 57;
let msg = whatIsMyGrade(score);
console.log(msg);

let c = add(a, b);
console.log(c);
// console.log(total);
a = 40;
b = 14;
c = subtract(a, b);

console.log(c);
c = ads(134, 67);
console.log(c);
