---
title: Using Composer to Manage a WordPress Installation
author: Greg Boone
layout: post
permalink: /blog/2014/01/16/using-composer-to-manage-a-wordpress-installation
categories:
  - Merge Conflicts
tags:
  - automation
  - best practices
  - composer
  - dependency management
  - WordPress
format: aside
lat: 38.904722
lng: -77.016389
loc: "Washington, DC"
---
The team at [Roots.io][1] have a fantastic walkthrough of [Composer][2] and [why and how you should use it in managing a WordPress site][3]. Composer is a wonderful piece of technology that reduces the headache of figuring out how to managing the individual components of your site to a single file and software solution. With WordPress, a utility like composer breaks an installation into discrete pieces. This allows you to automate deployments and updates of your site using only the composer.json file and isolating each part of your site to its own maintainable place. I plan to make composer-automated installations the default on all future WordPress projects I undertake.

 [1]: http://roots.io
 [2]: http://getcomposer.org
 [3]: http://roots.io/using-composer-with-wordpress/
