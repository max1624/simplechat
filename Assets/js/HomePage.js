if(localStorage.getItem('author_id') !== null) {
	author_id = localStorage.getItem('author_id')
} else {
	author_id = Math.random() * (10000 - 1) + 1;
	localStorage.setItem('author_id', author_id);
}

$( document ).ready(function(){
	getMessages();
	gotoBottom('message_container'); 
	$(document).keypress(function(e){
	    if (e.which == 13){
	        $("#send_button").click();
	    }
	});
});

setInterval(getMessages, 2000);

sendButton = document.getElementById('send_button');
sendButton.onclick = function() {
	messageToSend = document.getElementById('your_message').value;
	messageToSend = messageToSend.trim();
	sendMessage(messageToSend, author_id);
	gotoBottom('message_container');
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
          	showMessages(messages);
      	},
	}); 
	
}
function gotoBottom(id){
   var element = document.getElementById(id);
   element.scrollTop = element.scrollHeight;
}
function showMessages(messages) {
	if(messages) {
		var messageContainer = document.getElementById('message_container');
		messagesDiv = messageContainer.children;
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
}