$(document).ready(function () {
  if (isEditingMode()) {
    fetchStudent();
  } else {
    $(".loader").hide();
    $(".content-page").show();
  }

  $("#studentForm").submit((event) => {
    event.preventDefault();
    const body = {
      name: $(this).find("#name").val(),
      email: event.target.email.value,
      ra: $(this).find("#ra").val(),
      cpf: $(this).find("#cpf").val(),
    };

    let methodEndPoint;
    let urlEndPoint;

    if (isEditingMode()){
      methodEndPoint = "PUT";
      urlEndPoint= `http://localhost:3000/students/edit/${getRAFromUrl()}`;
    }else{
      methodEndPoint="POST" ;
      urlEndPoint=`http://localhost:3000/students/save`;
    }
    
    fetch(urlEndPoint, {
        method: methodEndPoint,
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          document.location.href = "studentsList.html";
        });
  });
});

function fetchStudent() {
  fetch(`http://localhost:3000/students/find/${getRAFromUrl()}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const studentForm = $("#studentForm");

      studentForm.find("#name").val(data.name);
      studentForm.find("#email").val(data.email);
      studentForm.find("#ra").val(data.ra);
      studentForm.find("#cpf").val(data.cpf);

      $(".loader").hide("fast");
      $(".content-page").show("slow");
    });
}

function isEditingMode() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.has("ra");
}

function getRAFromUrl() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.get("ra");
}
