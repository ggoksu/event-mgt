$('form input[type="text"].bfh-phone').each(function() {
   var $phone = $(this);
   $phone.bfhphone($phone.data());
});