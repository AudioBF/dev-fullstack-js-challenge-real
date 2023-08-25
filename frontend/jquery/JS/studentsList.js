$(document).ready(function () {
  fetchStudentList();
  $("body").on("click", ".removeStudent", function () {
    const ra = $(this).data("ra");
    const confirmation = confirm("Voce realmente deseja excluir esse estudante?");
    if (confirmation) {
      deleteStudent(ra);
    }
  });
});

const deleteStudent = (ra) => {
  fetch(`http://localhost:3000/students/delete/${ra}`, {
      method: "DELETE",
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      fetchStudentList();
    });
};

function fetchStudentList() {
  $(".loader").show("fast");
  $(".content-page").hide("slow");

  fetch("http://localhost:3000/students/list")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const table = $("#studentList tbody");
      table.html("");
      data.map((student) => {
        table.append(`
            <tr>
                <td>${student.ra}</td>
                <td>${student.nome}</td>
                <td>${student.cpf}</td>
                <td>
                    <a href="studentManager.html?ra=${student.ra}">Editar</a>
                    <a class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a>
                </td>
            </tr>
        `);
      });

      $(".loader").hide("fast");
      $(".content-page").show("slow");
    });
}
