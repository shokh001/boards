let boards = [];
let selectTitle = -1;
let selectTask = -1;
let selectTask2 = -1;

function showCard() {
    // document.getElementById("card").classList.remove("d-none");
    // document.getElementById("card").classList.add("d-none");
    document.getElementById("card").classList.toggle("d-none");
}

function addBoard() {
    let title = document.getElementById('board-title').value;

    if (title.length > 0) {

        document.getElementById("board-title").value = "";
        let newBoard = {
            title: title,
            tasks: []
        };

        if (selectTitle >= 0) {
            boards[selectTitle].title = title;
            selectTitle = -1;
        } else  {
            boards.push(newBoard);
        }

        drawPage();
    }
}

function drawPage() {
    let result = '';

    for (let i=0; i<boards.length; i ++) {

        let result2 = '';

        for (let j=0; j<boards[i].tasks.length; j ++) {
            result2 += "<div class='task'><span onclick='editTask("+ i +","+ j +")' class='d-block'>"+ boards[i].tasks[j] +"</span><div class='task-close' onclick='deleteTask("+i+","+j+")'>&times;</div></div>"

        }

        result += "<div class='col-lg-4 col-md-6 col-12 mb-3'>" +
            "<div class='card'>" +
            "<div class='board-close' onclick='deleteBoard("+i+")'>&times;</div>" +
            "<div class='card-header'><h5 onclick='editTitle("+ i +")'>"+ boards[i].title +"</h5></div>" +
            "<div class='card-body'>"+ result2 +"</div>" +
            "<div class='card-footer'>" +
            "<textarea id='task-title"+ i +"' class='form-control' placeholder='Type here'></textarea>" +
            "<button type='button' class='btn btn-success mt-3 d-block ml-auto' onclick='addTask("+ i +")'>Add</button>" +
            "</div>" +
            "</div>" +
            "</div>"
    }

    document.getElementById('result').innerHTML = result;
}

function addTask(index) {
    let task = document.getElementById('task-title' + index).value;

    if (task.length > 0) {
        document.getElementById("task-title" + index).value = "";
        if (selectTask >= 0 && selectTask2 >= 0) {
            boards[selectTask].tasks[selectTask2] = task;
            selectTask = -1;
            selectTask2 = -1;
        } else  {
            boards[index].tasks.push(task);
        }

        drawPage();
    }

}

function deleteTask(index, index2) {
    boards[index].tasks.splice(index2,1);

    drawPage();
}

function deleteBoard(index) {
    boards.splice(index,1);

    drawPage();
}

function editTitle(index) {
    document.getElementById("board-title").value = boards[index].title;

    selectTitle = index;
}

function editTask(index, index2) {
    document.getElementById("task-title"+index).value = boards[index].tasks[index2];

    selectTask = index;
    selectTask2 = index2;
}