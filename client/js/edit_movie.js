
$(document).ready(function () {

  $("form[name='user_form']").validate({
      // Specify validation rules
      rules: {
        "name":{
         
        },
        "img":{
          url:true,
          
        },
        "director": {
          
        },
        "date": {
          date: true,
          
        },
        "rate": {
          
          min: 1,
          max: 5
        },
        "isSeries": {
          // required: true
        }
      },
      // Specify validation error messages
      messages: {    

      }
    });


  $("body").on("click", "#isSeries", function (button){
      let check_box= document.querySelector('#isSeries:checked') !== null;
     
      if(check_box){
        let strHTML="";
           strHTML+=`<div id="name-group" class="form-group">
           <label for="seasons">seasons</label>
           <input type="number" class="form-control" name="seasons" id="seasons" placeholder="write how many seasons"required>
          </div>`;
          $(".season-dev").append(strHTML);
      }else{
        $(".season-dev").empty();
        $(".season-dev2").empty();
      }
      $("#seasons").on('change',function(){
        $(".season-dev2").empty();
       
        let num=$("#seasons").val();
       
        let strHTMLLLL="";
        for (let i = 0; i < num; i++) {
          strHTMLLLL+=`<div id="name-group" class="form-group">
          <label for="season-${i+1}">season-${i+1}</label>
          <input type="number" class="form-control seas" name="season-${i+1}" id="season-${i+1}" placeholder="write how many episode"required>
         </div>`
          
        }
        $(".season-dev2").append(strHTMLLLL);
          
      });
     
    });
      

  let locationID=location.href;
  let myArray = locationID.split("/");
  $.ajax({
      type: 'GET', 
      url: `/getMovie/${myArray[myArray.length-1]}`, 

      processData: false,
      dataType: 'json', 
      encode: true,
      success: function( data, textStatus, jQxhr ){
          $("#id_field").val(data.id);
          $("#username").val(data.name);
          $("#img").val(data.picture);
          $("#director").val(data.director);
          $("#date").val(data.date);
          $("#rate").val(data.rating);
          $("#isSeries").val(data.isSeries);
          $("#series_details").val(data.series_details);
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
  });  


    
  // $('#user_form').submit(()=>{
  $("body").on("click", ".btn-success", function (button){
      if(!$("#user_form").valid()) return;
      
      let check_box= document.querySelector('#isSeries:checked') !== null;
      let array=[];
      if(check_box){
        let num=$("#seasons").val();
        for (let i = 0; i < num; i++) {
          array.push($(`#season-${i+1}`).val());
          console.log(array[i]);
        }
      
      }
      // console.log("in submit");
      $.ajax({
          type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
          url: `/updateMovie/${myArray[myArray.length-1]}`, // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              "name": $("#username").val(),
              "id": $("#id_field").val(),
              "picture": $("#img").val(),
              "director": $("#director").val(),
              "date": $("#date").val(),
              "rating": $("#rate").val(),
              "isSeries": check_box,
              "series_details": array,
          }),
          encode: true,
          processData: false,            
          // dataType: 'json', // what type of data do we expect back from the server
          // encode: true,
          success: function( data, textStatus, jQxhr ){
              console.log("success");
              location.href = "/list";
          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
              location.href = "/list";
          },

      });
      location.href = "/list";
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
  });

});


//     $('#user_form').submit(function (event) {
//       console.log("HI");
//         if(!$("#user_form").valid()) return;
//         console.log("in submit");
     
//         let check_box= document.querySelector('#isSeries:checked') !== null;
//         let array=[];
//         if(check_box){
//          let num=$("#seasons").val();
//          console.log(num);
//          for (let i = 0; i < num; i++) {
//           array.push($(`#season-${i+1}`).val());
//           console.log(array[i]);
//          }
      
//         }
//     });

// });
