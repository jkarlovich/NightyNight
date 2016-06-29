$(document).ready(function() {
  $('.delete').click(function (e) {
    e.preventdefault();
    var url = $(this).attr('href');
    var element = $(this);
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      console.log(data.msg);
      window.location='/profile';
    });
  });
});
