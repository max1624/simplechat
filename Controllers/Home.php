<?php

namespace Controllers;

class Home extends \App\Controller
{
	public static function index ($params)
    {
        return self::render('HomePage');
    }

    public static function renderError404()
    {
    	return self::render('error404');
    }
}