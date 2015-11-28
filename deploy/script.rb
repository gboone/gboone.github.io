#! /usr/bin/env ruby
def exec_cmd(cmd)
  exit $?.exitstatus unless system(cmd)
end

exec_cmd 'git stash'
exec_cmd 'bundle install --without development'
exec_cmd 'bundle exec jekyll build --dest /sites/greg.harmsboone.org/_site/'
