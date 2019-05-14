//  This javascript performs all logic for making orders and picking them up on Deli website.

var $dishText;
$(".order-button").on("click", function(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://secret-plateau-65736.herokuapp.com/api/dishes",
    // "url": "http://localhost:3000/api/dishes",
    "method": "GET",
    "processData": false,
    "data": ""
  }
  
  $.ajax(settings).done(function (response) {
    var orderNum = response[response.length-1].id + 1;
    $("#order-number").text(orderNum);
    console.log(response[response.length].id);
  });
  // window.location.href = "/orders";
  $('#myModal').modal('show')
  return $dishText = this.dataset.order;
});

$('#myModal').on('hidden.bs.modal', function (e) {
  window.location.href = "/ready";
})


var $submitBtn = $(".order-button");
var $dishList = $(".completed-orders");
var $orderList = $(".queued-orders");

// The API object contains methods for each kind of request we'll make
var API = {
  updateDish: function(updatedDishID) {
    console.log("updated dish id = " + updatedDishID);
    return $.ajax({
      url: "api/dishes/" + updatedDishID,
      type: "PUT"
    });
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
  deleteDish: function(id) {
    return $.ajax({
      url: "api/dishes/" + id,
      type: "DELETE"
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var dish = {
    text: $dishText
  };
  API.saveDish(dish).then(function() {
    //had to comment out this function call for now since i was getting a error that i couldnt diagnose yet
    // location.reload();
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
    location.reload();
  });
};

// Add event listeners to the submit and delete buttons
console.log("js file running");
$submitBtn.on("click", handleFormSubmit);
$dishList.on("click", ".delete", handleDeleteBtnClick);
$orderList.on("click", ".ready", handleReadyBtnClick);