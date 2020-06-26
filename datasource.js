//"use strict"
var MaxHeroCount = 13;
var MaxFameLevel = 50;
var AttackDivisor = 750;
var ShieldDivisor = 1500;
var HealDivisor = 1500;
var GuildsGID = 496437953;
var BattleCardRepoGID = 1013492615;
var BoosterCardRepoGID = 1070164839;
var DungeonRepoGID = 1980099142;
var EffectRepoGID = 1091073205;
var HeroRepoGID = 1755919442;
var ItemRepoGID = 1250310062;
var WildCardRepoGID = 2106503523;
var DataHost = "https://docs.google.com/spreadsheets/d/e/";
//var webHost = "http://bh.elvenintrigue.com/";
var WebHost = "http://www.ifuwantweb.de/current_hud/";
var DataSheetID = "2PACX-1vQBgzuwuRCrURc8PufG4qn1Yb-ytWb5keUSxgQ1GwFdx0Pfk4JR0c7x1alxr_svxRopudyAuW8OdBHB";
// next lines to be removed (future plan!)
var BattleCardDataUrl = DataHost + DataSheetID + "/pub?gid=" + BattleCardRepoGID + "&single=true&output=tsv";
var DungeonDataUrl = DataHost + DataSheetID + "/pub?gid=" + DungeonRepoGID + "&single=true&output=tsv";