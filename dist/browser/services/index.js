"use strict";var Bottle=require("bottlejs"),_require=require("./DummyAnchorServiceImpl.js"),CurrentCivicAnchor=_require.CurrentCivicAnchor,AnchorService=require("./anchorService"),logger=require("../logger"),HttpServiceConstructor=require("./httpService"),config=require("./config"),SecureRandom=require("../SecureRandom"),services=new Bottle,initServices=function(a,b,c){return b&&(services.resetProviders(["Http"]),logger.debug("Registering custom HTTP service implementation"),services.factory("Http",function(){return b})),a&&(services.resetProviders(["Config"]),logger.debug("Registering custom Config service implementation"),services.factory("Config",function(){return a})),c&&(services.resetProviders(["SecureRandom"]),logger.debug("Registering custom SecureRandom service implementation"),services.factory("SecureRandom",function(){return c})),services};services.factory("Config",function(){return config}),logger.info("Registering request-promise-native as Http service implementation."),services.service("Http",HttpServiceConstructor),services.service("SecureRandom",SecureRandom),services.service("CivicAnchor",CurrentCivicAnchor,"Config","Http"),services.factory("AnchorService",function(a){var b=a.CivicAnchor;return logger.debug("Registering AnchorService with Civic implementation"),new AnchorService(b)}),module.exports={services:services,initServices:initServices};