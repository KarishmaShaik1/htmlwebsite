let count = 0;
const shareBtn = document.getElementById("shareBtn");
const shareCountText = document.getElementById("shareCount");
const submitBtn = document.getElementById("submitBtn");

if (localStorage.getItem("submitted")) {
  disableForm();
}

shareBtn.addEventListener("click", () => {
  if (count < 5) {
    count++;
    shareCountText.innerText = `Click count: ${count}/5`;
    
    // WhatsApp message
    const message = "Hey Buddy, Join Tech For Girls Community";
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    if (count === 5) {
      shareCountText.innerText += " ✅ Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  if (count < 5){
    alert("Please complete sharing on WhatsApp first.");
    return;
  }
  const fileInput = document.getElementById("fileUpload");
const file = fileInput.files[0];

if (!file) {
alert("Please upload a screenshot before submitting.");
return;
}

const reader = new FileReader();

reader.onload = function () {
const base64File = reader.result.split(",")[1]; // Remove data:/;base64, prefix

javascript
Copycode
const data = {
  name: document.getElementById("name").value,
  phone: document.getElementById("phone").value,
  email: document.getElementById("email").value,
  college: document.getElementById("college").value,
  filename: file.name,
  filetype: file.type,
  filedata: base64File
};

fetch("https://script.google.com/macros/s/AKfycbwhqynGyb1kjjeBkU8uMGEurvYE4MrocZcex-lAcwHlKv_7G49gvfUoFEcLMY4wpHOd/exec", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
})
.then(res => res.text())
.then(response => {
  localStorage.setItem("submitted", true);
  disableForm();
  console.log("Response:", response);
})
.catch(err => {
  alert("Submission failed. Please try again.");
  console.error(err);
});
};

reader.readAsDataURL(file);
});