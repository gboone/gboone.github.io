---
layout: post
title: "Writing Integration Tests for WordPress"
date: 2014-01-22 12:33
published: false
comments: true
categories: 
- WordPress
- Testing
- Integration testing
- Best practices
---
Integration testing is a common practice among developers that has the goal of demonstrating how well something integrates with the rest of the system. An earlier post [elaborated the distinction between integration and unit tests](/blog/2013/12/23/why-unit-testing-in-wordpress-matters/) and I won't repeat myself here. Instead I'll briefly expand our definition of integration test and demonstrate how to use the WordPress Unit Test Suite to test your code.

## What's an Integration Test?

Tests which executes your code directly to determine if it properly interfaces with its dependencies are called integration tests. They require a facsimilie of the greater system in order to verify where a failure might occur. Unlike unit tests, integration tests are not necessarily testing the correctness of your code wrote as much as they are testing the system's stability and your code's interaction with that system. For example, if we're building a method to save data passed through a POST request into a database, a unit test would demonstrate that our method prepares that data appropriately and calls the correct methods for saving the data. An integration test would actually instantiate the database and save the record. For this reason, integration tests are more expensive. You'll recall that the WordPress Unit Test Suite (WUTS) requires a dedicated MySQL database and a working copy of WordPress in order to execute tests. A set of code we wrote at my client was integration tested nearly 100% and the five tests took about five seconds to run wheras the seven unit tests took less than a second. This was because each integration test had to read and write things from the database through the WordPress core methods required to do that.

## How to do it

First install [WP-CLI](http://wp-cli.org) as it will make everything much easier. The directions on getting the plugin tests initialized through WP-CLI are very clear and I won't repeat them here. What WP-CLI will do is install a separate copy of WordPress and a separate database that the test can use. If you run `phpunit` from the directory above the unit-testing directory, you should see nearly 2000 tests run. A lot of them are skipped, a few might fail. Most of these are works in progress or tests that anticipate new features in WordPress Core. All those tests that do pass are validating the code that serves up your site. All in all the tests will probably take under two minutes to execute depending on your system. If you cd into `wp-content/plugins/your-plugin` you should see a tests directory, a phpunit.xml file, and a bootstrap.php inside the tests directory. Run `phpunit` from your plugin's root directory and it will execute any files which begin with 'test-' and end with '.php'. Go ahead and create a `test-your-plugin.php` file inside the `tests` directory.

<blockquote>To change which files phpunit will pick up when you run it, modify the bootstrap.php file.</blockquote>

### Your first test

As we did with unit testing, let's start with a simple test we know will always pass. You're going to want to first extend the WordPress unit test suite:

```php
class YourPluginTests extends WP_UnitTestCase {
    
}
```

Then inside that class, write a simple test:

```php
function testIsAlwaysTrue() {
    // Arrange
    $foo = true;

    //Assert
    $this->assertTrue($foo);
}
```

`$foo` will always be true and that test should pass if you run phpunit. Now let's take a look at some of the features the WPUTS has to offer.

### The factory

WPUTS has a factory for creating all manner of things you might need in your arrangement section. Let's say we're writing a method to check the title of a post. We'll we're going to need WPUTS to create us a dummy post. Let's write a test that checks if a newly created post has a title.

```php
function testPostHasTitle() {
    // Arrange
    $post_id = $this->factory->post->create();

    // Act
    $post = get_post($post_id);

    // Assert
    $this->assertTrue(!empty($post->title));
}
```

That's a fine looking test, and it passes! But what does it tell you? Does it verify the `get_post()` method? In some ways it does, but it certainly doesn't verify all of `get_post()`. In this case it mostly verifies that a post can be fetched out of the database. Let's take the same method we used in our [unit testing post](/blog/2014/01/01/writing-unit-tests-for-wordpress/) and write an integration test for it only this time we won't mock it. We'll start with the same name:

```php
public function testTestPostExpectsMetaDataSaved(){

}
```

In our arrange section we'll use the factory to create a post, and we won't do any mocking. Remember, we're interested in whether the system is functioning with our code in it. Our arrangement, in this case, will also include a variable `$expected` we will use in the assert section. The act section will be mostly the same, and the assert section will contain a check to `get_post_meta` and an `assertEquals` statement compairing $expected and our result. If all is well with our `save_meta_data` and the WordPress methods used in it, they should be the same. We can also write a message to print if the test fails.

```php
    // arrange
    $post_id = $this->factory->post->create();
    $expected = 'New meta value'

    // Act
    $methods = new MetaMethods();
    $methods->save_meta_data($post_id);

    // Assert
    $actual = get_post_meta($post_id);
    $this->assertEquals($expected, $actual, 'Meta data expected to equal ' . $expected . ' but instead was ' . $actual);
```

Again, if we run the test now, it will either fail or error out because we haven't written `$methods->save_meta_data` yet. Our goal going forward is to make the test pass. Once this test passes, we can say, with a bit more certainty, that our method saves meta data properly.

Unit and integration testing both require a clear vision of what you're putting into your methods and what you hope to get out. One distinct advantage of integration testing and a suite like WPUTS is that we can use the testing environment to experiment with core WordPress functions. We can use it to get under the hood, as it were, without digging through the WordPress codex and StackOverflow posts. If you're unit tests are passing but your plugin isn't working, try running an integration test and see if maybe you're not feeding the mocked function the proper data.

Testing of any kind allow you to think carefully about what your method should do and how to make it happen. Do you need a full post object, or do you need only the ID? Do you need to return a result or can you pass it off to another method? How much work is this method actually doing? The more you test, the simpler your code will be. Simpler code is easier to test, troubleshoot, and extend. It is important, however, to be mindful of the differences between the two concepts as they have implications for what you can say you know for certain about your code.

As before, our full test is below:

```php
class YourPluginTests extends WP_UnitTestCase {
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
        $this->assertEquals($expected, $actual, 'Meta data expected to equal ' . $expected . ' but instead was ' . $actual);
    }
}
```