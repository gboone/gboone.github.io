---
title: 'How to Maybe Flush WordPress's Rewrite Rules'
author: Greg Boone
layout: post
permalink: /blog/2013/08/24/how-to-maybe-flush-wordpresss-rewrite-rules
categories:
  - Merge Conflicts
tags:
  - development tips
  - Rewrite rules
  - WordPress
---
Custom post types and taxonomies are one of the most powerful tools to transform WordPress from a blogging platform to a full CMS. One of the most common problems beginning developers have when starting to use them is understanding how they work. It's easy to think that calling `register_post_type` is all it takes only to discover that their new post type archives are not working. This likely leads to a long dive into first (hopefully) the code to see if something was written incorrectly and then to the WordPress support forums to figure out what the problem is. 99% percent of the time I wager it's because the developer forgot to flush WordPress's rewrite rules.

<!--more-->

The misunderstanding is in thinking that the &#8216;register' in `register_post_type` means there is some kind of database entry or global variable that completely installs the new post type. Not so. What it actually does is hook your new post types into the list of post types WordPress looks for on every page load. Even if you pass the `has_archive` and `rewrite` arguments, post type registration does not touch the rewrite *rules* that tell your webserver where and how to find the new post type, just what those rules should be once they are created.

Unlike post types, rewrite rules are stored in the database and are occasionally cached so they aren't pulled on every page load. The `wp_rewrite` row of the `wp_options` table might be quite large depending on what your permalink settings are, how many post types and taxonomies you have, and whether you have any rewrites going outside of WordPress. The only way to change the content of the global variable $wp_rewrite is to call `flush_rewrite_rules`, typically done by saving permalinks settings in wp-admin, this function clears the rewrite row and re-saves it.

Sometimes it isn't possible to click that button. Consider, for example, a production server without wp-admin accessible. How are you supposed to flush the rules? The `flush_rewrite_rules` function is costly, as noted in the codex, but must be hooked into `init` to work effectively. The problem is, flushing is expensive, espcially if you have a high-triffic website, and hooking to `init` means it will happen on every page load. What to do? Check if rewrite rules are correct and flush only if needed.

We have such a configuration at CFPB where wp-admin is generally inaccessible and we've been struggling with exactly this problem every time we create a new post-type. I sloved the problem with a simple function called [`maybe_flush_rewrite`][1].

<pre class="lang:php decode:true " >function maybe_flush_rewrite_rules($target) {
    $rules = get_option( 'rewrite_rules' );

    if ( $rules[ $target . '/?$' ] !=  'index.php?post_type=' . $target ) {
        flush_rewrite_rules( $hard = true );
    }
} 
// then pass the post type name to maybe flush rewrite rules
maybe_flush_rewrite_rules( 'your_post_type' );
</pre>

YMMV with this function because I'm guessing it may be dependent on your permalinks settings, but after poking around the content of the `wp_rewrite` table I realized that if a custom post type had an archive it would have a rewrite structure similar to `index.php?post_Type=<post_type_name>`. This function takes a post type name as the `$target` parameter, checks if it is registered, and flushes only if it is not in the rewrite table. Now you can register a post type and call `maybe_flush_rewrite_rules` anywhere to clear the rules only if needed.

 [1]: https://gist.github.com/gboone/6294720