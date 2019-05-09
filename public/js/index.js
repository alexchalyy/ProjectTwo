// Get references to page elements
var $dishText = $("#example-text");
var $dishDescription = $("#example-description");
var $submitBtn = $("#submit");
var $dishList = $("#example-list");

//--------------------------------------------------------------------

// -----------------------------------------------
//--this block of code should go near the top of index.js 
replacing line 2--//
$(".order-button").on("click", function(){
  return $dishText = this.dataset.order
})
var $dishText;

//--------------------------------------------------------------------

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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var dish = {
    text: $dishText.val().trim(),
    description: $dishDescription.val().trim()
  };

  if (!(dish.text && dish.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(dish).then(function() {
    refreshDishes();
  });

  $dishText.val("");
  $dishDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDish(idToDelete).then(function() {
    refreshDishes();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$dishList.on("click", ".delete", handleDeleteBtnClick);
