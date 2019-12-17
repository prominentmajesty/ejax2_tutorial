$(function(){
    //GET/READ
    $('#get-button').on('click', function(){
       $.ajax({
           url : '/products',
           method : 'GET',
           success : function(response){
               var tbodyEl = $('tbody');
               tbodyEl.html('');
                response.products.forEach(function(response1){
                    tbodyEl.append('\
                    <tr>\
                        <td class="id"> '+ response1.id +' </td>\
                        <td><input type = "text" class = "name" value="'+ response1.name +'"></td>\
                        <td><button class ="update-button">UPDATE/PUT</button>\
                        <button class ="delete-button">DELETE</button>\
                        <td>\
                    </tr>\
                    ');
                });
           }
       });  
    }); 
});

//CREATE/POST

$('#create-form').on('submit', function(event){
    event.preventDefault();
    var createInput = $('#create_input');
    $.ajax({
        url: '/postwatch',
        method: 'POST',
        data : {name : createInput.val()},
        success : function(response){
            console.log(response);
            $('#create_input').val('');
        },
        failure : function(err){
            console.log(err);
        }
    });
});