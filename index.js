const Discord = require('discord.js')
const client = new Discord.Client()
var fs = require('fs');
const exec = require('child_process').exec;
const lineReader = require('line-reader');
var randomColor = require('randomcolor');

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32' : cmd = `tasklist`; break;
        case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
        case 'linux' : cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

client.on('ready', () => {

  console.log(`${client.user.tag} Now Is Online!`)
  client.user.setActivity('GT Private Server | Server Status', { type: 'STREAMING' });

  	const statusz = new Discord.MessageEmbed()
	.setColor('#ff0000')
	.setAuthor(`${msg.guild.name}`, 'https://cdn.discordapp.com/attachments/724070731209769020/728563906557116546/20200701_120136.png', '')
	.addField('*Server Status:**', '**DOWN**')
	.addField('Players Online:', 'Please wait.')
	.setTimestamp()
	.setFooter('Last Updated');

    client.channels.cache.get('channel id').send(statusz).then((msg)=> {

  setInterval(function(){
  	var color = randomColor();
isRunning('enet.exe', (status) => {
    if (status == true) {
    	lineReader.eachLine('onlineplayer.txt', function(line) {

        const statuszz = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
	.addField('**Server Status:**', '**UP**')
	.addField('**Players Online:**', line)
	.setTimestamp()
	.setFooter('Last Updated');
	
        msg.edit(statuszz);
});
    }
    else
    {
        const statusz = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
	.addField('**Server Status:**', '**DOWN**')
	.addField('**Players online:**', '0')
	.setTimestamp()
	.setFooter('Last Updated');
	 
         msg.edit(statusz);
    }
})
  }, 3000)
}); 
})

client.login('your token bot')
