const Discord = require("discord.js");
const google = require('google');
const SpotifyWebApi = require('spotify-web-api-node');
const bot = new Discord.Client();

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://www.example.com/callback'
});

const config = require("./config.json");

bot.on('ready', () => {
  console.log('Status: Ready To Working!');
});

bot.on("guildMemberSpeaking", (member, speaking) => {
  let guild = member.guild;
  let speak = speaking.member;
  console.log("asd");
  if (speak === true) {
    let a = member.user;
    console.log("Тоя говори: ", а);
    guild.defaultChannel.sendMessage("СПРИ ДА ГОВОРШ БЕ КРЕТЕН >>>>>" + member.user + "<<<<<");
  }
});
bot.on("guildMemberAdd", member => {
  let guild = member.guild;
  console.log(member.user);
  guild.defaultChannel.sendMessage("Welcome, " + member.user + " to this server.");
});
bot.on("guildMemberRemove", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage("Good bye, " + member.user + ".");
});

bot.on("guildCreate", guild => {
  console.log("Someone Moving!")
  //console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

bot.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Counter-Strike: Global Offensive");
  if (!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike: Global Offensive") {
    newMember.addRole(playRole);
  } else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  }
});

bot.on('message', (message) => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "moveBot") {
    voiceChannel.join()
     .then(connection => {
       const dispatcher = connection.playFile('D:/Music/DJ/Serbian/Mile Kitic - Kilo dole kilo gore (OFFICIAL VIDEO 2015).mp3');
     })
     .catch(console.error);
  }

  if (command === "s") {
    google.resultsPerPage = 1
    var nextCounter = 0

    let search = args[0];

    google(search, function (err, res){
      if (err) console.error(err)

      for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        message.channel.sendMessage(link.title + ' - ' + link.href);
      }

      if (nextCounter < args[1]) {
        nextCounter += 1
        if (res.next) res.next()
      }
    })
  }


  if(command === "b") {
    spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
      .then(function(data) {
        var obj = data.body;
          for (var prop in obj) {
            if(!obj.hasOwnProperty(prop)) { continue;}
              message.reply(prop + " = " + obj[prop]);
            }
          console.log(data.body);
      }, function(err) {
        console.error(err);
      });
  }

  if(command === "add") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c)
    message.channel.sendMessage("Result is: " + total);
    console.log('Im WORKING' + "Result is: " + total);
  } else

  if(command === "q") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c)
    message.channel.sendMessage("Result is: " + total);
    console.log('Im WORKING' + "Result is: " + total);
  } else

  if(command === "spam") {
    for (var i = 0; i < args[0]; i++) {
      message.channel.sendMessage(args[1]);
    }
  }

  if (command === 'version') {
      let ver = config.version;
      message.reply("Current version is:  " + config.version);
  } else

  if (command === 'avatar') {
      message.reply(message.author.avatarURL);
  } else

  if (command === "say") {
    message.channel.sendMessage(args.join(" "));
  } else

  if (command === "ping") {
    message.channel.sendMessage("Педал не си играй!");
    console.log('1 Message Send!');
  } else

  if (command === "kill") {
    let modRole = message.guild.roles.find("name", "Deba");
    if(message.member.roles.has(modRole.id)) {
      message.channel.sendMessage("I will kill them all!");
    } else {
        message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
    }
    console.log('1 Message Send!');
  }

  if(command === "mute") {
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to mute.");
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if(!muteMember) {
      return message.reply("Try again.");
    }
    muteMember.setMute(true);
    if(muteMember) {
      message.channel.sendMessage("User muted successfully.");
    }
  }

  if(command === "unmute") {
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to mute.");
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if(!muteMember) {
      return message.reply("Try again.");
    }
    muteMember.setMute(false);
    if(muteMember) {
      message.channel.sendMessage("User muted successfully.");
    }
  }
  if(command === "silence") {
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to silence.");
    }
    let sileMember = message.guild.member(message.mentions.users.first());
    if(!sileMember) {
      return message.reply("Try again.");
    }
    sileMember.setMute(true);
    sileMember.setDeaf(true);
    if(sileMember) {
      message.channel.sendMessage("User silenced successfully.");
    }
  }
  if(command === "unsilence") {
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to silence.");
    }
    let sileMember = message.guild.member(message.mentions.users.first());
    if(!sileMember) {
      return message.reply("Try again.");
    }
    sileMember.setMute(false);
    sileMember.setDeaf(false);
    if(sileMember) {
      message.channel.sendMessage("User unsilenced successfully.");
    }
  }

});





bot.login(config.token);
