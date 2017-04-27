var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

var checkin = $('#dpd1').datepicker({
onRender: function(date) {
return date.valueOf() < now.valueOf() ? 'disabled' : '';
}
}).on('changeDate', function(ev) {
if (ev.date.valueOf() > checkout.date.valueOf()) {
var newDate = new Date(ev.date)
newDate.setDate(newDate.getDate() + 4);
checkout.setValue(newDate);
$('#dpd1').trigger('input')
}
checkin.hide();
$('#dpd2')[0].focus();
}).data('datepicker');
var checkout = $('#dpd2').datepicker({
onRender: function(date) {
return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
}
}).on('changeDate', function(ev) {
var newDate = new Date(ev.date)
newDate.setDate(newDate.getDate());
checkout.setValue(newDate);
$('#dpd2').trigger('input')
checkout.hide();
}).data('datepicker');


