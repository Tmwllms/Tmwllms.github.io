const header = document.querySelector("header");
console.log(header.innerHTML);
header.innerHTML += `<h3> this is ${course} </h3>`;
const topHeading = document.querySelector("h1");
console.log(header.innerHTML);
// console.log(topHeading);
// console.log(topHeading.textContent);
// topHeading.textContent = "This is a new heading";
// topHeading.style.color = "crimson";

const allParas = document.querySelectorAll("p");
// console.log(allParas);
// console.log(allParas.textContent);
for (let i = 0; i < allParas.length; i++) {
  //   console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid green";
  allParas[i].style.backgroundColor = "beige";
}

const myFirstSub = document.querySelector("#first-subheading");
// console.log(myFirstSub);
// console.log(myFirstSub.textContent);
