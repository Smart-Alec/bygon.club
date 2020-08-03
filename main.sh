bool=$(gem list -i "^bundler$")

if [ $bool == "false" ]
then
  gem install bundler
fi

bundle install
ruby server.rb -p 8080