<?php

namespace Models;

class Message extends \App\Db {

	private $table = 'messages';

	public function saveMessage($message, $author_id)
	{
		$query = "INSERT INTO `$this->table` (`message`, `author_id`) VALUES ('$message', $author_id);";
		if($this->insert($query))
			return true;
	}
	public function getMessages()
	{
		return $this->execute('SELECT * FROM `messages`');
	}
}