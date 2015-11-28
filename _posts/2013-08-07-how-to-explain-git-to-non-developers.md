---
title: How to Explain Git to Non-Developers
author: Greg Boone
layout: post
permalink: /blog/2013/08/07/how-to-explain-git-to-non-developers
categories:
  - Merge Conflicts
tags:
  - git
  - software development
  - version control
lat: 38.904722
lng: -77.016389
loc: "Washington, DC"
---
Since starting with [Excella][1] in January I've found myself explaining `git` and the underlying concept of version control to a lot of non-developers. People like to ask me what I'm doing at my job, what I'm learning, and git was a big one I had to learn early on. What I usually focus on when explaining *git* is how it is fundamentally different from revision history tools like those included with Google Documents and other word processors.

<!--more-->

I was familiar enough with the idea of version control systems (VCS) before I started, but never saw the need to figure out their complexities. I tried setting up harmsboone.org as a git remote at one point, but lost the patience. Plus, I was just a lone coder working on a WordPress theme, it seemed like a lot of work to keep track of changes only I was making. What I lacked was a fundamental understanding of the value of a VCS. Now that I have that, I realize how potentially valuable it would have been for a simple WordPress theme or even an academic paper.

These days, when I explain git to people, I usually say it's a way of grouping all the files I'm working on in a given project together in a system that can watch for changes, log them, and quickly move to different points in time. The reaction this usually invokes is &#8216;oh, so basically like Google Docs.' And yes, it is a little like Google Docs, but also very different on some fundamental levels.

The first is that Google Docs, and other tools like it, are *revision history* trackers. That is, Google keeps a log of everything I type at any given moment. If I want to branch out, try something different or experimental for a minute, I can do that, but all those revisions are still logged to the file I'm working on. Going back means browsing through what could be days worth of revisions to find where I started. With a VCS like git, I can create a branch off of the current project, make some changes, even save those changes, to that branch's revision history (or `git log` as we might say) and if at the end I'm not happy with them, I can just &#8216;checkout' the original starting point.

Another advantage is project-wide tracking. Imagine using Google Docs to write a book. You want to have one file that's the master manuscript, and other files for chapters you'll add in when they're ready. Each file is tracked, but the whole project is not. Git, on the other hand, watches the whole project. When you write a chapter, create a branch, write it, commit all the changes as you go, then switch back to master and create another branch for chapter two. Now imagine you're 22 chapters in and you want to rethink chapter one. You could go back to your chapter one branch and edit it, or you could create a new branch, non-destructively rewrite the chapter, then decide which is better at the end. When you're done merge all the branches together into master and finish it up. Now you have a unique version history for each chapter and for the whole book.

The last is an extension of the others. In a word processor, collaborating on a document means one of two things: 1) group editing of the same file *ala* Google Docs, or 2) emailing around documents with filenames like: final-draft3-groupreport-jane-todd-revisions-04152012(2)(2).docx, where there are *n* older versions somewhere. The latter usually results in a chaotic folder dedicated to one assignment every version in it. The former forces everyone to work on the same revision history. Though that may be elegant in many ways, it can be impossible to tell who added what and when (let alone why) to a document without going mintue by minute through the revision history. Git allows everyone to non-destructively work on the same project and for the group to decide how it all comes together. It's the best of both options.

Git is a powerful tool that allows granular tracking of code across an entire project and there are more features than can be listed here to prove that point. It also allows sophisticated collaboration that, despite being a bit technical, could be applicable to any kind of task. This is perhaps what Wired meant when they declared "we're all open source" now, referring to the rise of GitHub as a collaborative software development platform. Hopefully people outside programming communities can put it to good use.

 [1]: http://excella.com
