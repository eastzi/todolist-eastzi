const selectedTypeButton = document.querySelector(".selected-type-button");
const typeSelectBoxList = document.querySelector(".type-select-box-list");
const typeSelectBoxListLis = typeSelectBoxList.querySelectorAll("li");
const todoContentList = document.querySelector(".todo-content-list");

let listType = "incomplete";

load();

selectedTypeButton.onclick = () => {
    typeSelectBoxList.classList.toggle("visible");
}

for(let i = 0; i < typeSelectBoxListLis.length; i++) {

    typeSelectBoxListLis[i].onclick = () => {
        for(let i = 0; i < typeSelectBoxList.length; i++) {
            typeSelectBoxListLis[i].classList.remove("type-selected");
        }

        const selectedType = document.querySelector(".selected-type");
        
        typeSelectBoxListLis[i].classList.add("type-selected");

        listType = typeSelectBoxListLis[i].textContent.toLowerCase();

        selectedType.textContent = typeSelectBoxListLis[i].textContent;

        todoContentList.innerHTML = "";
        load();

        typeSelectBoxList.classList.toggle("visible");
    }
}

function load() {
    $.ajax({
        type: "get",
        url: `/api/v1/todolist/list/${listType}`,
        data: {
            page: 1,
            contentCount: 20
        },
        dataType: "json",
        success: (response) => {
            console.log(JSON.stringify(response));
            getList(response.data);
        },
        error: errorMessage
    })
}

function getList(data) {
    const incompleteCountNumber = document.querySelector(".incomplete-count-number");
    incompleteCountNumber.textContent = data[0].incompleteCount;

    for(let content of data) {
        console.log(content.todoCode);
        const listContent = `
			<li class="todo-content">
                <input type="checkbox" id="complete-check-${content.todoCode}" class="complete-check" ${content.todoComplete ? 'checked' : ''}>
                <label for="complete-check-${content.todoCode}"></label>
                <div class="todo-content-text">${content.todo}</div>
                <input type="text" class="todo-content-input visible" value="${content.todo}">
                <input type="checkbox" id="importance-check-${content.todoCode}" class="importance-check" ${content.importance ? 'checked' : ''}>
                <label for="importance-check-${content.todoCode}"></label>
                <div class="trash-button"><i class="fa-solid fa-trash"></i></div>
            </li>
		`
        todoContentList.innerHTML += listContent;
    }
}

function errorMessage(request, status, error) {
    alert("요청실패");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}