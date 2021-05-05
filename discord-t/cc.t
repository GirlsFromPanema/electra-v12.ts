use AnyEvent::Discord::Client;
 
my $token = 'NzkyNjk2NTgyMzk0MDg1Mzk3.X-heOA.d0EK4DK2pvjZlmF26g8_Wa3rQFM';
 
my $bot = new AnyEvent::Discord::Client(
  token => $token,
  commands => {
    'commands' => sub {
      my ($bot, $args, $msg, $channel, $guild) = @_;
      $bot->say($channel->{id}, join("   ", map {"`$_`"} sort grep {!$commands_hidden{$_}} keys %{$bot->commands}));
    },
  },
);
 
$bot->add_commands(
  '' => sub {
    my ($bot, $args, $msg, $channel, $guild) = @_;
 
    $bot->say($channel->{id}, ", $msg->{author}{username}!");
  },
);
 
$bot->connect();
AnyEvent->condvar->recv;