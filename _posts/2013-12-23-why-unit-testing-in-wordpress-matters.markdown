---
layout: post
title: "Why Unit Testing in WordPress Matters"
date: 2013-12-23 07:20
comments: true
categories: 
- WordPress
- unit testing
- testing
- integration testing
- best practices
---
Testing WordPress has become a favorite topic of mine lately: moving away from hitting refresh and toward something more holistic, reliable, and automatable. I've written before about [a testing method called called browser testing](http://greg.harmsboone.org/blog/2013/08/17/how-can-i-do-browser-testing-with-wordpress/), which verifies a webpage has some expected behavior. These kinds of tests are great but they're not perfect. They require a lot o dependencies and that someone else would need to verify your code. There is a better way, one that doesn't require any of those dependencies and verfies the code down to the exact lines you wrote—it can even be independent of WordPress. It's called unit testing and it will make you a better developer.
<!-- more -->

Unit testing is a method that reduces and tests the system down to it's smallest functional pieces. Each 'unit' should be as isolated as possible from any others in the system. The test should verify only the correctness of one unit. It has many benefits for all of software development but is relatively new to WordPress. It's hard to say for sure why but there have been two important advancements in the area recently that will hopefully compel us WordPress devs to be more intentional about testing and verifying our code.

The first is the WordPress Unit Test Suite (WPUTS), detailed on the [WP Core development blog](http://make.wordpress.org/core/handbook/automated-testing/). This suite contains tests covering much of the core files installed with a WordPress.org site. This test suite can even be installed [through the fantastic WP-CLI project](http://wp-cli.org/). According to [a recent build on Travis](https://travis-ci.org/tierra/wordpress/jobs/15867662), 1889 tests are currently available. That build shows the output of PHP's test runner, [PHPunit](http://phpunit.de) at around line 724. Each test generates either a dot for a passed test or an S, I, F or E if the test is (s)kipped, (i)gnored, (f)ails, or encounters an (e)rror. In that build you see only 2 failures and a whole bunch of skipped tests. You can also see, at line 777, that phpunit took 1:28 to run all the tests and used 141.75MB of memory. That's pretty good for testing an application the size of WordPress. [With a few simple commands in WP-CLI](https://github.com/wp-cli/wp-cli/wiki/Plugin-Unit-Tests) you can install these tests on your own and extend them to cover your own plugin.

WPUTS was introduced sometime in late 2012 and unit testing through the core suite was recently integrated into the core development workflow. Another important project is [WP-Mock](https://github.com/10up/wp_mock/), a wonderful project from the folks at 10up that allows you to 'mock' or 'stub' only the parts of WordPress you need for each test. If you need call `update_post_meta()`, WP-Mock would allow you to just pass an integer, a key, and a value. The ideas is if your code verfies with a [test double](http://phpunit.de/manual/3.7/en/test-doubles.html), it will verify once it's hooked into the real thing.

There are two key differences between these two test suites: dependencies and what is tested. Compared to browser tests, both suites remove your code's dependency on existing content, a web server, selenium, and behave, but WPUTS still requires WordPress and a MySQL database on top of your code, PHP, and PHPunit. WP-Mock requires only the last three. This means, if you want to run your tests in a continuous integration server like Jenkins or Travis, with WP-Mock the only thing you need to set up that environment is your code, PHP, and PHPunit.

With WPUTS, what you are really testing is whether your code properly integrates with its dependencies, and are useful for exactly that purpose. A WordPress plugin, for example, might have integration tests written to determine whether post meta data is in fact updated when `update_post_meta` is called within one of its methods. That does not necessarily verify whether the code written is correct. True unit tests start lower, focusing on whether the code _you_ wrote for _this_ method generates the correct output if the dependencies behave as expected. The difference is subtle but also important.

With this distinction in mind, WPUTS might be better named the 'WordPress Integration Test Suite' as it allows you to access to a full installation of WordPress and manipulation of its database. What it doesn't do is tell you whether you're manipulating that database too much. Maybe your method called `update_post_meta` twice, WPUTS will not necessarily tell you that. It will only tell you that the post was, in fact, updated. That's useful, but so is knowing you only did it once. Writing to a database can be expensive, doing it too many times might slow down your application.

Writing tests before writing code is called Test Driven Development and is a software engineering best practice. It forces you to write your test, then write code to make your test pass. In the end, this makes you a better developer because you are focused to break your problems down into smaller pieces that do more discrete testable things. How to write those tests is a subject for another blog.