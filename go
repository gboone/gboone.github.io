#!/usr/bin/env ruby
require 'fileutils'
require 'jekyll'
require 'optparse'
require 'yaml'

@options = {}
OptionParser.new do |opts|
	opts.banner = "Usage: script/post [options]"
	opts.on(
		'-t', 
		'--title TITLE',
		'Post title (Required)'
	) { |v| @options[:title] = v }
	opts.on(
		'-d', 
		'--date DATE',
		'Date published (default, today)'
	) { |v| @options[:date] = v }
	opts.on(
		'-i', 
		'--image IMAGE',
		'Post image'
	) { |v| @options[:image] = v }
	opts.on(
		'-a', 
		'--author AUTHOR',
		'Post author (comma separated)'
	) { |v| @options[:author] = v }
	opts.on(
		'-g', 
		'--tags TAGS',
		'Tags for this post (comma separated)'
	) { |v| @options[:tags] = v }
	opts.on(
		'-c', 
		'--content CONTENT',
		'The text of the blog post (not the most efficient)'
	) { |v| @options[:content] = v}
	opts.on(
		'new', 
		'new',
		'create a new post (--title required)'
	) { |v| @options[:new] = true }
end.parse!

def new_post
	options = @options
	unless options[:date]
	date = Date.today.to_s
	else
		date = Date.parse(options[:date]).strftime("%Y-%m-%d")
	end
	raise OptionParser::MissingArgument if options[:title].nil?
	title = options[:title]
	slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
	authors = options[:author].strip.split(', ') unless options[:author].nil?
	tags = options[:tags].strip.split(', ') unless options[:tags].nil?

	filename = "#{date}-#{slug}.md"
	path = File.join(Jekyll.configuration['source'], "_posts", filename)
	frontmatter = {}
	frontmatter[:title] = title
	frontmatter[:date] = date
	frontmatter[:layout] = 'post'
	frontmatter[:image] = options[:image]
	frontmatter[:tags] = tags
	frontmatter[:authors] = authors
	frontmatter[:description] = nil
	frontmatter[:excerpt] = nil

	content = options[:content]

	load = YAML.load(frontmatter.to_json)
	yaml = YAML.dump(load)

	contents = YAML.load(content.to_json)
	content_yml = YAML.dump(contents)

	File.open(path, 'w') { |file| file.write(yaml + content_yml) }
end
if @options[:new]
	new_post
end