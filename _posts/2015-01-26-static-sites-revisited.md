---
title: Static sites revisited
date: 2015-01-26
tags:
- static site generators
- jekyll
- post-cms
loc: dc
---
<img src="/assets/images/jekyllLogo.png" alt="jekyll logo" />

I've been thinking a lot about static site generators lately. We use [Jekyll at
18f][1], a generator platform I had previously only used in the context of
[Octopress][2] and very briefly and fleetingly at [CFPB][3]. My past life as a
WordPress developer effectively ended in September when I began shifting careers
a bit to go back to my pervious role of hybrid communications-web developer, and
begin a new adventure building a full website without a CMS, without a database.

The most challenging part of this has been thinking about data and content
first. In my experience developing on WordPress a request to put something new
into the website usually involved one of two things: adding more custom fields
and relying on the intentionally lackluster UI to accomplish that, or creating a
new menu on a wp-admin screen. If you're going the latter route you have to
think about form validation, design, and what the appropriate method for saving
might be just when building the menu. Displaying the saved content to the user
requires a whole other step of ensuring you have the right information coming
out of the database.

Jekyll (which I'm using as a stand-in for [any static site generator][4])
simplifies that whole system by abstracting away the UI altogether. Let's use
guest authors as an example. Here's the problem: you have an author on a blog
post who is not a regular contributor and maybe they'll never write a post
again. In WordPress I've seen this problem solved two ways:

1. Create a new user in your system, give them a minimal role, and assign post
authorship _ex post facto_
2. Create a custom field called, e.g., `guest-author`
and use template logic to replace the name in the byline

Both of these have problems. In the first, you're adding users with no
relationship to the rest of the site. In the second, you're adding extra _data_
to a post, and confusing data at that. Either way, the semantic representation
of the post in the database is messy.

How to approach this in Jekyll? The easiest way is to just use the author's name
in the `author` field of the [post front matter][5]. But this solution is not
without it's problems either. On the 18F site we keep all our team members in a
long YAML file [inside the `_data` directory][6] and we reference post
authorship out of that file and wrote a little Jekyll plugin to fill in their
full name and (maybe someday in the future) extra information about the author.
If we have guest authors we have to break that pattern or write logic into
either the template or the plugin to address it.

In this example, both WordPress and Jekyll fail to give you a _perfect_
solution. On the one hand, WordPress (and most CMSs) give you that "about the
author" information out of the box, especially if you go with option 1. But in
exchange you get a new problem Jekyll's minimalist, database-free paradigm seems
to answer: authors needn't relate to any part of the system except the posts
they author.

I'm not sure which is best. I loved [hacking away at WordPress][7] even when it
drove me mad. It gives you 90% of what you need out of the box, and querying a
database is convenient, especially if you're site is really complex. By not
having a database, Jekyll forces you think broadly about what data you really
need for a post and for your site because everything is built before a user
loads their first webpage. As we've scaled [18f.gsa.gov](https://18f.gsa.gov)
from basically a blog to a more functional site, these questions haven't held us
back as much as they have forced us to think differently about the problem.

[1]: https://18f.gsa.gov/2014/11/17/taking-control-of-our-website-with-jekyll-and-webhooks/
[2]: http://octopress.org
[3]: https://cfpb.github.io/
[4]: https://staticsitegenerators.net/
[5]: http://jekyllrb.com/docs/frontmatter/
[6]: http://jekyllrb.com/docs/datafiles/
[7]: https://github.com/cfpb/cms-toolkit
