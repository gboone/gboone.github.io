---
title: How can I Configure WordPress to Handle Dynamic Hostnames?
author: Greg Boone
layout: post
permalink: /blog/2014/02/13/how-can-i-configure-wordpress-to-handle-dynamic-hostnames
categories:
  - Merge Conflicts
tags:
  - proxied requests
  - system admin
  - WordPress
loc: dc
---
An increasingly common problem enterprise-level WordPress installations will face is how they handle build, staging, and production environments where IP addresses inside a VPN use a different hostname to access the same server as those outside the VPN. In this case, the wp-config.php file is a little more complicated than in the famous 5-minute install.  
<!--more-->


It's somewhat common practice now to lock WordPress's site URL setting in code rather than in the settings menu. Mostly people do this because it is good insurance that nobody will ever change them but at my client we do it so that local environments, and our private and public servers can all share the same `wp-config`. We did it, [fairly standardly, with the HTTP\_HOST key from the $\_SERVER superglobal][1]. It's pretty neat and makes life really easy.

We ran into a problem with our unified wp-config this week when a new load-balancing and proxying environment caused &#8216;HTTP_HOST' to point at an inaccessible address in some environments. What to do?

The proxy was ferrying our visitors around using a standard called [X-Forwarded-For (XFF)][2]. If the user was coming from outside the VPN, their request would be forwarded through to the correct location. Simple enough but, because the requests are all pointing to an internal hostname, HTTP_HOST was resolving to an address inaccessible to the user and thus all our static assets were unable to load. The problem turned out to be easy to solve.

As it turns out an X-Forwarded-For is often accompanied by an X-Forwarded-Host (the hostname the user was trying to reach). We simply sniff out whether $\_SERVER has a X-Forwarded-Host key and set site\_url and wp\_home to the X-Forwarded-Host and fall back on HTTP\_HOST for non-forwarded environments. Something like this:

    if ( array_key_exists( "HTTP_X_FORWARDED_FOR", $_SERVER ) ) {
        define( "site_url", $_SERVER["HTTP_X_FORWARDED_FOR"] );
        define( "wp_home", $_SERVER["HTTP_X_FORWARDED_FOR"] );
    } else {
        define( "site_url", $_SERVER["HTTP_HOST"] );
        define( "wp_home", $_SERVER["HTTP_HOST"] );
    }

 [1]: http://codex.wordpress.org/Editing_wp-config.php "Editing WP-Config.pgp"
 [2]: http://en.wikipedia.org/wiki/X-Forwarded-For "X-Forwarded For, Wikipedia"
