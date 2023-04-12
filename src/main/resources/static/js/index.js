const selectedTypeButton = document.querySelector(".selected-type-button");
const typeSelectBoxList = document.querySelector(".type-select-box-list");
const typeSelectBoxListLis = typeSelectBoxList.querySelectorAll("li");
const todoContentList = document.querySelector(".todo-content-list");
const sectionBody = document.querySelector(".section-body");

let page = 1;
let totalPage = 0;

sectionBody.onscroll = () => {
    console.log("sectionBody: " + sectionBody.offsetHeight);
    console.log("scrollTop: " + sectionBody.scrollTop);
    console.log("todoContentList: " + todoContentList.offsetHeight);

    let checkNum = todoContentList.clientHeight - sectionBody.offsetHeight - sectionBody.scrollTop;

    if(checkNum < 1 && checkNum > -1 && page < totalPage) {
        //alert("get newList");
        page++;
        load();
    }
}

let listType = "all";

load();

selectedTypeButton.onclick = () => {
    typeSelectBoxList.classList.toggle("visible");
}

for(let i = 0; i < typeSelectBoxListLis.length; i++) {

    typeSelectBoxListLis[i].onclick = () => {
        page = 1;

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
            "page": page,
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

function setTotalCount(totalCount) {
    totalPage = totalCount % 20 == 0 ? totalCount / 20 : totalCount / 20 + 1
}

function getList(data) {
    const incompleteCountNumber = document.querySelector(".incomplete-count-number");
    incompleteCountNumber.textContent = data[0].incompleteCount;
    setTotalCount(data[0].totalCount);

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

    addEvent();
}

function addEvent() {
    const todoContentList = document.querySelectorAll(".todo-content");

    for(let i = 0; i < todoContentList.length; i++) {
        let todoCode = todoContentList[i].querySelector(".complete-check").getAttribute("id");
        let index = todoCode.lastIndexOf("-");
        todoCode = todoCode.substring(index + 1);
        console.log("todoCode: " + todoCode);

        todoContentList[i].querySelector(".complete-check").onchange = () => {
            updateStatus("complete", todoCode)
        }
        todoContentList[i].querySelector(".importance-check").onchange = () => {

        }
        todoContentList[i].querySelector(".trash-button").onclick = () => {

        }
    }
}

function updateStatus(type, todoCode) {
    result = null;

    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/todolist/${type}/todo/${todoCode}`,
        dataType: "json",
        success: (response) => {
            result = response.data 
            console.log(result);
        },
        error: errorMessage
    });

    return result;
}

function updateComplete(todoContent) {

}

function updateImportance(todoContent) {

}

function deleteTodo(todoContent) {

}

function errorMessage(request, status, error) {
    alert("요청실패");
    console.log(request.status);
    console.log(request.responseText);
    console.log(error);
}