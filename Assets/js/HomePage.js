if(localStorage.getItem('author_id') !== null) {
	author_id = localStorage.getItem('author_id')
} else {
	author_id = Math.random() * (10000 - 1) + 1;
	localStorage.setItem('author_id', author_id);
}
sendButton = document.getElementById('send_button');
$( document ).ready(function(){
	$( "message_container" ).scroll();
});

sendButton.onclick = function() {
	messageToSend = document.getElementById('your_message').value;
	messageToSend = strip_tags(messageToSend.trim());
	$.ajax({
      	url: "/Api/getMessages",
      	type: "post",
		datatype: 'json',
      	success: function(data){
			// console.log(JSON.parse(data));
			messages = JSON.parse(data);
			if(messages) {
				var messageContainer = document.getElementById('message_container');
				messages.forEach(function(element) {
					var messageDiv = document.createElement('div');
					if(element['author_id'] == author_id) {
						messageDiv.className += 'user_message';
					} else {
						messageDiv.className += 'not_user_message';
					}
					messageDiv.innerHTML = element['message'];
					messageContainer.appendChild(messageDiv);
				});
			}          
      	},
      	error:function(){
			console.log('Failed to send message');  
      	}   
	}); 
}

function strip_tags( str ){
	return str.replace(/<\/?[^>]+>/gi, '');
}