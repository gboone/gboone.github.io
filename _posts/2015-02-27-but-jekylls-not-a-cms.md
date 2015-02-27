---
title: But Jekyll is not a CMS!
date: '2015-02-27'
layout: post
image: "/assets/images/apple_orchard.jpg"
tags:
- Jekyll
- Content management
authors:
- gboone
--- 
![Honeycrisp orchard, my favorite apple, image from wikimedia commons](/assets/images/apple_orchard.jpg)

Earlier this week I wrote [another post comparing static site generators to
content management systems][1] using Jekyll and WordPress (perhaps unfairly) as
representatives of their respective technologies. It got me thinking that in
writing it I was compairing apples to oranges. Static site generators are not
content management systems. They are generators, converting properly formatted
input into webpages. To compare it to a content management system is like
comparing [TeX][2] to [Microsoft Office][3]. Sure, both can get you a PDF
eventually, and sure it might _look_ better coming out of TeX, but good luck
trying to embed a long table into a LaTeX file for the first time. Perhaps a
better metaphor than apples and oranges is I'm comparing apples to farmland.

The things [I outlined][1] that static site generators don't quite have down are
really all management tasks. A built-in text editor, management of categories
and tags, clearly defined content types, automatic rewrite rules for if you
rename a page, I could go on an on: These are all features a good content
manager should have built in. With static site generators you have to do all
that yourself, particularly if you're hosting your site with Jekyll on GitHub
pages or want to add commenting to your blog posts.

I am under no illusion that this blog will probably never have anonymous, inline
commenting like it did when I hosted it on WordPress, but it was a conscious
move to encourage my readers to comment through GitHub [issues][4] and [pull
requests][5]. Most of my comments were fixing my typos anyway and now I don't
have to log in to my admin screen to fix them. They fix themselves! That is all
to say, if I wanted to get away from a particular content management system I
could have easily switched to a different one, and if I wanted a DIY content
management system I could have used Django or learned Rails to build one.
Switching to a static site generator was an intentional decision to reassess the
value of all the things a CMS would give me by eliminating most of them
completely.

CMSs are apples. You know what to expect, they're easy
to eat, and you get roughly the same thing every time. Static site generators
are farmland. Maybe you'll plant an apple orchard, but if you're not into
apples, you could grow something that works better for you. It's been a fun road
so far, [not only learning the new thing, but also appreciating the do more with
less attitude that comes with having to do everything up front.][6]

[1]: /2015/02/25/the-lasting-power-of-wysiwyg/
[2]: https://tug.org/
[3]: https://products.office.com/en-US/
[4]: https://github.com/gboone/gboone.github.io/issues/3
[5]: https://github.com/gboone/gboone.github.io/pull/2
[6]: /2015/01/26/static-sites-revisited/