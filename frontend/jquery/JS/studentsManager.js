$(document).ready(function () {
  const urlSearch = new URLSearchParams(window.location.search);
  const ra = urlSearch.get("ra");
  if (ra) {
    fetchStudent(ra);
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
    fetch("http://localhost:3000/students/save", {
      method: "POST",
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
        console.log(data);
      });
  });
});

function fetchStudent(ra) {
  fetch(`http://localhost:3000/students/find/${ra}`)
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
