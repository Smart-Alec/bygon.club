#To start server, simply set the replit flag to false below and run ./main.sh

replit=true

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