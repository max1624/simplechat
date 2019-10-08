<?php

namespace Controllers;

use Models\Message;

class Api extends \App\Controller
{
	private	$message;

	public function saveMessage ()
    {
    	
    	if($this->is_ajax()) {
	    	if(isset($_POST) && $_POST) {
	    		if($_POST["data"] && $_POST['author_id']) {
	    			$message = addslashes(htmlspecialchars(strip_tags($_POST["data"])));
	    			if($message != "") {
	    				$this->message = new Message();
	    				$this->message->saveMessage($message, $_POST['author_id']);
	    			}
	    		}
	    		else
	    			return false;
	    	}
    	}
    }

	public function getMessages()
	{
		if($this->is_ajax()) {
			$this->message = new Message();
			return json_encode($this->message->getMessages());
		}
		return false;
	}

    // Checking if it is AJAX Request
	public function is_ajax() {
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}

}