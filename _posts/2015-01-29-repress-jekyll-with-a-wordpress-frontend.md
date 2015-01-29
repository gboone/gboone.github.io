---
title: 'rePress: Jekyll with a WordPress Frontend'
date: '2015-01-29'
layout: post
image: 
tags: 
- Jekyll
- WordPress
- Static site generators
- Side projects
description: rePress reads WordPress posts from a site configured with the REST API and spits out Jekyll posts.
excerpt: 
--- 

About five months ago I left the riveting world or WordPress development for the greener pastures of helping a [government startup manage its website](https://18f.gsa.gov), and while I've become [pretty taken with Jekyll lately](http://greg.harmsboone.org/2015/01/26/static-sites-revisited/), there will always be a part of me that loves WordPress. And so, like a good hacker, I started a side project I'm calling [_rePress_]() (a name that, admittedly, needs work—see below).

There have been a few different ways people approached the task of marrying WordPress with static site generators. Ben Balter's [WordPress to Jekyll exporter](https://github.com/benbalter/wordpress-to-jekyll-exporter) is one that takes on Jekyll specifically, then there's [StaticPress, a plugin for WordPress that transforms your installation into a static site](http://en.staticpress.net/), and finally CFPB is taking on the task of building a static site generator that will pull from WordPress and other APIs. rePress takes a different tack but is inspired by these other initatives. 

The first two of these solutions are WordPress plugins, and the second generates content from an API. This combines the two ideas by creating generator plugin for Jekyll sites that relies on the [REST API currently being integrated into WordPress Core](http://wp-api.org/#rest-api_about). Right now that API is only available as a plugin, but it will one day (soon, I think) require only a clean WordPress installation. 

Once you the API exposed, you need only point Jekyll to the root endpoint and run `jekyll build`  on your server or your local environment. Right now it will grab the 9 most recent posts and parse out the published title, date, tags, authors, and excerpts, and, of course, the post content and generate HTML files with proper Jekyll frontmatter.

This is something I've been excited about creating pretty much since the REST API project was first announced. I'll be pushing updates [to GitHub,](https://github.com/gboone/rePress) and would love any suggestions you have. In particular, I kind of hate the name I came up with, but all the original ideas like JekyllPress, StaticPress, and Hyde all mean other things related to Jekyll and WordPress. So here I am, with a name that means _subdue by force_ which is not at all what this does or is intended to do. I'm open to name suggestions but know that it'll probably change at some point.