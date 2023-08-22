$(document).ready(function () {
  fetchStudentList();
});

function fetchStudentList() {
  fetch("http://localhost:3000/students/list")
    .then((response) => {
      
      return response.json();
    })
    .then(function (data) {
        console.log(data);
      const table = $("#studentList tbody");
      data.map(function (student) {
        table.append(`
            <tr>
                <td>${student.ra}</td>
                <td>${student.nome}</td>
                <td>${student.cpf}</td>
                <td>
                    <a href="#">Editar</a>
                    <a href="#">Excluir</a>
                </td>
            </tr>
        `);
      });
    });
}
