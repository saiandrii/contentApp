const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

export const formattedToday = dd + "/" + mm + "/" + yyyy;

export const colors = {
  itembg: "#31363F",
  bg: "#070F2B",
  outline: "#222831",
  add: "#1B1A55",
  placeholder: "#d6d6d6",
  additionalOne: "#76ABAE",
};
