<?php

namespace App;


class Controller
{

    private static  $layoutFile = 'Layout.php';

    public static function renderLayout ($body)
    {

        ob_start();
        require ROOTPATH.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.'Layout'.DIRECTORY_SEPARATOR.self::$layoutFile;
        return ob_get_clean();

    }

    public static function render ($viewName, array $params = [])
    {

        $viewFile = ROOTPATH.DIRECTORY_SEPARATOR.'Views'.DIRECTORY_SEPARATOR.$viewName.'.php';
        extract($params);
        ob_start();

        require $viewFile;
        if ($params != null)
        print_r($params);
        $body = ob_get_clean();
        ob_end_clean();
        return self::renderLayout($body);

    }

}