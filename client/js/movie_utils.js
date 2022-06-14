$(document).ready(function () {
   
  $("form[name='user_form']").validate({
      // Specify validation rules
      rules: {
        "name":{
          required: true
        },
        "id_field": {
          required: true
        },
        "img":{
          url:true,
          required: true
        },
        "director": {
          required: true
        },
        "date": {
          date: true,
          required: true
        },
        "rate": {
          required: true,
          min: 1,
          max: 5
        },
        "isSeries": {
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

  $('#user_form').submit(function (event) {
      if(!$("#user_form").valid()) return;
      let check_box= document.querySelector('#isSeries:checked') !== null;
      let array=[];
      if(check_box){
        let num=$("#seasons").val();
        for (let i = 0; i < num; i++) {
          array.push($(`#season-${i+1}`).val());
        }
      
      }
     
      $.ajax({
          type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url: '/addMovie', // the url where we want to POST
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
              "actors": {},
          
          }),
          processData: false,            
         // dataType: 'json', // what type of data do we expect back from the server
          encode: true,
          success: function( data, textStatus, jQxhr ){
              console.log(data);
              location.href = "/list";

          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
          }
      })
        
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
  });

});
