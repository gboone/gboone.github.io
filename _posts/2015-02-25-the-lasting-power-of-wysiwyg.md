---
title: The Lasting Power of WYSIWYG
date: '2015-02-25'
layout: post
image: /assets/images/wysiwyg.png
tags: 
- Jekyll
- Content management
- wysiwyg
- Static site generators
- WordPress
- 18F
- Communications
authors: 
- gboone
--- 
Jekyll has become one of my favorite things lately. At 18F we're using it to
power our website but also our [Hub project](https://18f.gsa.gov/hub/) which
includes serving up [snippets](https://github.com/18F/weekly_snippets), our
weekly team updates submitted by Google Form, as well as a tremendous amount of information that is a
mix of pages restricted to our team and some that is public. The Hub uses
[Prose](https://prose.io) to allow people less comfortable with GitHub and
Markdown to edit
Jekyll pages with something closer to a What you See is What You Get (WYSIWYG)
interface than a typical markdown document has. Prose is a great tool, and I'm
not just saying that because we use it. But for many static sites haven't quite
gone far enough, and that's okay.

Early adopters like static sites a lot. People who bought one of the first
Blackberries or used WordPress in 2006, for example, might like static site
generators a lot.  People who like Markdown or other markup languages enjoy
static site generators. And some appreciate the simplicity of configuration
found in static sites, especially the lack of a database. For many people like
me it is a refreshing focus on writing without the complications of The Admin
UI that have plagued even the best CMS platforms. 

An example of these complications? I recently helped my wife with some
settings on [her blog](https://danielle.harmsboone.org) and was reminded how
confusing the WordPress Admin can be. Where do you think you should go to set
your front page to display a page instead of latest posts? Settings > General?
Settings > Writing? Settings > Media? The answer: None of the above.  It's
Settings > Reading. I guess when I think about it that makes sense, you're
changing a setting that changes the experience for someone _reading_ your site.

At the same time, [there are still some things that a CMS does really well that
static site generators
lack](http://greg.harmsboone.org/blog/2014/01/13/octopress-six-months-later/).
At least to me, Jekyll's simplicity is a feature that forces me to think about
the value of, for example, a tag archive or automatic image formatting before
implementing it.  With a CMS these features are there waiting for you to use or
extend. WordPress for example provides a really simple API to extend the
WYSIWYG interface with
['shortcodes.'](http://codex.wordpress.org/Shortcode_API) All of this comes in
handy when you need to create a blog post with images floated left and right
and center, or when building that tag archive ([easy as it may
be](https://github.com/18F/18f.gsa.gov/blob/staging/_plugins/generate_tags.rb))
means taking away time from publishing real content.

If I'm _not_ a developer, needing to become one or hire one just to start
writing a blog post is a pretty high barrier to entry. _Feeling like_ I need to
become one just to write a blog post is even higher. The reason I became a
developer in the first place was that in 2006 when I needed to reboot [my
college radio station's website](https://kgsm.blog.gustavus.edu/) WordPress was
insanely easy to install and configure and gave us almost everything we needed
(with the right theme and plugins), and in 2009 when I built the first version
of [HarmsBoone.org](https://harmsboone.org) and [International
Underground](http://internationalunderground.org) I didn't need to learn much
beyond CSS and a few WordPress methods. When I eventually needed to know more
it was still a fairly low barrier to entry and we always had a website that
everybody could edit. In particular, [Child
themeing](http://codex.wordpress.org/Child_Themes) is particularly useful for
learning WordPress on the fly. 

Static sites, for all their simplicies and technical advantages, still have a
pretty high barrier to entry, especially if you need to overcome the
limitations GitHub pages puts on Jekyll sites. And to be fair, WordPress has
significant (read: 8-10 year) head start over Jekyll plus the entire WordPress
Core and Automattic teams nurturing the developer base.

Nevertheless, without lowering that bar and adding some of those features it
will be really hard to get broader adoption among people who want a Just Start
Writing Already.  For many, logging in to the WordPress Admin and using the
WYSIWYG either to write or to paste in copied text will always be preferable to
editing monospaced text with strange formatting signals around it, even if
there are buttons to help them out. (Let's not belittle the bar-lowering power
or Prose, Dillinger, and other Markdown helpers, though, for some they may be
exactly the right tool.) 

It will remain preferable even if they rely on a bookmark in their browser, or
an icon on their desktop to get them to the admin screen.  Clicking "Preview"
will be preferable to navigating to running a shell command and then heading to
localhost:4000 because what's a localhost? What's that colon all about? And
what's so special about 4000? And clicking "Publish" will definitely be
preferable over committing a `git` workflow to memory.

These are problems Static Site Generators can solve, and part of what makes
them beautiful is how they are malleable to each user's needs. And if you [put
a developer on the comms
team](http://greg.harmsboone.org/blog/2014/10/18/your-comms-team-should-be-a-devops-team/)
you'll be able to build the site you need on the platform that works because
you'll ask your users what they need and how they work. If your users need to
copy and paste blog posts from Google Docs, give them that. If they want a
WYSIWYG editor for writing and collaborating on posts, give them that.  If the
need the full WordPress UI, give them that. I'm not trying to sound flippant.
Building a WYSIWYG on top of Jekyll would be a difficult problem, [but it's not
impossible](http://madebymany.github.io/sir-trevor-js/docs.html#1-3).  Using
Google Drive as a CMS will also take work, [it's not
impossible](https://docs.google.com/presentation/d/1iWKk8_BRTFP6pPIbL8BM0knRIP0zy6qwsPlaBn1bEyo/present#slide=id.g2526149c_1_14). Building GUI applications to abstract away the command line is difficult, [but not impossible](https://mac.github.com/).

There are hundreds of [content management
systems](http://en.wikipedia.org/wiki/List_of_content_management_systems) and
[static site generators](https://staticsitegenerators.net/) operating on
nearly every language in existence (including
[FORTRAN](http://sourceforge.net/projects/fortranblog/)). And there are
WordPress plugins for nearly everything imaginable at this point, and usually
there are three of four of them to choose from. Your mileage will almost
certainly vary from one solution to another but go with the solution that will
make your content creators most comfortable.
