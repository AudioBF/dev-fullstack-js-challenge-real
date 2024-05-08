$(document).ready(function () {
  fetchStudentList();
  $("body").on("click", ".removeStudent", function () {
    const ra = $(this).data("ra");
    const confirmation = confirm(
      "Voce realmente deseja excluir esse estudante?"
    );
    if (confirmation) {
      deleteStudent(ra);
    }
  });
  $("#formSearchStudent").submit((event) => {
    event.preventDefault();
    fetchStudentList(event.target.searchInput.value);
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


