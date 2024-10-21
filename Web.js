
var modal = document.getElementById("id01");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const mobileNav = document.querySelector(".moblie-navbar-btn");
const navHeader = document.querySelector(".nav");

mobileNav.addEventListener("click", () => {
  navHeader.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faqq");

  faqItems.forEach(function (faqItem) {
    const question = faqItem.querySelector(".question");

    question.addEventListener("click", function () {

      faqItem.classList.toggle("active");

      faqItems.forEach(function (item) {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });
    });
  });
});

const firebaseConfig = {
  apiKey: "AIzaSyAVhXdOBbfDm9EFVgGfK_1dcrEg6MF5T0o",
  authDomain: "rtmnu-studyhub.firebaseapp.com",
  databaseURL: "https://rtmnu-studyhub-default-rtdb.firebaseio.com",
  projectId: "rtmnu-studyhub",
  storageBucket: "rtmnu-studyhub.appspot.com",
  messagingSenderId: "224044049969",
  appId: "1:224044049969:web:5f43d8b9c5667a8c319710",
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    password: name,
    email: emailid,
    collegeName: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
