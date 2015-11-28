require 'safe_yaml'
module Jekyll
  module Carto
    SafeYAML::OPTIONS[:default_mode] = :safe
    def find_location(name)
      data = YAML.load_file('_data/locations.yml')
      if data[name]
        data[name]
      else
        print "No place called #{name} found."
      end
    end
  end
end
Liquid::Template.register_filter(Jekyll::Carto)
