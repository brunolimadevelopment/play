<?php

/*

* Scripts

* Desenvolvedor: Bruno Lima

*/

function call_script() {


    wp_enqueue_style('main', get_template_directory_uri() . '/assets/css/main.min.css', array(), '1.0', true);
    wp_register_script('main', get_template_directory_uri() . '/assets/js/main.min.js', array(), '3.1', true);

    wp_enqueue_script('main');

}

add_action('wp_enqueue_scripts', 'call_script', 100);