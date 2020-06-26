var bh, TestRun = !1,
    ScoutGuildName = !0,
    bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh;
try
{
    console.log(GM_xmlhttpRequest({ method: "GET", url: "http://google.ca/", synchronous: true }).readyState);
}
catch (e)
{
    console.log(e);
}

function updateCardData() {
    $.get(BattleCardDataUrl).then(function(e) {
        var t, r = bh.Repo.mapTsv(e).map(function(e) {
                try {
                    var t = e.Id,
                        r = bh.data.BattleCardRepo.find(t),
                        n, a = e["Effect Type"].includes("/") ? [0, 1] : [0],
                        i = {
                            guid: t,
                            name: r && r.name || e.Name,
                            klassType: bh.KlassType[e.Class.replace("Ranged", "Skill").replace("Melee", "Might")],
                            elementType: bh.ElementType[e.Element],
                            rarityType: bh.RarityType[e.Rarity.replace(/ /, "")],
                            turns: +e.Turns,
                            typesTargets: e["Effect Type"].trim().split(/\s*\/\s*/),
                            brag: bh.utils.parseBoolean(e["Is Brag?"]),
                            minValues: a.map(function(t) {
                                return [0, 1, 2, 3, 4, 5].map(function(t) {
                                    return e[t + "* Min"]
                                }).filter(function(e) {
                                    return !!e
                                }).map(function(e) {
                                    return +String(e).split(/\s*\/\s*/)[t]
                                })
                            }),
                            maxValues: [0, 1, 2, 3, 4, 5].map(function(t) {
                                return e[t + "* Max"]
                            }).filter(function(e) {
                                return !!e
                            }).pop().split(/\s*\/\s*/).map(function(e) {
                                return +e
                            }),
                            tier: e.Tier,
                            mats: [1, 2, 3, 4].map(function(t) {
                                return e[t + "* Evo Jar"]
                            }).filter(function(e) {
                                return !!e
                            }),
                            perkBase: +e["Perk %"],
                            perks: [1, 2].map(function(t) {
                                return e["Perk #" + t]
                            }).filter(function(e) {
                                return !!e
                            }),
                            effects: [1, 2, 3].map(function(t) {
                                return e["Effect #" + t]
                            }).filter(function(e) {
                                return !!e && "Splash" != e
                            }),
                            inPacks: bh.utils.parseBoolean(e["In Packs?"])
                        };
                    return r ? r.name != e.Name && console.log("HUD: " + r.name + " !== " + e.Name) : console.log("HUD: New Card: " + e.Name), i
                } catch (t) {
                    console.error("HUD: " + e)
                }
                return null
            }),
            n = "guid\tname\tklassType\telementType\trarityType\tturns\ttypesTargets\tbrag\tminValues\tmaxValues\ttier\tmats\tperkBase\tperks\teffects\tpacks";
        r.filter(function(e) {
            return !!e
        }).forEach(function(e) {
            n += "\n" + e.guid + "\t" + e.name + "\t" + bh.KlassType[e.klassType].slice(0, 2) + "\t" + bh.ElementType[e.elementType][0] + "\t" + bh.RarityType[e.rarityType][0] + "\t" + e.turns + "\t" + e.typesTargets.join("|") + "\t" + String(e.brag)[0] + "\t" + e.minValues.map(function(e) {
                return e.join(",")
            }).join("|") + "\t" + e.maxValues.join("|") + "\t" + String(e.tier)[0] + "\t" + e.mats.join(",") + "\t" + e.perkBase + "\t" + e.perks.join(",") + "\t" + e.effects.join(",") + "\t" + String(e.inPacks)[0]
        }), $("#data-output").val(n)
    })
}! function(e) {
    class t {
        constructor() {
            this._cache = {}
        }
        clearCache() {
            this._cache = {}
        }
        fromCache(e, t) {
            return e in this._cache || (this._cache[e] = t()), this._cache[e]
        }
    }
    e.Cacheable = t
}(bh || (bh = {})),
function(e) {
    let t, r, n, a, i, o;
    ! function(e) {
        e[e.Trait = 0] = "Trait", e[e.Active = 1] = "Active", e[e.Passive = 2] = "Passive"
    }(t = e.AbilityType || (e.AbilityType = {})),
    function(e) {
        e[e.Fire = 0] = "Fire", e[e.Earth = 1] = "Earth", e[e.Air = 2] = "Air", e[e.Spirit = 3] = "Spirit", e[e.Water = 4] = "Water", e[e.Neutral = 5] = "Neutral"
    }(r = e.ElementType || (e.ElementType = {})),
    function(e) {
        e[e.EvoJar = 0] = "EvoJar", e[e.Crystal = 1] = "Crystal", e[e.Rune = 2] = "Rune"
    }(n = e.ItemType || (e.ItemType = {})),
    function(e) {
        e[e.Magic = 0] = "Magic", e[e.Might = 1] = "Might", e[e.Skill = 2] = "Skill"
    }(a = e.KlassType || (e.KlassType = {})),
    function(e) {
        e[e.Member = 0] = "Member", e[e.Elder = 1] = "Elder", e[e.CoLeader = 2] = "CoLeader", e[e.Leader = 3] = "Leader"
    }(i = e.PositionType || (e.PositionType = {})),
    function(e) {
        e[e.Common = 0] = "Common", e[e.Uncommon = 1] = "Uncommon", e[e.Rare = 2] = "Rare", e[e.SuperRare = 3] = "SuperRare", e[e.Legendary = 4] = "Legendary"
    }(o = e.RarityType || (e.RarityType = {}))
}(bh || (bh = {})),
function(e) {
    class t {
        constructor(r) {
            this.raw = r;
            let n = t.matchEffect(r),
                a = n && n[1] || r,
                i = e.data.EffectRepo.find(a);
            this.effect = i && i.name || a, this.percent = n && n[2] && n[2] + "%" || null, this.percentMultiplier = this.percent && +n[2] / 100 || null, this.turns = n && +n[3] || null, this.value = i && i.value, this.perkMultiplier = 0, this.offense = !(i && i.value || "").toLowerCase().startsWith("d"), this.rawTarget = n && n[4] || null
        }
        static matchEffect(e) {
            return "Critical" == e ? ["Critical", "Critical"] : "Splash Enemy" == e ? ["Splash", "Splash"] : e.match(/([a-zA-z]+(?: [a-zA-Z]+)*)(?: (\d+)%)?(?: (\d+)T)?(?: (Enemy|Ally|Self))/)
        }
        static parse(e) {
            if (!e) return null;
            var r = new t(e);
            return r.effect && r || null
        }
        static parseAll(n) {
            var a = e.data.BattleCardRepo.find(n.configId),
                i = e.BattleCardRepo.getPerk(a, n.evolutionLevel) / 100,
                o = [];
            return a.effects.forEach(function(e) {
                var r = t.parse(e);
                if (!r) return console.error("HUD: GameEffect.parse: " + e);
                r.card = a, o.push(r)
            }), a.perks.forEach(function(e) {
                var r = t.parse(e);
                if (!r) return console.error("HUD: GameEffect.parse: " + e);
                r.card = a, r.perkMultiplier = i, o.push(r)
            }), r(o, a), o
        }
        get powerRating() {
            return n(this)
        }
    }

    function r(r, n) {
        var a = n.typesTargets.map(function(t) {
                return e.PlayerBattleCard.parseTarget(t)
            }),
            i = a.find(function(e) {
                return "Damage" == e.type
            }),
            o = a.find(function(e) {
                return ["Heal", "Shield"].includes(e.type)
            }),
            s = [];
        r.slice().forEach(function(n) {
            if (["Leech", "Sap"].includes(n.effect) && (n.rawTarget = "Enemy"), "Critical" == n.effect) n.target = a[0], a.slice(1).forEach(function(e) {
                var a = t.parse(n.raw);
                a.target = e, r.push(a)
            });
            else if ("Splash Damage" == n.effect);
            else if ("Enemy" == n.rawTarget) n.target = i || e.PlayerBattleCard.parseTarget(o.all ? "Damage All Enemies" : "Damage Single Enemy");
            else if ("Ally" == n.rawTarget) {
                var s = o && o.type || "Heal";
                n.target = e.PlayerBattleCard.parseTarget((i || o).all ? s + " All Allies" : s + " Single Ally")
            } else if ("Self" == n.rawTarget) {
                var s = o && o.type || "Heal";
                n.target = e.PlayerBattleCard.parseTarget(s + " Self")
            } else n.target || console.warn("HUD: can't find target for " + n.effect, n.card)
        })
    }

    function n(e) {
        if (["Critical", "Regen", "Splash Damage"].includes(e.effect)) return 0;
        let t = (e.value || "").toUpperCase().match(/(O|D)?((?:\+|\-)?\d+(?:\.\d+)?)(T)?(%)?/),
            r = t && "O" == t[1],
            n = t && "D" == t[1],
            a = t && +t[2] || 1,
            i = t && "T" == t[3] ? e.turns : 1,
            o = t && "%" == t[4] ? e.percentMultiplier : 1,
            s = t ? a * i * o : .5,
            u = e.target,
            l = u && u.offense,
            d = u && !u.offense,
            c = l == r || d == n ? 1 : -1,
            p = e.perkMultiplier || 1;
        return u ? s * p * c : (console.warn("HUD: no target", e), 0)
    }
    e.GameEffect = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Cacheable {
        constructor(e) {
            super(), this.data = e
        }
        get act() {
            return this.data.act
        }
        get boosterElementTypes() {
            return this.data.boosterElementTypes
        }
        get boosterRarities() {
            return this.data.boosterRarities
        }
        get crystals() {
            var e = this;
            return this.fromCache("crystals", function() {
                return e.data.crystals.map(function(t) {
                    return r(t, e.keys)
                })
            })
        }
        get dungeon() {
            return this.data.dungeon
        }
        get difficulty() {
            return this.data.difficulty
        }
        get elementTypes() {
            return this.data.elementTypes
        }
        get fame() {
            return this.data.fame
        }
        get guid() {
            return this.data.guid
        }
        get gold() {
            return this.data.gold
        }
        get keys() {
            return this.data.keys
        }
        get lower() {
            return this.data.lower
        }
        get mats() {
            var e = this;
            return this.fromCache("mats", function() {
                return e.data.mats.map(function(t) {
                    return r(t, e.keys)
                })
            })
        }
        get name() {
            return this.data.name
        }
        get randomMats() {
            return this.data.randomMats
        }
        get runes() {
            var e = this;
            return this.fromCache("runes", function() {
                return e.data.runes.map(function(t) {
                    return r(t, e.keys)
                })
            })
        }
        findDrop(e) {
            let t = this.crystals.find(function(t) {
                return t.name == e.split(" ")[0]
            }) || this.runes.find(function(t) {
                return t.name == e.split("'")[0]
            }) || this.mats.find(function(t) {
                return t.name == e
            });
            return t && {
                dungeon: this,
                dropRate: t
            } || null
        }
    }

    function r(e, t) {
        let r = e.split("|"),
            n = +r[1].match(/(\d+)/)[1] / 100,
            a = r[2].split("-"),
            i = +a[0],
            o = +a[1] || i,
            s = (i + o) / 2 * n,
            u = s / t;
        return console.log("HUD: " + [e, a, i, o, n, s, u]), {
            name: r[0],
            percent: r[1],
            percentMultiplier: n,
            min: i,
            max: o,
            average: s,
            averagePerKey: u
        }
    }
    e.Dungeon = t
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t(t, r) {
            this.wildCards = e.data.wildsForEvo(t.rarityType, r), this.minSot = e.data.getMinSotNeeded(t.rarityType, r), this.maxSot = e.data.getMaxSotNeeded(t.rarityType, r), this.minGold = e.data.getMinGoldNeeded(t.rarityType, r)
        }
        return t
    }();
    e.EvoReport = t;
    var r = function() {
        function r(r) {
            this.reports = [];
            var n = r.evo,
                a = e.data.getMaxEvo(r.rarityType);
            for (let e = n; e < a; e++) this.reports.push(new t(r, e))
        }
        return Object.defineProperty(r.prototype, "next", {
            get: function() {
                return this.reports[0]
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "wildCards", {
            get: function() {
                return this.reports.reduce(function(e, t) {
                    return e + t.wildCards
                }, 0)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "minSot", {
            get: function() {
                return this.reports.reduce(function(e, t) {
                    return e + t.minSot
                }, 0)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "maxSot", {
            get: function() {
                return this.reports.reduce(function(e, t) {
                    return e + t.maxSot
                }, 0)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "minGold", {
            get: function() {
                return this.reports.reduce(function(e, t) {
                    return e + t.minGold
                }, 0)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "maxGold", {
            get: function() {
                return this.reports.reduce(function(e, t) {
                    return e + t.maxGold
                }, 0)
            },
            enumerable: !0,
            configurable: !0
        }), r
    }();
    e.EvoReportCard = r
}(bh || (bh = {})),
function(e) {
    class t {
        constructor(e) {
            var r = e[0],
                n = e[1],
                a = e[2];
            this.guid = r.heroGuid, this.name = r.heroName, this.elementType = r.elementType, this.klassType = r.klassType, this.lower = this.name.toLowerCase(), this.trait = t.createHeroAbility(this, r), this.active = t.createHeroAbility(this, n), this.passive = t.createHeroAbility(this, a)
        }
        get abilities() {
            return [this.trait, this.active, this.passive]
        }
        get allBattleCards() {
            return t.filterCardsByHero(this, e.data.BattleCardRepo.all)
        }
        get maxPowerRating() {
            return this.maxPowerThresholds[e.RarityType.Legendary]
        }
        get maxPowerThresholds() {
            return this.PowerThresholds || (this.PowerThresholds = t.maxPowerThresholds(this)), this.PowerThresholds
        }
        getHitPoints(e) {
            return t.getHitPoints(this, e)
        }
        static getHitPoints(e, t) {
            switch (e.name) {
                case "Bree":
                case "Hawkeye":
                case "Krell":
                    return Math.floor(5 * t * t + 2.5 * t + 167.5);
                case "Monty":
                case "Trix":
                    return Math.floor(4.286 * t * t + 2.142 * t + 143.572);
                case "Jinx":
                case "Logan":
                case "Red":
                    return 4 * t * t + 2 * t + 134;
                case "Fergus":
                    return 6 * t * t + 3 * t + 201;
                case "Brom":
                case "Gilda":
                    return Math.floor(5.714 * t * t + 2.858 * t + 191.438);
                case "Peg":
                    return Math.floor(4.5 * t * t + 2 * t + 153.5);
                case "Thrudd":
                    return Math.floor(38 / 7 * t * t + 19 / 7 * t + 190 - 38 / 7 - 19 / 7);
                default:
                    return 0
            }
        }
        static filterCardsByHero(t, r) {
            return r.filter(function(r) {
                return r.klassType === t.klassType && (r.elementType == e.ElementType.Neutral || r.elementType == t.elementType)
            })
        }
        static createHeroAbility(e, t) {
            return {
                hero: e,
                guid: t.abilityGuid,
                name: t.abilityName,
                type: t.abilityType
            }
        }
        static maxPowerThresholds(t) {
            return e.RarityRepo.allTypes.map(function(r) {
                return e.PowerRating.rateMaxedHero(t, r)
            })
        }
    }
    e.Hero = t
}(bh || (bh = {})),
function(e) {
    class t {
        constructor(e, r, n) {
            void 0 === n && (n = null);
            var a = this;
            this.ActivePlayerGuid = "", this.ActiveSessionKey = "", this.win = e, this.callbackfn = r, this._targetWindow = n, window.addEventListener("message", function(e) {
                var r = e.data || e.originalEvent && e.originalEvent.data || null;
                t.isValidMessage(r) && (a.updateActive(r), a.callbackfn(r))
            })
        }
        get targetWindow() {
            if (!this._targetWindow) {
                if (e.isHud) {
                    var t = e.$("#gameiframe")[0];
                    this._targetWindow = t && t.contentWindow || null
                }
                e.isListener && (this._targetWindow = this.win && this.win.parent || null)
            }
            return this._targetWindow || console.log("HUD: no target window: " + location.href), this._targetWindow
        }
        createMessage(e, t) {
            return {
                action: e,
                playerGuid: this.ActivePlayerGuid,
                sessionKey: this.ActiveSessionKey,
                data: t
            }
        }
        postMessage(e) {
            t.isValidMessage(e) && this.targetWindow ? (this.updateActive(e), this.targetWindow.postMessage(e, "*")) : this.targetWindow ? console.log("HUD: invalid message: " + (e && e.action || "[no message]")) : console.log("HUD: no target window: " + (e && e.action || "[no message]"))
        }
        updateActive(e) {
            e.playerGuid !== e.action && e.sessionKey !== e.action && (this.ActivePlayerGuid && this.ActivePlayerGuid === e.playerGuid || (this.ActivePlayerGuid = e.playerGuid), this.ActiveSessionKey && this.ActiveSessionKey === e.sessionKey || (this.ActiveSessionKey = e.sessionKey))
        }
        static isValidMessage(e) {
            if (!e) return !1;
            var t = Object.keys(e);
            return t.includes("action") && t.includes("playerGuid") && t.includes("sessionKey") && t.includes("data")
        }
    }
    e.Messenger = t
}(bh || (bh = {})),
function(e) {
    function t(t, r, n, a) {
        return "number" == typeof a && (a = e.utils.formatNumber(a)), '<div data-hud="true">' + e.getImg20(t, r) + " " + n + '<span class="badge pull-right">' + a + "</span></div>"
    }
    class r extends e.Cacheable {
        constructor(t, r) {
            super(), void 0 === r && (r = !1), this.isArena = r, e.data.isPlayer(t) && (this._pp = t)
        }
        get fameLevel() {
            return (this._pp && this._pp.fameLevel || this._gp.fameLevel) + 1
        }
        get fragments() {
            return this._pp && this._pp.fragments || 0
        }
        get fragmentsRowHtml() {
            return this._pp ? t("misc", "Fragments", "Fragments", this.fragments) : ""
        }
        get gems() {
            return this._pp && this._pp.gems || 0
        }
        get gemsRowHtml() {
            return this._pp ? t("misc", "GemStone", "Gems", this.gems) : ""
        }
        get gold() {
            return this._pp && this._pp.gold || 0
        }
        get goldNeeded() {
            var e = this;
            return this.fromCache("goldNeeded", function() {
                var t = 0;
                return e.activeBattleCards.forEach(function(e) {
                    return t += e.maxMaxGoldNeeded
                }), e.heroes.forEach(function(e) {
                    return t += e.isLocked ? 0 : e.trait.maxGoldCost + e.active.maxGoldCost + e.passive.maxGoldCost
                }), t
            })
        }
        get goldRowHtml() {
            var r = this.goldNeeded,
                n = r ? e.utils.formatNumber(this.gold) + " / " + e.utils.formatNumber(Math.abs(r)) : e.utils.formatNumber(this.gold);
            return this._pp ? t("misc", "Coin", "Gold", n) : ""
        }
        get guid() {
            return this._pp && this._pp.id || this._gp.playerId
        }
        get guild() {
            return e.data.guilds.findByGuid(this.guildGuid)
        }
        get guildGuid() {
            return this._pp ? this._pp.playerGuild || null : this._gp && this._gp.guildId || null
        }
        get guildParent() {
            var t = e.data.guilds.findByGuid(this.guildGuid);
            return t && t.parent || null
        }
        get guilds() {
            var t = this,
                r = this.fromCache("guilds", function() {
                    return e.data.guilds.filterByParent(t.guildParent)
                });
            if (!r.length) {
                var n = e.data.guilds.findByGuid(this.guildGuid);
                n && r.push(n)
            }
            return r
        }
        get heroes() {
            var t = this;
            return this.fromCache("heroes", function() {
                var r;
                return (r = t._pp ? e.data.HeroRepo.all.map(function(r) {
                    return t._pp.archetypes.find(function(e) {
                        return e.id == r.guid
                    }) || e.HeroRepo.getLockedArchetype(t.guid, r.guid)
                }) : Object.keys(t._gp.archetypeLevels).map(function(e) {
                    return {
                        playerId: t.guid,
                        id: e,
                        level: t._gp.archetypeLevels[e]
                    }
                })).map(function(r) {
                    return new e.PlayerHero(t, r)
                })
            })
        }
        get isAlly() {
            return !0
        }
        get canScout() {
            return !0
        }
        get completionPercent() {
            return Math.floor(100 * this.heroes.map(function(e) {
                return e.completionLevel
            }).reduce(function(e, t) {
                return e + t
            }, 0) / (e.HeroRepo.MaxCompletionLevel * e.HeroRepo.MaxHeroCount))
        }
        get isExtended() {
            return !!this._pp
        }
        get isFullMeat() {
            var t;
            return this.heroes.filter(function(e) {
                return !e.isLocked && e.isMeat
            }).length == e.HeroRepo.MaxHeroCount
        }
        get isMe() {
            return e.messenger.ActivePlayerGuid == this.guid
        }
        get name() {
            return this._pp ? this._pp.name : this._gp && this._gp.name || null
        }
        get position() {
            return this._gp && this._gp.position || null
        }
        get powerRating() {
            var e = this;
            return this.fromCache("powerRating", function() {
                return e.heroes.reduce(function(e, t) {
                    return e + t.powerRating
                }, 0)
            })
        }
        get raidRowHtml() {
            return this._pp ? t("keys", "RaidTicket", "Raid Tickets", this.raidTickets) : ""
        }
        get raidTickets() {
            return this._pp && this._pp.raidKeys || 0
        }
        get battleCards() {
            var e = this;
            return this.fromCache("battleCards", function() {
                return e._pp && e._pp.playerCards && e._pp.playerCards.cards ? e.sortAndReduceBattleCards(Object.keys(e._pp.playerCards.cards)) : []
            })
        }
        get activeBattleCards() {
            var e = this;
            return this.fromCache("activeBattleCards", function() {
                return e.battleCards.filter(function(e) {
                    return e.isActive
                })
            })
        }
        get activeRecipes() {
            var t = this;
            return this.fromCache("activeRecipes", function() {
                return t.activeBattleCards.map(function(t) {
                    return new e.Recipe(t, !0)
                }).filter(function(e) {
                    return !!e
                })
            })
        }
        get boosterCards() {
            var t = this._pp && this._pp.feederCardsMap;
            return t ? Object.keys(t).map(function(r) {
                return new e.PlayerBoosterCard(r, t[r])
            }).sort(e.utils.sort.byElementThenRarityThenName) : []
        }
        get boosterCount() {
            var e = 0,
                t = this._pp && this._pp.feederCardsMap || {};
            return Object.keys(t).map(function(r) {
                return e += t[r]
            }), e
        }
        get boosterRowHtml() {
            return this._pp ? e.PlayerBoosterCard.rowHtml(this.boosterCount) : ""
        }
        get inventory() {
            var t = this,
                r = this._pp && this._pp.craftingMaterials;
            return e.data.ItemRepo.allSortedByName.map(function(n) {
                return new e.PlayerInventoryItem(t, n, r[n.guid] || 0)
            })
        }
        get wildCards() {
            var t = this;
            return this.fromCache("wildCards", function() {
                return e.data.WildCardRepo.all.map(function(r) {
                    return new e.PlayerWildCard(t, r.guid)
                })
            })
        }
        get wildCardRowHtml() {
            return this._pp ? t("cardtypes", "WildCard", "Wild Cards", this.wildCards.filter(function(e) {
                return e.count
            }).slice(-3).map(function(t) {
                return e.RarityType[t.rarityType][0] + ":" + t.count
            }).join(" / ")) : ""
        }
        static get me() {
            return e.data.PlayerRepo.find(e.messenger.ActivePlayerGuid)
        }
        battleCardToPlayerBattleInfo(t) {
            var r = this._pp.playerCards.cards[t];
            return new e.PlayerBattleCard(r)
        }
        filterActiveBattleCards() {
            for (var t = [], r, n, a, i, o = 0; o < arguments.length; o++) t[o] = arguments[o];
            return t.forEach(function(t) {
                return e.ElementRepo.isElement(t) ? r = t : e.RarityRepo.isRarity(t) ? n = t : a = t
            }), a && (i = e.data.HeroRepo.find(a)), this.activeBattleCards.filter(function(e) {
                return e.matchesElement(r) && e.matchesRarity(n) && e.matchesHero(i)
            })
        }
        filterHeroes(t) {
            var r = e.ElementRepo.isElement(t) ? t : null,
                n = r ? null : t;
            return this.heroes.filter(function(t) {
                return t && !t.isLocked && (r && e.ElementType[t.elementType] == r || n && t.name == n)
            })
        }
        findPlayerCard(e) {
            var t = this._pp && this._pp.playerCards.cards,
                r = t && t[e];
            if (!r && t) {
                var n, a = Object.keys(t).find(function(r) {
                    return r == e || t[r].configId == e
                });
                r = t[a]
            }
            return r
        }
        merge(e) {
            var t = this._pp && this._pp.archetypes || [],
                r;
            (e.archetypes || []).forEach(function(e) {
                t.find(function(t) {
                    return t.id == e.id
                }) || t.push(e)
            })
        }
        sortAndReduceBattleCards(t) {
            var r = this,
                n, a = t.map(function(e) {
                    return r.battleCardToPlayerBattleInfo(e)
                }).sort(e.utils.sort.byRarityThenNameThenEvoLevel),
                i = [];
            return a.forEach(function(e) {
                var t = i.find(function(t) {
                    return t.matches(e)
                });
                t ? t.count++ : i.push(e)
            }), i
        }
    }
    e.Player = r
}(bh || (bh = {})),
function(e) {
    function t(e) {
        return e.map(function(e) {
            return e.trim()
        }).filter(function(e) {
            return !!e
        }).map(function(e) {
            var t = e.split(" "),
                r = "All" == t[1],
                n = "Single" == t[1],
                a = "Splash" == t[1],
                i = "Self" == t[1];
            if (e.includes("Flurry")) {
                if (i) return "Self Flurry";
                if (r) return "Multi Flurry";
                if (n) return "Single Flurry"
            }
            return i ? "Self" : n ? "Single" : r ? "Multi" : a ? "Splash" : (console.log('HUD: Target of "' + e + '"'), e)
        })
    }
    var r = function() {
        function r(t) {
            this.count = 1, this.playerCard = t, this._bc = e.data.BattleCardRepo.find(t.configId), this._bc || e.utils.logMissingCard(this)
        }
        return r.prototype._rowChildren = function() {
            var t = this,
                r = "";
            if (!this.isUnknown) {
                var n = e.Player.me,
                    a = new e.Recipe(this, !0);
                if (a) {
                    var i = e.data.calcMaxGoldNeeded(this.playerCard, this.evoLevel) * this.count,
                        o = n.gold,
                        s = o < i ? "bg-danger" : "bg-success";
                    r += "<div>" + e.getImg20("misc", "Coin") + ' Gold <span class="badge pull-right ' + s + '">' + e.utils.formatNumber(o) + " / " + e.utils.formatNumber(i) + "</span></div>", a.all.forEach(function(a) {
                        if (a.max) {
                            var i = a.item,
                                o = i.guid,
                                s = n.inventory.find(function(e) {
                                    return e.guid == o
                                }),
                                u = s && s.count || 0;
                            r += e.PlayerInventoryItem.toRowHtml(i, u, a.max * t.count)
                        }
                    });
                    var u = e.data.getMaxWildCardsNeeded(this) * this.count,
                        l = n.wildCards[this.rarityType],
                        d = !l && e.data.WildCardRepo.find(e.RarityType[this.rarityType]) || null,
                        c = l && n.wildCards[this.rarityType].count || 0;
                    r += e.PlayerWildCard.toRowHtml(l || d, c, u);
                    var p = e.data.calcMaxRunesNeeded(this.playerCard, this.evoLevel),
                        h = n.inventory.find(function(r) {
                            return r.isRune && t.matchesHero(e.data.HeroRepo.find(r.name.split("'")[0]))
                        }),
                        f = h && h.count || 0;
                    p && h && (r += e.PlayerInventoryItem.toRowHtml(h, f, p));
                    var g = e.data.calcMaxCrystalsNeeded(this.playerCard, this.evoLevel),
                        y = n.inventory.find(function(e) {
                            return e.isCrystal && t.elementType == e.elementType
                        }),
                        m = y && y.count || 0;
                    g && y && (r += e.PlayerInventoryItem.toRowHtml(y, m, g))
                }
            }
            return r
        }, r.prototype._rowHtml = function(t, r) {
            var n = t ? '<span class="badge pull-right ' + (r || "") + '">' + t + "</span>" : "",
                a = "number" == typeof t || this.isMaxed ? "" : this._rowChildren(),
                i = e.renderExpandable(this.playerCard.id, "" + this.fullHtml + n, a);
            return '<div -class="' + e.ElementType[this.elementType] + '" data-element-type="' + this.elementType + '" data-rarity-type="' + this.rarityType + '" data-klass-type="' + this.klassType + '" data-brag="' + (this.brag ? "Brag" : "") + '">' + i + "</div>"
        }, Object.defineProperty(r.prototype, "brag", {
            get: function() {
                return this._bc && this._bc.brag || !1
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "effects", {
            get: function() {
                return this._bc && this._bc.effects || []
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "elementType", {
            get: function() {
                return this._bc ? this._bc.elementType : e.ElementType.Neutral
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "inPacks", {
            get: function() {
                return this._bc && this._bc.inPacks || !1
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "klassType", {
            get: function() {
                return this._bc ? this._bc.klassType : null
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "lower", {
            get: function() {
                return this.name.toLowerCase()
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "mats", {
            get: function() {
                return this._bc && this._bc.mats || null
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "maxValues", {
            get: function() {
                return this._bc && this._bc.maxValues || []
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "minValues", {
            get: function() {
                return this._bc && this._bc.minValues || [
                    []
                ]
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "perkBase", {
            get: function() {
                return this._bc && this._bc.perkBase || 0
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "perks", {
            get: function() {
                return this._bc && this._bc.perks || []
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "name", {
            get: function() {
                return this._bc && this._bc.name || this.playerCard && this.playerCard.configId
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "rarityType", {
            get: function() {
                return this._bc ? this._bc.rarityType : null
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "targets", {
            get: function() {
                return t(this.typesTargets)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "turns", {
            get: function() {
                return this._bc && this._bc.turns || 0
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "types", {
            get: function() {
                return this.typesTargets.map(function(e) {
                    return e.split(" ")[0].replace("Damage", "Attack")
                })
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "typesTargets", {
            get: function() {
                return this._bc && this._bc.typesTargets || []
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "evo", {
            get: function() {
                return this.playerCard && this.playerCard.evolutionLevel || 0
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "guid", {
            get: function() {
                return this.playerCard && this.playerCard.configId
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "level", {
            get: function() {
                return this.playerCard && this.playerCard.level + 1 || 0
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "battleOrBragImage", {
            get: function() {
                return e.getImg20("cardtypes", this.brag ? "Brag" : "BattleCard")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "evoLevel", {
            get: function() {
                return this.evo + "." + ("0" + this.level).slice(-2)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "formattedValue", {
            get: function() {
                return this.value ? e.utils.formatNumber(this.value) : ""
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "fullHtml", {
            get: function() {
                var t = this.count > 1 ? "x" + this.count : "",
                    r = this.value ? " (" + this.typeImage + " " + this.formattedValue + ")" : "",
                    n = e.utils.evoToStars(this.rarityType, this.evoLevel),
                    a = this.name.replace(/Mischievous/, "Misch.").replace(/Protection/, "Prot.").replace(/-[\w-]+-/, "-...-");
                return this.battleOrBragImage + " " + this.evoLevel + " <small>" + n + "</small> " + a + " " + r + " " + t + '<span class="pull-right">' + Math.round(this.powerRating) * this.count + "</span>"
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "isActive", {
            get: function() {
                return (this.evo > 0 || this.level > 1) && !this.isMaxed
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "isMaxed", {
            get: function() {
                return this.evoLevel == ["1.10", "2.20", "3.35", "4.50", "5.50"][this.rarityType]
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "isUnknown", {
            get: function() {
                return !this._bc
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "maxWildCardsNeeded", {
            get: function() {
                return e.data.getMaxWildCardsNeeded(this) * this.count
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "nextWildCardsNeeded", {
            get: function() {
                return e.data.getNextWildCardsNeeded(this) * this.count
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "maxMaxSotNeeded", {
            get: function() {
                return e.data.calcMaxSotNeeded(this.playerCard, this.evoLevel) * this.count
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "nextMaxSotNeeded", {
            get: function() {
                return e.data.getMaxSotNeeded(this.rarityType, this.evo) * this.count
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "maxMaxGoldNeeded", {
            get: function() {
                return e.data.calcMaxGoldNeeded(this.playerCard, this.evoLevel) * this.count
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "nextMaxGoldNeeded", {
            get: function() {
                return e.data.getMaxGoldNeeded(this.rarityType, this.evo) * this.count
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "powerRating", {
            get: function() {
                return e.PowerRating.ratePlayerCard(this.playerCard)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "rarityEvoLevel", {
            get: function() {
                return e.RarityType[this.rarityType][0] + "." + this.evoLevel
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "rowHtml", {
            get: function() {
                return this._rowHtml()
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "scoutHtml", {
            get: function() {
                return this.rarityEvoLevel + " " + this.name + " " + (this.count > 1 ? "x" + this.count : "")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "typeImage", {
            get: function() {
                return this.types.length ? e.getImg12("cardtypes", this.types[0]) : ""
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "value", {
            get: function() {
                return this.playerCard && e.data.BattleCardRepo.calculateValue(this.playerCard) || 0
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.matches = function(e) {
            return this._bc && e._bc && this._bc.guid == e._bc.guid && this.evoLevel == e.evoLevel
        }, r.prototype.matchesElement = function(t) {
            return !t || this.elementType === e.ElementType[t]
        }, r.prototype.matchesHero = function(t) {
            return !t || this.matchesElement(e.ElementType[t.elementType]) && this.klassType === t.klassType
        }, r.prototype.matchesRarity = function(t) {
            return !t || this.rarityType === e.RarityType[t]
        }, r.prototype.toRowHtml = function(e, t) {
            return this._rowHtml(e, t < e ? "bg-danger" : "bg-success")
        }, r.parseTarget = function(e) {
            var t = e.split("Flurry")[0].trim().split(" "),
                r = t.shift(),
                n = t.join(" "),
                a = "Damage" == r,
                i = n.includes("All Allies") || n.includes("All Enemies"),
                o = n.includes("Splash"),
                s = n.includes("Self"),
                u = !i && !o && !s,
                l = e.match(/Flurry \((\d+) @ (\d+)%\)/),
                d = l && +l[1] || null,
                c = l && l[2] + "%" || null,
                p = l && +l[2] / 100 || null;
            return {
                type: r,
                typeDivisor: "Damage" == r ? AttackDivisor : "Shield" == r ? ShieldDivisor : HealDivisor,
                target: n,
                offense: a,
                all: i,
                splash: o,
                single: u,
                self: s,
                targetMultiplier: i ? a ? 3 : 2 : o ? a ? 2 : 1.5 : u ? a ? 1 : 1.25 : s ? 1 : 0,
                flurry: !!l,
                flurryCount: d,
                flurryHitPercent: c,
                flurryHitMultiplier: p
            }
        }, r
    }();
    e.PlayerBattleCard = r
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t(t, r) {
            void 0 === r && (r = 0), this.count = r, this.type = "BoosterCard", this._ = e.data.BoosterCardRepo.find(t)
        }
        return Object.defineProperty(t.prototype, "challenge", {
            get: function() {
                return this._.challenge
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "elementType", {
            get: function() {
                return this._.elementType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "guid", {
            get: function() {
                return this._.guid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return this._.name
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "rarityType", {
            get: function() {
                return this._.rarityType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "rowHtml", {
            get: function() {
                return '<div class="' + e.ElementType[this.elementType] + '" data-element-type="' + this.elementType + '" data-type="' + this.type + '" data-rarity-type="' + this.rarityType + '">' + e.getImg20("misc", "Boosters") + " " + e.RarityType[this.rarityType][0] + (this.challenge ? "*" : "") + " " + this.name + ' <span class="badge pull-right">' + e.utils.formatNumber(this.count) + "</span></div>"
            },
            enumerable: !0,
            configurable: !0
        }), t.rowHtml = function(t) {
            return '<div data-hud="true">' + e.getImg20("misc", "Boosters") + ' Boosters <span class="badge pull-right">' + e.utils.formatNumber(t) + "</span></div>"
        }, t
    }();
    e.PlayerBoosterCard = t
}(bh || (bh = {})),
function(e) {
    function t(e, t) {
        var r = e.archetype.abilityLevels ? e.archetype.abilityLevels[e.hero.abilities[t].guid] : null;
        return isNaN(r) ? 0 : r + 1
    }
    class r extends e.Cacheable {
        constructor(t, r) {
            super(), this.player = t, this.archetype = r, this.hero = e.data.HeroRepo.find(r.id)
        }
        getAbilityLevel(e) {
            var t = this.archetype.abilityLevels ? this.archetype.abilityLevels[this.hero.abilities[e].guid] : null;
            return isNaN(t) ? 0 : t + 1
        }
        get abilities() {
            return this.hero.abilities
        }
        get abilityLevels() {
            return this.archetype.abilityLevels
        }
        get active() {
            var r = this;
            return this.fromCache("active", function() {
                return new e.PlayerHeroAbility(r, r.hero.active, t(r, e.AbilityType.Active))
            })
        }
        get guid() {
            return this.hero.guid
        }
        get elementType() {
            return this.hero.elementType
        }
        get klassType() {
            return this.hero.klassType
        }
        get name() {
            return this.hero.name
        }
        get passive() {
            var r = this;
            return this.fromCache("passive", function() {
                return new e.PlayerHeroAbility(r, r.hero.passive, t(r, e.AbilityType.Passive))
            })
        }
        get trait() {
            var r = this;
            return this.fromCache("trait", function() {
                return new e.PlayerHeroAbility(r, r.hero.trait, t(r, e.AbilityType.Trait))
            })
        }
        get battleCards() {
            var t = this;
            return this.fromCache("battleCards", function() {
                return e.Hero.filterCardsByHero(t.hero, t.player.battleCards)
            })
        }
        get completionLevel() {
            return this.level + this.trait.level + this.active.level + this.passive.level
        }
        get deck() {
            var e = this;
            return this.fromCache("deck", function() {
                return e.player.sortAndReduceBattleCards(e.archetype.deck)
            })
        }
        get hitPoints() {
            return this.hero.getHitPoints(this.level)
        }
        get isCapped() {
            return this.active.isCapped && this.passive.isCapped && this.trait.isCapped
        }
        get isLocked() {
            return this.archetype.locked
        }
        get isMeat() {
            return this.level == e.HeroRepo.MaxLevel && this.isCapped
        }
        get level() {
            return this.archetype.level + 1
        }
        get playerHeroAbilities() {
            return [this.trait, this.active, this.passive]
        }
        get playerHeroGuid() {
            return this.player.guid + "-" + this.hero.guid
        }
        get powerPercent() {
            return Math.floor(100 * this.powerRating / this.hero.maxPowerRating)
        }
        get powerRating() {
            var t = this;
            return this.fromCache("powerRating", function() {
                return Math.round(e.PowerRating.ratePlayerHeroHitPoints(t) + t.trait.powerRating + t.active.powerRating + t.passive.powerRating + e.PowerRating.rateDeck(t.deck))
            })
        }
        get hasOP() {
            return e.PowerRating.hasOP(this.deck)
        }
    }
    e.PlayerHero = r
}(bh || (bh = {})),
function(e) {
    function t(e) {
        return e < 2 ? 1 : e < 10 ? 2 : e < 18 ? 3 : e < 25 ? 4 : e < 33 ? 5 : e < 41 ? 6 : e < 49 ? 7 : e < 56 ? 8 : e < 64 ? 9 : e < 72 ? 10 : e < 80 ? 11 : e < 87 ? 12 : e < 95 ? 13 : e < 103 ? 14 : 15
    }

    function r(e) {
        if (1 == e) return 1e3;
        let t = 754,
            r = 3e3;
        for (let n = 2; n < e; n++) r += t, t += 8;
        return r
    }

    function n(e) {
        return e < 2 ? 1 : e < 7 ? 3 : e < 13 ? 4 : e < 18 ? 5 : e < 23 ? 6 : e < 28 ? 7 : e < 33 ? 8 : e < 38 ? 9 : e < 43 ? 10 : e < 48 ? 11 : e < 53 ? 12 : e < 58 ? 13 : e < 63 ? 14 : e < 68 ? 15 : e < 73 ? 16 : e < 78 ? 17 : e < 83 ? 18 : 19
    }

    function a(e) {
        if (1 == e) return 5e3;
        let t = 510,
            r = 3500;
        for (let n = 2; n < e; n++) r += t, t += 20;
        return r
    }

    function i(e) {
        return e < 2 ? 2 : e < 6 ? 4 : e < 9 ? 5 : e < 12 ? 6 : e < 16 ? 7 : e < 19 ? 8 : e < 22 ? 9 : e < 26 ? 10 : e < 29 ? 11 : e < 32 ? 12 : e < 36 ? 13 : e < 39 ? 14 : e < 42 ? 15 : e < 46 ? 16 : e < 49 ? 17 : e < 52 ? 18 : e < 56 ? 19 : e < 59 ? 20 : e < 62 ? 21 : e < 66 ? 22 : 23
    }

    function o(e) {
        if (1 == e) return 7e3;
        let t = 1015,
            r = 1e4;
        for (let n = 2; n < e; n++) r += t, t += 30;
        return r
    }

    function s(r, a) {
        switch (r) {
            case e.AbilityType.Trait:
                return t(a);
            case e.AbilityType.Active:
                return n(a);
            case e.AbilityType.Passive:
                return i(a)
        }
    }

    function u(e, t, r) {
        let n = 0;
        for (let a = t + 1, i = r + 1; a < i; a++) n += s(e, a);
        return n
    }

    function l(t, n) {
        switch (t) {
            case e.AbilityType.Trait:
                return r(n);
            case e.AbilityType.Active:
                return a(n);
            case e.AbilityType.Passive:
                return o(n)
        }
    }

    function d(e, t, r) {
        let n = 0;
        for (let a = t + 1, i = r + 1; a < i; a++) n += l(e, a);
        return n
    }
    e.getMaterialCountFor = s, e.getMaterialCountForRange = u, e.getGoldCostFor = l, e.getGoldCostForRange = d;
    var c = function() {
        function t(e, t, r) {
            this.playerHero = e, this.heroAbility = t, this.level = r
        }
        return Object.defineProperty(t.prototype, "_type", {
            get: function() {
                if ("Jinx" == this.hero.name) {
                    if (this.type == e.AbilityType.Active) return e.AbilityType.Passive;
                    if (this.type == e.AbilityType.Passive) return e.AbilityType.Active
                }
                return this.type
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "hero", {
            get: function() {
                return this.heroAbility.hero
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "guid", {
            get: function() {
                return this.heroAbility.guid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return this.heroAbility.name
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "type", {
            get: function() {
                return this.heroAbility.type
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isLocked", {
            get: function() {
                return !this.level
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isCapped", {
            get: function() {
                return this.level == this.levelCap
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isMaxed", {
            get: function() {
                return this.level == this.levelMax
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "levelCap", {
            get: function() {
                return e.HeroRepo.getAbilityLevelCap(this)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "levelMax", {
            get: function() {
                return e.HeroRepo.getAbilityLevelMax(this)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "nextMaterialCount", {
            get: function() {
                return s(this._type, this.level + 1)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "maxMaterialCount", {
            get: function() {
                var t = this._type,
                    r = e.HeroRepo.getAbilityMaxLevel(this.hero, this.heroAbility.type);
                return u(t, this.level, r)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "nextGoldCost", {
            get: function() {
                return l(this._type, this.level + 1)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "maxGoldCost", {
            get: function() {
                var t = this._type,
                    r = e.HeroRepo.getAbilityMaxLevel(this.hero, this.heroAbility.type);
                return d(this._type, this.level, r)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "img", {
            get: function() {
                return e.getImg("skills", this.playerHero.name + e.AbilityType[this.type])
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "materialHtml", {
            get: function() {
                var t = this,
                    r = this.playerHero.player,
                    n = this.type == e.AbilityType.Trait ? r.inventory.find(function(e) {
                        return e.isRune && e.name.startsWith(t.hero.name)
                    }) : r.inventory.find(function(e) {
                        return e.isCrystal && e.elementType == t.playerHero.elementType
                    }),
                    a = n.count,
                    i = a < this.maxMaterialCount ? "bg-danger" : "bg-success",
                    o;
                return "<div>" + (this.type == e.AbilityType.Trait ? e.getImg("runes", this.name.replace(/\W/g, "")) : e.getImg("crystals", e.ElementType[this.hero.elementType])) + " " + n.name + ' <span class="badge pull-right ' + i + '">' + e.utils.formatNumber(a) + " / " + e.utils.formatNumber(this.maxMaterialCount || 0) + "</span></div>"
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "goldHtml", {
            get: function() {
                var t = this.playerHero.player.gold || 0,
                    r = t < this.maxGoldCost ? "bg-danger" : "bg-success";
                return "<div>" + e.getImg("misc", "Coin") + ' Gold <span class="badge pull-right ' + r + '">' + e.utils.formatNumber(t) + " / " + e.utils.formatNumber(this.maxGoldCost || 0) + "</span></div>"
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "powerRating", {
            get: function() {
                return e.PowerRating.ratePlayerHeroAbility(this)
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.toRowHtml = function(t, r) {
            var n, a = "number" == typeof t ? '<span class="badge pull-right ' + (t && r ? r < t ? "bg-danger" : "bg-success" : "") + '">' + e.utils.formatNumber(t) + "</span>" : "";
            return "<div>" + this.img + " " + this.playerHero.name + " " + e.AbilityType[this.type] + " " + a + "</div>"
        }, t
    }();
    e.PlayerHeroAbility = c
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t(e, t, r) {
            void 0 === r && (r = 0), this.player = e, this.item = t, this.count = r
        }
        return Object.defineProperty(t.prototype, "elementType", {
            get: function() {
                return this.item.elementType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "guid", {
            get: function() {
                return this.item.guid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "itemType", {
            get: function() {
                return this.item.itemType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return this.item.name
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "rarityType", {
            get: function() {
                return this.item.rarityType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isCrystal", {
            get: function() {
                return t.isCrystal(this)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isEvoJar", {
            get: function() {
                return t.isEvoJar(this)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isSandsOfTime", {
            get: function() {
                return t.isSandsOfTime(this)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "isRune", {
            get: function() {
                return t.isRune(this)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "needed", {
            get: function() {
                var t = this,
                    r = 0;
                if (this.isRune) {
                    var n = this.name.split("'")[0];
                    this.player.filterHeroes(n).forEach(function(e) {
                        return r += e.trait.maxMaterialCount || 0
                    }), this.player.filterActiveBattleCards(n, "Legendary").forEach(function(e) {
                        return r += 60 * e.count
                    })
                } else if (this.isCrystal) this.player.filterHeroes(e.ElementType[this.elementType]).forEach(function(e) {
                    return r += (e.active.maxMaterialCount || 0) + (e.passive.maxMaterialCount || 0)
                }), this.player.filterActiveBattleCards(e.ElementType[this.elementType], "Legendary").forEach(function(e) {
                    return r += 60 * e.count
                });
                else if (this.isSandsOfTime) this.player.activeBattleCards.forEach(function(e) {
                    return r += e.maxMaxSotNeeded
                });
                else {
                    var a, i;
                    this.player.activeRecipes.filter(function(e) {
                        return !!e.getItem(t)
                    }).forEach(function(e) {
                        return r += e.getMaxNeeded(t)
                    })
                }
                return r
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "rowHtml", {
            get: function() {
                var t = this,
                    n = e.ItemType[this.itemType].toLowerCase() + "s",
                    a = this.isEvoJar ? this.name.replace(/\W/g, "") : this.isCrystal ? this.name.split(/ /)[0] : e.data.HeroRepo.find(this.name.split("'")[0]).abilities[0].name.replace(/\W/g, ""),
                    i = e.getImg20(n, a),
                    o = this.needed,
                    s = o ? " / " + e.utils.formatNumber(o) : "",
                    u, l = '<span class="badge pull-right ' + (o ? this.count < o ? "bg-danger" : "bg-success" : "") + '">' + e.utils.formatNumber(this.count) + s + "</span>",
                    d = "";
                if (o)
                    if (this.isCrystal) this.player.filterHeroes(e.ElementType[this.elementType]).forEach(function(e) {
                        var r = e.active,
                            n = e.passive,
                            a = r.maxMaterialCount,
                            i = n.maxMaterialCount;
                        a && (d += r.toRowHtml(a, t.count)), i && (d += n.toRowHtml(i, t.count))
                    }), this.player.filterActiveBattleCards(e.ElementType[this.elementType], "Legendary").forEach(function(r) {
                        var n = r.count * e.data.calcMaxCrystalsNeeded(r.playerCard, r.evoLevel);
                        d += r.toRowHtml(n, t.count)
                    });
                    else if (this.isRune) {
                    var c = this.name.split("'")[0];
                    this.player.filterHeroes(c).forEach(function(e) {
                        var r = e.trait,
                            n = r.maxMaterialCount;
                        n && (d += r.toRowHtml(n, t.count))
                    }), this.player.filterActiveBattleCards(c, "Legendary").forEach(function(r) {
                        var n = r.count * e.data.calcMaxRunesNeeded(r.playerCard, r.evoLevel);
                        d += r.toRowHtml(n, t.count)
                    })
                } else if (this.isSandsOfTime) this.player.activeBattleCards.forEach(function(e) {
                    var r = e.maxMaxSotNeeded;
                    d += e.toRowHtml(e.maxMaxSotNeeded, t.count)
                });
                else {
                    var p, h;
                    this.player.activeRecipes.filter(function(e) {
                        var r = e.getItem(t);
                        return r && 0 != r.max
                    }).forEach(function(e) {
                        var r = e.getMaxNeeded(t);
                        d += e.card.toRowHtml(r, t.count)
                    })
                }
                return '<div data-element-type="' + this.elementType + '" data-rarity-type="' + this.rarityType + '" data-item-type="' + this.itemType + '" data-hud="' + this.isSandsOfTime + '">' + r(this.guid, i + " " + this.name + " " + l, d) + "</div>"
            },
            enumerable: !0,
            configurable: !0
        }), t.isCrystal = function(t) {
            return t && t.itemType === e.ItemType.Crystal
        }, t.isEvoJar = function(t) {
            return t && t.itemType === e.ItemType.EvoJar
        }, t.isSandsOfTime = function(e) {
            return e && "Sands of Time" === e.name
        }, t.isRune = function(t) {
            return t && t.itemType === e.ItemType.Rune
        }, t.toRowHtml = function(r, n, a) {
            var i = e.ItemType[r.itemType].toLowerCase() + "s",
                o = t.isEvoJar(r) ? r.name.replace(/\W/g, "") : t.isCrystal(r) ? r.name.split(/ /)[0] : e.data.HeroRepo.find(r.name.split("'")[0]).abilities[0].name.replace(/\W/g, ""),
                s = e.getImg20(i, o),
                u, l = '<span class="badge pull-right ' + (n < a ? "bg-danger" : "bg-success") + '">' + e.utils.formatNumber(n) + " / " + e.utils.formatNumber(a) + "</span>";
            return "<div>" + s + " " + r.name + " " + l + "</div>"
        }, t
    }();

    function r(e, t, r) {
        return r ? "<div>" + t + " " + ('<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-button" type="button" data-action="toggle-child" data-guid="' + e + '">[+]</button>') + "</div>" + ('<div class="brain-hud-child-scroller" data-parent-guid="' + e + '">' + r + "</div>") : "<div>" + t + "</div>";
        var n, a
    }
    e.PlayerInventoryItem = t, e.renderExpandable = r
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t(t, r) {
            this.player = t, this.type = "WildCard", this._ = e.data.WildCardRepo.find(r)
        }
        return Object.defineProperty(t.prototype, "count", {
            get: function() {
                return this.player._pp && this.player._pp.wildcards[this.guid] || 0
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "guid", {
            get: function() {
                return this._.guid
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "html", {
            get: function() {
                var t = this.needed,
                    r = t ? " / " + e.utils.formatNumber(t) : "",
                    n, a = '<span class="badge pull-right ' + (t ? this.count < t ? "bg-danger" : "bg-success" : "") + '">' + this.count + r + "</span>";
                return e.getImg("cardtypes", "WildCard") + " " + this.name + " WC " + a
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "name", {
            get: function() {
                return this._.name
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "needed", {
            get: function() {
                var t = 0;
                return this.player.filterActiveBattleCards(e.RarityType[this.rarityType]).forEach(function(e) {
                    return t += e.maxWildCardsNeeded
                }), t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "rarityType", {
            get: function() {
                return e.RarityType[this._.name.replace(/ /g, "")]
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "rowHtml", {
            get: function() {
                var t = this,
                    r = this.html,
                    n = "",
                    a = "";
                return this.needed && (n = '<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-button" type="button" data-action="toggle-child" data-guid="' + this.guid + '">[+]</button>', a = '<div class="brain-hud-child-scroller" data-parent-guid="' + this.guid + '">', this.player.filterActiveBattleCards(e.RarityType[this.rarityType]).forEach(function(e) {
                    return a += e.toRowHtml(e.maxWildCardsNeeded, t.count)
                }), a += "</div>"), '<div data-type="' + this.type + '" data-rarity-type="' + this.rarityType + '"><div>' + r + " " + n + "</div>" + a + "</div>"
            },
            enumerable: !0,
            configurable: !0
        }), t.toRowHtml = function(t, r, n) {
            var a = e.getImg20("cardtypes", "WildCard"),
                i, o = '<span class="badge pull-right ' + (r < n ? "bg-danger" : "bg-success") + '">' + e.utils.formatNumber(r) + " / " + e.utils.formatNumber(n) + "</span>";
            return "<div>" + a + " " + t.name + " WC " + o + "</div>"
        }, t
    }();
    e.PlayerWildCard = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Cacheable {
        constructor(t, r) {
            super(), void 0 === r && (r = !1), this.card = t, this.evos = [];
            var n = this,
                a = (t && t.mats || []).map(function(t) {
                    return e.data.ItemRepo.find(t.trim())
                }).filter(function(e) {
                    return !!e
                }).sort(e.utils.sort.byRarity);
            [0, 1, 2, 3, 4].slice(0, t.rarityType + 1).slice(r ? t.evo : 0).forEach(function(r) {
                var i = e.data.ItemRepo.SandsOfTime;
                n.addItem(r, e.data.getMinSotNeeded(t.rarityType, r), e.data.getMaxSotNeeded(t.rarityType, r), i.name), a.forEach(function(a) {
                    n.addItem(r, 0, e.data.getMaxMatNeeded(t.rarityType, r, a.rarityType), a.name)
                })
            })
        }
        get lower() {
            return this.card.lower
        }
        get name() {
            return this.card.name
        }
        get rarityType() {
            return this.card.rarityType
        }
        get common() {
            var t = this;
            return this.fromCache("common", function() {
                var r = t.all.find(function(t) {
                    return t.item.rarityType == e.RarityType.Common
                });
                return r && r.item
            })
        }
        get uncommon() {
            var t = this;
            return this.fromCache("uncommon", function() {
                var r = t.all.find(function(t) {
                    return t.item.rarityType == e.RarityType.Uncommon && "Sands of Time" != t.item.name
                });
                return r && r.item
            })
        }
        get rare() {
            var t = this;
            return this.fromCache("rare", function() {
                var r = t.all.find(function(t) {
                    return t.item.rarityType == e.RarityType.Rare
                });
                return r && r.item
            })
        }
        get superRare() {
            var t = this;
            return this.fromCache("superRare", function() {
                var r = t.all.find(function(t) {
                    return t.item.rarityType == e.RarityType.SuperRare
                });
                return r && r.item
            })
        }
        get inventoryItems() {
            return [this.common, this.uncommon, this.rare, this.superRare]
        }
        get all() {
            var e = this;
            return this.fromCache("recipeItems", function() {
                var t = [];
                return e.evos.forEach(function(e) {
                    e.items.forEach(function(e) {
                        var r = t.find(function(t) {
                            return t.item == e.item
                        });
                        r || t.push(r = {
                            item: e.item,
                            min: 0,
                            max: 0
                        }), r.min += e.min, r.max += e.max
                    })
                }), t
            })
        }
        addItem(t, r, n, a) {
            var i = this.evos[t] || (this.evos[t] = {
                    evoFrom: t,
                    evoTo: t + 1,
                    items: []
                }),
                o = {
                    item: e.data.ItemRepo.find(a),
                    min: r,
                    max: n
                };
            i.items.push(o)
        }
        getItem(e) {
            return this.all.find(function(t) {
                return t.item.name == e.name
            })
        }
        getMaxNeeded(t) {
            var r = this.getItem(t),
                n, a;
            return (r && r.max) * (this.card instanceof e.PlayerBattleCard ? this.card.count : 1)
        }
    }
    e.Recipe = t
}(bh || (bh = {})),
function(e) {
    var t = {
            Common: 1,
            Uncommon: 2,
            Rare: 3,
            SuperRare: 4,
            Legendary: 5
        },
        r = {
            Common: 10,
            Uncommon: 20,
            Rare: 35,
            SuperRare: 50,
            Legendary: 50
        },
        n;
    ! function(e) {
        e[e.Min = 0] = "Min", e[e.Max = 1] = "Max"
    }(n = e.MinMaxType || (e.MinMaxType = {}));
    var a = function() {
        function a() {}
        return a.rateMaxedHero = function(t, r) {
            var n, i;
            return void 0 === r && (r = e.RarityType.Legendary), ("Jinx" == t.name ? 45 : 55) * (20 * (r + 1) / 100) + a.rateMaxedDeck(t, r)
        }, a.rateMaxedDeck = function(t, r) {
            void 0 === r && (r = e.RarityType.Legendary);
            var i, o, s = e.Hero.filterCardsByHero(t, e.data.BattleCardRepo.all).filter(function(e) {
                    return e.rarityType <= r && e.rarityType >= r - 1
                }).map(function(e) {
                    return {
                        card: e,
                        powerRating: a.rateBattleCard(e, n.Max)
                    }
                }).sort(function(e, t) {
                    return e.powerRating == t.powerRating ? 0 : e.powerRating < t.powerRating ? 1 : -1
                }),
                u = [];
            return s.forEach(function(t) {
                var r = u.find(function(e) {
                    return e.card.name == t.card.name
                });
                r ? r.card.rarityType == e.RarityType.SuperRare && t.card.rarityType == e.RarityType.Legendary && (u = u.filter(function(e) {
                    return e != r
                })).push(t) : u.length < 4 && u.push(t)
            }), u.reduce(function(e, t) {
                return e + 2 * t.powerRating
            }, 0)
        }, a.hasOP = function(e) {
            return e.some(o)
        }, a.rateDeck = function(e) {
            return e.reduce(function(e, t) {
                return e + a.ratePlayerCard(t.playerCard) * t.count
            }, 0)
        }, a.rateBattleCard = function(i, o) {
            if (i.maxPowerRating) return i.maxPowerRating;
            var s = e.RarityType[i.rarityType],
                u = o == n.Max ? t[s] : 0,
                l = o == n.Max ? r[s] : 0;
            return i.maxPowerRating = a.ratePlayerCard({
                configId: i.guid,
                evolutionLevel: u,
                level: l - 1
            }), i.maxPowerRating
        }, a.rateAndSort = function(e, t) {
            void 0 === t && (t = n.Max);
            var r = e.map(function(e) {
                return {
                    card: e,
                    powerRating: a.rateBattleCard(e, t)
                }
            });
            return r.sort(function(e, t) {
                return t.powerRating - e.powerRating
            }), r
        }, a.ratePlayerCard = function(e) {
            return i(e)
        }, a.ratePlayerHeroAbility = function(t) {
            return "Jinx" == t.hero.name && t.heroAbility.type == e.AbilityType.Passive ? 0 : (t.type == e.AbilityType.Trait ? 2 : t.type == e.AbilityType.Active ? 1.5 : 1) * Math.round(1e3 * t.level / t.levelMax) / 100;
            var r
        }, a.ratePlayerHeroHitPoints = function(t) {
            var r = e.HeroRepo.MaxLevel,
                n = e.data.HeroRepo.all.map(function(t) {
                    return [e.Hero.getHitPoints(t, r), t]
                }).sort().pop()[0],
                a = e.Hero.getHitPoints(t.hero, r) / n,
                i = t.level / r;
            return Math.round(1e3 * a * i) / 100
        }, a
    }();

    function i(t) {
        var r = e.data.BattleCardRepo.find(t.configId);
        if (!r) return 0;
        var n = t.evolutionLevel,
            a = t.level,
            i = r.typesTargets.map(function(t) {
                return e.PlayerBattleCard.parseTarget(t)
            }),
            o = e.GameEffect.parseAll(t),
            u = 0;
        return i.forEach(function(e, t) {
            return u += s(r, t, n, a) / e.typeDivisor
        }), o.forEach(function(e) {
            return u += e.powerRating
        }), u /= r.turns, Math.round(100 * u)
    }

    function o(t) {
        var r = e.data.BattleCardRepo.find(t.guid);
        return r && "Z" == r.tier
    }

    function s(t, r, n, a) {
        var i = e.data.BattleCardRepo.calculateValue({
                configId: t.guid,
                evolutionLevel: n,
                level: a
            }),
            o = e.BattleCardRepo.getPerk(t, n) / 100,
            s = (e.GameEffect.parse(t.effects.find(function(e) {
                return "Regen" == e
            })) || {
                turns: 1
            }).turns,
            u = t.perks.includes("Critical") ? 1.5 * o : 1,
            l = e.PlayerBattleCard.parseTarget(t.typesTargets[r]),
            d = Math.round(i * u * l.targetMultiplier * s);
        return l.flurry && (d = d / l.flurryCount * l.flurryHitMultiplier * l.flurryCount), d || console.log("HUD: " + t.name, [t, r, n, a, i, o, u, l, d]), d
    }
    e.PowerRating = a
}(bh || (bh = {})),
function(e) {
    class t {
        constructor(t, r, n) {
            void 0 === t && (t = ""), void 0 === r && (r = 0), void 0 === n && (n = !1), this.id = t, this.gid = r, this.cacheable = n, e.AllRepos.push(this)
        }
        init() {
            var r = this;
            return this._init || (this._init = new Promise(function(n) {
                var a = (e.TSV || {})[String(r.gid || r.id)];
                if (!a && r.cacheable) try {
                    var i = JSON.parse(e.utils.getFromStorage(r.id + "-" + r.gid) || null);
                    i && i.date && (new Date).getTime() < i.date + 864e5 && (a = i.tsv || null)
                } catch (e) {}
                a ? r.resolveTsv(a, n) : "number" == typeof r.gid ? t.fetchTsv(r.id, r.gid).then(function(e) {
                    return r.resolveTsv(e, n)
                }, function() {
                    return r.unresolveTsv()
                }) : n(r.data = [])
            })), this._init
        }
        resolveTsv(t, r) {
            var n = this;
            if (this.cacheable) try {
                e.utils.setToStorage(this.id + "-" + this.gid, JSON.stringify({
                    tsv: t,
                    date: (new Date).getTime()
                }))
            } catch (e) {}
            var a = this.parseTsv(t);
            a instanceof Promise ? a.then(function(e) {
                return r(e)
            }, function() {
                return n.unresolveTsv()
            }) : r(a)
        }
        unresolveTsv() {
            this.data = []
        }
        parseTsv(e) {
            return this.data = t.mapTsv(e)
        }
        find(e) {
            var t = e.toLowerCase();
            return this.data.find(function(r) {
                return r.guid == e || r.name == e || r.lower == t
            })
        }
        put(e) {
            var t = this.data.findIndex(function(t) {
                return t.guid == e.guid
            }); - 1 < t ? this.data[t] = e : this.data.push(e)
        }
        get all() {
            return this.data.slice()
        }
        get allSortedByName() {
            return this.sortedByName || (this.sortedByName = this.all.sort(e.utils.sort.byName)), this.sortedByName
        }
        get length() {
            return this.data.length
        }
        static fetchTsv(t, r) {
            return (e.TSV || {})[String(r)] ? Promise.resolve(e.TSV[String(r)]) : (0 == r && (t = DataSheetID, r = WildCardRepoGID), XmlHttpRequest.get(e.host + t + "/pub?gid=" + r + "&single=true&output=tsv"))
        }
        static mapTsv(t) {
            var r = t.split(/\n/),
                n = r.shift().split(/\t/).map(function(e) {
                    return e.trim()
                });
            return r.filter(function(e) {
                return !!e.trim().length
            }).map(function(t) {
                var r = t.split(/\t/).map(function(e) {
                        return e.trim()
                    }),
                    a = {};
                return n.forEach(function(t, n) {
                    var i = r[n];
                    switch (t) {
                        case "elementTypes":
                        case "crystalElementTypes":
                        case "boosterElementTypes":
                            a[t] = i.split(",").filter(function(e) {
                                return !!e
                            }).map(function(t) {
                                return e.ElementRepo.findType(t)
                            });
                            break;
                        case "element":
                        case "elementType":
                            a.elementType = e.ElementRepo.findType(i);
                            break;
                        case "rarity":
                        case "rarityType":
                            a.rarityType = e.RarityRepo.findType(i);
                            break;
                        case "klass":
                        case "klassType":
                            a.klassType = e.KlassRepo.findType(i);
                            break;
                        case "itemType":
                            a.itemType = e.ItemRepo.findType(i);
                            break;
                        case "abilityType":
                            a.abilityType = e.AbilityRepo.findType(i);
                            break;
                        case "brag":
                        case "packs":
                            a[t] = e.utils.parseBoolean(i);
                            break;
                        case "randomMats":
                            a[t] = i.split(",").map(function(e) {
                                return +e
                            });
                            break;
                        case "boosterRarities":
                        case "minValues":
                            a[t] = i.split("|").map(function(e) {
                                return e.split(",").map(function(e) {
                                    return +e
                                })
                            });
                            break;
                        case "maxValues":
                            a[t] = i.split("|").map(function(e) {
                                return +e
                            });
                            break;
                        case "typesTargets":
                            a[t] = i.split("|").filter(function(e) {
                                return !!e
                            });
                            break;
                        case "runeHeroes":
                        case "effects":
                        case "mats":
                        case "perks":
                            a[t] = i.split(",").filter(function(e) {
                                return !!e
                            });
                            break;
                        case "keys":
                        case "fame":
                        case "gold":
                        case "perkBase":
                        case "turns":
                            a[t] = +i;
                            break;
                        case "name":
                            a.lower = i.toLowerCase(), a[t] = (i || "").trim();
                            break;
                        default:
                            a[t] = (i || "").trim()
                    }
                }), a
            })
        }
        static initAll() {
            let t;
            return e.AllRepos.map(function(e) {
                return e.init()
            })
        }
    }
    e.Repo = t, e.AllRepos = []
}(bh || (bh = {}));
var _allHastes = [],
    bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh, bh;
! function(e) {
    class t extends e.Repo {
        calculateValue(e, r) {
            void 0 === r && (r = 0);
            var n = this.find(e.configId);
            if (!n) return 0;
            var a = n.minValues[r][e.evolutionLevel],
                i = n.minValues[r].slice().pop(),
                o, s = (n.maxValues[r] - i) / (t.getLevelsForRarity(n.rarityType) - 1);
            return Math.floor(a + s * e.level)
        }
        static isCycleCard(r, n) {
            return void 0 === n && (n = r.rarityType + 1), r.effects.concat(r.perks).filter(function(e) {
                return e.toLowerCase().includes("haste") || e.toLowerCase().includes("speed")
            }).forEach(function(t) {
                return _allHastes.push(r.name + " (" + e.RarityType[r.rarityType][0] + "): " + t)
            }), 1 == r.turns && (!!r.effects.find(function(e) {
                return "Haste 1T" == e
            }) || !(!r.perks.find(function(e) {
                return "Haste 1T" == e
            }) || 100 != t.getPerk(r, n)));
            var a
        }
        static getPerk(e, t) {
            const r = 10;
            return Math.min(100, e.perkBase + 10 * t)
        }
        static getMaxPerk(e) {
            return t.getPerk(e, 1 + e.rarityType)
        }
        static getLevelsForRarity(e) {
            return [10, 20, 35, 50, 50][e]
        }
        static isMaxLevel(r, n) {
            return n == t.getLevelsForRarity(e.RarityRepo.findType(r))
        }
        static getXpDeltaFromLevel(e) {
            return e ? 36 * (e - 1) + 100 : 0
        }
        static getXpForLevel(e) {
            for (var r = 0, n = 1; n < e; n++) r += t.getXpDeltaFromLevel(n);
            return r
        }
        static getXpValue(t) {
            switch (t.rarityType) {
                case e.RarityType.Common:
                    return 400;
                case e.RarityType.Uncommon:
                    return 700;
                case e.RarityType.Rare:
                    return 1200;
                case e.RarityType.SuperRare:
                case e.RarityType.Legendary:
                default:
                    return 0
            }
        }
    }
    e.BattleCardRepo = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Repo {
        getXpValue(t, r) {
            void 0 === r && (r = !1);
            var n = r ? 1.5 : 1;
            switch (t.rarityType) {
                case e.RarityType.Common:
                    return 120 * n;
                case e.RarityType.Uncommon:
                    return 220 * n;
                case e.RarityType.Rare:
                    return 350 * n;
                case e.RarityType.SuperRare:
                    return 700 * n;
                default:
                    return 0
            }
        }
    }
    e.BoosterCardRepo = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Repo {
        parseTsv(t) {
            var r = e.Repo.mapTsv(t);
            return r.forEach(function(e) {
                e.guid = e.lower.replace(/\W/g, "-"), Array.isArray(e.crystals) || (e.crystals = String(e.crystals).split(",").filter(function(e) {
                    return !!e
                })), Array.isArray(e.mats) || (e.mats = String(e.mats).split(",").filter(function(e) {
                    return !!e
                })), Array.isArray(e.runes) || (e.runes = String(e.runes).split(",").filter(function(e) {
                    return !!e
                }))
            }), this.data = r.map(function(t) {
                return new e.Dungeon(t)
            })
        }
        findDungeonFor(e) {
            return this.all.filter(function(t) {
                return !!t.findDrop(e)
            })
        }
        getDropRates(e) {
            return this.all.map(function(t) {
                return t.findDrop(e)
            }).filter(function(e) {
                return !!e
            }).sort(r).reverse()
        }
    }

    function r(e, t) {
        var r = e.dropRate.averagePerKey,
            n = t.dropRate.averagePerKey;
        if (r != n) return r < n ? -1 : 1;
        var a = e.dungeon.keys,
            i = t.dungeon.keys;
        if (a != i) return a < i ? 1 : -1;
        var o = "Normal" == e.dungeon.difficulty ? 0 : "Elite" == e.dungeon.difficulty ? 1 : 2,
            s = "Normal" == t.dungeon.difficulty ? 0 : "Elite" == t.dungeon.difficulty ? 1 : 2;
        return o != s ? o < s ? 1 : -1 : 0
    }
    e.DungeonRepo = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Repo {
        parseTsv(t) {
            return this.data = e.Repo.mapTsv(t), this.data.forEach(function(e) {
                return e.guid = e.lower.replace(/\W/g, "-")
            }), this.data
        }
        find(e) {
            var t = e.toLowerCase();
            return this.data.find(function(e) {
                return e.lower == t || (e.alt || "").toLowerCase() == t
            })
        }
        mapEffects(e) {
            var t = [];
            return e.effects.forEach(function(e) {
                r(e).forEach(function(e) {
                    t.includes(e) || t.push(e)
                })
            }), t
        }
        mapPerks(e) {
            var t = [];
            return e.perks.forEach(function(e) {
                r(e).forEach(function(e) {
                    t.includes(e) || t.push(e)
                })
            }), t
        }
        mapTargets(e) {
            var t = [];
            return e.typesTargets.forEach(function(e) {
                r(e).forEach(function(e) {
                    t.includes(e) || t.push(e)
                })
            }), t
        }
        toImage(t, r) {
            return void 0 === r && (r = e.getImg20), ["Self", "Single"].includes(t.name) ? "" : r("effects", t.name.replace(/\W/g, ""))
        }
        toImageSrc(t) {
            return ["Self", "Single"].includes(t.name) ? "" : e.getSrc("effects", t.name.replace(/\W/g, ""))
        }
    }

    function r(t) {
        var r = e.GameEffect.parse(t),
            n = r && e.data.EffectRepo.find(r.effect) || null,
            a = n ? [n] : [];
        return r && (r.raw.includes("All Allies") && a.push(e.data.EffectRepo.find("Multi-Target (Ally)")), r.raw.includes("All Enemies") && a.push(e.data.EffectRepo.find("Multi-Target (Enemy)")), r.raw.includes("Flurry") && a.push(e.data.EffectRepo.find("Flurry"))), a
    }
    e.EffectRepo = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Repo {
        parseTsv(t) {
            var r = this;
            return new Promise(function(n) {
                for (var a = e.Repo.mapTsv(t), i = []; a.length;) i.push(new e.Hero([a.shift(), a.shift(), a.shift()]));
                n(r.data = i)
            })
        }
        filterByElement(t) {
            return this.data.filter(function(r) {
                return r.elementType === t || e.ElementType[r.elementType] === t
            })
        }
        sortBy(e) {
            return e ? this.data.slice().sort(e) : this.sorted
        }
        get sorted() {
            return this._sorted || (this._sorted = this.data.slice().sort(e.utils.sort.byElementThenKlass)), this._sorted
        }
        static toImageSrc(t) {
            return e.getSrc("heroes", t.name)
        }
        static getMaxLevel(e) {
            return 2 * e
        }
        static getMaxTrait(e) {
            return Math.max(e - 1, 0)
        }
        static getMaxActive(e, t) {
            return "Jinx" == e.name ? Math.max(t - 29, 0) : Math.max(t - 14, 0)
        }
        static getMaxPassive(e, t) {
            return "Jinx" == e.name ? Math.max(t - 14, 0) : Math.max(t - 29, 0)
        }
        static getAbilityLevelCap(r) {
            switch (r.type) {
                case e.AbilityType.Active:
                    return t.getMaxActive(r.hero, r.playerHero.level);
                case e.AbilityType.Passive:
                    return t.getMaxPassive(r.hero, r.playerHero.level);
                case e.AbilityType.Trait:
                    return t.getMaxTrait(r.playerHero.level)
            }
        }
        static getAbilityLevelMax(r) {
            switch (r.type) {
                case e.AbilityType.Active:
                    return t.getMaxActive(r.hero, t.MaxLevel);
                case e.AbilityType.Passive:
                    return t.getMaxPassive(r.hero, t.MaxLevel);
                case e.AbilityType.Trait:
                    return t.getMaxTrait(t.MaxLevel)
            }
        }
        static get MaxHeroCount() {
            return MaxHeroCount
        }
        static get MaxFame() {
            return MaxFameLevel
        }
        static get MaxLevel() {
            return t.getMaxLevel(t.MaxFame)
        }
        static get MaxCompletionLevel() {
            var e = t.MaxLevel,
                r = {};
            return e + t.getMaxTrait(e) + t.getMaxActive(r, e) + t.getMaxPassive(r, e)
        }
        static getAbilityMaxLevel(r, n) {
            switch (n) {
                case e.AbilityType.Active:
                    return t.getMaxActive(r, t.MaxLevel);
                case e.AbilityType.Passive:
                    return t.getMaxPassive(r, t.MaxLevel);
                case e.AbilityType.Trait:
                    return t.getMaxTrait(t.MaxLevel)
            }
        }
        static getLockedArchetype(e, t) {
            return {
                playerId: e,
                id: t,
                experience: 0,
                level: 0,
                version: 0,
                abilityLevels: {},
                deck: [],
                locked: !0
            }
        }
    }
    e.HeroRepo = t
}(bh || (bh = {})),
function(e) {
    class t extends e.Repo {
        evoJars() {
            return this.data.filter(function(t) {
                return t.itemType === e.ItemType.EvoJar
            })
        }
        crystals() {
            return this.data.filter(function(t) {
                return t.itemType === e.ItemType.Crystal
            })
        }
        runes() {
            return this.data.filter(function(t) {
                return t.itemType === e.ItemType.Rune
            })
        }
        get SandsOfTime() {
            return this.find("Sands of Time")
        }
        static getValue(t, r) {
            return t == e.ItemType.Crystal ? 1e3 : t == e.ItemType.Rune ? 2e3 : [300, 800, 1500, 3e3][r]
        }
        static allTypes() {
            return [0, 1, 2]
        }
        static findType(t) {
            let r;
            return this.allTypes().find(function(r) {
                return t[0] == e.ItemType[r][0]
            })
        }
        static toImage(t, r) {
            var n, a;
            return void 0 === r && (r = e.getImg20), r(e.ItemType[t.itemType].toLowerCase() + "s", t.itemType == e.ItemType.EvoJar ? t.name.replace(/\W/g, "") : t.itemType == e.ItemType.Crystal ? t.name.split(/ /)[0] : e.data.HeroRepo.find(t.name.split("'")[0]).abilities[0].name.replace(/\W/g, ""))
        }
        static toImageSrc(t) {
            var r = e.ItemType[t.itemType].toLowerCase() + "s",
                n = t.itemType == e.ItemType.EvoJar ? t.name.replace(/\W/g, "") : t.itemType == e.ItemType.Crystal ? t.name.split(/ /)[0] : e.data.HeroRepo.find(t.name.split("'")[0]).abilities[0].name.replace(/\W/g, "");
            return e.getSrc(r, n)
        }
    }
    e.ItemRepo = t
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t() {}
        return Object.defineProperty(t, "allTypes", {
            get: function() {
                return [0, 1, 2]
            },
            enumerable: !0,
            configurable: !0
        }), t.isAbility = function(t) {
            return String(t).replace(/ /g, "") in e.AbilityType
        }, t.findType = function(t) {
            return this.allTypes.find(function(r) {
                return t[0] == e.AbilityType[r][0]
            })
        }, t
    }();
    e.AbilityRepo = t
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t() {}
        return Object.defineProperty(t, "allTypes", {
            get: function() {
                return [0, 1, 2, 3, 4, 5]
            },
            enumerable: !0,
            configurable: !0
        }), t.toImage = function(t, r) {
            return void 0 === r && (r = e.getImg20), t == e.ElementType.Neutral ? "" : r("elements", e.ElementType[t])
        }, t.toImageSrc = function(t) {
            return e.getSrc("elements", e.ElementType[t])
        }, t.isElement = function(t) {
            return String(t) in e.ElementType
        }, t.findType = function(t) {
            var r = this.allTypes.find(function(r) {
                return t[0] == e.ElementType[r][0]
            });
            return null === r && console.log("HUD: Cannot find " + t), r
        }, t
    }();
    e.ElementRepo = t
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t() {}
        return Object.defineProperty(t, "allTypes", {
            get: function() {
                return [0, 1, 2]
            },
            enumerable: !0,
            configurable: !0
        }), t.toImage = function(t, r) {
            return void 0 === r && (r = e.getImg20), r("classes", e.KlassType[t])
        }, t.toImageSrc = function(t) {
            return e.getSrc("classes", e.KlassType[t])
        }, t.findType = function(t) {
            return this.allTypes.find(function(r) {
                return t.slice(0, 2) == e.KlassType[r].slice(0, 2)
            })
        }, t
    }();
    e.KlassRepo = t
}(bh || (bh = {})),
function(e) {
    var t = function() {
        function t() {}
        return Object.defineProperty(t, "allTypes", {
            get: function() {
                return [0, 1, 2, 3, 4]
            },
            enumerable: !0,
            configurable: !0
        }), t.isRarity = function(t) {
            return String(t).replace(/ /g, "") in e.RarityType
        }, t.findType = function(t) {
            return this.allTypes.find(function(r) {
                return t[0] == e.RarityType[r][0]
            })
        }, t
    }();
    e.RarityRepo = t
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        const r = !0,
            n = !1;

        function a(e) {
            var t = [];
            return Array.isArray(e) && e.length > 0 && e.forEach(function(e) {
                var r, n, a = e[(Object.keys(e) || [])[0] || "0"],
                    o, s, u = a[(Object.keys(a) || [])[0] || ""] || null;
                i(u) && t.push(u)
            }), t
        }

        function i(e) {
            return e && e.id && e.firstPlayedVersion && !0
        }

        function o(e) {
            return a(e).length && !0
        }
        var s;

        function u() {
            return s || (s = Promise.all([t.guilds.init()].concat(e.Repo.initAll()))), s
        }
        t.BattleCardRepo = new e.BattleCardRepo(DataSheetID, BattleCardRepoGID, !1), t.BoosterCardRepo = new e.BoosterCardRepo(DataSheetID, BoosterCardRepoGID, !0), t.DungeonRepo = new e.DungeonRepo(DataSheetID, DungeonRepoGID, !1), t.EffectRepo = new e.EffectRepo(DataSheetID, EffectRepoGID, !1), t.HeroRepo = new e.HeroRepo(DataSheetID, HeroRepoGID, !0), t.ItemRepo = new e.ItemRepo(DataSheetID, ItemRepoGID, !0), t.WildCardRepo = new e.Repo(DataSheetID, WildCardRepoGID, !0), t.PlayerRepo = new e.Repo, t.arenaToPlayers = a, t.isPlayer = i, t.isArena = o, t.init = u
    }(t = e.data || (e.data = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        function r(e) {
            return e + 1
        }

        function n(e) {
            return [.8, .85, .88, .9, 1][e]
        }

        function a(e, t) {
            return [
                [1],
                [1, 2],
                [1, 2, 4],
                [1, 2, 4, 5],
                [1, 2, 3, 4, 5]
            ][e || 0][t || 0]
        }

        function i(e) {
            return a(e.rarityType, e.evo)
        }

        function o(e) {
            for (var t = r(e.rarityType), n = 0, i = e.evo; i < t; i++) n += a(e.rarityType, i);
            return n
        }

        function s(e, t) {
            return [
                [1e3],
                [3700, 11300],
                [4200, 19200, 49e3],
                [25e3, 44e3, 7e4, 155e3],
                [45e3, 9e4, 18e4, 36e4, 54e4]
            ][e][t]
        }

        function u(t, r) {
            var n = e.data.ItemRepo.SandsOfTime;
            return s(t, r) + c(t, r) * e.ItemRepo.getValue(n.itemType, n.rarityType)
        }

        function l(t, r) {
            var n = s(t, r),
                a = e.data.ItemRepo.SandsOfTime,
                i, o, u, l, d, c;
            return n + p(t, r) * e.ItemRepo.getValue(a.itemType, a.rarityType) + [0, 1, 2, 3].map(function(e) {
                return f(t, r, e)
            }).map(function(t, r) {
                return t * e.ItemRepo.getValue(e.ItemType.EvoJar, r)
            }).reduce(function(e, t) {
                return e + t
            }, 0) + v(t, r) * e.ItemRepo.getValue(e.ItemType.Rune, e.RarityType.Rare) + y(t, r) * e.ItemRepo.getValue(e.ItemType.Crystal, e.RarityType.Uncommon)
        }

        function d(e, n) {
            for (var a = 0, i = (t.BattleCardRepo.find(e.configId) || {}).rarityType || 0, o = r(i), s = +n.split(/\./)[0]; s < o; s++) a += l(i, s);
            return a
        }

        function c(e, t) {
            return [
                [0],
                [2, 5],
                [5, 10, 20],
                [10, 20, 30, 40],
                [20, 30, 40, 60, 60]
            ][e || 0][t || 0]
        }

        function p(e, t) {
            return [
                [10],
                [12, 15],
                [15, 20, 30],
                [20, 30, 40, 60],
                [30, 40, 60, 80, 100]
            ][e || 0][t || 0]
        }

        function h(e, n) {
            for (var a = 0, i = (t.BattleCardRepo.find(e.configId) || {}).rarityType || 0, o = r(i), s = +n.split(/\./)[0]; s < o; s++) a += p(i, s);
            return a
        }

        function f(e, t, r) {
            return ([
                [
                    [12]
                ],
                [
                    [12, 2],
                    [12, 6, 2]
                ],
                [
                    [14, 2],
                    [26, 10, 4],
                    [, 14, 8, 6]
                ],
                [
                    [26, 6, 2],
                    [40, 20, 12],
                    [, 26, 16, 8],
                    [, 26, 20, 12]
                ],
                [
                    [40, 20, 12],
                    [, 26, 16, 8],
                    [, 30, 24, 12],
                    [, 36, 30, 16]
                ]
            ][e][t] || [])[r] || 0
        }

        function g(t, r) {
            return t == e.RarityType.Legendary && 4 == r ? 30 : 0
        }

        function y(t, r) {
            return t == e.RarityType.Legendary && 4 == r ? 60 : 0
        }

        function m(e, n) {
            for (var a = 0, i = (t.BattleCardRepo.find(e.configId) || {}).rarityType || 0, o = r(i), s = +n.split(/\./)[0]; s < o; s++) a += t.getMaxCrystalsNeeded(i, s);
            return a
        }

        function b(t, r) {
            return t == e.RarityType.Legendary && 4 == r ? 30 : 0
        }

        function v(t, r) {
            return t == e.RarityType.Legendary && 4 == r ? 60 : 0
        }

        function T(e, n) {
            for (var a = 0, i = (t.BattleCardRepo.find(e.configId) || {}).rarityType || 0, o = r(i), s = +n.split(/\./)[0]; s < o; s++) a += t.getMaxRunesNeeded(i, s);
            return a
        }
        t.getMaxEvo = r, t.evoMultiplier = n, t.wildsForEvo = a, t.getNextWildCardsNeeded = i, t.getMaxWildCardsNeeded = o, t.getBaseGoldNeeded = s, t.getMinGoldNeeded = u, t.getMaxGoldNeeded = l, t.calcMaxGoldNeeded = d, t.getMinSotNeeded = c, t.getMaxSotNeeded = p, t.calcMaxSotNeeded = h, t.getMaxMatNeeded = f, t.getMinCrystalsNeeded = g, t.getMaxCrystalsNeeded = y, t.calcMaxCrystalsNeeded = m, t.getMinRunesNeeded = b, t.getMaxRunesNeeded = v, t.calcMaxRunesNeeded = T
    }(t = e.data || (e.data = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        ! function(t) {
            var r = [],
                n;

            function a(e) {
                return r.find(function(t) {
                    return t.guid == e
                })
            }

            function i(e) {
                var t = a(e);
                return t && t.name || ""
            }

            function o(e) {
                return e && r.filter(function(t) {
                    return t.parent === e
                }) || []
            }

            function s() {
                return r.slice()
            }

            function u(e) {
                e && e.leaderboardEntries ? e.leaderboardEntries.forEach(function(e) {
                    var t = a(e.id);
                    t || (t = l(e.id, e.name)), t.leaderBoardEntry = e
                }) : e.forEach(function(e) {
                    var t = a(e.id);
                    t || (t = l(e.id, e.name)), t.previousOpponentId = e.previousOpponentId || "", t.previousOpponentName = i(t.previousOpponentId)
                })
            }

            function l(e, t, n) {
                if (t) {
                    var a = r.find(function(t) {
                        return t.guid == e
                    });
                    return a || (r.push({
                        guid: e,
                        lower: (t || "").toLowerCase(),
                        name: t || null,
                        parent: n || null
                    }), r[r.length - 1])
                }
            }

            function d() {
                return n || (n = new Promise(function(t) {
                    var n = (e.TSV || {})[String(GuildsGID)];
                    n ? t(c(n)) : e.Repo.fetchTsv(DataSheetID, GuildsGID).then(function(e) {
                        return t(c(e))
                    }, function() {
                        return t(r)
                    })
                })), n
            }

            function c(t) {
                return r = e.Repo.mapTsv(t)
            }
            t.findByGuid = a, t.findNameByGuid = i, t.filterByParent = o, t.getGuilds = s, t.updateLeaderBoard = u, t.put = l, t.init = d
        }(r = t.guilds || (t.guilds = {}))
    }(t = e.data || (e.data = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        ! function(r) {
            function n(e) {
                var t = e.filter(function(e) {
                    return e.leaderBoardEntry
                }).map(function(e) {
                    return {
                        guid: e.guid,
                        name: e.name,
                        previousOpponentId: e.previousOpponentId || "",
                        previousOpponentName: e.previousOpponentName || "",
                        wins: e.leaderBoardEntry.wins,
                        losses: e.leaderBoardEntry.losses,
                        score: e.leaderBoardEntry.score,
                        rank: e.leaderBoardEntry.rank + 1
                    }
                });
                return t.sort(function(e, t) {
                    return e.rank - t.rank
                }), t.map(function(e) {
                    return e.rank + "\t" + e.guid + "\t" + e.name + "\t" + e.previousOpponentId + "\t" + e.previousOpponentName + "\t" + e.wins + "\t" + e.losses + "\t" + e.score
                }).join("\n")
            }

            function a(e) {
                var t = h(e);
                return t[e] || (t = s(e)), t[e] || (t = d(e)), t[e] || (t = {}), t
            }
            r.getScores = n, r.getReport = a;
            var i = {};

            function o(e) {
                return e && e.playerGuild ? (i[e.playerGuild.id] = e, s(e.playerGuild.id)) : {}
            }

            function s(e) {
                return i[e] && f(i[e].members) || {}
            }
            r.putGuild = o, r.getGuildReport = s;
            var u = {};

            function l(e) {
                return u[e[0].guildId] = e.slice(), d(e[0].guildId)
            }

            function d(e) {
                return u[e] && f(u[e]) || {}
            }
            r.putGuildMembers = l, r.getGuildMembersReport = d;
            var c = {};

            function p(e) {
                return e.guilds.forEach(function(t) {
                    return c[t.id] = e
                }), h(e.guilds[0].id)
            }

            function h(e) {
                return c[e] && b(c[e]) || {}
            }

            function f(t) {
                var r = {},
                    n = t[0].guildId,
                    a = t.slice().sort(e.utils.sort.byPositionThenName).map(g);
                return y(a), r[n] = a.join("\n"), r
            }

            function g(r, n) {
                var a = t.PlayerRepo.find(r.playerId),
                    i = e.PositionType[r.position] + 1,
                    o = r.fameLevel + 1,
                    s = t.HeroRepo.sorted.map(a ? d : l),
                    u;
                return [n ? n + 1 : "GL", o, r.name, i].concat(s).join("\t");

                function l(e) {
                    var t = r.archetypeLevels[e.guid] + 1,
                        n = e.getHitPoints(t);
                    return t ? t + "|" + n + "|0%|N" : "/|/|/|/"
                }

                function d(e) {
                    var t = a.heroes.find(function(t) {
                            return e.guid == t.guid
                        }),
                        r, n, i, o;
                    return !t || t.isLocked ? "/|/|/|N" : (t ? t.level : "/") + "|" + (t ? t.hitPoints : "/") + "|" + (t ? t.powerPercent + "%" : "/") + "|" + (t && t.hasOP ? "Y" : "N")
                }
            }

            function y(e) {
                if (e.length < 20) {
                    e.length = 20;
                    for (var t = 0; t < 20; t++) e[t] || (e[t] = " \t \t \t \t \t \t \t \t \t \t \t \t \t \t \t \t \t \t \t0\t0\t0\t0")
                }
            }

            function m(e, t) {
                var r = e.currentWar.battles,
                    n = 0,
                    a = 0,
                    i = 0,
                    o = 0,
                    s = 0;
                return t && r.forEach(function(e) {
                    e.initiator.playerId == t.playerId && (e.initiator.winner ? n++ : a++, e.completedBragId && o++, s += e.initiator.totalScore), e.opponent.playerId == t.playerId && (e.opponent.winner && i++, s += e.opponent.totalScore)
                }), {
                    winCount: n,
                    lossCount: a,
                    dwCount: i,
                    score: s,
                    brags: o
                }
            }

            function b(t) {
                var r = t.guilds[0],
                    n = t.guilds[1],
                    a = t.members[r.id].sort(e.utils.sort.byPositionThenName),
                    i = t.members[n.id].sort(e.utils.sort.byPositionThenName),
                    o = a.map(function(e, t) {
                        return l(t, e)
                    }),
                    s = i.map(function(e, t) {
                        return l(t, e)
                    });
                y(o), y(s);
                var u = {};
                return u[r.id] = o.join("\n"), u[n.id] = s.join("\n"), u;

                function l(e, r) {
                    var n = g(r, e),
                        a = m(t, r);
                    return n + "\t" + a.winCount + "\t" + a.lossCount + "\t" + a.dwCount + "\t" + a.score
                }
            }
            r.putGuildWar = p, r.getGuildWarReport = h
        }(r = t.reports || (t.reports = {}))
    }(t = e.data || (e.data = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(e) {
        function t(e) {
            let t;
            try {
                t = localStorage.getItem(e)
            } catch (e) {
                t = null
            }
            return t
        }

        function r(e, t) {
            let r = !1;
            try {
                localStorage.setItem(e, t), r = !0
            } catch (e) {}
            return r
        }

        function n(e, t) {
            let r = new RegExp("\\w+"),
                n = e.match(new RegExp("#{\\w+}", "g"));
            for (let e = 0, t = n.length; e < t; e++) n[e] = n[e].match(r)[0];
            let a = e,
                i, o;
            for (let e = 0, r = n.length; e < r; e++) {
                i = n[e];
                for (let e = 0, r = t.length; e < r; e++)
                    if (i in (o = t[e])) {
                        a = a.replace("#{" + i + "}", o[i]);
                        break
                    }
            }
            return a
        }

        function a(e) {
            return String(e).replace(/\</g, "&lt;").replace(/\>/g, "&gt;")
        }

        function i(e) {
            return e.reduce(function(e, t) {
                return e.includes(t) ? e : e.concat([t])
            }, [])
        }

        function o(e) {
            let t = String(e).split(""),
                r = [],
                n = 0;
            for (let e = t.length; e--;) r.length && n % 3 == 0 && r.unshift(","), r.unshift(t.pop()), n++;
            return r.join("")
        }

        function s(e, t) {
            let r = 10 ^ t,
                n = e * r,
                a, i;
            return Math.round(n) / r
        }

        function u(t) {
            let r = e.formatNumber(t),
                n = r.split(",");
            return 1 == n.length ? r : 1 == n[0].length ? n[0] + "." + n[1][0] + "k" : n[0] + "k"
        }

        function l(e) {
            let t = String(e),
                r = t.substring(0, 1).toLowerCase();
            return "y" === r || "t" === r || "1" === t
        }

        function d(e, t) {
            void 0 === t && (t = String(e + 1));
            let r = +t.split(".")[0],
                n = e + 1,
                a = 0,
                i = "";
            for (; r--;) a++, i += "<span class='evo-star'>&#9733;</span>";
            for (; a < n;) a++, i += "<span class='star'>&#9734;</span>";
            return i
        }

        function c(e) {
            let t = document.createElement("img");
            t.setAttribute("src", e);
            let r = document.createElement("canvas"),
                n, a;
            return r.width = t.width, r.height = t.height, r.getContext("2d").drawImage(t, 0, 0), r.toDataURL("image/png")
        }
        e.getFromStorage = t, e.setToStorage = r, e.formatString = n, e.htmlFriendly = a, e.unique = i, e.formatNumber = o, e.round = s, e.truncateNumber = u, e.parseBoolean = l, e.evoToStars = d, e.getBase64Image = c;
        var p = {};

        function h(e) {
            p[e.playerCard.id] || (console.log("HUD: Missing BattleCard:", e.name + ": " + e.playerCard.id + " (" + e.evoLevel + ")"), p[e.playerCard.id] = !0)
        }

        function f(e, t, r) {
            return new Promise(function(n, a) {
                var i = e.map(function(e, n, i) {
                        return function(e, n, i) {
                            setTimeout(function(e, r, n, i) {
                                try {
                                    var s = t.call(e, r, n, i);
                                    s instanceof Promise ? s.then(o, a) : o()
                                } catch (e) {
                                    a(e)
                                }
                            }, 0, r, e, n, i)
                        }.bind(r, e, n, i)
                    }),
                    o = function() {
                        if (i.length) {
                            var t = i.shift();
                            t ? t() : o()
                        } else n(e)
                    };
                o()
            })
        }

        function g(e) {
            let t = {};
            return Object.keys(e).forEach(function(r) {
                return t[r] = e[r]
            }), t
        }

        function y(e) {
            return null == e
        }
        e.logMissingCard = h, e.asyncForEach = f, e.clone = g, e.isNullOrUndefined = y
    }(t = e.utils || (e.utils = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        ! function(t) {
            function r(e, t) {
                return e.elementType == t.elementType ? 0 : e.elementType < t.elementType ? -1 : 1
            }

            function n(e, t) {
                return r(e, t) || o(e, t)
            }

            function a(e, t) {
                return r(e, t) || l(e, t)
            }

            function i(e, t) {
                return r(e, t) || h(e, t)
            }

            function o(e, t) {
                return e.klassType == t.klassType ? 0 : e.klassType < t.klassType ? -1 : 1
            }

            function s(e, t) {
                return e.evoLevel == t.evoLevel ? 0 : +e.evoLevel < +t.evoLevel ? -1 : 1
            }

            function u(e, t) {
                return s(e, t) || l(e, t)
            }

            function l(e, t) {
                var r = e.name,
                    n = t.name;
                return "sands of time" == r ? -1 : "sands of time" == n ? 1 : r == n ? 0 : r < n ? -1 : 1
            }

            function d(t, r) {
                let n = e.PositionType[t.position],
                    a = e.PositionType[r.position];
                return n == a ? 0 : n > a ? -1 : 1
            }

            function c(e, t) {
                return d(e, t) || l(e, t)
            }

            function p(e, t) {
                return e.rarityType == t.rarityType ? 0 : e.rarityType < t.rarityType ? -1 : 1
            }

            function h(e, t) {
                return p(e, t) || l(e, t)
            }

            function f(e, t) {
                return p(e, t) || l(e, t) || s(e, t)
            }
            t.byElement = r, t.byElementThenKlass = n, t.byElementThenName = a, t.byElementThenRarityThenName = i, t.byKlass = o, t.byEvoLevel = s, t.byEvoLevelThenName = u, t.byName = l, t.byPosition = d, t.byPositionThenName = c, t.byRarity = p, t.byRarityThenName = h, t.byRarityThenNameThenEvoLevel = f
        }(r = t.sort || (t.sort = {}))
    }(t = e.utils || (e.utils = {}))
}(bh || (bh = {}));
var XmlHttpRequest = function() {
        function e() {
            var t = this;
            this.responseFilter = null;
            var r = e.original || XMLHttpRequest;
            this.xmlHttpRequest = new r, e.globalListeners.forEach(function(e) {
                try {
                    var r = e.slice(),
                        n = r[1];
                    r[1] = function() {
                        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                        try {
                            n.apply(t, e)
                        } catch (e) {
                            console.error("XmlHttpRequest: Firing Global EventListener", e)
                        }
                    }, t.addEventListener.apply(t, r)
                } catch (e) {
                    console.error("XmlHttpRequest: Adding Global EventListeners", e)
                }
            })
        }
        return Object.defineProperty(e.prototype, "onabort", {
            get: function() {
                return this.xmlHttpRequest.onabort
            },
            set: function(e) {
                this.xmlHttpRequest.onabort = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onerror", {
            get: function() {
                return this.xmlHttpRequest.onerror
            },
            set: function(e) {
                this.xmlHttpRequest.onerror = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onload", {
            get: function() {
                return this.xmlHttpRequest.onload
            },
            set: function(e) {
                this.xmlHttpRequest.onload = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onloadend", {
            get: function() {
                return this.xmlHttpRequest.onloadend
            },
            set: function(e) {
                this.xmlHttpRequest.onloadend = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onloadstart", {
            get: function() {
                return this.xmlHttpRequest.onloadstart
            },
            set: function(e) {
                this.xmlHttpRequest.onloadstart = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onreadystatechange", {
            get: function() {
                return this.xmlHttpRequest.onreadystatechange
            },
            set: function(e) {
                this.xmlHttpRequest.onreadystatechange = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "onprogress", {
            get: function() {
                return this.xmlHttpRequest.onprogress
            },
            set: function(e) {
                this.xmlHttpRequest.onprogress = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "ontimeout", {
            get: function() {
                return this.xmlHttpRequest.ontimeout
            },
            set: function(e) {
                this.xmlHttpRequest.ontimeout = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "readyState", {
            get: function() {
                return this.xmlHttpRequest.readyState
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "response", {
            get: function() {
                return this.xmlHttpRequest.response
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "responseJSON", {
            get: function() {
                if ("json" == this.responseType) return this.xmlHttpRequest.response;
                try {
                    return JSON.parse(this.responseText)
                } catch (e) {
                    console.error("XmlHttpRequest.responseJSON", e)
                }
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "responseText", {
            get: function() {
                var t = this.responseType;
                if ("arraybuffer" == t) {
                    var r = this.getResponseHeader("Content-Type"),
                        n = r.match(/UTF\-32/i) ? Uint32Array : r.match(/UTF\-16/i) ? Uint16Array : Uint8Array;
                    return e.arrayBufferToString(this.xmlHttpRequest.response, n)
                }
                return "json" == t ? JSON.stringify(this.xmlHttpRequest.response) : this.xmlHttpRequest.responseText
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "responseType", {
            get: function() {
                return this.xmlHttpRequest.responseType
            },
            set: function(e) {
                this.xmlHttpRequest.responseType = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "responseXML", {
            get: function() {
                return this.xmlHttpRequest.responseXML
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "status", {
            get: function() {
                return this.xmlHttpRequest.status
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "statusText", {
            get: function() {
                return this.xmlHttpRequest.statusText
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "timeout", {
            get: function() {
                return this.xmlHttpRequest.timeout
            },
            set: function(e) {
                this.xmlHttpRequest.timeout = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "withCredentials", {
            get: function() {
                return this.xmlHttpRequest.withCredentials
            },
            set: function(e) {
                this.xmlHttpRequest.withCredentials = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "upload", {
            get: function() {
                return this.xmlHttpRequest.upload
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.abort = function() {
            this.xmlHttpRequest.abort()
        }, e.prototype.addEventListener = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this.xmlHttpRequest.addEventListener.apply(this.xmlHttpRequest, e)
        }, e.prototype.getAllResponseHeaders = function() {
            return this.xmlHttpRequest.getAllResponseHeaders()
        }, e.prototype.getResponseHeader = function(e) {
            return this.xmlHttpRequest.getResponseHeader(e)
        }, e.prototype.open = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this.method = e[0] || "", this.requestUrl = e[1] || "", this.xmlHttpRequest.open.apply(this.xmlHttpRequest, e)
        }, e.prototype.overrideMimeType = function(e) {
            this.xmlHttpRequest.overrideMimeType(e)
        }, e.prototype.send = function(e) {
            this.xmlHttpRequest.send(e)
        }, e.prototype.setRequestHeader = function(e, t) {
            this.xmlHttpRequest.setRequestHeader(e, t)
        }, e.addEventListener = function() {
            for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
            e.globalListeners.push(t)
        }, e.attach = function(t, r) {
            e.original = t.XMLHttpRequest, t.XMLHttpRequest = e, r && e.addEventListener("readystatechange", r)
        }, e.uintArrayToString = function(e) {
            try {
                for (var t = 32768, r = [], n = 0, a = e.length; n < a; n += 32768) r.push(String.fromCharCode.apply(null, e.subarray(n, n + 32768)));
                return decodeURIComponent(escape(r.join("")))
            } catch (e) {
                console.error("XmlHttpRequest.uintArrayToString", e)
            }
        }, e.stringToUintArray = function(e, t) {
            try {
                for (var r, n = unescape(encodeURIComponent(e)).split(""), a = [], i = n.length; i--;) a[i] = n[i].charCodeAt(0);
                return new t(a)
            } catch (e) {
                console.error("XmlHttpRequest.stringToUintArray", e)
            }
        }, e.arrayBufferToString = function(t, r) {
            try {
                r || (r = t instanceof Uint32Array ? Uint32Array : t instanceof Uint16Array ? Uint16Array : Uint8Array);
                var n = new r(t);
                return e.uintArrayToString(n)
            } catch (e) {
                console.error("XmlHttpRequest.arrayBufferToString", e)
            }
            return null
        }, e.get = function(t) {
            return new Promise(function(r, n) {
                var a = new e;
                a.addEventListener("readystatechange", function() {
                    a.readyState == e.DONE && r(a.responseText)
                }), a.open("GET", t, !0), a.send(null)
            })
        }, e.getJSON = function(t) {
            return new Promise(function(r, n) {
                var a = new e;
                a.addEventListener("readystatechange", function() {
                    a.readyState == e.DONE && r(a.responseJSON)
                }), a.open("GET", t, !0), a.send(null)
            })
        }, e.post = function(t, r, n) {
            return new Promise(function(a, i) {
                var o = new e;
                o.addEventListener("readystatechange", function() {
                    o.readyState == e.DONE && a(o)
                }), o.open("POST", t, !0), n && o.setRequestHeader("Content-Type", n), o.send(r)
            })
        }, e.DONE = XMLHttpRequest.DONE, e.HEADERS_RECEIVED = XMLHttpRequest.HEADERS_RECEIVED, e.LOADING = XMLHttpRequest.LOADING, e.OPENED = XMLHttpRequest.OPENED, e.UNSENT = XMLHttpRequest.UNSENT, e.globalListeners = [], e
    }(),
    bh, bh, bh, bh, bh, bh, bh, bh, bh, bh;
! function(e) {
    var t;
    ! function(t) {
        function r(t) {
            void 0 === t && (t = e.$());
            var r = t("<style type='text/css' id='bh-hud-cardtypes'/>").appendTo(t("head"));
            r.append("div.bh-hud-image.img-Attack { background-image:url('" + e.getSrc("cardtypes", "Attack") + "'); }"), r.append("div.bh-hud-image.img-Brag { background-image:url('" + e.getSrc("cardtypes", "Brag") + "'); }"), r.append("div.bh-hud-image.img-BattleCard { background-image:url('" + e.getSrc("cardtypes", "BattleCard") + "'); }"), r.append("div.bh-hud-image.img-Heal { background-image:url('" + e.getSrc("cardtypes", "Heal") + "'); }"), r.append("div.bh-hud-image.img-Shield { background-image:url('" + e.getSrc("cardtypes", "Shield") + "'); }"), r.append("div.bh-hud-image.img-WildCard { background-image:url('" + e.getSrc("cardtypes", "WildCard") + "'); }")
        }

        function n(t) {
            void 0 === t && (t = e.$());
            var r = t("<style type='text/css' id='bh-hud-effects'/>").appendTo(t("head"));
            e.data.EffectRepo.all.forEach(function(t) {
                return r.append("div.bh-hud-image.img-" + t.guid + " { background-image:url('" + e.EffectRepo.toImageSrc(t) + "'); }")
            })
        }

        function a(t) {
            void 0 === t && (t = e.$());
            var r = t("<style type='text/css' id='bh-hud-elements'/>").appendTo(t("head"));
            e.ElementRepo.allTypes.forEach(function(t) {
                return t == e.ElementType.Neutral ? void 0 : r.append("div.bh-hud-image.img-" + e.ElementType[t] + " { background-image:url('" + e.ElementRepo.toImageSrc(t) + "'); }")
            })
        }

        function i(t) {
            void 0 === t && (t = e.$());
            var r = t("<style type='text/css' id='bh-hud-heroes'/>").appendTo(t("head"));
            e.data.HeroRepo.all.forEach(function(t) {
                return r.append("div.bh-hud-image.img-" + t.guid + " { background-image:url('" + e.HeroRepo.toImageSrc(t) + "'); }")
            })
        }

        function o(t) {
            void 0 === t && (t = e.$());
            var r = t("<style type='text/css' id='bh-hud-items'/>").appendTo(t("head"));
            e.data.ItemRepo.all.forEach(function(t) {
                return r.append("div.bh-hud-image.img-" + t.guid + " { background-image:url('" + e.ItemRepo.toImageSrc(t) + "'); }")
            })
        }

        function s(t) {
            void 0 === t && (t = e.$());
            var r = t("<style type='text/css' id='bh-hud-klasses'/>").appendTo(t("head")),
                n = [16, 12, 12];
            e.KlassRepo.allTypes.forEach(function(t) {
                return r.append("div.bh-hud-image.img-" + e.KlassType[t] + " { width:16px; background-size:" + n[t] + "px 20px; background-image:url('" + e.KlassRepo.toImageSrc(t) + "'); }")
            })
        }
        t.addCardTypes = r, t.addEffects = n, t.addElements = a, t.addHeroes = i, t.addItems = o, t.addKlasses = s
    }(t = e.css || (e.css = {}))
}(bh || (bh = {})),
function(e) {
    var t, r = [],
        n = !1,
        a = 0,
        i;

    function o(e) {
        return t = t || e, i || (i = new Promise(function(e, t) {
            s(e, t), c(function() {
                e()
            })
        }))
    }

    function s(e, i) {
        if (!n) return ++a > 60 ? i("60 tries") : void(t && t.jQuery && t.document && t.document.body ? (t.jQuery(function() {
            r.forEach(function(e) {
                return e()
            })
        }), e()) : n || setTimeout(s, 1500, e, i))
    }

    function u() {
        return l
    }
    e.loaded = o;
    var l = {
            on: u,
            val: u
        },
        d;

    function c(e) {
        return e ? "function" != typeof e || t && t.jQuery ? (t && t.jQuery || u)(e) : r.push(e) : t && t.jQuery || u
    }
    e.$ = c,
        function(t) {
            function r() {
                e.data.init().then(function() {
                    c("body").on("click", "[data-action]", i), c("body").on("change", "[data-action]", o)
                })
            }

            function n(e, t) {
                e && String(t).length && c('.brain-hud-inventory-buttons > button[data-action="toggle-' + e + '"][data-' + e + '="' + t + '"]').toggleClass("active");
                var r = c('.brain-hud-inventory-buttons > [data-action="toggle-element"].active').toArray().map(function(e) {
                        return e.getAttribute("data-element")
                    }),
                    n = c('.brain-hud-inventory-buttons > [data-action="toggle-klass"].active').toArray().map(function(e) {
                        return e.getAttribute("data-klass")
                    }),
                    a = c('.brain-hud-inventory-buttons > [data-action="toggle-type"].active').toArray().map(function(e) {
                        return e.getAttribute("data-type")
                    });
                c("#brain-hud-inventory-items-container > div").hide(), r.length || n.length || a.length ? c("#brain-hud-inventory-items-container > div").each(function(e, t) {
                    var i = c(t),
                        o = !r.length || r.includes(String(i.data("elementType"))),
                        s = !n.length || n.includes(String(i.data("klassType"))) || n.includes(i.data("brag")),
                        u = !a.length || a.includes(i.data("type")) || a.includes(String(i.data("itemType")));
                    o && s && u && i.show()
                }) : c('#brain-hud-inventory-items-container > div[data-hud="true"]').show()
            }

            function a(t) {
                var r = c("div.brain-hud-scouter-player" + (t ? '[data-guid="' + t + '"]' : ".active")),
                    n = ["element-klass", "power-percent-asc", "power-asc", "hp-asc", "name"],
                    a = n.indexOf(r.data("sort") || "element-klass"),
                    i = n[a + 1] || "element-klass",
                    o, s;
                r.data("sort", i), t || (t = r.data("guid")), e.data.PlayerRepo.find(t).heroes.sort(function(t, r) {
                    var n, a, n, a;
                    if ("power-percent-asc" == i && (n = t.powerPercent) != (a = r.powerPercent)) return n < a ? -1 : 1;
                    if ("power-asc" == i && (n = t.powerRating) != (a = r.powerRating)) return n < a ? -1 : 1;
                    if ("hp-asc" == i) {
                        var o = t.hitPoints,
                            s = r.hitPoints;
                        if (o != s) return o < s ? -1 : 1
                    }
                    return "name" == i ? e.utils.sort.byName(t, r) : e.utils.sort.byElementThenKlass(t, r)
                }).forEach(function(e) {
                    return r.find('[data-guid="' + t + "-" + e.guid + '"]').appendTo(r)
                })
            }

            function i(t) {
                var r = c(t.target).closest("[data-action]"),
                    i = r.data("action");
                switch (i) {
                    case "hud-to-library":
                        e.library.openLibraryFromHud();
                        break;
                    case "sort-heroes":
                        a();
                        break;
                    case "refresh-guild":
                        e.messenger.postMessage(e.messenger.createMessage("refresh-guild", c("#brain-hud-scouter-guild-target").val()));
                        break;
                    case "refresh-player":
                        e.messenger.postMessage(e.messenger.createMessage("refresh-player", c("#brain-hud-scouter-player-target").val()));
                        break;
                    case "toggle-child":
                        var o = r.data("guid"),
                            s = c('div[data-parent-guid="' + o + '"]').toggleClass("active").hasClass("active");
                        c('button[data-action="toggle-child"][data-guid="' + o + '"]').text(s ? "[-]" : "[+]");
                        break;
                    case "toggle-element":
                        n("element", r.data("element"));
                        break;
                    case "toggle-klass":
                        n("klass", r.data("klass"));
                        break;
                    case "toggle-type":
                        n("type", r.data("type"));
                        break;
                    case "toggle-scouter-guild":
                    case "toggle-scouter-player":
                        break;
                    case "toggle-scouter-hero":
                        var u, l;
                        r.closest("[data-guid]").find(".brain-hud-scouter-panel-content").toggleClass("active");
                        break;
                    case "toggle-hud-bigger":
                        e.hud.resize(!0);
                        break;
                    case "toggle-hud-smaller":
                        e.hud.resize(!1);
                        break;
                    case "toggle-guild-scouter":
                        var d = c("textarea#brain-hud-scouter-guild-report").toggleClass("active").hasClass("active");
                        c('button.brain-hud-toggle[data-action="toggle-guild-scouter"]').text(d ? "[-]" : "[+]");
                        break;
                    case "toggle-player-scouter":
                        var d = c("div#brain-hud-scouter-player-report").toggleClass("active").hasClass("active");
                        c('button.brain-hud-toggle[data-action="toggle-player-scouter"]').text(d ? "[-]" : "[+]");
                        break;
                    case "toggle-inventory":
                        var d = c("div.brain-hud-inventory-container").toggleClass("active").hasClass("active");
                        c('button.brain-hud-toggle[data-action="toggle-inventory"]').text(d ? "[-]" : "[+]");
                        break;
                    default:
                        console.log("HUD: unknown action " + i)
                }
            }

            function o(t) {
                var r, n = c(t.target).closest("[data-action]").data("action");
                switch (n) {
                    case "toggle-scouter-guild":
                        e.hud.guild.selectGuildReport();
                        break;
                    case "toggle-scouter-player":
                        e.hud.player.selectPlayerReport();
                        break;
                    default:
                        console.log("HUD: unknown action " + n)
                }
            }
            t.init = r, t.toggle = n
        }(d = e.events || (e.events = {}))
}(bh || (bh = {})),
function(e) {
    var t;

    function r() {
        return t || (t = String(location.href).toLowerCase().includes("battlehand-hud/") ? "." : e.webhost), t
    }

    function n(e, t, r) {
        var n = "",
            a = t ? 'class="' + t + '"' : "",
            r = r ? 'style="' + r + '"' : "";
        return e.includes("glyphicons-82-refresh") && (n = "onerror=\"bh.$(this).replaceWith('&#8634;')\""), '<img src="' + e + '" ' + a + " " + r + " " + n + "/>"
    }

    function a() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return n(u.apply(void 0, e))
    }

    function i() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return n(u.apply(void 0, e), "icon-12")
    }

    function o() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return n(u.apply(void 0, e), "icon-20")
    }

    function s() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return n(u.apply(void 0, e), "grayscale")
    }

    function u() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return r() + "/images/" + e.join("/") + ".png"
    }
    e.getImg = a, e.getImg12 = i, e.getImg20 = o, e.getImgG = s, e.getSrc = u
}(bh || (bh = {})),
function(e) {
    var t;
    e.isHud = !1, e.isListener = !1, e.isLocal = !1,
        function(t) {
            var r;
            ! function(r) {
                var n;

                function a(t) {
                    e.Messenger.isValidMessage(t) ? i.forEach(function(e) {
                        if (e && e.action == t.action && e.callbackfn) try {
                            e.callbackfn(t)
                        } catch (e) {
                            console.error("HUD: no action " + t.action, e)
                        }
                    }) : console.log("HUD: invalid message ", t)
                }! function(e) {
                    var t, r, n = !1,
                        a = !1,
                        i = !1;

                    function o(e, n) {
                        t = e, r = n
                    }

                    function s() {
                        n = !0, l()
                    }

                    function u() {
                        a = !0, l()
                    }

                    function l() {
                        i || n && a && (r(t), i = !0)
                    }
                    e.setResolve = o, e.resolveHud = s, e.resolveListener = u
                }(n || (n = {}));
                var i = [{
                    action: "hud-init",
                    url: null,
                    callbackfn: n.resolveHud
                }];

                function o(e, t, r) {
                    i.push({
                        action: e,
                        url: t,
                        callbackfn: r
                    })
                }

                function s(r, i, o) {
                    return void 0 === i && (i = "https://docs.google.com/spreadsheets/d/e/"), new Promise(function(s, l) {
                        var d = String(r && r.location && r.location.href || "").toLowerCase();
                        e.isLocal = d.includes("battlehand-hud/default.htm") || d.includes("battlehand-hud/iframe.htm"), e.isHud = d.includes("battlehand-hud/default.htm") || d.startsWith("http://www.kongregate.com/games/anotherplaceprod/battlehand-web"), e.isListener = d.includes("battlehand-hud/iframe.htm") || d.startsWith("http://game261051.konggames.com/gamez/"), e.webhost = o, e.host = i, e.isHud ? (r.bh = e, XmlHttpRequest.attach(r), e.loaded(r).then(function() {
                            e.messenger = new e.Messenger(r, a), e.data.init().then(function() {
                                t.render(), e.messenger.postMessage(e.messenger.createMessage("hud-init", "hud-init")), s(r)
                            }, function() {
                                return l("data.init rejected")
                            })
                        }, function(e) {
                            return l("loaded(win) rejected: " + e)
                        })) : e.isListener ? (n.setResolve(r, s), XmlHttpRequest.attach(r, u), e.messenger = new e.Messenger(r, a)) : l("not hud nor listener")
                    })
                }

                function u() {
                    d(this)
                }

                function l(e) {
                    var t = i.find(function(t) {
                        return e.includes(t.url)
                    });
                    return t && t.action || null
                }

                function d(t) {
                    if (t.readyState == XmlHttpRequest.DONE) {
                        var r = t.requestUrl.match(/\?player=([a-z0-9]{8}(?:\-[a-z0-9]{4}){3}\-[a-z0-9]{12})&sessionKey=([a-z0-9]{32})(?:&guild(?:Id)?=([a-z0-9]{8}(?:\-[a-z0-9]{4}){3}\-[a-z0-9]{12}))?/);
                        if (r) {
                            var a = l(t.requestUrl),
                                i, o, s, u = {
                                    action: a,
                                    playerGuid: r[1],
                                    sessionKey: r[2],
                                    guildGuid: r[3],
                                    data: t.responseJSON
                                };
                            if (!a) return;
                            n.resolveListener(), e.messenger.postMessage(u)
                        }
                    }
                }
                r.addAction = o, r.init = s, r.handleReadyStateChange = d
            }(r = t.listener || (t.listener = {}))
        }(t = e.hud || (e.hud = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        ! function(r) {
            function n(r) {
                e.$('#brain-hud-scouter-player-target > option[value="arena"]').length || e.$("#brain-hud-scouter-player-target").children().first().after("<option value='arena'>Arena Opponents</option>");
                var n = r.data,
                    a;
                e.data.arenaToPlayers(n).forEach(function(r, n) {
                    return t.scouter.loadPlayer(new e.Player(r, !0), n)
                }), e.$("#brain-hud-scouter-player-target").val("arena"), t.player.selectPlayerReport()
            }
            t.listener.addAction("get-arena-matches", "/v1/matchmaking/getmatches?", n)
        }(r = t.arena || (t.arena = {}))
    }(t = e.hud || (e.hud = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        ! function(r) {
            function n() {
                var t;
                if (!e.$("div.brain-hud-scouter-guild-container").length) {
                    var r = e.Player.me.canScout ? '<textarea id="brain-hud-scouter-guild-report" rows="1" type="text" class="active" readonly></textarea>' : "";
                    e.$("div.brain-hud-scouter-player-container").before('<div class="brain-hud-scouter-guild-container"><button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right" data-action="toggle-guild-scouter">[-]</button><button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right" data-action="refresh-guild">' + e.getImg12("icons", "glyphicons-82-refresh") + '</button><select id="brain-hud-scouter-guild-target" data-action="toggle-scouter-guild"></select>' + r + "</div>")
                }
                e.$("div.brain-hud-scouter-guild-container").addClass("active")
            }

            function a(t) {
                var r = t.data,
                    n = r && r.playerGuild && r.playerGuild.id,
                    a = r && r.playerGuild && r.playerGuild.name;
                n && a && (e.data.guilds.put(n, a), e.data.reports.putGuild(r), d(n))
            }

            function i(t) {
                var r = t.data,
                    n = r[0].guildId;
                e.data.reports.putGuildMembers(r), d(n)
            }

            function o(e) {
                d(e.guildGuid)
            }

            function s(t) {
                var r = t.data;
                r && r.guilds && (r.guilds.forEach(function(t) {
                    return e.data.guilds.put(t.id, t.name)
                }), e.data.reports.putGuildWar(r), r.guilds.forEach(function(e) {
                    return d(e.id)
                }))
            }

            function u(t) {
                var r = t.data;
                e.data.guilds.updateLeaderBoard(r)
            }

            function l(t) {
                var r = t.data;
                e.data.guilds.updateLeaderBoard(r), c()
            }

            function d(t) {
                var r = e.data.guilds.findByGuid(t);
                if (!r) return console.log("HUD: guild not found: " + t);
                var a = e.Player.me,
                    i = a && a.guildParent || null,
                    o = i && e.data.guilds.filterByParent(i) || [],
                    s = a && a.canScout,
                    u = a && a.guildGuid == t;
                if (o.find(function(e) {
                        return e.guid == t
                    }) || s || u) {
                    n();
                    var l = e.$("#brain-hud-scouter-guild-target");
                    l.find('option[value="' + t + '"]').length || (l.append('<option value="' + t + '">' + r.name + "</option>"), l.children().toArray().filter(function(e) {
                        return e.value != a.guildGuid
                    }).sort(function(e, t) {
                        return e.text < t.text ? -1 : e.text == t.text ? 0 : 1
                    }).forEach(function(e) {
                        return l.append(e)
                    })), l.val(t), h()
                }
            }

            function c() {
                e.$("#brain-hud-scouter-guild-target").children().toArray().forEach(p)
            }

            function p(t) {
                if (t && t.value) {
                    var r = t.value,
                        n = e.data.guilds.findByGuid(r),
                        a = n && n.leaderBoardEntry || null,
                        i, o, s = "" + (a && "#" + (a.rank + 1) + " " || "") + (a && (a.wins || a.losses) && "(" + n.leaderBoardEntry.wins + "/" + n.leaderBoardEntry.losses + ") " || "") + n.name;
                    t.text = s
                }
            }

            function h() {
                var t = e.$("#brain-hud-scouter-guild-target").val(),
                    r = e.data.guilds.findByGuid(t);
                p(e.$('#brain-hud-scouter-guild-target > option[value="' + t + '"]')[0]), ScoutGuildName && "The βrain" == e.Player.me.guildParent ? e.$("#brain-hud-scouter-guild-report").val(e.data.reports.getReport(t)[t] + "\n" + r.name || "") : e.$("#brain-hud-scouter-guild-report").val(e.data.reports.getReport(t)[t] || "")
            }

            function f(t, r) {
                var n = "https://battlehand-game-kong.anotherplacegames.com/v1/guild/getguilds?player=" + e.messenger.ActivePlayerGuid + "&sessionKey=" + e.messenger.ActiveSessionKey + "&name=" + encodeURIComponent(t) + "&joinableonly=False&language=&minfamelevel=2&maxfamelevel=44";
                return new Promise(function(a, i) {
                    if (!e.messenger.ActivePlayerGuid || !e.messenger.ActiveSessionKey) return i("not initialized");
                    XmlHttpRequest.getJSON(n).then(function(n) {
                        if (!n || !Array.isArray(n)) return i("invalid json");
                        n.find(e => t.toLowerCase() == e.name.toLowerCase()) ? (e.data.guilds.updateLeaderBoard(n), a()) : f(t, r).then(a, i)
                    }, i)
                })
            }

            function g(e, r) {
                return new Promise(function(n, a) {
                    var i = e.slice(),
                        o;

                    function s() {
                        (o = i.shift()) ? setTimeout(function() {
                            return y(o.id, r).then(s, s)
                        }, t._delayMS): n()
                    }
                    s()
                })
            }

            function y(r, n) {
                var a = "https://battlehand-game-kong.anotherplacegames.com/v1/guild/getmembers?player=" + e.messenger.ActivePlayerGuid + "&sessionKey=" + e.messenger.ActiveSessionKey + "&guild=" + r;
                return e.isLocal && (a = "./json/" + r + ".json"), new Promise(function(i, o) {
                    return e.messenger.ActivePlayerGuid && e.messenger.ActiveSessionKey ? r ? void XmlHttpRequest.getJSON(a).then(function(r) {
                        if (!r || !Array.isArray(r)) return o("invalid json");
                        if (e.messenger.postMessage(e.messenger.createMessage("get-guild-members", r)), n) {
                            var a = r.map(function(e) {
                                return e.playerId
                            });
                            t.player.playersGet(a).then(i, i)
                        } else i(r)
                    }, o) : o("no guild id") : o("not initialized")
                })
            }

            function m(t, r) {
                void 0 === t && (t = 0), void 0 === r && (r = 50);
                var n = "https://battlehand-game-kong.anotherplacegames.com/v1/guildwars/getrange?player=" + e.messenger.ActivePlayerGuid + "&sessionKey=" + e.messenger.ActiveSessionKey + "&start=" + t + "&count=" + r;
                return e.isLocal && (n = "./json/top_guilds.json"), new Promise(function(t, r) {
                    if (!e.messenger.ActivePlayerGuid || !e.messenger.ActiveSessionKey) return r("not initialized");
                    XmlHttpRequest.getJSON(n).then(function(n) {
                        if (!n || !n.leaderboardEntries) return r("invalid json");
                        e.messenger.postMessage(e.messenger.createMessage("get-leaderboard", n)), t(n)
                    }, r)
                })
            }
            r.addGuildReport = d, r.selectGuildReport = h, t.listener.addAction("get-guild", "/v1/guild/get?", a), t.listener.addAction("get-guild-members", "/v1/guild/getmembers?", i), t.listener.addAction("get-guild-search", "/v1/guild/getguilds?", u), t.listener.addAction("get-guild-war", "/v1/guildwars/get?", s), t.listener.addAction("get-leaderboard", "/v1/guildwars/getrange?", l), t.listener.addAction("get-leaderboard-members", "/v1/guildwars/getguildmembersrange?", o), r.searchGuilds = f, r.guildsGetMembers = g, r.guildGetMembers = y, r.leaderBoardGet = m, t.listener.addAction("refresh-guild", null, function(e) {
                y(e.data, !0)
            })
        }(r = t.guild || (t.guild = {}))
    }(t = e.hud || (e.hud = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        t._delayMS = 500,
            function(r) {
                function n(t) {
                    t.isExtended && (e.$("#brain-hud-inventory").addClass("active"), e.data.PlayerRepo.put(t), e.$("#brain-hud-inventory-items-container").html("").append(t.boosterCards.map(function(e) {
                        return e.rowHtml
                    })).append(t.battleCards.map(function(e) {
                        return e.rowHtml
                    })).append(t.inventory.sort(e.utils.sort.byName).map(function(e) {
                        return e.rowHtml
                    })).append(t.wildCards.map(function(e) {
                        return e.rowHtml
                    })).append(t.boosterRowHtml).append(t.fragmentsRowHtml).append(t.gemsRowHtml).append(t.goldRowHtml).append(t.raidRowHtml).append(t.wildCardRowHtml), e.events.toggle())
                }

                function a(r) {
                    var a = r.data,
                        o = new e.Player(a),
                        s = e.$("#brain-hud-scouter-player-target");
                    if (e.$('#brain-hud-scouter-player-target > option[value="' + o.guid + '"]').length || (s.append('<option value="' + o.guid + '">' + (o.isFullMeat ? "&#9734; " : "") + e.utils.htmlFriendly(o.name) + "</option>"), s.children().toArray().slice(1).sort(function(e, t) {
                            return e.text < t.text ? -1 : e.text == t.text ? 0 : 1
                        }).forEach(function(e) {
                            return s.append(e)
                        })), o.isMe && !o.isExtended || e.data.PlayerRepo.put(o), t.scouter.loadPlayer(o), o.isMe) {
                        n(o);
                        var u = o.guilds;
                        u.length && t.guild.addGuildReport && u.forEach(function(e) {
                            return t.guild.addGuildReport(e.guid)
                        })
                    }
                    s.val(a.id), i(), t.guild.selectGuildReport()
                }

                function i() {
                    e.$("div.brain-hud-scouter-player-container").addClass("active"), e.$("#brain-hud-scouter-player-report").addClass("active"), e.$('button.brain-hud-toggle[data-action="toggle-player-scouter"]').text("[-]"), e.$("div.brain-hud-scouter-player").removeClass("active");
                    var t = e.$("#brain-hud-scouter-player-target").val();
                    "arena" == t ? (e.$('div.brain-hud-scouter-player[data-guid="arena-0"]').addClass("active"), e.$('div.brain-hud-scouter-player[data-guid="arena-1"]').addClass("active"), e.$('div.brain-hud-scouter-player[data-guid="arena-2"]').addClass("active")) : e.$('div.brain-hud-scouter-player[data-guid="' + t + '"]').addClass("active")
                }

                function o(e) {
                    return new Promise(function(r, n) {
                        var a = e.slice(),
                            i;

                        function o() {
                            (i = a.shift()) ? setTimeout(function() {
                                return s(i).then(o, o)
                            }, t._delayMS): r()
                        }
                        o()
                    })
                }

                function s(t) {
                    var r = "https://battlehand-game-kong.anotherplacegames.com/v1/player/getplayerinfo?player=" + e.messenger.ActivePlayerGuid + "&sessionKey=" + e.messenger.ActiveSessionKey + "&id_requested_player=" + t;
                    return e.isLocal && (r = "./json/" + t + ".json"), new Promise(function(n, a) {
                        return e.messenger.ActivePlayerGuid && e.messenger.ActiveSessionKey ? t ? void XmlHttpRequest.getJSON(r).then(function(t) {
                            if (!t) return a("invalid json");
                            e.messenger.postMessage(e.messenger.createMessage("get-player", t)), n(t)
                        }, a) : a("no player id") : a("not initialized")
                    })
                }
                r.loadPlayer = n, r.addPlayerReport = a, r.selectPlayerReport = i, t.listener.addAction("get-player", "/v1/player/get?", a), t.listener.addAction("get-player", "/v1/player/getplayerinfo?", a), r.playersGet = o, r.playerGet = s, t.listener.addAction("refresh-player", null, function(e) {
                    s(e.data)
                })
            }(r = t.player || (t.player = {}))
    }(t = e.hud || (e.hud = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        function r() {
            o(), u(), a(), e.events.init()
        }

        function n(r) {
            r ? (t.WidthCurrent += t.WidthDelta, t.WidthCurrent < t.WidthMinimum && (t.WidthCurrent = t.WidthMinimum)) : r || (t.WidthCurrent -= t.WidthDelta, t.WidthCurrent && t.WidthCurrent < t.WidthMinimum && (t.WidthCurrent = t.WidthCollapsed), t.WidthCurrent || (t.WidthCurrent = t.WidthCollapsed)), e.utils.setToStorage("BH-HUD-WidthCurrent", String(t.WidthCurrent)), a()
        }

        function a() {
            var r = t.WidthCurrent != t.WidthCollapsed;
            e.$("div#brain-hud-container").css("width", t.WidthCurrent), e.$("div.brain-hud-main-container")[r ? "addClass" : "removeClass"]("active"), e.$("div.brain-hud-header>span.header")[r ? "show" : "hide"](), e.$('div.brain-hud-header>span[data-action="toggle-hud-smaller"]')[r ? "show" : "hide"](), e.$("div#brain-hud-container").css("width", t.WidthCurrent), e.$("div#brain-hud-container").css("max-height", jQuery(window).height() - 10), e.$("div.brain-hud-container select").css("width", t.WidthCurrent - 70), e.$("div.brain-hud-container textarea").css("width", t.WidthCurrent - 10), e.$("div.brain-hud-scouter-panel-header > button").css("width", t.WidthCurrent - 10), e.$("div.brain-hud-scouter-panel-header > button > span.hero-rating-bar").css("width", t.WidthCurrent - 205)
        }

        function i() {
            var r = '<style id="brain-hud-styles" type="text/css">\ndiv.brain-hud-container { font-size:8pt; position:fixed; top:0; right:0; width:' + t.WidthCurrent + "px; background:#FFF; color:#000; border:2px solid #000; z-index:9999; padding:2px; max-height:" + (jQuery(window).height() - 10) + "px; overflow:auto; }\ndiv.brain-hud-container div { clear:both; }\ndiv.brain-hud-container table { width:100%; margin:0; padding:0; border:0; }\ndiv.brain-hud-container td { padding:0; margin:0; border:0; }\ndiv.brain-hud-container select { width:" + (t.WidthCurrent - 70) + "px; }\ndiv.brain-hud-container textarea { width:" + (t.WidthCurrent - 10) + "px; font-size:8pt; display:none; }\n\ndiv.brain-hud-container .Air { background-color:#f3f3f3; }\ndiv.brain-hud-container .Earth { background-color:#e0eed5; }\ndiv.brain-hud-container .Fire { background-color:#fce5cd; }\ndiv.brain-hud-container .Spirit { background-color:#f3e2f6; }\ndiv.brain-hud-container .Water { background-color:#deeaf4; }\ndiv.brain-hud-container .grayscale { filter: grayscale(100%); }\n\ndiv.brain-hud-header { text-align:center; font-weight:bold; }\n\ndiv.brain-hud-main-container,\ndiv.brain-hud-scouter-guild-container,\ndiv.brain-hud-scouter-player-container,\ndiv.brain-hud-scouter-player,\ndiv.brain-hud-scouter-panel-content,\ndiv.brain-hud-inventory,\ndiv.brain-hud-inventory-container,\ndiv.brain-hud-child-scroller { display:none; }\n\ndiv.brain-hud-scouter-panel-content,\ndiv.brain-hud-child-scroller { padding-left:10px; }\n\ndiv.brain-hud-scouter-player-report { display:none; padding:0 2px; text-align:left; }\ndiv.brain-hud-scouter-player > div.player-name { font-size:10pt; font-weight:bold; text-align:center; }\n\ndiv.brain-hud-scouter-panel-header { padding:2px 0 0 0; }\ndiv.brain-hud-scouter-panel-header > button { cursor:default; border:0; width:" + (t.WidthCurrent - 10) + "px; text-align:left; padding:0; margin:0; }\ndiv.brain-hud-scouter-panel-header > button[data-action] { cursor:pointer; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-icon { display:inline-block; width:20px; text-align:center; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-level { display:inline-block; width:30px; text-align:right; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-name { display:inline-block; width:60px; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-hp { display:inline-block; width:50px; text-align:center; overflow:hidden; vertical-align: bottom; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-rating-bar { display:inline-block; width:" + (t.WidthCurrent - 205) + 'px; }\ndiv.brain-hud-scouter-panel-header > button > span.hero-rating { display:inline-block; width:30px; text-align:right; font-size:8pt; vertical-align:top; }\n\ndiv.brain-hud-inventory-buttons { text-align:center; }\n\ndiv.brain-hud-container .active { display:block; }\n\ndiv.brain-hud-container .star { color: darkgoldenrod; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; }\ndiv.brain-hud-container .evo-star { color: gold; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; }\n\ndiv.brain-hud-container img { height:16px; width:16px; }\ndiv.brain-hud-container img.icon-12 { height:12px; width:12px; }\ndiv.brain-hud-container img.icon-20 { height:20px; width:20px; }\n\ndiv.brain-hud-child-scroller { max-height:180px; overflow:auto; }\ndiv.brain-hud-scouter-panel-content.active,\ndiv.brain-hud-child-scroller.active { border:1px solid #aaa; border-radius:10px; }\n\ndiv.progress { margin-bottom:0; height:10px; }\ndiv.progress > div.progress-bar { line-height:10px; font-size:8px; font-weight:bold; clear:none; }\n\ndiv.brain-hud-container .badge,\ndiv.brain-hud-container .bs-btn-group-xs > .bs-btn,\ndiv.brain-hud-container .bs-btn-xs { font-size:11px; }\n\ndiv.brain-hud-container .badge.bg-success { background-color:#3c763d; }\ndiv.brain-hud-container .badge.bg-danger { background-color:#a94442; }\ndiv.brain-hud-container [data-action="sort-heroes"] { cursor:pointer; }\n</style>';
            e.$("head").append(r)
        }

        function o() {
            e.$().get("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css").then(function(t) {
                e.$("head").append('<style type="text/css">' + t.replace(/\.btn/g, ".bs-btn") + "</style>"), i()
            })
        }

        function s(t, r, n, a) {
            return '<button class="bs-btn bs-btn-default brain-hud-button" type="button" data-action="toggle-' + t + '" data-' + t + '="' + r + '">' + e.getImg(n, a || r) + "</button>"
        }

        function u() {
            var t = '<div class="brain-hud-header">\n\t<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-left" data-action="toggle-hud-bigger">[+]</button>\n\t<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right" data-action="toggle-hud-smaller">[-]</button>\n\t<span class="header">The Brain HUD</span>\n</div>\n<div class="brain-hud-main-container active">\n\t<div class="brain-hud-scouter-player-container">\n\t\t<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right" data-action="toggle-player-scouter">[-]</button>\n\t\t<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right" data-action="refresh-player">' + e.getImg12("icons", "glyphicons-82-refresh") + '</button>\n\t\t<select id="brain-hud-scouter-player-target" data-action="toggle-scouter-player"></select>\n\t\t<div id="brain-hud-scouter-player-report" class="brain-hud-scouter-player-report active"></div>\n\t</div>\n\t<div id="brain-hud-inventory" class="brain-hud-inventory">\n\t\t<strong>Inventory</strong>\n\t\t<button class="bs-btn bs-btn-link bs-btn-xs" style="float:center;" data-action="hud-to-library">[library]</button>\n\t\t<button class="bs-btn bs-btn-link bs-btn-xs brain-hud-toggle pull-right" data-action="toggle-inventory">[-]</button>\n\t\t<div class="brain-hud-inventory-container active">\n\t\t\t<div class="text-center">\n\t\t\t\t<div class="bs-btn-group bs-btn-group-xs brain-hud-inventory-buttons" role="group">\n\t\t\t\t\t' + s("element", e.ElementType.Air, "elements", "Air") + "\n\t\t\t\t\t" + s("element", e.ElementType.Earth, "elements", "Earth") + "\n\t\t\t\t\t" + s("element", e.ElementType.Fire, "elements", "Fire") + "\n\t\t\t\t\t" + s("element", e.ElementType.Spirit, "elements", "Spirit") + "\n\t\t\t\t\t" + s("element", e.ElementType.Water, "elements", "Water") + "\n\t\t\t\t\t" + s("element", e.ElementType.Neutral, "elements", "Loop") + '\n\t\t\t\t</div>\n\t\t\t\t<div class="bs-btn-group bs-btn-group-xs brain-hud-inventory-buttons">\n\t\t\t\t\t' + s("klass", e.KlassType.Magic, "classes", "Magic") + "\n\t\t\t\t\t" + s("klass", e.KlassType.Might, "classes", "Might") + "\n\t\t\t\t\t" + s("klass", e.KlassType.Skill, "classes", "Skill") + "\n\t\t\t\t\t" + s("klass", "Brag", "cardtypes") + "\n\t\t\t\t\t" + s("type", e.ItemType.Rune, "runes", "Meteor") + "\n\t\t\t\t\t" + s("type", e.ItemType.Crystal, "crystals", "Neutral") + '\n\t\t\t\t</div><br/>\n\t\t\t\t<div class="bs-btn-group bs-btn-group-xs brain-hud-inventory-buttons">\n\t\t\t\t\t' + s("type", "BoosterCard", "misc", "Boosters") + "\n\t\t\t\t\t" + s("type", "WildCard", "cardtypes", "WildCard") + "\n\t\t\t\t\t" + s("type", e.ItemType.EvoJar, "misc", "EvoJars") + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id="brain-hud-inventory-items-container" class="brain-hud-inventory-items-container"></div>\n\t\t</div>\n\t</div>\n</div>';
            e.$("body").append('<div id="brain-hud-container" class="brain-hud-container">' + t + "</div>")
        }
        t.WidthDefault = 275, t.WidthCurrent = +e.utils.getFromStorage("BH-HUD-WidthCurrent") || t.WidthDefault, t.WidthMinimum = 200, t.WidthDelta = 25, t.WidthCollapsed = 25, t.render = r, t.resize = n
    }(t = e.hud || (e.hud = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r;
        ! function(t) {
            function r(t) {
                return e.$('div.brain-hud-scouter-player[data-guid="' + t + '"]').length || e.$("div#brain-hud-scouter-player-report").append('<div class="brain-hud-scouter-player" data-guid="' + t + '"></div>'), e.$('div.brain-hud-scouter-player[data-guid="' + t + '"]')
            }

            function n(t, n) {
                void 0 === n && (n = -1);
                var i = t.isFullMeat,
                    o = i ? "&#9734;" : "",
                    s = t.isArena || i ? "" : ' <span style="white-space:nowrap;">(' + t.completionPercent + "%)</span>",
                    u = '<div class="player-name" data-action="sort-heroes">' + o + " " + e.utils.htmlFriendly(t.name) + " " + s + "</div>",
                    l;
                t.heroes.sort(e.utils.sort.byElementThenKlass).forEach(function(r) {
                    if (!r.isLocked) {
                        var n = t.guid + "-" + r.guid,
                            i = r.isLocked ? e.getImg("misc", "Lock") : e.getImg("heroes", r.name),
                            o = r.isLocked ? "" : r.level == e.HeroRepo.MaxLevel ? r.isMeat ? '<span class="evo-star">&#9734;</span>' : '<span class="star">&#9734;</span>' : "(" + r.level + ")",
                            s = r.isLocked ? "" : e.utils.truncateNumber(r.hitPoints) + " HP",
                            l = r.hero.maxPowerThresholds,
                            d = r.powerRating,
                            c = Math.round(100 * d / l[d < l[3] ? 3 : 4]),
                            p = d <= l[0] ? "progress-bar-info" : d <= l[1] ? "progress-bar-success" : d <= l[2] ? "progress-bar-warning" : "progress-bar-danger",
                            h = r.isLocked ? "" : (r.hasOP ? '<div class="progress" style="background-color:pink;">' : '<div class="progress">') + '<div class="progress-bar ' + p + '" style="width:' + c + '%;"><span></span></div></div>',
                            f = r.isLocked ? "" : d,
                            g = '<span class="hero-icon">' + i + '</span><span class="hero-name">' + r.name + '</span><span class="hero-level">' + o + '</span><span class="hero-hp">' + s + '</span><span class="hero-rating-bar">' + h + '</span><span class="hero-rating">' + f + "</span>",
                            y = "";
                        if (t.isMe || t.isAlly) {
                            var m = r.playerHeroAbilities.map(function(t) {
                                    var n = t.isMaxed ? "; maxed" : t.isCapped ? "; capped" : "",
                                        a = t.isLocked ? e.getImg("misc", "Lock") : "(" + t.level + " / " + t.levelMax + n + ")",
                                        i = t.img + " " + t.name + " " + a,
                                        o = "";
                                    return t.isMaxed || (o += t.materialHtml, o += t.goldHtml), e.renderExpandable(r.guid + t.guid, i, o)
                                }),
                                b = r.deck.map(function(e) {
                                    return e.rowHtml
                                }).join("");
                            y = "" + m.join("") + b
                        }
                        u += a(n, r.elementType, g, y, t.isMe || t.isAlly)
                    }
                }), r(-1 == n ? t.guid : "arena-" + n).html(u)
            }

            function a(t, r, n, a, i) {
                var o;
                return '<div class="brain-hud-scouter-panel" data-guid="' + t + '"><div class="brain-hud-scouter-panel-header">' + ('<button class="bs-btn bs-btn-link bs-btn-sm ' + e.ElementType[r] + '" ' + (i ? 'data-action="toggle-scouter-hero"' : "") + ">" + n + "</button>") + '</div><div class="brain-hud-scouter-panel-content">' + a + "</div></div>"
            }
            t.loadPlayer = n
        }(r = t.scouter || (t.scouter = {}))
    }(t = e.hud || (e.hud = {}))
}(bh || (bh = {})),
function(e) {
    var t;
    ! function(t) {
        var r = window.jQuery,
            n = null,
            a, i;

        function o(e) {
            return e.trim().replace(/\W/g, "")
        }

        function s() {
            a = new e.Messenger(window, d, window.open("http://http://bh.halfmugtavern.blog/cards.html?hud,complete", "bh-hud-library", "", !0))
        }

        function u(t, r) {
            void 0 === r && (r = null);
            var n = e.messenger.createMessage(t, {
                action: t,
                data: r
            });
            n.playerGuid = t, n.sessionKey = t, a.postMessage(n)
        }

        function l() {
            var t;
            location.search.includes("hud") ? (a = new e.Messenger(window, d, window.opener), u("library-requesting-player")) : c()
        }

        function d(t) {
            var r = t.data || t.originalEvent && t.originalEvent.data || null;
            r && ("hud-sending-player" == r.action && r.data && (n = new e.Player(r.data), c()), "library-requesting-player" == r.action && u("hud-sending-player", e.Player.me._pp))
        }

        function c() {
            e.host = "https://docs.google.com/spreadsheets/d/e/", e.data.init().then(K), r("body").on("click", '[data-action="show-card"]', v), r("body").on("click", '[data-action="show-item"]', b), r("body").on("click", "[data-search-term]", p), r("input.library-search").on("change keyup", x), r("button.library-search-clear").on("click", h), r("input[type='range']").on("change input", f);
            var t = r("#card-evolution div.tab-pane"),
                n = t.html();
            t.html(n).toArray().forEach(function(e, t) {
                return r(e).find("h3").text("Evolution from " + t + " to " + (t + 1))
            })
        }

        function p(e) {
            var t, n = r(e.target).closest("[data-search-term]").attr("data-search-term"),
                a = n.toLowerCase(),
                i = r("input.library-search"),
                o = i.val(),
                s;
            o.trim().toLowerCase().split(/\s+/).includes(a) || (i.focus().val((o + " " + n).trim()).blur(), w((o + " " + n).trim().toLowerCase()))
        }

        function h() {
            C = null, r("input.library-search").val(""), r('a[href="#card-table"] > span.badge').text(String(e.data.BattleCardRepo.length)), r('a[href="#effect-table"] > span.badge').text(String(e.data.EffectRepo.length)), r('a[href="#item-table"] > span.badge').text(String(e.data.ItemRepo.length)), r("tbody > tr[id]").show()
        }

        function f(t) {
            var n = r("#card-slider-evo").val(),
                a = r("#card-slider-level").val();
            r("#card-slider-types").html('<span style="padding-left:25px;">' + n + "." + ("0" + a).substr(-2) + "</span><br/>" + i.typesTargets.map(function(t, r) {
                return e.getImg20("cardtypes", t.split(" ")[0].replace("Damage", "Attack")) + " " + t + " (" + e.utils.formatNumber(g(r, n, a)) + ")"
            }).join("<br/>"))
        }

        function g(t, r, n) {
            var a = {
                configId: i.guid,
                evolutionLevel: r,
                level: n
            };
            return e.data.BattleCardRepo.calculateValue(a, t)
        }

        function y(e) {
            return g(e, 0, 0)
        }

        function m(t) {
            var r, n;
            return g(t, i.rarityType + 1, e.BattleCardRepo.getLevelsForRarity(i.rarityType) - 1)
        }

        function b(t) {
            var n, a, i = r(t.target).closest("tr").attr("id"),
                o = e.data.ItemRepo.find(i);
            r("div.modal-item").modal("show"), r("#item-name").html(o.name + " &nbsp; " + W([o.name]).join(" ")), r("#item-rarity").html(e.utils.evoToStars(o.rarityType) + " " + e.RarityType[o.rarityType]), r("#item-element").html(e.ElementRepo.toImage(o.elementType) + " " + e.ElementType[o.elementType]);
            var s = e.data.DungeonRepo.getDropRates(o.name).map(function(e) {
                return "<tr><td>" + e.dungeon.name + "</td><td>" + e.dungeon.keys + " keys</td><td>" + Math.round(1e3 * e.dropRate.averagePerKey) / 10 + "% / key</td></tr>"
            }).join("");
            r("#item-dungeons").html('<table class="table table-striped table-condensed"><tbody>' + s + "</tbody></table>")
        }

        function v(t) {
            var n, a, s = r(t.target).closest("tr").attr("id"),
                u = e.data.BattleCardRepo.find(s);
            i = u, r("div.modal-card").modal("show"), r("#card-name").html(u.name + " &nbsp; " + q(u).join(" ")), r("#card-image").attr("src", e.getSrc("battlecards", "blank", o(u.name))), r("#card-element").html(e.ElementRepo.toImage(u.elementType) + " " + e.ElementType[u.elementType]), r("#card-klass").html(e.KlassRepo.toImage(u.klassType) + " " + e.KlassType[u.klassType]), r("#card-klass").removeClass("Magic Might Skill").addClass(e.KlassType[u.klassType]), r("#card-rarity").html(e.utils.evoToStars(u.rarityType) + " " + e.RarityType[u.rarityType]), r("#card-types").html(u.typesTargets.map(function(t, r) {
                return e.getImg20("cardtypes", t.split(" ")[0].replace("Damage", "Attack")) + " " + t.split(" ")[0].replace("Damage", "Attack") + " (" + e.utils.formatNumber(y(r)) + " - " + e.utils.formatNumber(m(r)) + ")"
            }).join("<br/>")), r("#card-turns").html(String(u.turns)), r("div.panel-card span.card-brag").html(String(u.brag)), r("div.panel-card span.card-min").html(u.minValues.map(function(e) {
                return e.join()
            }).join(" :: ")), r("div.panel-card span.card-max").html(u.maxValues.join(" :: ")), r("div.panel-card span.card-mats").html(u.mats.join()), r("#card-targets").html(e.EffectRepo.mapTargets(u).map(function(t) {
                return e.EffectRepo.toImage(t) + " " + t.name + "<br/>"
            }).join("")), r("#card-effects").html(e.EffectRepo.mapEffects(u).map(function(t) {
                return e.EffectRepo.toImage(t) + " " + t.name + "<br/>"
            }).join("")), r("#card-perks").html(e.EffectRepo.mapPerks(u).map(function(t) {
                return e.EffectRepo.toImage(t) + " " + t.name
            }).join("<br/>")), r("div.panel-card span.card-perk").html(u.perkBase + "%"), r("#card-mats").html(u.mats.map(function(t) {
                return e.data.ItemRepo.find(t)
            }).map(function(t) {
                return e.ItemRepo.toImage(t) + " " + t.name
            }).join("<br/>"));
            var l = new e.Recipe(u),
                d = 0,
                c = 0,
                p = r("#card-evolution > ul.nav > li").toArray();
            [0, 1, 2, 3, 4].forEach(function(t) {
                var n = l.evos[t],
                    a = "#evo-" + t + "-" + (t + 1),
                    i = r(p[t]).removeClass("disabled");
                if (!n) return r(a + " tbody").html(""), void i.addClass("disabled");
                var s = "",
                    h = e.data.getMinGoldNeeded(u.rarityType, n.evoFrom),
                    f = e.data.getMaxGoldNeeded(u.rarityType, n.evoFrom);
                if (d += h, c += f, s += T(e.getImg("misc", "Coin"), "Gold", h, f), n.items.filter(function(e) {
                        return !!e.max
                    }).forEach(function(t) {
                        return s += T(e.getImg20("evojars", o(t.item.name)), t.item.name, t.min, t.max)
                    }), 5 == n.evoTo) {
                    var g = e.data.ItemRepo.crystals.find(function(e) {
                            return e.elementType == u.elementType
                        }),
                        y = e.data.HeroRepo.all.find(function(e) {
                            return e.elementType == u.elementType && e.klassType == u.klassType
                        }),
                        m = e.data.ItemRepo.runes.find(function(e) {
                            return e.name.startsWith(y.name)
                        });
                    s += T(e.getImg20("crystals", e.ElementType[u.elementType]), g.name, e.data.getMinCrystalsNeeded(u.rarityType, n.evoFrom), e.data.getMaxCrystalsNeeded(u.rarityType, n.evoFrom)), s += T(e.getImg20("runes", o(y.trait.name)), m.name, e.data.getMinRunesNeeded(u.rarityType, n.evoFrom), e.data.getMaxRunesNeeded(u.rarityType, n.evoFrom))
                }
                r(a + " tbody").html(s)
            });
            var h = r("#evo-all tbody").html("");
            if (h.append(T(e.getImg("misc", "Coin"), "Gold", d, c)), l.all.forEach(function(t) {
                    h.append(T(e.getImg20("evojars", o(t.item.name)), t.item.name, t.min, t.max))
                }), u.rarityType == e.RarityType.Legendary) {
                var f = e.data.ItemRepo.crystals.find(function(e) {
                        return e.elementType == u.elementType
                    }),
                    g = e.data.HeroRepo.all.find(function(e) {
                        return e.elementType == u.elementType && e.klassType == u.klassType
                    }),
                    b = e.data.ItemRepo.runes.find(function(e) {
                        return e.name.startsWith(g.name)
                    });
                h.append(T(e.getImg20("crystals", e.ElementType[u.elementType]), f.name, e.data.getMinCrystalsNeeded(u.rarityType, 0), e.data.getMaxCrystalsNeeded(u.rarityType, 4))), h.append(T(e.getImg20("runes", o(g.trait.name)), b.name, e.data.getMinRunesNeeded(u.rarityType, 0), e.data.getMaxRunesNeeded(u.rarityType, 4)))
            }
            r("#card-evolution .active").removeClass("active"), r("#card-evolution > ul.nav > li").first().addClass("active"), r("#card-evolution > div.tab-content > div.tab-pane").first().addClass("active"), r("#card-slider-evo").val(0).attr("max", u.rarityType + 1), r("#card-slider-evo-labels-table tbody").html(new Array(u.rarityType + 2).fill(1).map(function(e, t) {
                return '<td class="text-' + (t ? t == u.rarityType + 1 ? "right" : "center" : "left") + '">' + t + "</td>"
            }).join(""));
            var v = e.BattleCardRepo.getLevelsForRarity(u.rarityType),
                R = 10 == v ? [1, 5, 10] : 20 == v ? [1, 5, 10, 15, 20] : 35 == v ? [1, 5, 10, 15, 20, 25, 30, 35] : [1, 10, 20, 30, 40, 50];
            r("#card-slider-level").val(1).attr("max", v), r("#card-slider-level-labels-table tbody").html(R.map(function(e, t) {
                return '<td class="text-' + (t ? t == R.length - 1 ? "right" : "center" : "left") + '">' + e + "</td>"
            }).join("")), r("#card-slider-types").html('<span style="padding-left:25px;">0.01</span><br/>' + u.typesTargets.map(function(t, r) {
                return e.getImg20("cardtypes", t.split(" ")[0].replace("Damage", "Attack")) + " " + t + " (" + e.utils.formatNumber(y(r)) + ")"
            }).join("<br/>"))
        }

        function T(t, r, n, a) {
            return '<tr><td class="icon">' + t + '</td><td class="name">' + r + '</td><td class="min">' + e.utils.formatNumber(n) + '</td><td class="max">' + e.utils.formatNumber(a) + "</td></tr>"
        }
        t.openLibraryFromHud = s, t.init = l, t.handleLibraryMessage = d;
        var R = {
                card: {},
                effect: {},
                item: {},
                dungeon: {}
            },
            C;

        function x(e) {
            w(r(e.target).val().trim().toLowerCase())
        }

        function w(e) {
            if (!e) return h();
            C = e, ["card", "effect", "item", "dungeon"].forEach(function(t) {
                return setTimeout(function(e) {
                    B(t, e)
                }, 0, e)
            })
        }

        function P(t) {
            switch (t) {
                case "card":
                    return e.data.BattleCardRepo.all;
                case "effect":
                    return e.data.EffectRepo.all;
                case "item":
                    return e.data.ItemRepo.all;
                case "dungeon":
                    return e.data.DungeonRepo.all;
                default:
                    return []
            }
        }
        var E = {};

        function k(t) {
            if (!E[t.guid]) {
                var r = E[t.guid] = [];
                t.brag && r.push("brag"), t.effects.forEach(function(e) {
                    return r.push(e.toLowerCase().replace(/shield break(er)?/, "crush"))
                }), r.push(e.ElementType[t.elementType].toLowerCase()), r.push(e.KlassType[t.klassType].toLowerCase()), r.push(t.lower), t.mats.forEach(function(e) {
                    return r.push(e.toLowerCase())
                }), t.perks.forEach(function(e) {
                    return r.push(e.toLowerCase())
                }), r.push(e.RarityType[t.rarityType].toLowerCase()), r.push(String(t.turns)), t.typesTargets.forEach(function(e) {
                    return r.push(e.toLowerCase().split(" (")[0])
                }), e.data.HeroRepo.all.filter(function(r) {
                    return r.klassType == t.klassType && (t.elementType == e.ElementType.Neutral || r.elementType == t.elementType)
                }).forEach(function(e) {
                    return r.push(e.lower)
                }), n && r.push(n.battleCards.find(function(e) {
                    return e.guid == t.guid
                }) ? "have" : "need")
            }
            return E[t.guid] || []
        }

        function M(e) {
            if (!E[e.guid]) {
                var t = E[e.guid] = [];
                t.push(e.description.toLowerCase()), t.push(e.lower)
            }
            return E[e.guid] || []
        }

        function H(t) {
            if (!E[t.guid]) {
                var r = E[t.guid] = [];
                r.push(e.ElementType[t.elementType].toLowerCase()), r.push(e.ItemType[t.itemType].toLowerCase()), r.push(t.lower), r.push(e.RarityType[t.rarityType].toLowerCase())
            }
            return E[t.guid] || []
        }

        function S(e) {
            if (!E[e.guid]) {
                var t = E[e.guid] = [];
                t.push(e.lower), e.mats.forEach(function(e) {
                    return t.push(e.name.toLowerCase())
                })
            }
            return E[e.guid] || []
        }
        var A = e.ElementRepo.allTypes.map(function(t) {
                return e.ElementType[t].toLowerCase()
            }),
            I = e.RarityRepo.allTypes.map(function(t) {
                return e.RarityType[t].toLowerCase()
            }),
            L = null;

        function j(t, r, n) {
            return "effect" == t ? O(r, n) : (L || (L = e.data.HeroRepo.all.map(function(e) {
                return e.lower
            })), A.includes(n) || I.includes(n) || L.includes(n) ? N(r, n) : O(r, n))
        }

        function N(e, t) {
            return e.find(function(e) {
                return e == t
            })
        }

        function O(e, t) {
            return e.find(function(e) {
                return e.includes(t)
            })
        }

        function B(e, t) {
            if (!R[e][t]) {
                var n = t.split(/\s+/);
                R[e][t] = P(e).filter(function(t) {
                    return !n.find(function(r) {
                        return !j(e, E[t.guid] || [], r)
                    })
                }).map(function(e) {
                    return e.guid
                })
            }
            var a = r('a[href="#' + e + '-table"] > span.badge'),
                i = R[e][t] || [],
                o = P(e).map(function(e) {
                    return e.guid
                }).filter(function(e) {
                    return !i.includes(e)
                });
            t == C && (r("#" + i.join(",#")).show(), r("#" + o.join(",#")).hide(), a.text(String(i.length)))
        }

        function _(t) {
            var r = [];
            return e.EffectRepo.mapTargets(t).forEach(function(e) {
                return r.includes(e) ? void 0 : r.push(e)
            }), e.EffectRepo.mapEffects(t).forEach(function(e) {
                return r.includes(e) ? void 0 : r.push(e)
            }), e.EffectRepo.mapPerks(t).forEach(function(e) {
                return r.includes(e) ? void 0 : r.push(e)
            }), r.reduce(function(e, t) {
                return ["Self", "Single"].includes(t.name) ? e : e.concat([t])
            }, [])
        }

        function G(e) {
            return e.replace("Splash Damage", "Splash").replace("Multi-Target (Ally)", "Multi").replace("Multi-Target (Enemy)", "Multi")
        }

        function D(e) {
            return _(e).map(function(e) {
                return U(e.guid, G(e.name), e.name + ": " + e.description)
            })
        }

        function W(t) {
            return t.map(function(t) {
                return e.data.ItemRepo.find(t)
            }).map(function(t) {
                return U(t.guid, t.name, t.name + ": " + e.RarityType[t.rarityType] + " " + e.ElementType[t.elementType] + " " + e.ItemType[t.itemType] + " (" + e.utils.formatNumber(e.ItemRepo.getValue(t.itemType, t.rarityType)) + " gold)")
            })
        }

        function q(t) {
            return e.data.HeroRepo.all.filter(function(r) {
                return (t.elementType == e.ElementType.Neutral || r.elementType == t.elementType) && r.klassType == t.klassType
            }).map(function(t) {
                return U(t.guid, t.name, t.name + ": " + e.ElementType[t.elementType] + " " + e.KlassType[t.klassType] + " Hero")
            })
        }

        function F(t) {
            return '<span class="stars" title="' + e.RarityType[t] + '" data-toggle="tooltip" data-placement="top">' + e.utils.evoToStars(t) + "</span>"
        }

        function K() {
            e.css.addCardTypes(r), e.css.addEffects(r), e.css.addElements(r), e.css.addHeroes(r), e.css.addItems(r), e.css.addKlasses(r), V(), J(), $(), X(), r("div.row.alert-row").remove(), r("div.row.table-row").show(), r('[data-toggle="tooltip"]').tooltip()
        }

        function U(e, t, r, n) {
            return void 0 === t && (t = e), void 0 === r && (r = t), void 0 === n && (n = !1), '<div class="' + (n ? "hidden-xs" : "") + " bh-hud-image img-" + e + '" title="' + r + '" data-toggle="tooltip" data-placement="top" data-search-term="' + t + '"></div>'
        }

        function $() {
            var t = location.search.includes("complete"),
                a = e.data.BattleCardRepo.all;
            r('a[href="#card-table"] > span.badge').text(String(a.length));
            var i = r("table.card-list > tbody").html("");
            a.forEach(function(r) {
                k(r);
                var a = n && n.battleCards.find(function(e) {
                        return r.guid == e.guid
                    }),
                    o = '<tr id="' + r.guid + '">';
                n && (o += '<td><span class="card-owned glyphicon ' + (a ? "glyphicon-ok text-success" : "glyphicon-remove text-danger") + '" title="' + (a ? "Have" : "Need") + '" data-toggle="tooltip" data-placement="top"></span></td>'), o += '<td><div class="bh-hud-image img-' + (r.brag ? "Brag" : "BattleCard") + '" title="' + (r.brag ? "Brag" : "BattleCard") + '" data-toggle="tooltip" data-placement="top"></div></td>', o += '<td><span class="card-name"><a class="btn btn-link" data-action="show-card" style="padding:0;">' + r.name + "</a></span></td>", o += '<td class="text-center"><span class="card-rating">' + e.utils.formatNumber(e.PowerRating.rateBattleCard(r, e.MinMaxType.Max)) + "</span></td>", t && (o += '<td class="text-center" data-search-term="' + e.RarityType[r.rarityType] + '">' + F(r.rarityType) + "</td>"), t && (o += "<td>" + U(e.ElementType[r.elementType]) + "</td>"), t && (o += "<td>" + U(e.KlassType[r.klassType], void 0, void 0, !0) + "</td>"), o += "<td>" + q(r).join("") + "</td>", t && (o += '<td class="hidden-xs">' + D(r).join("") + "</td>"), t && (o += '<td class="hidden-xs">' + W(r.mats).join("") + "</td>"), o += '<td class="hidden-xs" style="width:100%;"></td>', o += "</td></tr>", i.append(o)
            })
        }

        function V() {
            var t = e.data.EffectRepo.all;
            r('a[href="#effect-table"] > span.badge').text(String(t.length));
            var n = r("table.effect-list > tbody");
            t.forEach(function(e) {
                M(e);
                var t = '<tr id="' + e.guid + '">';
                t += '<td><div class="bh-hud-image img-' + e.guid + '"></div></td>', t += '<td><span class="card-name">' + e.name + '</span><div class="visible-xs-block" style="border-top:1px dotted #666;">' + e.description + "</div></td>", t += '<td class="hidden-xs" style="width:100%;"><span class="card-description">' + e.description + "</span></td>", t += "</td></tr>", n.append(t)
            })
        }

        function J() {
            var t = e.data.ItemRepo.all;
            r('a[href="#item-table"] > span.badge').text(String(t.length));
            var a = r("table.mat-list > tbody");
            t.forEach(function(t) {
                var r = n && n.inventory.find(function(e) {
                    return e.guid == t.guid
                });
                H(t);
                var i = '<tr id="' + t.guid + '">';
                i += '<td><div class="bh-hud-image img-' + t.guid + '"></div></td>', i += '<td><span class="card-name"><a class="btn btn-link" data-action="show-item" style="padding:0;">' + t.name + "</a></span></td>", i += "<td>" + F(t.rarityType) + "</td>", n && (i += '<td><span class="badge">' + e.utils.formatNumber(r && r.count || 0) + "</span></td>"), i += '<td class="hidden-xs" style="width:100%;"></td>', i += "</td></tr>", a.append(i)
            })
        }

        function X() {
            var t = e.data.DungeonRepo.all;
            r('a[href="#dungeon-table"] > span.badge').text(String(t.length));
            var n = r("table.dungeon-list > tbody");
            t.forEach(function(t) {
                S(t);
                var r = '<tr id="' + t.guid + '">';
                r += '<td><span class="">' + t.name + "</span></td>", r += '<td><span class="">' + e.getImg20("keys", "SilverKey") + " " + t.keys + "</span></td>", r += '<td><span class="">' + e.getImg20("misc", "Fame") + " " + e.utils.formatNumber(t.fame) + "</span></td>", r += '<td><span class="">' + e.getImg20("keys", "RaidTicket") + "</span></td>", r += '<td><span class="">' + e.getImg20("misc", "Coin") + " " + e.utils.formatNumber(t.gold) + " <small>(" + e.utils.formatNumber(Math.round(t.gold / t.keys)) + " / key)</small></span></td>";
                try {
                    r += '<td><span class="">' + t.elementTypes.map(function(t) {
                        return '<div class="bh-hud-image img-' + e.ElementType[t] + '"></div>'
                    }).join("") + "</span></td>", r += "<td/>", r += "<td/>", r += "<td><span>" + W(t.mats.map(function(e) {
                        return e.name
                    })).join("") + "</span></td>", r += '<td><span class="">' + t.randomMats.map(function(t, r) {
                        return t ? e.getImg20("evojars", "random", e.RarityType[r] + "_Neutral_Small") + t : ""
                    }).join(" ") + "</span></td>"
                } catch (e) {
                    console.error("HUD: " + e)
                }
                r += '<td class="hidden-xs" style="width:100%;"></td>', r += "</td></tr>", n.append(r)
            })
        }
    }(t = e.library || (e.library = {}))
}(bh || (bh = {}));
