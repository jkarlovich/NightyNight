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

//For keep focus on current tab

//   $('#save').click(function(e){
//     var url = $('#url').val();
//     open(url);
//     window.focus()='/profile';
//   });
 });

//directly inline, works for some
//onclick="function(){open("<%=details.links.link.url%>");focus()};"
