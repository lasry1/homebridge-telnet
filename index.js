var Service, Characteristic;
var telnetClient = require('telnet-client');

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-telnet", "telnet", telnet);
}


function telnet(log, config) {
    this.log = log;

    this.host = config["host"];
    this.port = config["port"];
    this.shellPrompt = config["/ # "];
    this.timeout = config["timeout"];
    this.name = config["name"];
}

telnet.prototype = {

    getPowerState: function (callback) {
        callback(null, !this.default_state_off);
    },

    setPowerState: function(powerOn, callback) {
        var connection = new telnetClient();
        connection.on('ready', function(prompt){
            connection.exec(cmd, function(){
                connection.end().then(function(){
                    callback();
                });
            });
        });
        connection.on('timeout', function(){
            callback(error);
        });
        
        connection.connect({ host: this.host, port: this.port, shellPrompt: this.shellPrompt, timeout: this.timeout});
    },

    identify: function (callback) {
        this.log("Identify requested!");
        callback();
    },

    getServices: function () {
        var informationService = new Service.AccessoryInformation();

        informationService
                .setCharacteristic(Characteristic.Manufacturer, "skiilaa")
                .setCharacteristic(Characteristic.Model, "homebridge-telnet")
                .setCharacteristic(Characteristic.SerialNumber, "I don't even know anymore.");

        switchService = new Service.Switch(this.name);
        switchService
                .getCharacteristic(Characteristic.On)
                .on('get', this.getPowerState.bind(this))
                .on('set', this.setPowerState.bind(this));

    
        return [switchService];
    }
};