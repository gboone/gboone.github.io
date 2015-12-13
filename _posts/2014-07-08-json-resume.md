---
title: JSON Resume
author: Greg Boone
layout: post
permalink: /blog/2014/07/08/json-resume/
categories:
  - Merge Conflicts
loc: dc
---
A couple years ago my brother turned me on to LaTeX for writing and publishing
documents. He's a math guy and used it for just about everything he did. I'm not
sure if he had a working copy of Microsoft Word on his computer, but he
definitely had an updated MacTeX. I loved the What You See Is What You Mean
philosophy behind TeX and the idea that content was code. I wasn't a huge fan of
how verbose it was both in PDF-generation output and, especially, in the front
matter. After writing my first résumé in TeX I thought it was cool how I could
write a document style that would show and hide different pieces of it depending
on how I output it but, coming from HTML/CSS, everything seemed like it was more
difficult than it needed to be. Wouldn't it be great, though, if there was a way
you could keep your résumé data in a standard format, with all the data required
to build a full CV or a simple one-pager available when you need it? The JSON
Resume project gets that process started. Using [a standardized JSON schema][1],
you can generate as complete or simple a resume as you want with a simple
command: `resume export`. Check it out at http://jsonresume.org and on GitHub:
https://github.com/jsonresume/resume-cli

 [1]: http://jsonresume.org
