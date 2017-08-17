$(document).ready(function() {
  if ($(window).width() < 981) {
    $('#main-content').addClass('container-fluid');
    $('#main-content').removeClass('container');
  } else {
    $('#main-content').addClass('container');
    $('#main-content').removeClass('container-fluid');
  }

  if ($(window).width() > 980) {
    $('.navbar').attr('style', 'margin-bottom: 1rem');
  }
});
