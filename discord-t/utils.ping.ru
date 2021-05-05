require 'discordrb'

bot = Discordrb::Bot.new token: 'NzkyNjk2NTgyMzk0MDg1Mzk3.X-heOA.d0EK4DK2pvjZlmF26g8_Wa3rQFM'


puts "This bot's invite URL is #{bot.invite_url}."
puts 'Click on it to invite it to your server.'


bot.message(content: 'Ping!') do |event|
  event.respond 'Pong!'
end

