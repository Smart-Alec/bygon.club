require "sinatra"

set :protection, :except => :frame_options
set :bind, "0.0.0.0"

get "/" do
  erb :index, locals: {title: "Home", stylesheet: "index"}
end

get "/chat" do
  erb :chat, locals: {title: "Chat"}
end

get "/games" do
  erb :games, locals: {title: "Games"}
end