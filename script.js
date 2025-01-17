const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for '×' symbol
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("ul li");
    tasks.forEach(task => {
        if (filter === "all") {
            task.style.display = "block";
        } else if (filter === "completed" && task.classList.contains("checked")) {
            task.style.display = "block";
        } else if (filter === "pending" && !task.classList.contains("checked")) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Load tasks when the page is reloaded
showTask();

