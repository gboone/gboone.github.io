---
title: The Supreme Joy of Writing in the Open
layout: post
date: 2015-03-04
tags:
- open source
- writing in the open
- technology and society
---
There are times when I'm spectacularly awed by Open Source Software. Today was
one of those days.  We published [a blog post about how the team I work on uses
the terminal, GitHub, and Jekyll to publish 18f.gsa.gov][1]. This post could
just as easily be titled "the guide I wish I had 10 years ago when I started
tinkering around with web development." On my way home, I did a little
[from-the-bus troubleshooting][2] for a reader who was having trouble with our
instructions and found myself appreciating how many people went in to shaping
this post to where it is now. 

The last in the chain (so far) is a Twitter user and digital humanities
professor I don't know and may never meet in person named Heather Froehlich
([@heatherfro][3]). Heather tried following our instructions nearly immediately
after my co-author, [Melody Kramer][4], tweeted about it. Before @heatherfro
there was [Moncef Belyamani][5], who did a tremendous amount of extra legwork
completely unsolicited to help us make the post clearer. He even wrote a
[script called `laptop`][6] that future 18F team members will be able to use to
make their lives easier on day one. In addition to Moncef were the [other
individuals who helped us find mistakes and add to the post][7]. And none of
this includes all the people reading it right now and might read it in the
future.

We didn't just write a post _about_ open source software and how to use it, we
wrote it in the open and you can actually see [the back and forth Mel and I had
to update the post][8] and even see where Moncef jumped in to help us. If you
go back even further you can see [an earlier revision][10] where we got some
help from [Eric Mill][11]. Earlier still we had help from [Kate Garklavs][18]
in testing our tutorial. 

The post instructs people to use tools we built internally like the [`go`][12]
script written by [Mike Bland][13] and myself, and the overall architecture of
our site shaped by many people who have already been mentioned plus our
colleagues [Michelle Hertzfeld][14], [Elaine Kamlley][15], [Hillary
Hartley][16] and the [dozens of individuals who have contributed to the site in
one way or another][17]. When readers run `git clone` in the tutorial, they are
downloading the work of nearly 60 other people.

Zooming out even further, when readers run those commands they are building off
the work of thousands of other people who built the tools our site uses to
generate: [Jekyll][19] is the bedrock with [430 contributors][20], but there's
also the handful of [gems][21] that go into making Jekyll work and everybody
who had a hand in those projects. On top of all that, Ruby, the language every
gem is written in, is an open source project with hundreds of individuals
working on a given release.

This is all to show how easily we can trace @heatherfro's comments on twitter
through a kind of supply chain of code, prose, and ideas that builds 18F's
website simply because it is open source. We don't write all of our articles
this way, but I'm hoping we do it more.

One thing about GitHub I find profoundly interesting is their drive toward
expanding the idea of working in the open to realms that are not programming.
Last summer they introduced [PSD Viewing and Diffing][22] and late later did
the same for [SVGs][23]. They improved the interface for comparing text
documents like Markdown [so that it's easier to see what has changed][24] and
have one of the best wiki platforms in existence (sorry, MediaWiki, it's true).
They're not just building a robust collaboration platform that facilitates the
kind of exchange of ideas an knowledge creative people crave.

I'm attempting to relaunch the jounralism project Danielle and I [helped create
in Seoul][25] as a static site (using Jekyll right now, but Middleman is
looking interesting). GitHub was just getting stated and I remember being
really confused about [what the point of version control was][26]. Tearing
apart that old WordPress theme was an exercise in seeing how far I've come as a
web developer, and reflecting on the decisions I made and how many of them I
would make differently if I were doing it today.

One of the first things I remembered was sitting in a cafe in Hyehwa with the
rest of the IU team, crowded around our MacBooks to unveil at least two
different version of the site I had worked on by _deactivating and reactivating
different themes from the admin interface._ It was extremely frustating, and
laughable now that I know how to work with branches, tags, and commit history.
I also remember emailing around PSD files when we were attempting to land on a
logo, and using Google Wave (yes, we _actually_ used Wave and kind of loved it)
to discuss our drafts. I'm pretty sure we would have not if not all, a lot more
of that in GitHub were it the platform it's turned into today.

This is not an advertisement, though. GitHub has some big flaws and barriers to
entry for people who don't have a lot of patience for the technical are still
high. It is, at its core, a profit-driven commercial engine and the underlying
codebase for GitHub is not open source and there's no guarantee it will be
around forever.

One thing I love about open source projects is their potential for immortality.
WordPress has a particularly delightful open source story. Matt Mullenweg loves
telling it and [I've summarized it before][27], but the gist of it is that love
it or not, WordPress would never have existed if not for the open source
license of the project that preceeded it, b2/cafelog. That immortality and
spirit of picking up a project where it was left is still fairly unique to
software. Copyrights are, by law, ["fixed in a medium,"][28] they are often
thought of as complete works and create strange legal issues for derivative
works or remixes. If we can one day have a society where works of art are as
open and communal as works of code, that would be a truly wonderful place.

[1]: https://18f.gsa.gov/2015/03/03/how-to-use-github-and-the-terminal-a-guide/
[2]: https://twitter.com/mkramer/status/572914261019774977
[3]: https://twitter.com/heatherfro
[4]: https://18f.gsa.gov/hub/team/melody/
[5]: https://18f.gsa.gov/hub/team/moncef/
[6]: https://github.com/18f/laptop
[7]: https://github.com/18F/18f.gsa.gov/issues/542
[8]: https://github.com/18F/18f.gsa.gov/pull/576
[9]: https://github.com/18F/18f.gsa.gov/commit/db1ab979c74ecbf183d6436d2804e9952782b575
[10]: https://github.com/18F/18f.gsa.gov/pull/550
[11]: https://18f.gsa.gov/hub/team/eric/
[12]: https://github.com/18F/18f.gsa.gov/blob/staging/go
[13]: https://18f.gsa.gov/hub/team/mbland/
[14]: https://18f.gsa.gov/hub/team/mhz/
[15]: https://18f.gsa.gov/hub/team/elaine/
[16]: https://18f.gsa.gov/hub/team/hillary/
[17]: https://github.com/18F/18f.gsa.gov/graphs/contributors
[18]: https://18f.gsa.gov/hub/team/kate/
[19]: http://jekyllrb.com
[20]: https://github.com/jekyll/jekyll/graphs/contributors
[21]: https://rubygems.org
[22]: https://github.com/blog/1845-psd-viewing-diffing
[23]: https://github.com/blog/1902-svg-viewing-diffing
[24]: https://github.com/blog/1885-better-word-highlighting-in-diffs
[25]: http://internationalunderground.org
[26]: http://bitquabit.com/post/unorthodocs-abandon-your-dvcs-and-return-to-sanity/
[27]: https://www.harmsboone.org/weak-ties-build-movements
[28]: http://www.copyright.gov/title17/92chap1.html
