/*FILE: http://weblab.cs.uml.edu/~lreynold
91.61 GUI Programming I
Assignment 8: Creating an Interactive Dynamic Table
Liam Reynolds, University of MA, Lowell. CS.
liam_reynolds@student.uml.edu
Copyright(c) 25 November 2018. All rights reserved.*/

function auto_submit() { //simple funciton that can be called to submit if form is valid,
//used https://downing.io/GUI/assignment8.html as a guide
  if( $("form#multForm").valid() == true ) {
    $("form#multForm").submit();
  }
}
function getValues() {
  //input from table is stored as upper and lower bounds of axis
  lowY = parseInt(document.getElementById("loY").value);
  upY = parseInt(document.getElementById("upY").value);
  lowX = parseInt(document.getElementById("loX").value);
  upX = parseInt(document.getElementById("upX").value);
  var temp;

  if(lowY > upY){
    temp = upY;
    upY = lowY;
    lowY = temp;
  }
  if(lowX > upX){
    temp = upX;
    upX = lowX;
    lowX = temp;
  }
  //arrays for storing range of integers between two bounds
  var arrY = [];
  var arrX = [];
  var Ysize = upY - lowY + 1;
  var Xsize = upX - lowX + 1;

  var node, prod, newRow, rowEl;
  var tab = document.getElementById("multTable");

  var incY = lowY;
  var incX = lowX;
  newRow = tab.insertRow(0);
  rowEl = newRow.insertCell(0);
  rowEl.innerHTML = " ";
  //loop assigns values to array by incrementing lower bound by one
  for(var i = 0; i < Ysize; i++){
      arrY[i] = incY;
      incY = incY + 1;
  }
  //insert first row of Y axis range integers into table while creating array
  for(var j = 0; j < Xsize; j++){
      arrX[j] = incX;
      rowEl = newRow.insertCell(j + 1);
      rowEl.innerHTML = incX.toString();
      incX = incX + 1;
  }
  //insert new row for every element in arrY
  for(i = 0; i < arrY.length; i++){
      newRow = tab.insertRow(i + 1);
      rowEl = newRow.insertCell(0);
      rowEl.innerHTML = arrY[i].toString();
      //insert new cell containing the product of current X and Y value
    for(j = 0; j < arrX.length; j++){
        prod = (arrY[i] * arrX[j]).toString();
        rowEl = newRow.insertCell(j + 1);
        rowEl.innerHTML = prod;
    }
  }
}
function slider(){
  //used https://downing.io/GUI/assignment8.html as a guide for how slider calls are structured
  //assign slider for each input element to be updated dynamically
  $("#slider_loY").slider({
      min: -10,
      max: 10,
      slide: function(event, ui) {
        $("#loY").val(ui.value);
        auto_submit();  //submit and display table as sliders are adjusted
      }
  });
  $("#loY").on("keyup", function() {  //submit form if "keyup" event is triggered
      $("#slider_loY").slider("value", this.value);
      auto_submit();
  });
  $("#slider_upY").slider({
      min: -10,
      max: 10,
      slide: function(event, ui) {
        $("#upY").val(ui.value);
        auto_submit();
      }
  });
  $("#upY").on("keyup", function() {
    $("#slider_upY").slider("value", this.value);
    auto_submit();
  });

  $("#slider_loX").slider({
      min: -10,
      max: 10,
      slide: function(event, ui) {
        $("#loX").val(ui.value);
        auto_submit();
      }
  });
  $("#loX").on("keyup", function() {
    $("#slider_loX").slider("value", this.value);
    auto_submit();
  });

  $("#slider_upX").slider({
      min: -10,
      max: 10,
      slide: function(event, ui) {
        $("#upX").val(ui.value);
        auto_submit();
      }
  });
  $("#upX").on("keyup", function() {
    $("#slider_upX").slider("value", this.value);
    auto_submit();
  });
}

num_tabs = 1;
function createTab(){

  $("#tabs").tabs();  //initialize tab UI
  var tab_count = $('div#tabs ul li.tab').length; // use tab_count to restrict amount of tabs

  if( $("form#multForm").valid() == true && tab_count < 20) {  //only allow a tab creation if form is valid and num_tabs is less than specified amount
    num_tabs++; //increment num_tabs to be used in append
    tab_count++;
    $("div#tabs ul").append("<li class = 'tab'><a href = '#tab-" + num_tabs + "'>" + "x : (" + lowX + "," + upX + ")"
      + "<br>" + "y : (" + lowY + "," + upY + ")" + "</a>" + "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>"); //set title of tab using entered bound values
    $("div#tabs").append('<div id = "tab-' + num_tabs + '">' + $("#multiplication_table").html() + '</div>'); //append tab content with table
    $("#tabs").tabs("refresh");
    $( "#tabs" ).tabs("option", "active", -1);  //make newest tab active
  }

  //https://downing.io/GUI/assignment8.html was used as a guide for tab deletion
  $("#tabs").delegate("span.ui-icon-close", "click", function() {  //if close icon is clicked, delete tab
    var panelID = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelID).remove();
    $("#tabs").tabs("refresh");
    if($('div#tabs ul li.tab').length == 0) {  //if there's only one tab left, restore page
        $("#tabs").tabs("destroy");
    }
  });

}
//function for resetting table to be called when submit button is pressed
function eraseTable(){
  document.getElementById("multTable").textContent = "";
}
