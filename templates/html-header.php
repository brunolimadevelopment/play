<?php get_template_part('templates/html', 'head'); ?>
<header class="play-header" id="teste">
  <nav class="play-nav">
  header
  </nav>
</header>



<?php if(!wp_is_mobile()): ?>

<?php wp_nav_menu(array('theme_location' => 'menu_1', 'menu_class' => 'me-component-menu')); ?>

<?php else: ?>

<?php wp_nav_menu(array('theme_location' => 'menu_3', 'menu_class' => 'me-component-menu-mobile')); ?>

<?php endif; ?>





<main class="main" role="main">