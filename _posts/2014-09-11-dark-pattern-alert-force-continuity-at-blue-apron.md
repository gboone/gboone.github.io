---
title: 'Dark Pattern Alert: Forced continuity at Blue Apron'
author: Greg Boone
layout: post
permalink: /blog/2014/09/11/dark-pattern-alert-force-continuity-at-blue-apron
tags:
  - usability
  - user experience
  - dark patterns
categories:
  - Merge Conflicts
---
A friend of ours gave us an awesome wedding gift: a week of free meals from [Blue Apron][1]. We'd recently tried out [Relay Foods][2] a similar but only tangentially competitive service of home grocery delivery. The key difference between Relay and Blue Apron is in the former you shop like you're at a grocery store, the latter you're delivered exact fixings for specific meals. Our first week of meals arrives Friday and we're pretty excited to have at least three dinners next week under delicious control. Thanks Laura!

The service is great but from a usability perspective the process of redeeming this gift was interesting. One of the first things Blue Apron asked us for was a credit card number. Strange, we thought, because the gift covered the entirety of a week's basic delivery (3 meals in one week). Tried as we might, we could not figure out how to redeem the gift without attaching a credit card to our account so, not wanting to turn down the gift, we did. We were then taken to a screen asking us how many nights per week we wanted meals still without any real indication of what the gift covered. The default was 3 meals per week so we figured we'd go with that and go up if the gift was for more. We clicked through and only then (3 screens later) were we aware of how many meals were covered by the gift. Even at that point, though, we still had no idea what we were actually getting only that it would be determined based on our "preferences." So, seeking out the menus we had subscribed to, we clicked through to the "My Account Screen" to discover that we had been subscribed to automatic weekly delivery of three meals per week through to the middle of October.<figure id="attachment_1794" style="width: 768px;" class="wp-caption aligncenter">

[<img class="size-large wp-image-1794" src="http://greg.harmsboone.org/wp-content/uploads/2014/09/Screen-Shot-2014-09-04-at-4.26.29-PM-1024x655.png" alt="Scheduled deliveries every week? We never ordered that!" width="768" height="491" />][3]<figcaption class="wp-caption-text">Scheduled deliveries every week? We never ordered that!</figcaption></figure> 
At that point we freaked out a bit. If we asked for a weekly delivery of three meals, we certainly didn't remember doing it. Clicking through the application we tried to find a link to disable the account but the closest we could find was the ability to skip a week's delivery. Not even on the My Account page was there an option to cancel the account or halt deliveries. We went ahead and skipped the remainder of the meals and will be investigating how to stop the service altogether following our Friday delivery.

Forced continuity is a common dark pattern where users are automatically enrolled in a continual subscription after signing up for a free trial and was [recently made illegal in the UK][4]. It is particularly common with credit monitoring and media streaming services. [The user signs up for a free month of credit reporting and suddenly, two or three months later notices charges on their credit card.][5]. While most people signing up for Blue Apron are probably doing so because they want continual delivery of meals, the service should consider letting people sign up without a credit card or on a one-off transaction in order to redeem gift cards. At the very least, Blue Apron should allow its users to select 0 as an option along side 2 and 4 people on the "Edit My Plan" view with the understanding that ordering food for 0 people means $0 will be charged to a credit card.<figure id="attachment_1796" style="width: 768px;" class="wp-caption aligncenter">

[<img class="size-large wp-image-1796" src="http://greg.harmsboone.org/wp-content/uploads/2014/09/Screen-Shot-2014-09-04-at-4.38.20-PM-1024x762.png" alt="Blue apron should give users a means to cancel or indefinitely pause service." width="768" height="571" />][6]<figcaption class="wp-caption-text">Blue apron should give users a means to cancel or indefinitely pause service.</figcaption></figure> 
Canceling Blue Apron service can be accomplished by emailing cancellations@blueapron.com before your weekly cutoff. There does not appear to be any way of maintaining an account without being auto-enrolled in meal delivery. Finding this information requires three clicks, two page loads (in addition to loading blueapron.com), and some sleuthing. Scroll all the way to the bottom of any Blue Apron page and click "Contact & Help," then choose "Skipping or Canceling" and click "Cancel my Account." From there you're taken to another page instructing you to send the email. Other help pages suggest there is no minimum subscription or commitment which, while true, is somewhat deceptive and a ["roach motel" design anti-pattern][7].

We'll update here with more on the cancellation process.

 [1]: http://www.blueapron.com
 [2]: http://relayfoods.com
 [3]: http://greg.harmsboone.org/wp-content/uploads/2014/09/Screen-Shot-2014-09-04-at-4.26.29-PM.png
 [4]: http://www.90percentofeverything.com/2014/08/26/some-dark-patterns-now-illegal-in-uk-interview-with-heather-burns/
 [5]: http://darkpatterns.org/forced-continuity/
 [6]: http://greg.harmsboone.org/wp-content/uploads/2014/09/Screen-Shot-2014-09-04-at-4.38.20-PM.png
 [7]: http://darkpatterns.org/roach-motel/