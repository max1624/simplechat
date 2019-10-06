<?php

namespace Controllers;

class Home extends \App\Controller
{
	public function index ($params)
    {
        return $this->render('HomePage');
    }

    public function test()
    {
    	return json_decode('asd');
    }
}