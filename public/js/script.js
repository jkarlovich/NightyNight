$(document).ready(function() {

  //deletes saved show from profile
  $('.delete').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var element = $(this);
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      window.location = '/profile';
    });
  });

//when hit the "buy" button on the details route, check to see if logged in,
//if so, open the link in a new tab, otherwise open the log in modal (ps does
//trigger the modal but because of the backend route, quickly gets redirected
//to log in page, I need to work on this)
  $('#save').click(function(e) {
    var url = $('#url').val();
    $.ajax({
      method: 'GET',
      url: '/loggedin'
    }).done(function(msg) {
      if (msg.msg === 'true') {
        open(url);
        window.focus();
      } else {
        $('#myModal').modal('show');
      }
    });
  });

//focuses on first text field of login modal
  $('#myModal').on('shown.bs.modal', function(e) {
    $('#loginFocus').focus();
  });

//focuses on first text field of sign up modal
  $('#secondModal').on('shown.bs.modal', function(e) {
    $('#signupFocus').focus();
  });
});

