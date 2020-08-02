#Before commiting, change the replit flag to false.

replit=false

bool=$(gem list -i "^bundler$")

if [ $bool == "false" ]
then
  gem install bundler
fi

if [ $replit != "true" ]
then
  bundle install
  ruby server.rb -p 4567
else
  ruby server.rb -p 8080
fi