<?php

namespace Controllers;


class Error extends \Exception
{

	public function error404 ()
    {
    	return \Controllers\Home::renderError404();
    }

}