
<?php 
    $categorias = get_terms( array( 'taxonomy' => 'category','include' => array('2'), 'hide_empty' => false ));
    $catID   = $categorias[0]->term_id;
    $args    = array('post_type' => 'post', 'cat' => $catID, 'posts_per_page' => -8, 
    'tax_query' => array(
        array('taxonomy'=>'destaques','field'=>'slug','terms'=>'sim'),  
    ),
    'orderby' => 'date', 'order' => 'DESC');
    $sliders = new WP_Query($args);
?>
<div class="section top-section">
    <div class="wrapper">
        <div class="w-slider-mask">
            <div class="owl-carousel owl-theme" id="owl-slider">
                <?php while ( $sliders->have_posts() ) : $sliders->the_post(); 
                    $thumbnail_url    = get_the_post_thumbnail_url(get_the_ID(), 'medium_large'); 
                    $cat              = get_the_category(get_the_ID());
                    $day              = get_the_date('d', get_the_ID());   
                    $month            = get_the_date('F', get_the_ID());   
                    $data             = $day.' de '.$month;
                    $color            = get_term_meta( $cat[0]->term_id, 'term_color', true);
                ?>
                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" class="post-card-v2-big w-inline-block slider-card">
                        <div class="post-card-content">
                            <div class="badge" style="background:<?php echo $color; ?>;"><?php echo $cat[0]->name; ?></div>
                            <h3 class="post-v2-heading"><?php echo mb_strimwidth(get_the_title(),0,70,'...'); ?></h3>
                            <div class="post-info-2 text-white">
                                <div class="post-info-block-2 slider-info">
                                    <img src="https://uploads-ssl.webflow.com/5fa443314944220d73966316/5fa443310cae07d071288d94_calendar-white.svg" alt="data da postagem" width="14px" height="14px" class="mini-icon slider-icon">
                                    <div><?php echo $data; ?></div>
                                </div>
                                <div class="post-info-block-2 slider-info">
                                    <div class="divider-small transparent"></div>
                                    <img src="https://uploads-ssl.webflow.com/5fa443314944220d73966316/5fa443310cae073d8e288d91_clock-white.svg" alt="tempo de leitura" width="14px" height="14px" class="mini-icon slider-icon">
                                    <div><?php echo do_shortcode('[rt_reading_time label="" postfix="minutos de leitura" postfix_singular="minutos de leitura"]'); ?></div>
                                </div>
                                <div class="post-info-author text-white slider-info">
                                    <div class="divider-small transparent"></div>
                                    <img src="https://uploads-ssl.webflow.com/5fa443314944220d73966316/5fa443310cae07fbe2288da7_user-white.svg" alt="usuario" width="14px" height="14px" class="mini-icon slider-icon">
                                    <div><?php the_author(); ?></div>
                                </div>
                            </div>
                        </div>
                        <div class="post-gradient"></div>
                        <div class="thumbnail-2" style="background-image: url('<?php echo $thumbnail_url;?>'); background-position: center; filter: brightness(99.8242%); transform: translate3d(0px, 0px, 0px) scale3d(1.00105, 1.00105, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: filter, transform;"></div>
                    </a>
                <?php endwhile; wp_reset_postdata();?>
            </div>
        </div>
    </div>
</div>