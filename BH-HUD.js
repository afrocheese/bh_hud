// ==UserScript==
// @name         Battlehand HUD MLV edition 4.3.5
// @namespace    Battlehand-HUD
// @version      4.3.5
// @description  Battlehand Customized HUD
// @author       Jai (feat. SyntheeR, afrocheese)
// @require      https://raw.githubusercontent.com/afrocheese/bh_hud/master/datasource.js
// @require      https://raw.githubusercontent.com/afrocheese/bh_hud/master/customhud.js
// @updateURL    https://raw.githubusercontent.com/afrocheese/bh_hud/master/BH-HUD.js
// @include      http://game261051.konggames.com/*
// @include      http://www.kongregate.com/games/AnotherPlaceProd/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// ==/UserScript==
Object.defineProperty(bh.Player.prototype, "canScout", { get: function () { return true; }, enumerable: true, configurable: true});
Object.defineProperty(bh.Player.prototype, "isAlly", { get: function () { return true; }, enumerable: true, configurable: true});
bh.hud.listener.init(unsafeWindow, DataHost, WebHost);

console.log(GM_info);
