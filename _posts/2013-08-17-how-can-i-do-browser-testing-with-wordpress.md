---
title: How can I do Browser Testing With WordPress
author: Greg Boone
layout: post
permalink: /blog/2013/08/17/how-can-i-do-browser-testing-with-wordpress
categories:
  - Merge Conflicts
tags:
  - BDD
  - behavior driven development
  - behavior testing
  - best practices
  - browser testing
  - WordPress
lat: 38.904722
lng: -77.016389
loc: "Washington, DC"
---
Browser testing is a basic component of a concept called behavior driven development (BDD), and one that has helped me become a better WordPress developer in the last few months. The concept of BDD is simple: test and develop around your software's expected behavior. [I recently wrote about BDD for Excella's company blog][1], and this post will go a bit more technical than that. The upshot of behavior testing is you can find problems with both your code and your requirements. Before we get into that, a bit of background on the tools.

<!--more-->

My BDD testing setup requires the following tools: [behave][2], [selenium][3], and the [chromedriver][4] on a Mac. Behave and selenium can be installed with PIP (`pip install behave; pip install selenium`) and chromedriver is available through [homebrew][5]. The workflow goes something like this:

1.  Tests written in gherkin
2.  Tests executed through behave, passed through selenium
3.  Google Chrome Driver walks through the tests and tells me what failed.

Each test is a "scenario" that is part of a feature defined like an agile user story. For example

<pre class="lang:gherkin decode:true " >Feature: A simple about page
    As a website owner
    I want an about page
    So that visitors can learn more about what I do</pre>

Which might have a scenario under it like:

<pre class="decode:true " >@about_page_test
Scenario:
    Given I visit the home page
    When I click the about link
    Then I should be directed to the about page</pre>

The test is executed with `behave -t=about_page_test` and selenium passes the appropriate steps to the Chrome web driver. I'm developing a complex options page for a WordPress plugin and wrote a behavior test that would fill in the entire form in about 10 seconds without any typos or missing any fields. It immediately saved me a lot of time and keystrokes.

Behave can also do "scenario outlines" where you write a single test with variables and then pass variables through an Examples table. Let's say our website from above got more complex and now has a few different pages and we also want to check the content of that page. I could write a scenario outline like this:

<pre class="decode:true " >@test_pages
Scenario outline:
    Given I visit the home page
    When I click the &lt;page-title> link
    Then I sohuld be directed to the &lt;page-title> page
    And I should find the text &lt;target-text> on the page&lt;/p>

Examples:
| page-title | target-text            |
| about      | This is the about page |
| contact    | contact me             |
| photos     | A photo of my cat      |
| blog       | My blog                |
</pre>

As part of an upcoming content migration we will have to add a set of tags to each post of a certain post type. The product owners sent me a spreadsheet of the post titles and the tags and I wrote a form that take the title and attach that tags. It's a pretty simple form, but I needed to make sure that when the time came we could add these tags as quickly as possible, so I wrote a scenario outline, exported the Excel sheet in the format above, and ran the whole sheet through the form. Selenium was able to check 307 posts in less than an hour. Pretty sweet.

This checked not only my code, but the data the product owners gave me. I noticed there some of the tags were plural while others singular: cat vs. cats, some were not real words, and about 12 of them didn't work. These 12 were the focus of my concern for the morning and I was able to discover that of them, only two were missed because of my code. One of them started with a space that was truncated somewhere along the way and the other was a duplicate post WordPress was tripped up by.

Without running the table through a massive test we probably wouldn't have discovered these problems until the day we launched and then it would have been a problem that consumed the better part of a day trying to solve. With them, we were able to discover the problem early on, get it sorted and learn the limitations of our code well ahead of any deployment. That's the power of browser testing.

Browser testing is but one among a large set of tests that can be run against code. Another effective kind of test for development is unit testing, which tests the code itself without a browser. If done correctly testing can drastically reduce the amount of time spent debugging and improve overall reliability of the software we write. Plus, it makes you a better developer.

 [1]: http://blog.excella.com/how-can-wordpress-developers-do-behavior-driven-development-bdd/
 [2]: http://pythonhosted.org/behave/
 [3]: http://docs.seleniumhq.org/
 [4]: https://code.google.com/p/chromedriver/
 [5]: https://github.com/mxcl/homebrew/
