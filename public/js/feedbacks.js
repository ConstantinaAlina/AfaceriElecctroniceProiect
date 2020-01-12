/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/feedbacks/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<div class="media">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#feedbacks').append(row);
        });
    });
}

function displayColumns(value) {
    return 	  '<p class="pull-right"><small>'+ new Date().toJSON().slice(0,10).replace(/-/g,'/') +'</small></p <a class="media-left" href="#"> <img src="img/pic.jpg">'
 +' </a>  <div class="media-body">  <h4 class="media-heading user_name">'
 +value.user_name + '</h1>'
+ value.content  
   +' <p><small><button class = "pull-right" onclick="deleteRecord('+ value.id +')">Delete</button></p> </div>'
}

function addRecord() {
    $('#id').val('');
    $('#content').val('');
    $('#user_name').val('');
}

function viewRecord(id) {
    var url = "/feedbacks/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#content').val(data.content);
        $('#user_name').val(data.user_name);
        $('#id').val(id);
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
        createRecord(formData);
}

function createRecord(formData) {
    $.ajax({
        url: '/feedbacks/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<div id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</div>';
            $('#feedbacks').append(row);
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/feedbacks/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}