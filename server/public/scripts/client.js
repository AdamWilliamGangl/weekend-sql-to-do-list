$(document).ready(onReady);

function onReady() {
    getTask();
    $('#submitBtn').on('click', handleSubmit);
    $('#tasksTable').on('click', '.checkBtn', updateTask)
    $('#tasksTable').on('click', '.deleteBtn', deleteTask)

}

//function to pass values into the addTask function.
function handleSubmit() {
    let item = {};
    item.task = $('#toDoTask').val();
    item.date = $('#dueBy').val();
    addTask(item);
}
//Function to add a new item to the task list (POST).
function addTask(taskToAdd) {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then((response) => {
        console.log('Inside POST - this is the response:', response)
        getTask();
    }).catch((error) => {
        console.log('Error in POST', error);
    })
}

//Function to get an updated task list from the database (GET).
function getTask() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then((response) => {
        console.log('Inside GET - this is the response:', response)
        render(response);
    }).catch((error) => {
        console.log('Error in GET', error);
    })
};

//Function to update a task on the database (PUT).
function updateTask() {
    console.log('This is $(this)', $(this));
    console.log('this.parent().parent().data()', $(this).parent().parent().data());
    const idToMarkDone = $(this).parent().parent().data().id;
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToMarkDone}`
    }).then((response) => {
        console.log('Mark as read was complete for id:', idToMarkDone);
        getTask();
    }).catch((error) => {
        console.log('Error marking a task as done for id:', idToMarkDone, error);
    })
};

//Function to delete a task from the database (DELETE).
function deleteTask() {
    const idToDelete = $(this).parent().parent().data().id;
    console.log('ID to delete', idToDelete)
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then((response) => {
        console.log('Deletion was complete for id:', idToDelete);
        getTask();
    }).catch((error) => {
        console.log('Error making a deletion for id:', idToDelete, error);
    })
};

//Function to render items to the DOM.
function render(object) {
    $('#tasksTable').empty();
    console.log('This is the object:', object);
    for (let i = 0; i < object.length; i++) {
        $('#tasksTable').append(`
            <tr data-id=${object[i].id}>
                <td class="smallTd"><button class="checkBtn">✅ </button></td>
                <td class="taskField">${object[i].task}</td>
                <td class="dateField">${object[i].date}</td>
                <td class="mediumTd"> <button class="deleteBtn">DELETE</button></td>
             </tr>
    `);
    }
}