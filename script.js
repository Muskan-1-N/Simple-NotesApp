let notes = [];
let editIndex = -1;

function displayNotes(filter = "") {
  let notesDiv = document.getElementById("notesList");
  notesDiv.innerHTML = "";

  notes.forEach((note, index) => {
    if (note.toLowerCase().includes(filter.toLowerCase())) {
      let box = document.createElement("div");
      box.style.background = "white";
      box.style.padding = "15px";
      box.style.width = "200px";
      box.style.boxShadow = "0 0 4px #aaa";
      box.style.border = "1px solid #ddd";

      box.innerHTML = `
        <b>Note ${index + 1}</b>
        <p>${note}</p>
        <button onclick="editNote(${index})" 
                style="background: #2196f3; color: white; border: none; padding: 5px 10px; margin-right: 5px;">Edit</button>
        <button onclick="deleteNote(${index})" 
                style="background: #f44336; color: white; border: none; padding: 5px 10px;">Delete</button>
      `;

      notesDiv.appendChild(box);
    }
  });
}

function addNote() {
  let text = document.getElementById("noteInput").value.trim();
  if (text === "") {
    alert("Please enter some text!");
    return;
  }

  if (editIndex === -1) {
    notes.push(text);
  } else {
    notes[editIndex] = text;
    editIndex = -1;
    document.getElementById("addBtn").innerText = "Add Note";
  }

  document.getElementById("noteInput").value = "";
  displayNotes();
}

function editNote(index) {
  document.getElementById("noteInput").value = notes[index];
  editIndex = index;
  document.getElementById("addBtn").innerText = "Update Note";
}

function deleteNote(index) {
  if (confirm("Are you sure you want to delete this note?")) {
    notes.splice(index, 1);
    displayNotes();
  }
}

function clearInput() {
  document.getElementById("noteInput").value = "";
  editIndex = -1;
  document.getElementById("addBtn").innerText = "Add Note";
}

document.getElementById("searchInput").addEventListener("input", function () {
  displayNotes(this.value);
});

displayNotes();
