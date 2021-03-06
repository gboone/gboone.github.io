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

I ended up with a giant, hand-crafted JSON file that got loaded to create markers for the map. It was also completely separate from any real data. It was just a big list of places and descriptions. While it looked cool, it also only loaded on Firefox (puzzlingly) and all other browsers got a blank beige placeholder.

I also tried to [link location data to blog posts in WordPress once upon a time](https://github.com/gboone/WordPress-Travel-Plugin). I think if I did either of those again I'd probably do them differently, and it would probably look more like how I did it with this blog.

## How it works

Each blog post has a `loc` field in the frontmatter. [This post](https://github.com/gboone/gboone.github.io/blob/master/_posts/2015-12-03-leaflet-and-stamen-on-the-blog.md) has `loc: st-germain`. Then I created an [include to create a map placeholder](https://github.com/gboone/gboone.github.io/blob/master/_includes/map.html) and [a Liquid filter](https://github.com/gboone/gboone.github.io/blob/master/_plugins/mapper.rb) that cross-references that value against a file at [`_data/locations.yml`](https://github.com/gboone/gboone.github.io/blob/master/_data/locations.yml) to get the latitude and longitude. The location data is added to the dataset on the `div`. It looks like this:

```
<div id="map" data-lat={{ location['lat'] }} data-lng={{ location['lng'] }}></div>
```

Then I have some [really simple javascript](https://github.com/gboone/gboone.github.io/blob/master/assets/js/map.js) that picks up the `dataset` and produces a map. There's also [a page showing all the locations as markers](/map/). For that piece I added [a JSON dump of the `_data/locations.yml` into a script tag](https://github.com/gboone/gboone.github.io/blob/master/pages/map.html#L7) and load it with `JSON.parse(document.getElementById('map-data').innerHTML);`, then iterate over the values.

## What I used

I used Jekyll's data directory to keep the location data. I could probably geocode these values, too, and that would take the manual work out of figuring out where these places are, but I decided since there's only a handful right now it was easier to look them up.

[Leaflet](http://leafletjs.com/) powers the map itself based on [OpenStreetMap data](http://www.openstreetmap.org/copyright). It's pretty straightforward to configure and comes with some smart defaults. I used [Stamen's](http://stamen.com/) [Toner Lite tiles](http://maps.stamen.com/toner-lite/#10/44.9790/-93.2649) for the base layer. I wanted to go with the [Terrain tiles](http://maps.stamen.com/terrain/#10/44.9790/-93.2649) but lack of international coverage mean I couldn't map some of the places without some exta work. Regardless, it's really great that Stamen offer these excellent tiles for free, and that Leaflet is open source. The only trick with loading the tiles was figuring out how to do it over HTTPS, after some googling, I ended up adding the tile layer like this:

```
var Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{
  ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>,
   under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.
   Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a
   href="http://www.openstreetmap.org/copyright">ODbL</a>.',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
```

Figuring things out from there was pretty easy thanks to Leaflet's clear documentation. I also used underscore but not as much as planned and could probably rewrite the JS to work without the extra dependency.

## What's next?

I hope to keep finding things to map in the blog. Sometimes I write about places _after_ we visit and there are a few places we visited this year that I haven't written about yet. Hopefully I can do the writing and find a way to capture those locations on the main map. Maybe with a different color marker? Maybe with route lines leading from where the post was written to where the post is about? It was a lot of fun figuring this out and I'm excited to learn more about what leaflet can do.
