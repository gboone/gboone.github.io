---
layout: post
title: Leaflet and Stamen on the blog
tags:
- stamen
- leaflet
- cartography
- mapping my posts
loc: st-germain
---
I changed the tagline of my blog to "Nomad public servant, learning out loud" when we moved out of DC. In addition to writing about the different places we've visited, I also end up writing a lot of these posts from places other than where we live. So over Thanksgiving weekend I decided it was time I learned how to do some mapping work. The last time I tried to map something, it was about six years ago, in Google Maps, and I had no idea what I was doing.

I ended up with a giant, hand-crafted JSON file that got loaded to create markers for the map. It was also completely separate from any real data. It was just a big list of places and descriptions. While it looked cool, it also only loaded on Firefox (puzzlingly), all other browsers got a blank beige placeholder.

I later tried to [link location data to blog posts in WordPress once upon a time](https://github.com/gboone/WordPress-Travel-Plugin). I think if I did either of those again I'd probably do them differently, and it would probably look more like how I did it with this blog.

## How it works

Each blog post has a `loc` field in the frontmatter. This post, has `loc: st-germain`. Then I created and include to create a map placeholder and a plugin that cross-references that value against a file at `_data/locations.yml` to get the latitude and longitude. The location data is added to the dataset on the `div`. It looks like this:

```
<div id="map" data-lat={{ location['lat'] }} data-lng={{ location['lng'] }}></div>
```

Then I have some really simple javascript that picks up the location values and produces a map. There's also [a page showing all the locations as markers](/map/). For that piece I added a JSON dump of the `_data/locations.yml` into a script tag and load it with `JSON.parse(document.getElementById('map-data').innerHTML);` and then iterate over the values.

## What I used

I used Jekyll's data directory to keep the location data. I could probably geocode these values, too, and that would take the manual work out of figuring out where these places are, but I decided since there's only a handful right now it was easier to look them up.

Leaflet powers the map itself. It's pretty straightforward to configure and comes with some smart defaults. I used Stamen's Toner Lite tiles for the base layer. I wanted to go with the Terrain layers but lack of international coverage mean I couldn't map some of the places without some exta work. The only trick there was figuring out how to load the tiles over HTTPS, after some googling, I ended up adding the tile layer like this:

```
var Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
```

Figuring things out from there was pretty easy thanks to Leaflet's clear documentation. I also used underscore but not as much as planned and could probably rewrite the JS to work without the extra dependency.

## What's next?

I hope to keep finding things to map in the blog. Sometimes I write about places _after_ we visit and there are a few places we visited this year that I haven't written about yet. Hopefully I can do the writing and find a way to capture those locations on the main map. Maybe with a different color marker? Maybe with route lines leading from where the post was written to where the post is about? It was a lot of fun figuring this out and I'm excited to learn more about what leaflet can do.
