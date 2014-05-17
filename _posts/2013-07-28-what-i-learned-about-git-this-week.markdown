---
layout: post
title: "What I learned about git this week"
date: 2013-07-28 09:50
comments: true
categories: 
- git
- GitHub
---
I love hidden features in software. Whether it's finding a [konami code in unexpected places](http://www.vogue.co.uk/) or that I can add or remove all the dots and underscores to my gmail address I want and I'll still get the emails, something about them are great. That was what made Zach Holman's presentation 'More Git & GitHub Secrets' such an enjoyable read this week.

Git can be at once incredibly powerful and overwhelming. It has one of the longest manual pages I've ever seen, and sub-commands have an equally long manuals. Picking up the basics, it's easier to rely on a book, the book: [ProGit](http://git-scm.com/book), which can take you from installation to power user, but there are all kinds of hidden features built into git you can only find by using git _all the time_.

I get the impression that people at GitHub spend a lot of time digging into git and it's probably why GitHub is so good at what it does. And, like git, it's full of hidden features. For example, in [@holman's](http://zachholman.com) recent talk, he talked about fetching pull requests into a specific branch, a conveinent short cut to the typical:

    git checkout -b pr
    git pull <git URI> <branch>
    <fix any mrege conflicts>
    git checkout <branch>
    git merge pr

You can fetch a pull request into a branch with:

    git fetch origin pull/<##>/head:pr

Woah, way handy, git, GitHub! Another highlight, `git merge --abort`. You know that one time you accepted a pull request into the wrong branch and had a billion merge conflicts? This one little command will abort the merge and reset your tree without any rebasing or having to push `git commit -m 'fixing erroneous merge to the wrong branch'` to your remote.

There are lots of other great tips in this and Holman's previous talks. [Check them out at his website, zachholman.com.](http://zachholman.com/talk/more-git-and-github-secrets/)