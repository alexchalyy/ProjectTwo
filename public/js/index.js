var $dishText;

//  the "run" function

var intervalId;

var number = 10;

$(".order-button").on("click", function(){
  console.log("b4 timer");
  //run();
  //console.log("after timer");
  window.location.href="/orders"
  return $dishText = this.dataset.order
  //wait(5000);
  //console.log("5 seconds passed!");
})

var $submitBtn = $(".order-button");
var $pickup = $(".delete");
// Get references to page elements
//commented out per David's advice
// var $dishText = $("#example-text");

//not sure these are needed for anything in our code yet:
var $dishDescription = $("#example-description");
//var $dishList = $("#example-list");
var $dishList = $(".completed-orders");
var $orderList = $(".queued-orders");

// The API object contains methods for each kind of request we'll make
var API = {
  updateDish: function(updatedDishID)  {
    console.log("updated dish id = " + updatedDishID);
    return $.ajax({
      url: "api/dishes/" + updatedDishID,
      type: "PUT"
    });
    /*
    return $.ajax({
      //url: "api/dishes/",
      //type: "UPDATE",
      type: "PUT",
      url: "api/dishes",
      data: JSON.stringify(updatedDishID)
    }).then(console.log("Dish ready!"));*/
  },
  saveDish: function(dish) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/dishes",
      data: JSON.stringify(dish)
    });
  },
  getDishes: function() {
    return $.ajax({
      url: "api/dishes",
      type: "GET"
    });
  },
  

  //think there will need to be an update/put method here


   deleteDish: function(id) {
    return $.ajax({
       url: "api/dishes/" + id,
       type: "DELETE"
     });
   }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshDishes = function() {
  API.getDishes().then(function(data) {
    var $dishes = data.map(function(dish) {
      var $a = $("<a>")
        .text(dish.text)
        .attr("href", "/dish/" + dish.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $dishList.empty();
    $dishList.append($dishes);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list

//replaced this code with david's handleformsubmit below
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var dish = {
//     text: $dishText.val().trim(),
//     description: $dishDescription.val().trim()
//   };

//   if (!(dish.text && dish.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(dish).then(function() {
//     refreshDishes();
//   });

//   $dishText.val("");
//   $dishDescription.val("");
// };
var handleFormSubmit = function(event) {
  event.preventDefault();
  //the $dishText var below will add the data-order
  // attribute to the table
  var dish = {
    text: $dishText
    //id: this.id,
    //text: this.dataset.text,
    //ready: true  
  };
  API.saveDish(dish).then(function() {
    //had to comment out this function call for now since i was getting a error that i couldnt diagnose yet
     //refreshDishes();
     location.reload();
    // console.log("added order to db");

  });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  console.log("delete called");
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDish(idToDelete).then(function() {
    //refreshDishes();
    location.reload();
  });
};



var handleReadyBtnClick = function() {
  console.log("update called");
  var idToUpdate = $(this)
    .parent()
    .attr("data-id");

  console.log("id to update: " + idToUpdate);
  API.updateDish(idToUpdate).then(function() {
    //refreshDishes();
    location.reload();
  });
  /*
  console.log("Ready button clicked.");
  var updatedDishInfo = $(this).data("Dish");
  var updatedDishID = $(this)
    .parent()
    .attr("data-id");
  console.log("ID is " + updatedDishID);
  //  .data;
  console.log("here 1");
  //updatedDish.data.ready = true;
  console.log("here 2");

  console.log("Dish: " + this.text);
  var dish = {
    id: updatedDishID,
    //text: updatedDishInfo.data.text,
    ready: true  
  };
  //var updatedDish = $(this).data("Dish");
  //updatedDish.ready = 1;
  //$(this).data("Dish").ready = 1;
  //var updatedDish = $(this).data("Dish");
  //updatedDish.ready = true;
  API.updateDish(updatedDishID).then(function() {
  //API.updateDish(dish).then(function() {
    refreshDishes();
    location.reload();
  });*/
};

// Add event listeners to the submit and delete buttons
console.log("js file running");
$submitBtn.on("click", handleFormSubmit);
$dishList.on("click", ".delete", handleDeleteBtnClick);
$orderList.on("click", ".ready", handleReadyBtnClick);
//$updateList.on("click", ".ready", handleReadyBtnClick);
//$pickup.on("click", ".delete", handleDeleteBtnClick);
/*
$(function () {
  $(".ready").on("click", function (event) {
    var id = $(this).data("id");
 
    var newDevouredState = {
      ready: 1
    };
    $.ajax("/api/dishes/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        //console.log("new devoured state is ", newDevouredState);
        location.reload();
      }
    );
  });
*/

  //----------------------------------------------------------------------------------

  // This function updates a todo in our database
/*
  $(".ready").on("click", function(event)	{
    console.log("ready is clicked");
    var updatedDish = $(this).data("Dish");
    console.log(updatedDish);
    updatedDish.ready = 1;
    updatedDish(updatedDish);
});
*/