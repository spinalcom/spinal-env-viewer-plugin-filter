// const style = {
//   width: "24px",
//   height: "24px",
//   backgroundColor: "red",
//   position: "absolute",
//   top: "80px",
//   right: "180px"
// }

const filterImage = require("../assets/filter.svg");


const AddBtnFunction = function() {
  let container = document.getElementsByTagName("body")[0];

  let element = document.createElement("img");

  // element.className = "fas fa-filter";
  element.style.width = "20px";
  element.style.height = "18px";
  //   element.style.backgroundColor = "red";

  element.style.cursor = "pointer";

  element.src = filterImage;
  element.style.position = "absolute";
  element.style.top = "80px";
  element.style.right = "180px";


  container.append(element);

}

export default AddBtnFunction;




// let newBtn = document.createElement("div")
// newBtn.className = "other"
// newBtn.style.width = "24px"
// newBtn.style.height = "24px"
// newBtn.style.backgroundColor = "red";