(function($){

var socket = io.connect('http://bachir-best:1337'); //connection au serveur.
var username = '';
var email = '';
	function scrollToBottom(){
                  $('body').animate({scrollTop : $('body').prop('scrollHeight')},1500);
	}

	
$('.loginForm').submit(function(event){

event.preventDefault();
username = $('#yourName').val();
mail = $('#yourEmail').val();

$('.connected').fadeOut();
$('footer').fadeIn();
$('.chatscreen').fadeIn();
});

$('#chatform').submit(function(event){
event.preventDefault();
var msg = $('#message').val();

if(msg != ''){

socket.emit('message', {message : msg,
                        user : username
                        }
            );
 }
});


socket.on('broadcast', function(data){

var meyou = 'you';

if(username == data.user){
meyou = 'me';
}

$('#chats').append(	'<div class="'+meyou+'">'+
				'<div class="image">' +
					'<img src="img/unnamed.jpg" />' +
					'<b>'+data.user+'</b>' +
					'<i></i> ' +
				'</div>' +
				'<p>'+data.message+'</p>' +
			'</div>');
if(username == data.user){
$('#message').val('');
$('#message').focus();
}
scrollToBottom();
});

socket.on('entrerUser', function(data){
//Remplir la liste des users.
});

$('#chatform').keyup(function(e){

if(e.which == 13){

var msg = $('#message').val();

if(msg != ''){

socket.emit('message', {message : msg,
                        user : username
                        }
            );
 }


}

});

})(jQuery);