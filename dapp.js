
var gun = Gun(['http://localhost:8765/gun', 'https://gunjs.herokuapp.com/gun', 'ssh -p 14811 cooler@0.tcp.ngrok.io']);

//Instantiate a user chain off of Gun
var user = gun.user();

//Create a user in Gun
$('#up').on('click', function (event) {
    user.create($('#alias').val(), $('#pass').val());
    console.log($('#alias').val());

});

//Authorize/Log the user in Gun
$('#sign').on('submit', function (event) {
    event.preventDefault();
    console.log($('#alias').val());
    user.auth($('#alias').val(), $('#pass').val());
});

//Add a task to Gun and Sync
$('#said').on('submit', function (event) {
    event.preventDefault();
    if (!user.is) { return }
    user.get('said').set($('#say').val());
    $('#say').val('');
})

//Update the UI
function UI(say, id) {
    var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
    $(li).text(say);
}

//Change the UI upon loggin in or out the APP
gun.on('auth', function () {
    $('#sign').hide();
    user.get('said').map().once(UI);
});