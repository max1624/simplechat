<?php

namespace Controllers;

use Models\Message as Message;

class Api extends \App\Controller
{
	private	$message;

	public function saveMessage ()
    {
    	if($this->is_ajax()) {
	    	if(isset($_POST) && $_POST) {
	    		if($_POST["data"]) {
	    			$this->message = new Message();
					 return json_encode($this->message->saveMessage($_POST['data'], 1));
	    		}
	    	}
    	}
    }

    // Checking if it is AJAX Request
	public function is_ajax() {
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}

}