---
title: Writing Integration tests in WordPress
author: Greg Boone
layout: post
permalink: /blog/2014/01/18/writing-integration-tests-in-wordpress/
categories:
  - Merge Conflicts
tags:
  - best practices
  - code quality
  - integration testing
  - testing
  - WordPress
loc: dc
---
Integration testing, like unit testing, is a best practice with the goal of evaluating a piece of software's ability to interface with the rest of a system. Earlier I [elaborated on the distinction between integration and unit testing][1] and I won't repeat myself here. Instead I'll briefly expand our definition of integration test and demonstrate how to use the WordPress Unit Test Suite to test a plugin.

## What's an Integration Test? {#whats-an-integration-test}

Tests which execute your code directly to determine if it properly interfaces with its dependencies are called integration tests. They require the greater system be installed in order to verify where a failure might occur. Unlike unit tests, integration tests do not necessarily test the correctness of your code as much as they do the system's stability and your code's interaction with it. For example, if we're building a method to save data passed through a POST request into a database, a unit test would demonstrate that our method prepares that data appropriately and calls the correct methods for saving the data. An integration test would actually instantiate the database and save the record. For this reason, integration tests are more expensive. You'll recall that the WordPress Unit Test Suite (WUTS) requires a dedicated MySQL database and a working copy of WordPress in order to execute tests. Reading and writing from MySQL can be an intensive process.  
<!--more-->


For a plugin we are developing at my client, we had five tests that verified a feature. With WPUTS, the tests took nearly 42MB of memory out of our server, when we tested the same feature with unit tests, we shaved it down to 8, about a 5.25x improvement. The unit tests might be faster, but the data gleaned from an integration test is valuable in its own right. How else do you evaluate why a plugin fails when all of its unit tests pass? Perhaps it's because you are sending the wrong data to the methods you're mocking. Integration tests will catch that, unit tests won't.

## How to do it {#how-to-do-it}

First install [WP-CLI][2] as it will make everything much easier. The directions on getting the plugin tests initialized through WP-CLI are very clear and I won't repeat them here. This will install a separate copy of WordPress and a separate database for testing. If you run `phpunit` from your root directory, you should output similar to this [travis build][3]. Passing tests validate the stability of WordPress, the failing and skipped tests are either incomplete or anticipate features in development. The tests will probably take under two minutes to execute depending on your system. If you cd into `wp-content/plugins/your-plugin` you should see a tests directory, a phpunit.xml file, and a bootstrap.php inside the tests directory. Run `phpunit` from your plugin's root directory and it will execute any files which begin with &#8216;test-&#8216; and end with &#8216;.php'. Go ahead and create a `test-your-plugin.php` file inside the `tests` directory.

> **ProTip:**To change which files phpunit will pick up when you run it, modify the bootstrap.php file.

### Your first test {#your-first-test}

As we did with unit testing, let's start with a simple test we know will always pass. You're going to want to first extend the WordPress unit test suite:

<code class="sourceCode php">class YourPluginTests extends WP_UnitTestCase {</code>

<code class="sourceCode php">}</code>

Then inside that class, write a simple test:

<pre class="lang:php decode:true">function testIsAlwaysTrue() {
    // Arrange
    $foo = true;

    //Assert
    $this->;assertTrue($foo);
}</pre>

`$foo` will always be true and that test should pass if you run phpunit. Now let's take a look at some of the features the WPUTS has to offer.

### The factory {#the-factory}

WPUTS has a factory for creating things you might need for your tests. Let's say we're writing a method to check the title of a post. Since we have none, WPUTS should create one for us. Let's write a test that checks if a newly created post has a title.

<pre class="lang:php decode:true">function testPostHasTitle() {
    // Arrange
    $post_id = $this->factory->post->create();

    // Act
    $post = get_post($post_id);

    // Assert
    $this->assertTrue(!empty($post->title));
}</pre>

That's a fine looking test, and it passes! But what does it tell you? Does it verify the `get_post()` method? In some ways it does, but it certainly doesn't verify all of `get_post()`. In this case it mostly verifies that a post can be fetched out of the database. Let's take the same method [we verified earlier][4] and write an integration test for it, only this time we won't mock it. We'll start with the same name:

<pre class="lang:php decode:true">public function testTestPostExpectsMetaDataSaved(){

}</pre>

In our arrange section we'll use the factory to create a post, and we won't do any mocking. Remember, we're interested in whether the system is functioning with our code in it. Our arrangement, in this case, will also include a variable `$expected` we will use in the assert section. The act section will be mostly the same, and the assert section will contain a check to `get_post_meta` and an `assertEquals` statement compairing $expected and our result. If all is well with our `save_meta_data` and the WordPress methods used in it, they should be the same. We can also write a message to print if the test fails.

<pre class="lang:php decode:true">// arrange
    $post_id = $this->factory->post->create();
    $expected = 'New meta value'

    // Act
    $methods = new MetaMethods();
    $methods->save_meta_data($post_id);

    // Assert
    $actual = get_post_meta($post_id);
    $this->assertEquals(
      $expected,
      $actual,
      'Meta data expected to equal ' . $expected . ' but instead was ' . $actual);
</pre>

If we run the test now, it will either fail or error out because we haven't written `$methods->save_meta_data` yet. Our development goal: make the test pass. Once this test passes, we can say, with a bit more certainty, that our method saves meta data properly.

Unit and integration testing are similar but one distinct advantage of integration testing is that we can use the testing environment to experiment with core WordPress functions. We can use it to get under the hood, as it were, without digging through the codex and StackOverflow. If your unit tests are passing but your plugin isn't working, try running an integration test and see if maybe you're not feeding the mocked function the proper data.

Testing of any kind allows you to think carefully about what your method should do and how to make it happen. Do you need a full post object, or do you need only the ID? Do you need all those conditionals? How much work is this method actually doing? The more you test, the simpler your code will be. Simpler code is easier to test, troubleshoot, and extend. It is important, however, to be mindful of the differences between the two concepts as they have implications for what you can and can't say for certain about your code.

As before, our full test is below:

<pre class="lang:php decode:true">class YourPluginTests extends WP_UnitTestCase {
    function testPostHasTitle() {
        // Arrange
        $post_id = $this->factory->post->create();

        // Act
        $post = get_post($post_id);

        // Assert
        $this->assertTrue(!empty($post->title));
    }

    public function testTestPostExpectsMetaDataSaved(){
        // arrange
        $post_id = $this->factory->post->create();
        $expected = 'New meta value'

        // Act
        $methods = new MetaMethods();
        $methods->save_meta_data($post_id);

        // Assert
        $actual = get_post_meta($post_id);
        $this->assertEquals(
          $expected,
          $actual,
          'Meta data expected to equal ' . $expected . ' but instead was ' . $actual);
    }
}</pre>

 [1]: /blog/2013/12/23/why-unit-testing-in-wordpress-matters/
 [2]: http://wp-cli.org
 [3]: https://travis-ci.org/tierra/wordpress/jobs/17092504
 [4]: /blog/2014/01/01/writing-unit-tests-for-wordpress/
