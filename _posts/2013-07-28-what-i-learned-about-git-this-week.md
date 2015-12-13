---
title: What I learned about git this week
author: Greg Boone
layout: post
permalink: /blog/2013/07/28/what-i-learned-about-git-this-week/
categories:
  - Merge Conflicts
tags:
  - git
  - github
loc: dc
---
I love hidden features in software. Whether it's finding a [konami code in unexpected places][1] or that I can add or remove all the dots and underscores to my gmail address I want and I'll still get the emails, something about them are great. That was what made Zach Holman's presentation &#8216;More Git & GitHub Secrets' such an enjoyable read this week.

<!--more-->

Git can be at once incredibly powerful and overwhelming. It has one of the longest manual pages I've ever seen, and sub-commands have an equally long manuals. Picking up the basics, it's easier to rely on a book, the book: [ProGit][2], which can take you from installation to power user, but there are all kinds of hidden features built into git you can only find by using git *all the time*.

I get the impression that people at GitHub spend a lot of time digging into git and it's probably why GitHub is so good at what it does. And, like git, it's full of hidden features. For example, in [@holman's][3] recent talk, he talked about fetching pull requests into a specific branch, a convenient short cut to the typical:

<pre class="lang:sh decode:true " >git checkout -b pr
git pull &lt;git URI&gt; &lt;branch&gt;
&lt;fix any merge conflicts&gt;
git checkout &lt;branch&gt;
git merge pr</pre>

You can fetch a pull request into a branch with:

`git fetch origin pull/<##>/head:pr`

Woah, way handy, git, GitHub! Another highlight, `git merge --abort`. You know that one time you accepted a pull request into the wrong branch and had a billion merge conflicts? This one little command will abort the merge and reset your tree without any rebasing or having to push `git commit -m 'fixing erroneous merge to the wrong branch'` to your remote.

There are lots of other great tips in this and Holman's previous talks. [Check them out at his website, zachholman.com.][4]

 [1]: http://www.vogue.co.uk/
 [2]: http://git-scm.com/book
 [3]: http://zachholman.com
 [4]: http://zachholman.com/talk/more-git-and-github-secrets/
