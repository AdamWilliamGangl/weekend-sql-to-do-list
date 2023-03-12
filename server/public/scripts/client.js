$(document).ready(onReady);

function onReady() {
    getTask();
    $('#submitBtn').on('click', handleSubmit);
    $('#tasksBoard').on('click', '.checkBtn', updateTask);
    $('#tasksBoard').on('click', '.deleteBtn', deleteTask);
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
    resetInputFields();
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
    console.log('this.parent().parent().parent().data().id', $(this).parent().parent().parent().data().id);
    const idToMarkDone = $(this).parent().parent().parent().data().id;
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
    const idToDelete = $(this).parent().parent().parent().data().id;
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this super important post-it!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your post-it has been trashed!", {
                    icon: "success",
                });
                $.ajax({
                    method: 'DELETE',
                    url: `/tasks/${idToDelete}`
                }).then((response) => {
                    console.log('Deletion was complete for id:', idToDelete);
                    getTask();
                }).catch((error) => {
                    console.log('Error making a deletion for id:', idToDelete, error);
                })
            } else {
                swal("Your post-it is safe!");
            }
        });
    
};

function resetInputFields() {
    $('#toDoTask').val('');
    $('#date[type=date]').val('');
};

//Function to render items to the DOM.
function render(object) {
    $('#tasksBoard').empty();
    console.log('This is the object:', object);
    for (let i = 0; i < object.length; i++) {
        let incomingId = object[i].id;
        $('#tasksBoard').append(`
             <br>
             <li data-id=${incomingId}>
             <a>
                 <p class="taskField">${object[i].task}</p>
                 <br>
                 <p class="dateField">Due:${object[i].date}</p>
                 <br>
                 <p><input type="checkbox" class="checkBtn form-check-input" id=count${incomingId}>  Done! </p>
                 <br>
                <p><button class="deleteBtn btn btn-danger">remove</button></p>
              </a>
              </li>`
        );
        if (object[i].complete === true) {
            $(`[data-id=${incomingId}]`).addClass('done');
            $(`[id=count${incomingId}]`).attr('checked', true)
        }
        else if (object[i].complete === false) {
            $(`[data-id=${incomingId}]`).removeClass('done');
            $(`[id=count${incomingId}]`).attr('checked', false)
        }
    }
}

// function deleteWarning() {
//     swal({
//         title: "Are you sure?",
//         text: "Once deleted, you will not be able to recover this super important post-it!",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//     })
//         .then((willDelete) => {
//             if (willDelete) {
//                 swal("Poof! Your post-it has been trashed!", {
//                     icon: "success",
//                 });
//             } else {
//                 swal("Your post-it is safe!");
//             }
//         });
// }