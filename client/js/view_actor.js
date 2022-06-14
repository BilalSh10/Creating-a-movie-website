let movie_id;
let name;
$(document).ready(function () {
    let temp=location.href;
    let myArray=temp.split("/");
    movie_id=myArray[myArray.length-1];
    let actors_array=[];
    $.ajax({

        type: 'GET',
        url: `http://localhost:3001/getMovie/${movie_id}`, 
        success: function (data, status, xhr) {

            for (let i in data.actors) {
                actors_array.push(data.actors[i]);
                
            }
            let strHTML="";
            for (let i = 0; i < actors_array.length; i++) {
               strHTML+=`<div class="actor">
                            <div class="actor_name" id="actor-${actors_array[i].name}">
                                ${actors_array[i].name}
                                <hr>
                            </div>
                            <div class="img">
                                <img id="actor-image" class="image-${actors_array[i].name}" src="${actors_array[i].picture}"/> 
                            </div>
                            <div class="actor-site">
                                <a id="site" class="site-${actors_array[i].name}" target="_blank" href="${actors_array[i].site}"> fan site</a>
                            </div>
                            <div class="btn_actor">
                                <button class="delete-actor" id="delet-${actors_array[i].name}">Delete Actor</button>
                            </div>
                        </div>`;
                           
                
            }
            $(".view").append(strHTML);    
      
          },
      
          processData: false,
          dataType: 'json', 
          encode: true,
      
          error: function (jqXhr, status, error) {
              console.log(jqXhr.responseText);
          }
   
    });
    $("body").on("click", ".btn_actor", function (button) {
        let temp = button.target.id;
        let myArray = temp.split("-");
        var ajxReq = $.ajax({
            url: `http://localhost:3001/delete_actor/${movie_id}/${myArray[1]}`,
            type: "DELETE",
            success: function (data) {
                console.log(data);
                location.href = `/view_actor/${movie_id}`;
              },
              error: function (jqXhr, textStatus, errorMessage) {
                // alert("Delete request is Fail.");
              },

        });
      });
      $("body").on("click", ".btn-success", function (button) {
        location.href="/list";
    });


});