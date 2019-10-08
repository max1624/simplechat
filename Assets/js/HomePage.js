if(localStorage.getItem('author_id') !== null) {
	author_id = localStorage.getItem('author_id')
} else {
	author_id = Math.random() * (10000 - 1) + 1;
	localStorage.setItem('author_id', author_id);
}
sendButton = document.getElementById('send_button');
$( document ).ready(function(){
	$( "message_container" ).scroll();
	setInterval(getMessages, 2000);
	$(document).keypress(function(e){
	    if (e.which == 13){
	        $("#send_button").click();
	    }
	});
});

sendButton.onclick = function() {
	messageToSend = document.getElementById('your_message').value;
	messageToSend = messageToSend.trim();
	sendMessage(messageToSend, author_id);
}

function sendMessage(message, author_id) {
	$.ajax({
      	url: "/Api/saveMessage",
      	type: "post",
		datatype: 'json',
		data: {'data': message, 'author_id': author_id}, 
      	error:function(){
			console.log('Failed to send message');  
      	},   
	});
	getMessages();
	$('#your_message').val('');
}

function getMessages()
{
	$.ajax({
      	url: "/Api/getMessages",
      	type: "post",
		datatype: 'json',
      	success: function(data){
			messages = JSON.parse(data);
			if(messages) {
				var messageContainer = document.getElementById('message_container');
				messagesDiv = messageContainer.children;
				difference = messages.length - messagesDiv.length;
				for(var i = messagesDiv.length; i < messages.length; i++) {
					var messageDiv = document.createElement('div');
					if(messages[i]['author_id'] == author_id) {
						messageDiv.className += 'user_message';
					} else {
						messageDiv.className += 'not_user_message';
					}
					messageDiv.id = messages[i]['id'];
					messageDiv.innerHTML = messages[i]['message'];
					messageContainer.appendChild(messageDiv);
				}
			}          
      	},
      	error:function(){
			console.log('Failed to send message');  
      	}   
	}); 
}