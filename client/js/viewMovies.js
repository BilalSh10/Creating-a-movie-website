let data = [];
let date_upOrDown=false,rate_upOrDown=false,name_upOrDown=false;
function generte_film() {
  data = data.sort(function (a, b) {
    return compareDate(a, b);});
  let str="";
  for (let i = 0; i < data.length; i++) {
    let datee=reBuildDate(data[i].date);
     data[i].date=datee;
    str += `<div class='film grid-item' id='film-${i}'>
              <div class='img'>
                  <img class="image-size" src="${data[i].picture}" >
              </div>
              <div class='film-desc'>
                  <ul>
                      <li><span class="dataD">Movie ID:</span>  <span class="dataDetails0">${data[i].id}</span></li>
                      <li><span class="dataD">Name:</span> <span class="dataDetails1">${data[i].name}</span></li>
                      <li><span class="dataD">Date:</span>  <span class="dataDetails2">${data[i].date}</span></li>
                      <li><span class="dataD">Rating:</span>  <span class="dataDetails3">${data[i].rating}</span></li>
                  </ul>
              </div>
              <div class="All-buttons">
                  <button class="edit" id="edit-${data[i].id}">Edit movie</button>
                  <button class="add" id="add-${data[i].id}">Add Actor</button>
                  <button class="view" id="view-${data[i].id}">View Actors</button>
                  <button class="btn" id="delete-${data[i].id}">Delete movie</button>
              </div>
            </div>`;
  }
  return str;
}
function generte_film2() {
  let str="";
  for (let i = 0; i < data.length; i++) {
    str += `<div class='film grid-item' id='film-${i}'>
            <div class='img'>
                <img class="image-size" src="${data[i].picture}" >
            </div>
            <div class='film-desc'>
                <ul>
                    <li>Movie ID: ${data[i].id}</li>
                    <li>Name: ${data[i].name}</li>
                    <li>Date:  ${data[i].date}</li>
                    <li>Rating:  ${data[i].rating}</li>
                </ul>
            </div>
            <div class="All-buttons">
                <button class="edit" id="edit-${data[i].id}">Edit movie</button>
                <button class="add" id="add-${data[i].id}">Add Actor</button>
                <button class="view" id="view-${data[i].id}">View Actors</button>
                <button class="btn" id="delete-${data[i].id}">Delete movie</button>
            </div>
          </div>`;
  }
  return str;
}
function compareDate(A, B) {
  let A_Convert = reBuildDate(A.date);
  let B_Convert = reBuildDate(B.date);

  let A_Date = new Date(A_Convert);
  let B_Date = new Date(B_Convert);

  return A_Date - B_Date;
}
function reBuildDate(Date) {
  let array_Date = Date.split("-");
  return array_Date[2] + "-" + array_Date[1] + "-" + array_Date[0];
  

}

$(document).ready(function () {
  date_upOrDown=true;
  $.ajax({
    url: "/getMovies",
    success: function (result) {
      $.each(result, function (index, value) {
        data.push(value);
      });
      
      console.log(result);
    },
    error: function (err) {
      console.log("err", err);
    },
  })
  .then(()=>$(".grid-container").append(generte_film()));

$("body").on("click", ".add", function (button) {
  let temp = button.target.id;
  let myArray = temp.split("-");
  location.href=`/add_actor/${myArray[1]}`;
});

$("body").on("click", ".view", function (button) {
  let temp = button.target.id;
  let myArray = temp.split("-");
  location.href=`/view_actor/${myArray[1]}`;
});


$("body").on("click", "#date-sort", function (button) {
  
    if(!date_upOrDown){
      data = data.sort(function (a, b) {
        return compareDate(a, b);
      });
      date_upOrDown=true;
    }else{
      data = data.sort(function (a, b) {
        return compareDate(b, a);
      });
      date_upOrDown=false;
    }
    $(".grid-container").empty();
    $(".grid-container").append(generte_film2());

});
$("body").on("click", "#rate-sort", function (button) {
    if(!rate_upOrDown){
      data = data.sort(function (a, b) {
        return a.rating - b.rating;});
      rate_upOrDown=true;
    }else{
      data = data.sort(function (a, b) {
        return b.rating - a.rating;
      });
      rate_upOrDown=false;
    }
    $(".grid-container").empty();
    $(".grid-container").append(generte_film2());

});
$("body").on("click", "#name-sort", function (button) {
  if(!name_upOrDown){
    data = data.sort(function (A, B) {
      return A.name.localeCompare(B.name);
    });
    name_upOrDown=true;
  }else{
    data = data.sort(function (A, B) {
      return B.name.localeCompare(A.name);
    });
    name_upOrDown=false;
  }
  $(".grid-container").empty();
$(".grid-container").append(generte_film2());

});



$("body").on("click", ".btn", function (button) {

    let temp = button.target.id;
    let myArray = temp.split("-");
    var ajxReq = $.ajax({
      url: `/deleteMovie/${myArray[1]}`,
      type: "DELETE",
      success: function (data) {
        console.log(data);
        location.href = "/list";
      },
      error: function (jqXhr, textStatus, errorMessage) {
        alert("Delete request is Fail.");
      },
    });
  });

$("body").on("click", ".edit", function (button){
    let temp = button.target.id;
    let myArray = temp.split("-");
    location.href=`/edit_movie/${myArray[1]}`
});


 
});
