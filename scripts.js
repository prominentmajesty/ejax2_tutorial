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
            $('#get-button').click();
        },
        failure : function(err){
            console.log(err);
        }
    });
});
 $('table').on('click', '.update-button',function(){
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('id').text();
    var newName = rowEl.find('.name').val();
    $.ajax({
        url :'/products/' + id,
        method : 'POST',
        contentType : 'application/json',
        data : JSON.stringify({newname : newName}),
        success : function(response){
             console.log(response);
        },
    failure : function(err){
        console.log(err)
    }
    });
 });
 //DELETE
$('table').on('click','delete-button', function(){
    var getTableRowElemet = $(this).closest('tr');
    var id = getTableRowElemet.find('.id').text();
    $.ajax({
        url : '/delete/' + id,
        method : 'DELETE',
        contentType : 'application/json',
        success : function(){
            console.log('Successfully Deleted From Product');
        },

        error : function(err){
            console.log(err);
        }

    });
});