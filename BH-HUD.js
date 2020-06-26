// ==UserScript==
// @name         Battlehand HUD MLV edition 4.3.4
// @namespace    Battlehand-HUD
// @version      4.3.4
// @description  Battlehand Customized HUD
// @author       Jai (feat. SyntheeR)
// @require      http://www.ifuwantweb.de/current_hud/datasource.js
// @require      http://www.ifuwantweb.de/current_hud/customhud.min.js
// @updateURL    http://www.ifuwantweb.de/current_hud/BH-HUD.js
// @include      http://game261051.konggames.com/*
// @include      http://www.kongregate.com/games/AnotherPlaceProd/*
// @grant        unsafeWindow
// ==/UserScript==
Object.defineProperty(bh.Player.prototype, "canScout", { get: function () { return true; }, enumerable: true, configurable: true});
Object.defineProperty(bh.Player.prototype, "isAlly", { get: function () { return true; }, enumerable: true, configurable: true});
bh.hud.listener.init(unsafeWindow, DataHost, WebHost);