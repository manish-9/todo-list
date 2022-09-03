const todoList = [];

function createTask() {
  var task = prompt("New ToDo item (characters < 80 will be stored!): ");
  if (task.length > 0) {
    todoList.push(task.slice(0, 80));
  }
}

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
      todoList[todoItemId] = updateValue;
    }
    viewAllTasks(); // display updated todo lists
    console.log(todoList[todoItemId]);
  });
  $(".col.todoItem").click(async function () {
    updateTask();
  });
}

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
    for (let i = 0; i < todoList.length; i++) {
      if (i == task) {
        notFound = false;
        console.log(`${todoList[task]} was removed from ToDo List!`); // reducing one since user doesn't need to worry that array index starts from 0
        for (let j = i; j < todoList.length; j++) {
          todoList[j] = todoList[j + 1]; // reducing one since user doesn't need to worry that array index starts from 0
        }
      }
    }
    if (notFound) {
      alert("Item doesn't Exist !!!");
    } else {
      todoList.pop();
    }
    viewAllTasks();
  } else {
    alert("Your ToDo List is now Empty!!!");
  }
}

function viewAllTasks() {
  clear();
  if (todoList.length != 0) {
    $(".row.viewAll").before(
      `<div class="updateInfo">You are Viewing the latest todo list. Click one of the below to update Todo Item</div>`
    );

    todoList.forEach((item, i) => {
      $(".row.viewAll").append(
        `<div id="${i}" class="col col-md-2 todoItem"><i class="far fa-edit"></i>${item}</div>`
      );
    });
  } else {
    alert("Your ToDo List is Empty!!!");
  }
}

function clear() {
  $(".actionResult .viewAll").html(""); // clearing existing view
  $(".actionResult .updateInfo").remove(); // update message should be cleared so it is not duplicated on multiple calls of viewAllTasks()...
}

// starting point...
$("button").click(function () {
  var actionSelected = $(this).attr("id");
  actionPerform(actionSelected);
  console.log(todoList);
});

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
