$(document).ready(function() {
  $('.delete').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var element = $(this);
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      console.log(data);
      window.location='/profile';
    });
  });

  $('#save').click(function(e){
    var url = $('#url').val();
    open(url);
  });
 });


