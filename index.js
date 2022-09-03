const todoList = [];

// function to create and add new Todo task in list...
function createTask() {
  var task = prompt("New ToDo item (characters < 36 will be stored!): ");
  if (task.length > 0) {
    todoList.push(task.slice(0, 35));
  }
}

// function to update Todo items...
function updateTask() {
  viewAllTasks(); // display all todo items so user can select which to update...

  $(".col.todoItem").click(async function () {
    var todoItemId = parseInt($(this).attr("id"));
    var updateValue = prompt(
      `Update/Edit item at ${todoItemId + 1}\nExisting Item is : ${
        todoList[todoItemId]
      }`
    );
    if (updateValue != null) {
      todoList[todoItemId] = updateValue.slice(0,35);
    }
    viewAllTasks(); // display updated todo lists
    // console.log(todoList[todoItemId]);
  });
  $(".col.todoItem").click(async function () {
    updateTask();
  });
}

// function to remove/delete todo items...
function removeTask() {
  var notFound = true;
  if (todoList.length != 0) {
    var task = parseInt(
      prompt(
        `Enter a item# between 0 and ${
          todoList.length - 1
        } to remove it from list : `
      )
    );

    if (task >= 0 && task < todoList.length) {
      notFound = false;
      todoList.splice(task, 1); // task is the index user wants to delete and 1 is the # of elements that will be removed from mentioned index...
    }
    if (notFound) {
      alert("Item doesn't Exist !!!");
    }
    viewAllTasks();
  } else {
    alert("Your ToDo List is now Empty!!!");
  }
}

// function to retrieve all todo items...
function viewAllTasks() {
  clear();
  if (todoList.length != 0) {
    $(".row.viewAll").before(
      `<div class="updateInfo">You are Viewing the latest todo list. Click on "Update an item" to update below items.</div>`
    );

    todoList.forEach((item, i) => {
      $(".row.viewAll").append(
        `<div id="${i}" class="col col-md-2 todoItem"><i class="far fa-edit"></i>&nbsp &nbsp${item}</div>`
      );
    });
  } else {
    alert("Your ToDo List is now Empty!!!");
  }
}

// to clear result views
function clear() {
  $(".actionResult .viewAll").html(""); // clearing existing view
  $(".actionResult .updateInfo").remove(); // update message should be cleared so it is not duplicated on multiple calls of viewAllTasks()...
}

// starting point...
$("button").click(function () {
  var actionSelected = $(this).attr("id");
  actionPerform(actionSelected);
  // console.log(todoList);
});

// decide which function to call...
function actionPerform(actionSelected) {
  switch (actionSelected) {
    case "itemAdd":
      createTask();
      break;
    case "itemUpdate":
      updateTask();
      break;
    case "itemRemove":
      removeTask();
      break;
    case "itemView":
      viewAllTasks();
      break;
    case "clear":
      clear();
      break;
  }
}
