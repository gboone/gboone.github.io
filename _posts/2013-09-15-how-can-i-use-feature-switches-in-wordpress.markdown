---
layout: post
title: "How can I use feature switches in WordPress?"
date: 2013-09-15 07:54
comments: true
categories: best_practices WordPress continuous_integration
---
While a colleague and I were discussing the rollout of a new feature to our public facing website, he asked me if it would be possible to "hide" the new content behind a toggle. Effectively, he was asking me to write a [feature switch](http://en.wikipedia.org/wiki/Feature_toggle), a best practice of continuous integration that [allows you to push some source code while hiding future features](http://martinfowler.com/bliki/FeatureToggle.html). WordPress has some of this idea built into it's core: plugins, for example, can be activated and deactivated to turn things on and off. Within plugins and themes, options pages can be used to turn on different features. SEO plugins, for example, let users turn on and off different optimizaiton tools. Feature switches are a little different, and in our case leverage the power of Apache environment variables to show and hide different parts of our site.
<!-- more -->
## The problem

The end goal was to take _n_ posts, convert each to a new post type and then display them on a new archive template. (How we did the migration is another blog.) The problem was that while most of the code was ready, the content wasn't and the UAT was in progress. In order to run the content migration script, the bulk of the source code had to be live on at least our staging environment, but until everything else was finished, the archive needed to stay hidden.

Post type and taxonomy registration was done through another plugin, and turning that off was not an option, but we could change the way we registered _this_ particular post type by manipulating some of the arguments passed to `register_post_type()`. 

Typically, if you're going to register a post type you want to use and see it right away. You might even use a generator to do it for you:

``` php
add_action( 'init', 'register_cpt_post_type' );

function register_cpt_post_type() {

    $labels = array( 
        'name' => _x( 'Post type', 'post_type' ),
        'singular_name' => _x( 'Post type', 'post_type' ),
        'add_new' => _x( 'Add New', 'post_type' ),
        'add_new_item' => _x( 'Add New Post type', 'post_type' ),
        'edit_item' => _x( 'Edit Post type', 'post_type' ),
        'new_item' => _x( 'New Post type', 'post_type' ),
        'view_item' => _x( 'View Post type', 'post_type' ),
        'search_items' => _x( 'Search Post type', 'post_type' ),
        'not_found' => _x( 'No post type found', 'post_type' ),
        'not_found_in_trash' => _x( 'No post type found in Trash', 'post_type' ),
        'parent_item_colon' => _x( 'Parent Post type:', 'post_type' ),
        'menu_name' => _x( 'Post type', 'post_type' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => true,
        'supports' => array( 'title', 'editor' ),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'post_type', $args );
}
```

Zoom in on two of the `$args`: `public` and `has_archive`. The first turns the post type on in the backend and lets you create new posts of that type. The second controls whether typing `http://your.url/your_post_type` will lead to an archive or something else. In our case, we wanted `/your_post_type` to hit a WordPress page called `your_post_type` (the default behavior) until we were ready to launch the new feature at which point it should hit the post type archive. Remember, we don't want to launch until all the content is migrated to the new post type, so it was critical that we have it accessible on the back-end (`public => true`) but it's archive remain hidden on the front (`with_archive => false`).

### Possible solutions

We could have stored the switch in an option, but that would require hitting or caching a database value for every page load. That's not terribly expensive, but putting the switch at the application level is faster, more elegant, and reserves the `wp_options` table for storing our actual options. So originally we tried locating the switch as a variable in the plugin registration function. Since it was hooked to `plugins_loaded` it would fire, before post type registration, on every page load. That was less than elegant, however, because it effectively meant we had to maintain different branches of code for each environment, which could get confusing and/or messy.

## Enter SetEnv and get_env();

PHP's `get_env()` function is a simple one that fetches a specified [environment variable](http://en.wikipedia.org/wiki/Environment_variable) from the server configuration. Environment variables do all kinds of cool things, and if you set one in your Apache configuration, you can wrap new features in conditionals based on whether and to what value it is set.

First, write some PHP code like this:
    
``` php
$env = get_env(VARIABLE_NAME);
if ( isset($env) ) {
    // do stuff
} else {
    // do other stuff
}
```

Then, when you're  ready to toggle the feature, add a line like this to your [Apache configuration](http://httpd.apache.org/docs/2.0/mod/mod_env.html#setenv): `SetEnv VARIABLE_NAME value` where VARIABLE_NAME matches the `get_env()` parameter from above. Finally, restart Apache to trigger the change. To turn it off again, remove the `SetEnv` line and restart Apache.

In this example, it doesn't matter what the variable is set to; as long as it exists, the `if` condition is true. Now you have an effective feature switch that doesn't depend on your source code. You could even play around with setting multiple conditions using `elseif`. And that's how you use feature switches in WordPress.

[Discuss on Hacker News.](https://news.ycombinator.com/item?id=6389250)