require "sinatra"
require "sinatra-websocket"

set :protection, :except => :frame_options
set :bind, "0.0.0.0"
set :port, 8080
set :server, :thin

sockets = []

#url's

get "/" do
  erb :index, locals: {title: "Home", stylesheet: :index}
end

get "/chat" do
  erb :chat, locals: {title: "Chat"}
end

get "/games" do
  erb :games, locals: {title: "Games"}
end

get "/draw" do
  if !request.websocket?
    erb :draw, locals: {title: "Draw!", stylesheet: :draw}
  else
    request.websocket do |ws|
      ws.onopen do
        ws.send "Heyo, socket opened!"
        sockets << ws
      end
      
      ws.onmessage do |msg|
        sockets.each do |socket|
          socket.send msg
        end
      end
      ws.onclose do
        puts "byebye!"
        sockets.delete ws
      end
    end
  end
end

#error pages

error 404 do
  erb :"error/404", locals: {title: "Not Found", stylesheet: "error"}
end

#draw

