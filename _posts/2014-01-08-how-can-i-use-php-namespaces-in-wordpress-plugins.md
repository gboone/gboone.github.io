---
title: How can I use PHP Namespaces in WordPress Plugins
author: Greg Boone
layout: post
permalink: /blog/2014/01/08/how-can-i-use-php-namespaces-in-wordpress-plugins
categories:
  - Merge Conflicts
tags:
  - best practices
  - namespacing
  - php
  - php namespacing
  - WordPress
loc: dc
---
PHP has long had a problem of naming collisions. Because older versions of PHP had no way of declaring methods outside the global space, developers came up with several different ways of preventing and checking for namespace collisions, none of which treated the underlying condition. These many and varied solutions begged for a unifying standard as they made things like autoloading and package management increasingly difficult. PHP 5.3 introduced a feature called &#8216;namespacing' to solve this problem and WordPress developers should begin adopting. With proper namespacing, WordPress plugin and themes will become clearer, more stable, and more portable.  
<!--more-->


Prior to PHP 5, if you tried to name a method or class `foo` it might conflict with another similarly nammed method elsewhere in the system. Developers came to terms with this by &#8216;namespacing' methods with a prefix. With this standard, `foo` became `my_foo` or `gb_foo` where the `my_` or `gb_` corresponded to vendor prefixes (gb, being my initials). It also led to wrapping every method in a conditional to check for namespace collisions:

<pre class="lang:php decode:true " >if ( !function_exists(gb_foo) ) {
    function gb_foo( $bar ) {
        echo $bar;
    }
}

gb_foo('bar');</pre>

Look familiar? The problem with this should be easy to see. If that conditional returns false, my method `gb_foo` will never be fired and any time it's called, that other `gb_foo` method will. Imagine if `gb_foo` was something like this:

<pre class="lang:php decode:true " >function gb_foo($bar) {
    mysql_query('DROP TABLES *');
}
</pre>

I think we can all agree that would be bad.

Namespacing is a concept familiar to many other programming languages that isolates your application from others in a standardized way. The global space should be reserved for only those things that should be available at all times. There is typically a character or pair of characters which globally signifies a namespace separator. In PHP it's the backslash &#46;

If properly namespaced, you can name your method `foo()` without any possibility of your method conflicting with anything else (unless you declare it twice in the namespace).

Namespacing also alleviates your need to wrap your methods in that conditional. A properly namespaced `foo()` method would look like this:

<pre class="lang:php decode:true " >namespace gb;

function foo($bar) {
    echo $bar;
}

</pre>

Let's take a look at what's going on here. On the first line we declare the namespace we want to use, in this case my initials `gb`. We can then declare classes and methods without worrying about stepping on any other methods. This is sort of like putting things in classes, but it's even more safe. To call that &#8216;foo' method, just type `\gb\foo('baz');` which should output &#8216;baz'. You can also declare classes inside the namespace just like you would normally, the difference is that when these are called, the namespace must be too. There are a few different ways of approaching this:

Consider the application lives in a file called test.php and all our files are in the same directory.

<pre class="lang:php decode:true " >// test.php
namespace gb;
class Bar {
    public static function foo($bar) {
        echo $bar;
    }
}</pre>

Example one: &#8216;Use' the namespace, declared at the top of the second file.

<pre class="lang:php decode:true " ><p>
  require_once(<strong>DIR</strong> . '/test.php');
  use \gb\Bar;
</p>

Bar::foo('baz');
</pre>

Example two: Call the method with the namespace and class prefixed.

<pre class="lang:php decode:true " >require_once(<strong>DIR</strong> . '/test.php');&lt;/p>

\gb\Bar::foo('baz');&lt;/p>

</pre>

Example three: Instantiate the class as an object and declare the method from the object.

<pre class="lang:php decode:true " >require_once(<strong>DIR</strong> . '/test.php');&lt;/p>

$object = new \gb\Bar();

$object->foo('baz');
</pre>

They're all very similar and should look familiar. Again, all the namespace does is add a layer of abstraction away from the global space in order to prevent collisions. Where it becomes particularly useful is in autoloading with tools like composer. With namespaces autoloaded, developers do not even need to require the files where those classes exist. They only need to know the namespaces. Example one, then, becomes:

<pre class="lang:php decode:true " >use \gb\Bar;
Bar::foo('baz');</pre>

> Pro tip: you can &#8216;use' a namespace under another name. So if you have two classes Bar, you can redeclare them like this:
>
> <pre class="lang:php decode:true " >use \namespace\Bar as Bar;
> use \gb\Bar as Baz;
>
> Baz::foo('bar');
> </pre>

You can also stack namespaces to isolate your individual plugins from each other: `namespace gb\myAwesomePlugin;` and `namespace gb\anotherAwesomePlugin` serve as different namespaces for different plugins. It also keeps me safe from other &#8216;gb's out there crowding my namespace.

Namespaces can also indicate *where* to find your application. With a fully namespaced plugin, you could even configure your WordPress install to use your plugin without &#8216;installing' it. If you have composer doing that for you, you can autoload the plugin preconfigured the way you want it. WordPress is becoming an increasingly vibrant application development platform and namespacing will be key to it living in harmony with other PHP applications in complex systems.
