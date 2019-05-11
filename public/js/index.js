var $dishText;

//  the "run" function

var intervalId;

var number = 10;

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

//----------------------------------------------------------

//  The stop function
function stop() {
  //  Clears our intervalId
  //  We just pass the name of the interval
  //  to the clearInterval function.
    console.log("stop!");
    clearInterval(intervalId);
  }  

//----------------------------------------------------------

//  The decrement function.
function decrement() {
  //  Decrease number by one.
  console.log("decrement starts.");
    number--;
  //  Once number hits zero...
    if (number === 0) {
  //  ...run the stop function.
      stop();
      console.log("10 seconds passed!");
   }
  }

//----------------------------------------------------------

function run() {
//  This is timer for 10 seconds.

  console.log("timer starts.");
  clearInterval(intervalId);
  console.log("after clear interval.");
  intervalId = setInterval(decrement, 1000);
  console.log("after set interval is called.");
}

//--------------------------------------------------

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

// The API object contains methods for each kind of request we'll make
var API = {
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
    text: $dishText,  
  };
  API.saveDish(dish).then(function() {
    //had to comment out this function call for now since i was getting a error that i couldnt diagnose yet
    // refreshExamples();
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
    refreshDishes();
    location.reload();
  });
};

// Add event listeners to the submit and delete buttons
console.log("js file running");
$submitBtn.on("click", handleFormSubmit);
$dishList.on("click", ".delete", handleDeleteBtnClick);
//$pickup.on("click", ".delete", handleDeleteBtnClick);

