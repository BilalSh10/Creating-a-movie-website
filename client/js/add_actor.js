$(document).ready(function () {
   
    $("form[name='actor_form']").validate({
        // Specify validation rules
        rules: {
          "name":{
            required: true
          },
          
          "actorimg":{
            url:true,
            required: true
          },
          "site":{
            url:true,
            required: true
          },
          
        },
        
      });

        $('#actor_form').submit(()=>{
       
        let locationID=location.href;
        let myArray = locationID.split("/");
        let name=$("#actorname").val();
        $.ajax({
            type: 'PUT', 
            url: `http://localhost:3001/addActor/${myArray[myArray.length-1]}/${name}`, 
            contentType: 'application/json',
            data: JSON.stringify({
                "name":name,
                "picture": $("#actorimg").val(),
                "site": $("#site").val()
            }),
            encode: true,
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data, textStatus, jQxhr ){
              console.log("success");
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        location.href = "/list"
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
