---
title: Writing Unit Tests for WordPress
author: Greg Boone
layout: post
permalink: /blog/2014/01/01/writing-unit-tests-for-wordpress
categories:
  - Merge Conflicts
tags:
  - best practices
  - continuous integration
  - oop
  - php
  - testing
  - unit testing
  - WordPress
lat: 38.904722
lng: -77.016389
loc: "Washington, DC"
---
In [my last post][1] I wrote about two testing libraries for WordPress and briefly discussed the difference between integration tests and unit tests. I also mentioned a concept called test driven development (TDD) and breifly explained how it might help write better code from the start. This post will expand on that and show how to write a simple WordPress plugin from a test-first approach. Since we're writing unit tests, we're going to use WP-Mock to create a test double for us and we'll use PHPunit for our test runner.  
<!--more-->

TDD starts with a problem you want to solve—the same problem your plugin wants to solve. In this case, let's say we have a plugin that will add some metadata to a post with the title "Test". Since that's going to require us to mock some WordPress core functionality, [make sure WP-Mock is configured in your working environment][2]. We'll start by writing a test that verifies the metadata was attached to the post.

In order to write unit tests we first need to extend the base test suite:

<pre class="lang:php decode:true">Class OurTestSuite extends PHPUnit_Framework_TestCase {

}</pre>

Now that we have a class, we can call any of PHPunit's methods for testing including all of its assertions. Inside OurTestSuite is where we will write all our testing methods. We start with setUp and tearDown, commonly named methods that instantiate some conditions we will want for all our classes. We'll want to make sure our setUp and tearDown methods clean up our test environment as well as any mocks we create out of WP_Mock. So we'll declare:

<pre class="lang:php decode:true">public function setUp() {
         parent::setUp();
     }
     public function tearDown() {
         parent::tearDown();
     }
</pre>

If we had other objects, variables, or settings we wanted available throughout the test suite, etc., we could declare those too. If you run the test now you'll get some output, but no tests will run because we haven't written any. Every test is a method within this class. Let's write one that will always pass just to see PHPunit give us something.

<pre class="lang:php decode:true">...
     public function testOneExpectsOneAdded() {
         // Arrange
         $foo = 1;
         // Act
         $bar = $foo + 1;
         // Assert
         $this->assertEquals(2, $bar, 'Variable $bar does not equal two.');
    }
</pre>

If you run PHPunit on that test, you should get a dot. Congratulations!

Now let's write our test for our `save_meta` method. There are three basic sections to our test: Arrange, Act, and Assert. The first section is for all the bits our method needs for input. In our case, we'll need the post ID for a post called "Test" and a key and value pair to save as metadata. Since the ID could be any integer on a given system, we can arrange our test with any integer we like. The next piece, the key-value pair, will be set in the method, but we'll want to decide now what they'll be.

The "Act" section is where we call the method. In this case, we're going to call a method called `save_meta_data` out of the `MetaMethods` object. Finally, the "Assert" section is where we decide what the method should expect to see at the end. This section might be empty depending on whether the method under test returns an output or calls some other method. In our case, it's the latter. The test passes if `update_post_meta` is called exactly once. Right now our test is looking something like this:

<pre class="lang:php decode:true">...
     public function testTestPostExpectsMetaDataSaved(){
         // Arrange
         $post_id = 42;
         // Act
         $methods = new MetaMethods();
         $methods->save_meta_data($post_id);
         // Assert
    }
...
</pre>

Not a bad looking test, but we have some mocking to do. We already know we'll need to mock `update_post_meta()`, but we're also going to need `get_post()` as well. In both cases, we're going to make PHPunit handle calls to those methods and return what we want back. We know what to expect if we call `update_post_meta`: if all is well with our WordPress install, we expect it would add new information to the post object. So we don't need to verify that, all we really need to do is verify it's being called exactly once. So let's add our mocks to the "Arrange" section.

Fully mocking a function like `get_post()` uses the static method `wpFunction()` from WP_Mock. We can call it with: `\WP_Mock::wpFunciton()`. We can also pass wpFunction some parameters like &#8216;times', for how many times we expect the mocked function to fire, and &#8216;parameters', and &#8216;return'. These help us create a fully function test double of `get_post`.

<pre class="lang:php decode:true">...
// Arrange
$post = \WP_Mock::wpFunction('get_post');
...
</pre>

Finally, we need to address `update_post_meta`, but since we don't particularly care what we get back from this method, we can instead &#8216;stub' it. `WP_Mock` has a wrapper for `wpFunction` that make this easy, it's called `wpPassthruFunction()` and can take many of the same parameters, but fills in the return value for you. In our case, we want to know that update\_post\_meta fired once, so we can write something like:

<pre class="lang:php decode:true">...
// Arrange
\WP_Mock::wpPassthruFunction('update_post_meta', array('times' =&gt; 1));
...
</pre>

Now, if we run `phpunit`, we get a dot and an F, or maybe an E, since we haven't written any code yet. Now we can write the actual code with the following workflow:

1.  Write some code
2.  Run the test
3.  Modify the test and code as necessary
4.  Repeat 2-3 until the test passes

A full example of our test is below:

<pre class="lang:php decode:true">Class OurTestSuite extends PHPUnit_Framework_TestCase {
     public function setUp() {
         parent::setUp();
     }
     public function tearDown() {
         parent::tearDown();
     }
     public function testOneExpectsOneAdded() {
         // Arrange
         $foo = 1;
         // Act
         $bar = $foo + 1;
         // Assert
         $this->assertEquals($bar, 2, 'Variable $bar does not equal two.');
    }

    public function testTestPostExpectsMetaDataSaved(){
        // Arrange
        $post_id = 42;
        $post = \WP_Mock::wpFunction('get_post');
        \WP_Mock::wpPassthruFunction('update_post_meta', array('times' =&gt; 1));
        // Act
        $methods = new MetaMethods();
        $methods-&gt;save_meta_data($post_id);

        // Assert
    }
}
</pre>

 [1]: blog/2013/12/23/why-unit-testing-in-wordpress-matters/
 [2]: https://github.com/10up/wp_mock
