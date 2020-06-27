//"use strict"
var MaxHeroCount = 13;
var MaxFameLevel = 50;
var AttackDivisor = 750;
var ShieldDivisor = 1500;
var HealDivisor = 1500;
var GuildsGID = 718865564;
var BattleCardRepoGID = 847594751;
var BoosterCardRepoGID = 1114899214;
var DungeonRepoGID = 106520569;
var EffectRepoGID = 2005762218;
var HeroRepoGID = 1181545238;
var ItemRepoGID = 572586454;
var WildCardRepoGID = 259301492;
var DataHost = "https://docs.google.com/spreadsheets/d/e/";
//var webHost = "http://bh.elvenintrigue.com/";
var WebHost = "http://www.ifuwantweb.de/current_hud/";
var DataSheetID = "2PACX-1vQkkDKXOiNxQTPmW1cRA2mcO3Qxm2hmpm5oBxoOyEkikRkJoX8UeM7kSLm_-QFnsi8HFrDWYdKHqitR";
// next lines to be removed (future plan!)
var BattleCardDataUrl = DataHost + DataSheetID + "/pub?gid=" + BattleCardRepoGID + "&single=true&output=tsv";
var DungeonDataUrl = DataHost + DataSheetID + "/pub?gid=" + DungeonRepoGID + "&single=true&output=tsv";