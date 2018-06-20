"use strict";var Bottle=require("bottlejs"),_require=require("./CurrentCivicAnchorServiceImpl"),CurrentCivicAnchor=_require.CurrentCivicAnchor,AnchorService=require("./anchorService"),logger=require("../logger"),HttpServiceConstructor=require("./httpService"),config=require("./config"),services=new Bottle,initServices=function(a,b){return b&&(services.resetProviders(["Http"]),logger.debug("Registering custom HTTP service implementation"),services.factory("Http",function(){return b})),a&&(services.resetProviders(["Http"]),logger.debug("Registering custom Config service implementation"),services.factory("Config",function(){return b})),services};services.factory("Config",function(){return config}),logger.info("Registering request-promise-native as Http service implementation."),services.service("Http",HttpServiceConstructor),services.service("CivicAnchor",CurrentCivicAnchor,"Config","Http"),services.factory("AnchorService",function(a){var b=a.CivicAnchor;return logger.debug("Registering AnchorService with Civic implementation"),new AnchorService(b)}),module.exports={services:services,initServices:initServices};