<?php get_template_part('templates/html', 'header'); ?>

    <?php the_permalink()?>
    <?php the_post_thumbnail(); ?>  
    <?php echo get_excerpt(155); ?>
    <?php echo get_the_date();?>
  
<?php get_template_part('templates/html', 'footer'); ?>