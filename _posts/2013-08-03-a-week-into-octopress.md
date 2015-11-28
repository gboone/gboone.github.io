---
title: A week into Octopress
author: Greg Boone
layout: post
permalink: /blog/2013/08/03/a-week-into-octopress
categories:
  - Merge Conflicts
tags:
  - Octopress
  - static sites
  - WordPress
lat: 38.904722
lng: -77.016389
loc: "Washington, DC"
---
About a week ago I successfully migrated some of my posts from [harmsboone.org][1] to this blog, I also wrote a post about [some things I learned about git that week][2]. WordPress is great. I wouldn't recommend it (and I almost always do) if it weren't. For someone who wants to spin up a blog and maybe some day more in a pinch, WordPress is the go-to platform. In fact, the rest of harmsboone.org still runs it. Earlier this year, though, Danielle and I started talking about ditching the one-blog-for-both solution. When we were both living and teaching abroad sharing one blog made sense but now with the both of us starting different careers, we have different things to say.

We decided to keep HarmsBoone.org as an archive of the last four years and also create new blogs for the both of us. Since I was starting from scratch anyway, might as well strike out with something new.

<!--more-->

Octopress required a different way of thinking. It's a static file generator, not a server-database system. I knew that. I even knew I wanted to host it on GitHub but nevertheless, for whatever reason, my first step was to fire up a server for greg.harmsboone.org and installing octopress in parallel on the server and my local machine, just like I would if I were setting up WordPress. Wrong. When I stopped overcomplicating and [followed the directions][3], everything fell right into palce. (For anyone trying to launch their Octopress site, it's a lot easier when you `rake new_post[]` or `rake new_page[]` before trying to deploy.)

## Things to like:

#### 1. Simplicty.

I love how clean and simple the Octopress interface is. There's no menu-laden backend to interface with, no menus to customize, or sidebars to fiddle with. All of that lives in HTML files that live on my machine and backed up on github.

#### 2. Backed up, version controlled

Since the site is hosted on GitHub, I'm forced to use version control on my posts, pages, and template files. This has the added bonus of all my posts being backed up as soon as their published. With WordPress, they were trapped on a MySQL database at Dreamhost. Sure I could have shelled out for [RAMP](), [Backup Buddy]() or [VaultPress](), but one of those would just be another plugin I'd have to deal with and would still not version control my blog.

#### 3. `rake preview`

What? No MAMP/XAMPP/AMPPS? Done. Over. Next.

### Things I miss:

This is not to say Octopress land is all roses and unicorns. There are some major disadvantages to the new frontier.

#### 1. The web interface

WP-Admin has the distinct advantage of being a web-based content editing interface that lives in the same place where the content is hosted. It also generates those posts automatically. With Octopress, I have to `rake deploy` to publish. That's less convenient.

#### 2. Mobile Apps

With little exception, I've been laptop-free since we got back from Hungary. The iPad did just about everything I needed to do away from my desktop while I was in grad school. Tablets are great and have the added benefit of being able to stay in my backpack in security lines (at least in the US).

The WordPress mobile app is great and updating blogs from it is really. Octopress isn't quite there. If I wanted to blog from a tablet, [I'd have to have a remote server syncing and auto-deploying from dropbox or GitHub][4]. I'll probably end up brigning a laptop, at least until `rake watch --autodeploy` becomes a thing.

#### 3. For Hackers Only

One appealing thing about working in WordPress was that everything was on the same system. Octopress bring the terminal-centric, that rules out a lot of possible users who are not also developers. People who don't have patience to learn Markdown or git are out. WordPress, to some extent, just works. It's intuitive, has a UI, and requires very little maintenance beyond an occasional software update.

 [1]: http://harmsboone.org
 [2]: http://greg.harmsboone.org/blog/2013/07/28/what-i-learned-about-git-this-week/
 [3]: http://octopress.org/docs
 [4]: http://www.candlerblog.com/2012/04/01/remote-octopress-workflow/
