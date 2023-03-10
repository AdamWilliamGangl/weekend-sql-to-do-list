$(document).ready(onReady);

function onReady() {
    $('#submitBtn').on('click', addTask);
    $('#tasksTable').on('click', '.checkBtn', updateTask)
    $('#tasksTable').on('click', '.deleteBtn', deleteTask)
}

//Function to add a new item to the task list.
function addTask() {

}

//Function to get an updated task list from the database.
function getTask() {
$.ajax({
    type: 'GET',
    url: '/tasks'
}).then((response) =>{
    console.log('Inside GET - this is the response:', response)
    render(response);
}).catch((error) =>{
    console.log('Error in GET', error);
})

};

//Function to update a task on the database.
function updateTask() {

}

//Function to delete a task from the database.
function deleteTask() {

}

//Function to render items to the DOM.
function render(object) {
    $('#tasksTable').empty();

    for (let i = 0; i < object.length; i++) {
        $('#tasksTable').append(`
            <tr data-id=${object.id}>
                <td class="smallTd"><button class="checkBtn">✅ </button></td>
                <td class="taskField">${object.task}</td>
                <td class="dateField">${object.date}</td>
                <td class="mediumTd"> <button>DELETE</button></td>
             </tr>
    `);
    }
}