/*
* Coded by Clayne#5451
* Helped by No#7777 & GuckTubeYT#3123
*/
const Discord = require('discord.js')
const client = new Discord.Client()
var fs = require('fs');
const config = require("./botconfig.json")
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
	.setAuthor(`GT Private Server`)
	.addField('*Server Status:**', '**DOWN**')
	.addField('Players Online:', 'Please wait.')
	.setTimestamp()
	.setFooter('Last Updated');

    client.channels.cache.get(config.channel).send(statusz).then((msg)=> {

  setInterval(function(){
  	var color = randomColor();
isRunning('enet.exe', (status) => {
    if (status == true) {
    	lineReader.eachLine('onlineplayer.txt', function(line) {
        const f1 = fs.readdirSync(config.player).length
        const f2 = fs.readdirSync(config.world).length
        const f3 = fs.readdirSync(config.guild).length
        const statuszz = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
	.addField('**Server Status:**', '**UP**')
	.addField('**Players Online:**', line)
	.addField('**Players File Count: **', f1)
	.addField('**Worlds File Count: **', f2)
        .addField('**Guilds File Count: **', f3)
	.setTimestamp()
	.setFooter('Last Updated');
	
        msg.edit(statuszz);
});
    }
    else
    {
        const f1 = fs.readdirSync(config.player).length
        const f2 = fs.readdirSync(config.world).length
        const f3 = fs.readdirSync(config.guild).length
        const statusz = new Discord.MessageEmbed()
	.setColor(color)
	.setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
	.addField('**Server Status:**', '**DOWN**')
	.addField('**Players online:**', '0')
        .addField('**Players File Count: **', f1)
	.addField('**Worlds File Count: **', f2)
        .addField('**Guilds File Count: **', f3)
	.setTimestamp()
	.setFooter('Last Updated');
	 
         msg.edit(statusz);
    }
})
  }, 3000)
}); 
})

client.login(config.token)
