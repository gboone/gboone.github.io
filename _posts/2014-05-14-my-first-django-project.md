---
title: My First Django Project!
author: Greg Boone
layout: post
permalink: /blog/2014/05/14/my-first-django-project
categories:
  - Merge Conflicts
---
It's no secret that [I'm getting married in August][1]. When the time came to build a wedding website, I saw it as an opportunity to try something new. That opportunity: build my first Django project.

Prior to this project I had really only worked with WordPress and static site generators. That was fine if all I wanted out of my wedding site was a few pages giving people information about the wedding, but I could get that out of any boilerplate wedding site out there. I wanted more out of my website, and I saw a long list of things it *could* do, very little of which actually made it into the final product. The biggest thing I wanted, though, was to avoid having [65 tiny pieces of paper coming back to us in the mail][2] to tell us who was or wasn't coming. I foresaw disaster with things getting lost in the mail (probably would have happened), us losing them (definitely would have happened), and on top of all that, we were just going to manually transfer all that information into a Google Doc anyway. Why bother with the pesky middleman? Our Minimally Viable Wedding-site, then, would include an RSVP app, and I'm proud to announce it is finished, in production, and performing well.<!--more-->

<!-- more -->

## Why Django?

Choosing not to stick with WordPress for this project was no small decision. Had we gone with WordPress we could have better integrated with the content on harmsboone.org out of the box. It also would have been easy to distribute as a WordPress plugin. While I haven't had a ton of experience extending WordPress's database layer, and I know it has a pretty extensive API for working with your MySQL instance in a safe way, writing this app in WordPress would have meant designing the data structures ostensibly from scratch. With Django, on the other hand, we have a highly flexible and intensely powerful web framework with database extension built right in. It's been an absolute pleasure to work with and learn how to use it for this project, and I got to learn Python, too, which is [a tremendously fun language to use][3].

### The MTV Pattern

Django, for the uninitiated, is a Python web framework built upon a Model-View-Template (MTV) pattern (similar to a Model-View-Controller (MVC) pattern). In this way it's not unlike Rails, Grails, or a litany of other web frameworks out there. The concept is simple. You separate your application into three parts: models, or representations of the data in code; views, methods that prepare data for display; and templates, HTML injected with variables passed from views. Thinking about the application in this way was amazingly helpful in figuring out what data we needed to collect about our guests and how we would use it. We added a hotels model so that we could better determine what kind of transportation we would need to and from the wedding site, and an events model should give us an accurate headcount of who will attend what. Since we didn't have to mess around with complicated SQL queries, we could write clean, simple data models and quickly extend those models as needed. Here's all the code we needed to start adding guests to our wedding:

<pre class="brush: python; title: ; notranslate" title="">class Guest(models.Model): # we create a model for a single guest
  first_name = models.CharField(max_length=45, null=True, blank=True)
  last_name = models.CharField(max_length=45, null=True, blank=True)
  attending = models.BooleanField(blank=True)
  primary_email = models.EmailField(max_length=254, null=True, blank=True)
  street_addr = models.CharField(max_length=255, null=True, blank=True)
  city = models.CharField(max_length=255, null=True, blank=True)
  state = models.CharField(max_length=2, null=True, blank=True)
  zip_code = models.IntegerField(max_length=5, null=True, blank=True)
  primary = models.NullBooleanField(null=True, blank=True)
  events = models.ManyToManyField('Event', null=True, blank=True)
  hotel = models.ForeignKey('Hotel', null=True, blank=True)
  bride = models.BooleanField(default=False)
  groom = models.BooleanField(default=False)

class Meta:
  ordering = ['-last_name', '-first_name']

def __unicode__(self):
  return u'%s' % (self.first_name, self.last_name)

</pre>

One of the most powerful fields on a Django model are the foreign key and many-to-many fields which let you relate objects to each other in the database. At first wrapping my head around the distinction among these two was a bit tricky but after a few hours of playing around with it, I was able to structure my models so that they had meaningful relationships where necessary. In the example above, you see there is a ForeignKey relationship between the Guest and Hotel model. This was because each guest could only stay in one hotel (or if they were staying in more than one, we only care about one of them), but many guests could stay in each hotel. For events, however, we knew our guests could attend more than one, so we have a `ManyToMany` field there. This became especially useful when we made the front-end of the RSVP application. We wanted a way for anyone in a party to be able to RSVP or update their party's information, but without having some way of relating all of them together, we had no way of knowing which guests were related to any random guest in our system. At the advice of [a colleague][4] I created a Party object that would hold some basic information about each group of individuals attending the wedding: who they are, how many of them there can be at a max (it's +1, not +∞), and whether they have responded. This way, whenever any member of the Snodgrass family RSVPs, all of their data can be updated together, but we can still maintain separate records for each person—not all guests within the same party have the same address, for example.

### South (now Migrations)

I'm going to say it now: I would have given up on this project were it not for [South][5], a tremendous migration library for Django that, as of 1.7 was merged into core. A crucial missing feature in earlier versions of Django was a way of adding fields to a model after they were initially loaded into the system. If you tried, you would get this strange error saying that that field didn't exist on the model; of course it didn't, that's why I added it! South lets you easily move your models forward by adding the rows in the database necessary to add that field. The coolest part of it is that you get this nice version history of how your models have changed over time. So, it's really easy to go back to the first migration and say &#8216;what was I thinking!'

### Django Forms

I really feel like I only scratched the surface of what can be done with Django Forms. Coming from WordPress I was used to writing my own forms in HTML and validation methods that prepare submitted `$_POST` data for saving to a database. Django approaches the problem differently. Writing a forms.py file is a lot like writing a models.py file. Each form is a class with a handful of variables and methods that define what kind of data the form should collect and what should be done with them. You can then drop a form into a View and prepare it to display in a specific way before rendering it in a template. In that last step, the entire form can be displayed with this code: `{{ form }}`. When the form is submitted, checking that required fields are present and that the data are safe and valid is as simple as this `form.is_valid()`. Saving it? `form.save()`. Making a form that would add a guests +1 was as simple as:

<pre class="brush: python; title: ; notranslate" title="">if partyForm.is_valid():
  partyForm.save()
</pre>

That's it. Django makes some important abstractions in the process of creating and processing forms that helped focus development on how the data need to change.

## Next steps

I'd like to refactor the views to take advantage of class-based views. One of the guiding principles of Django development is strict adherence to the DRY principle (Don't repeat yourself). There is way too much repeating myself going on in this app. All but one view in the RSVP app starts with `pk = request.session.get('pk')` and `guest = Guest.objects.get(pk=pk)` and passes a global variable &#8216;bride' and &#8216;groom' to each view. This is **super annoying!** Django's class based views should help me get passed that, but there wasn't room for it in this release.

Another thing that needs done is to split the RSVP app into it's own project and make it installable with `pip`. It's currently bundled in a repo with the Posts app which is ostensibly a clone of the tutorial's blog app and a bunch of Django configuration crap that you wouldn't need if integrating it with an existing Django project. There are also way to many static assets hard-coded into the CSS and template files. I'll want to make those a bit more modular and perhaps even rewrite the CSS in `less` before it's ready for reuse. All in all, though, it's basically ready to go if someone else wanted to use it in their wedding website.

Future versions of the app might also include a table manager, so someone could design their seating charts through the Django admin, and food options (our wedding is a buffet, so you get no choice on the RSVP). I'd also be keen on some design pull requests. I'm clearly not a very imaginative visual designer and while the CSS here isn't bad, it could use a little love.

Let's face it, the list of what can go in a wedding website is unending. But this is a good baseline for building any of it.

In the meantime [fork the project on GitHub!][6]

 [1]: http://wedding.harmsboone.org
 [2]: http://www.vistaprint.com/design/WRC-680861/white-starfish-horizontal-flat-rsvp-cards-5.5x4.aspx
 [3]: http://greg.harmsboone.org/flannel-a-python-project
 [4]: http://andrewtorkbaker.com
 [5]: http://south.readthedocs.org
 [6]: http://github.com/gboone/wedding.harmsboone.org