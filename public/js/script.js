$(document).ready(function() {
  $('.delete').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var element = $(this);
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      // console.log(data);
      window.location = '/profile';
    });
  });

  $('#save').click(function(e) {
    var url = $('#url').val();
    $.ajax({
      method: 'GET',
      url: '/loggedin'
    }).done(function(msg) {
      // console.log(msg);
      if (msg.msg === 'true') {
        open(url);
        window.focus();
      } else {
        $('#myModal').modal('show');
      }
    });
  });

  $('#myModal').on('shown.bs.modal', function(e) {
    $('#loginFocus').focus();
  });

  $('#secondModal').on('shown.bs.modal', function(e) {
    $('#signupFocus').focus();
  });
});

