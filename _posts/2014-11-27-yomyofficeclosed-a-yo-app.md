---
title: YOMYOFFICECLOSED, A Yo App
layout: post
author: Greg Boone
published: true
date: 2014-11-27
tags:
- justyo
- OPM
- Fun with APIs
lat: 38.904722
lng: -77.016389
loc: "Washington, DC"
---
This week marked not only Thanksgiving week but also the first winter storm of
the year. The first time GSA emailed me about the possibility of the government
closing or forcing telework due to inclement conditions. The [Office of Personnel
Managment (OPM)](http://www.opm.gov/) has [great
apps](http://www.opm.gov/policy-data-oversight/snow-dismissal-procedures/mobile-app/)
for [Android](https://play.google.com/store/apps/details?id=gov.opm.status),
[BlackBerry](http://appworld.blackberry.com/webstore/content/26089873/?countrycode=US&lang=en),
[Windows](http://www.windowsphone.com/en-us/store/app/opm-alert/07087cb9-346d-46a8-bf7f-c88c3890e0b6)
and [iOS](https://itunes.apple.com/us/app/opm-alert/id627986929?mt=8) that
you can download to get push notified about government closures, but should you
have to download and enable notifications on _another app_ just to get alerted
about occasional snow days? No, I thought, why not use one of the apps I
already have that can send me push notifications on demand?

Thus was born YOMYOFFICECLOSED, a little [Yo](http://justyo.co) integration
that will simply "Yo" at you every morning that OPM has a status of "Closed."
It's not in the [index](http://yoindex.com) yet, but hopefully it will be soon. In the mean time, just click the + button and add the user YOMYOFFICECLOSED.

How does it work? Both Yo and the OPM have public APIs that this integration
relies on. The script is a Python script scheduled with Heroku Scheduler. It
uses requests to check the current operating status by querying OPMs API. There
are [several different statuses that OPM calls
"Closed"](http://www.opm.gov/json/statustypes.json) so I check if the
current status has the "Closed" icon and send you a YO if it does. Check out
the code below and write your own Yo integration. It's super easy.

<script src="https://gist.github.com/gboone/a9d0a103117ef1d399ea.js"></script>
