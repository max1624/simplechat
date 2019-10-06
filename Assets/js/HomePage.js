sendButton = document.getElementById('send_button');
sendButton.onclick = function() {
	messageToSend = document.getElementById('your_message').value;
	messageToSend = strip_tags(messageToSend.trim());
	if(messageToSend != "") {
		$.ajax({
	      	url: "/Api/saveMessage",
	      	type: "post",
	      	data: {'data': messageToSend},
			datatype: 'json',
	      	success: function(data){
				console.log(data);          
	      	},
	      	error:function(){
			console.log('Failed to send message');  
	      	}   
    	}); 
	}
}

function strip_tags( str ){
	return str.replace(/<\/?[^>]+>/gi, '');
}