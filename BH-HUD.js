// ==UserScript==
// @name         Battlehand HUD MLV edition 4.3.6
// @namespace    Battlehand-HUD
// @version      4.3.6
// @description  Battlehand Customized HUD
// @author       Jai (feat. SyntheeR, afrocheese)
// @require      https://raw.githubusercontent.com/afrocheese/bh_hud/master/datasource.js
// @require      https://raw.githubusercontent.com/afrocheese/bh_hud/master/customhud.js
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @updateURL    https://raw.githubusercontent.com/afrocheese/bh_hud/master/BH-HUD.js
// @include      http://game261051.konggames.com/*
// @include      http://www.kongregate.com/games/AnotherPlaceProd/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// ==/UserScript==
Object.defineProperty(bh.Player.prototype, "canScout", { get: function () { return true; }, enumerable: true, configurable: true});
Object.defineProperty(bh.Player.prototype, "isAlly", { get: function () { return true; }, enumerable: true, configurable: true});

var gids = [GuildsGID, BattleCardRepoGID, BoosterCardRepoGID, DungeonRepoGID, EffectRepoGID, HeroRepoGID, ItemRepoGID, WildCardRepoGID, 0]
bh.TSV = {};

!function stageTSV() {
    gids.forEach(function(gid) {
        var url = DataHost + DataSheetID + "/pub?gid=" + gid + "&single=true&output=tsv"
        unsafeWindow.console.log(url)
        GM_xmlhttpRequest({
            url:      url,
            onload:   function(r) {
                console.log('resolved: ' + String(gid));
                bh.TSV[String(gid)] = r.responseText;
                if (Object.keys(bh.TSV).length == gids.length) {
                    console.log('have all data');
                    bh.hud.listener.init(unsafeWindow, DataHost, WebHost);
                }
            },
            synchronous: true
        });
    });
}()
