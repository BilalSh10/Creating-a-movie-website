
   
$(document).ready( function () {

    $(".btn").click( function(){
        let temp = this.id;
        
        let myArray = temp.split("-");
        
        var ajxReq = $.ajax( {
            url : `/deleteMovie/${myArray[1]}`,
            type : 'DELETE',
            success : function ( data ) {
                console.log(data);
                    location.href = "/movies";
            },
            error : function ( jqXhr, textStatus, errorMessage ) {
                alert( "Delete request is Fail.");
            }
        });
    });


//--------------------------------
    $(".add").click( function(){
            let temp = this.id;
            
            let myArray = temp.split("-");
           
            // url of the data to be view
            var ajxReq = $.ajax( {
                url : `/addActor/${myArray[1]}`,
                type : 'GET',
                success : function ( data ) {
                    console.log(data);
                     location.href = "/movies";
                },
                error : function ( jqXhr, textStatus, errorMessage ) {
                    alert( "Add actor request is Fail.");
                }
            });
        });
});
