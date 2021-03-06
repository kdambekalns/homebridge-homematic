'use strict';

var HomeKitGenericService = require('./HomeKitGenericService.js').HomeKitGenericService;
var util = require("util");


function HomeMaticHomeKitWinMaticService(log,platform, id ,name, type ,adress,special, cfg, Service, Characteristic) {
    HomeMaticHomeKitWinMaticService.super_.apply(this, arguments);
}

util.inherits(HomeMaticHomeKitWinMaticService, HomeKitGenericService);


HomeMaticHomeKitWinMaticService.prototype.propagateServices = function(Service, Characteristic) {
    
  // Register new Characteristic or Services here
  
}



HomeMaticHomeKitWinMaticService.prototype.createDeviceService = function(Service, Characteristic) {

	var that = this;
    var window = new Service.Window(this.name);
    this.services.push(window);
    
    var cwindow = window.getCharacteristic(Characteristic.CurrentPosition);
      
    cwindow.on('get', function(callback) {
      that.query("LEVEL",function(value){
       if (value < 0 )  {
        value = 0;
       }
       if (callback) callback(null,value);
    })
    }.bind(this));
   
    that.currentStateCharacteristic["LEVEL"] = cwindow;
    cwindow.eventEnabled = true;


    var swindow = window.getCharacteristic(Characteristic.TargetPosition);
      
    swindow.on('set', function(value,callback) {
     if (value==0) {
     	// Lock Window on Close Event
     	value = -0.005;
     }
     that.delayed("set","LEVEL" , value)
	 callback();
    }.bind(this));



    var swindow = window.getCharacteristic(Characteristic.PositionState);
      
    swindow.on('get', function(callback) {
      that.query("DIRECTION",function(value){
       var hcvalue = 0;
       hcvalue = value;
       // may there are some mappings needed
       if (callback) callback(null,hcvalue);
    })
    }.bind(this));

}



module.exports = HomeMaticHomeKitWinMaticService; 