<?php
namespace App;

class Router

{
    public function resolve ()
    {
        $route = strip_tags($_SERVER['REQUEST_URI']);
        $route = explode('/', $route);
        unset($route[0]);
        $result[0] = array_shift($route);
        $result[1] = array_shift($route);
        $result[2] = $route;
        return $result;
    }

}