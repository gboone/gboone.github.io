---
title: 'Octopress: Six Months Later'
author: Greg Boone
layout: post
permalink: /blog/2014/01/13/octopress-six-months-later
categories:
  - Merge Conflicts
tags:
  - bikes
  - blogs
  - fixies
  - Octopress
  - WordPress
---
When I was a week into this blog, I wrote down [some of the reasons I liked Octopress][1], my initial impressions of it as a blogging platform and whether it could compete or replace WordPress. It was a leap for me, a WordPress developer and long time fan of the platform. In general I have found Octopress to be an interesting experiment in hacker blogging but am back to WordPress as of this entry.<!--more-->

Starting, as before, with what I (still) like about Octopress. There is still a lot to like.

1.  I love writing in Markdown. WordPress.com recently added Markdown support, so it's only a matter of time before I can write in Markdown here without a plugin, but being able to practice What You See is What You Mean (WYSIWYM) while blogging without writing straight HTML is really quite convenient. When I write on WordPress blogs at work I often forget it's either straight HTML (too cumbersome) or the TinyMCE What You See Is What You Get (WYSIWYG) editor (too unreliable).
2.  Simple local previews are another thing I really love. `rake preview` is up there with Django's `./manage.py runserver` test server in simplicity. What I would change is that the rake server is not nearly as competent as Django's when it comes to compiling sites after making changes and letting you know about errors. For example, using quotation marks in categories causes errors in site generation with Octopress but the only output in the preview terminal is the somewhat unhelpful `WARN Could not determine content-length of response body. Set content-length of the response or set Response#chunked = true`. Nevertheless it is quite simple to get a full, local, site preview while you're still editing.
3.  Accidental publishing happens less frequently. This relates to 2 in that you have to be pretty deliberate about publishing the post for the world to see. Saving the file locally preserves your work. `rake preview` let's you see it in a browser (almost) exactly as it should appear. Getting it out in the public, however requires `rake gen_deploy` run from the terminal.

With all that said, Octopress has a long way to go. Most of what I missed is WordPress's user interface and content management features.

1.  **Drafting posts.** In WordPress, your post isn't given a published date until you hit Publish, at which point it records the exact moment in time you hit publish as the date posted. In Octopress, this timestamp is added as soon as you execute `rake new_post[]`. I'm a drafter. Sometimes I'll start three blog posts at once to get some ideas on the page and then put them aside until I have time work on them. (I started this one on January 1 and look at me now.) December 23, for example, I wrote [Why Unit Testing Matters][2] in one go. But I also started two follow on posts about writing good unit and integration tests. I ran `rake new_post` three times and each post had the same publish date even though the last two hadn't been published yet! When I `rake deploy`ed, I had the post I wanted buried under two empty posts. When I finally finished the first of the others it was 2014 and I had to manually change the date and time as well as the published status. Manually managing these publish times was a bit of a nightmare.
2.  Visualizing published work. A blogging UI that can list posts and organize them by date and time published or category is incredibly useful when trying to reference older works. As is being able to quickly copy the permalink out of the admin (or right within the post editing UI in WordPress) and paste it into a link block. Octopress has no such mechanism and URLs can get really long. In fact, the permalink structure I'm using here is consistent with Octopress to maintain backward compatibility and I'm more or less stuck with it even though I'd rather it be much shorter.
3.  Version control over posts. This doesn't matter to me as much anymore as it did in August. Markdown doesn't version control very well anyway since lines are sometimes thousands of lines long. Also, with WordPress's new drafting system, keeping track of changes in the post content is trivial and much more visual that it ever has been.
4.  Getting out. WordPress's export/import functionality made switching to Octopress and it would have made switching back easy except that Octo has no similar feature. The upshot is that everything in Octo is straight HTML so importing wasn't terribly difficult, but, manually re-entering the posts was time consuming and I'd rather not repeat it.

Paul Graham [tweeted recently that static sites are "the fixies of the Internet"][3]. I found that a compelling metaphor. To extrapolate it to [my favorite bike company][4], WordPress is [a complete Long Haul Trucker][5]. Well built, tough and reliable enough to last you a long time. Octopress is the Cross-Check frame. It [looks like it can do a lot][6] but it's unclear whether it's a [fixie][7], [for touring][8], [commuting][9], or [something else entirely][10]. The DIY aspects have a lot of advantages but also puts a lot of pressure on the user to decide what to do with it. Octopress clearly has a lot of advantages. But at the end of the day all I really want is to sit down and write a blog.

 [1]: http://greg.harmsboone.org/blog/2013/08/03/a-week-into-octopress
 [2]: http://greg.harmsboone.org/blog/2013/12/23/why-unit-testing-in-wordpress-matters/
 [3]: https://twitter.com/paulg/statuses/402205795552489472
 [4]: http://surlybikes.com
 [5]: http://www.pbase.com/image/83943401
 [6]: http://surlybikes.com/bikes/cross_check
 [7]: http://bikesarethesolution.files.wordpress.com/2009/06/6-25-2009-001-large.jpg
 [8]: http://www.pbase.com/image/99908656
 [9]: https://lh3.ggpht.com/_FNoZ-AcmLtQ/TRFkgcvKL8I/AAAAAAAAASs/xuRz5wmvebk/s1600/P1000564.jpg
 [10]: http://imageshack.us/photo/my-images/846/img1963.jpg/