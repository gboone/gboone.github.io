---
title: 'Flannel: A Python Project'
author: Greg Boone
layout: post
permalink: /blog/2014/03/25/flannel-a-python-project
categories:
  - Merge Conflicts
loc: dc
---
I'm a big fan of learning new things in programming. It's part of
why I tried running this blog on a static site generator only to get scared back
onto WordPress, and why I'll probably give SSGs another shot before swearing
them off completely. I recently had the opportunity to work on a project in
Python for work (in addition to a [WordPress plugin][1]) and it was an absolute
thrill.

## The Problem:

My client had a rather large WordPress site that relied on a home cooked theme,
a few internally developed plugins, and a few plugins from the WordPress Plugin
Repository. We also have a process for upgrading those plugins and WordPress
core that is a bit more complicated than just hitting the &#8216;upgrade' button
in wp-admin. We also have a lot of users, not just registered users, but people
who visit our website, too, who do not want the site going down, stop working,
or unexpectedly changing dramatically. That is, we're not facebook, we prepare
our users for changes to their user experience. We had to maintain all those
things but also make the deployment and upgrade process easier, faster, and less
prone to human errors.  

<!--more-->

Thus was born a project to create a push-button deployment system. A single
script that would package the whole site and only deploy if successful. Using a
tool called [fabric][2], so was born *[Flannel][3]*.

## What the heck is a fabric?

The python project we used for this project is called [fabric][4], a "command
line tool for streamlining the use of SSH for application deployment." It's
extremely powerful and I feel like I've only scratched the surface of what this
sucker can do. Basically, it lets your remove yourself from this process:

<pre>
$ ssh user@server

$ cd /path/to/application
$ # sudo ./deployment-script.sh
$ # sudo ./other-deployment-script.sh
$ ^d
</pre>

Or writing shell scripts that look like this:

<pre>
if [ ! -d /path/to/wordpress ]; then;
cd /path/to/wordpress
V=wp core version
  if [ V != &#039;3.8.1&#039; ]; then;
    echo &#039;WordPress is at the wrong version.&#039;
    echo "It expected 3.8.1 but was $V."
    exit 1
  fi
fi
if [ ! -d /path/to/plugins ]; then;
cd /path/to/plugins
# other deployment stuff
fi
</pre>

And replacing it with a process more like this:

<pre>

$ fab deploy

</pre>

And a script more like this:

<pre>
def deploy():
  with cd('/path/to/wordpress/'):
  try:
    v = run('wp core version')
    if v != '3.8.1':
      sys.exit(0)
  except SystemExit:
    puts(red(
      'WordPress is at the wrong version, it should be at ' + cyan('3.8.3') +
      red(' but is %s.' % v))
</pre>

Much simpler, right? And that's just for comparing WordPress's version with what
you expect it to be. All the stuff you normally run in the "more deployment
stuff" part is stuck inside the fabric script and highly customizable depending
on your configuration. You can even have it deploy differently to certain servers.

Flannel currently handles installing WordPress itself, and plugins and themes.
More importantly, it allows you to do all management of those things, what
version they're installed at, whether they're active, etc. from the command
line, rather than wp-admin. It uses `wp-cli` to handle almost all those
processes, and a YAML file for storing your configuration. It's great for highly
complex WordPress sites with many plugins grown in house or sourced from outside
the WordPress Plugin repository (GitHub, GitHub Enterprise installs, etc.) and
which might need to be deployed identically and continually.

## Python

My love for PHP has been wavering for a while now. I find even readable code
difficult to parse, especially when templating without an engine like Twig
(which WordPress should really adopt into core for themes, but that's a blog for
another day). People have told me that Python (and Ruby, too) is a 'modern'
programming language and I never really bothered to care about the differences.
That seemed like the kind of thing real computer scientists cared about: nuanced
and esoteric for someone who just makes websites that work. But that was a
severe oversimplification. Python is a &#8216;modern' language because it does
away with a lot of the punctuation required by languages like PHP. Do we really
need to end every line with a semicolon? No! says python, just end them with a
line break! Deeper than that, I have really appreciated how everything is an
object in python. I now find myself wishing I could wrap my PHP variables in
`dir` and have them magically introduce themselves in the debugger. Speaking of,
can we get a `pdb` for PHP yet? Xdebug is getting a bit long in the tooth and
`var_dump($variable)` is so annoying. Long story short, I'm loving python already.

 [1]: http://github.com/gboone/open-graph-control
 [2]: http://fabfile.org
 [3]: http://github.com/gboone/flannel
 [4]: http://docs.fabfile.org/en/1.8/
