// ==UserScript==
// @name         Big Sur UnityLoader Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

console.log('ran script');

var appVersion = navigator.appVersion;
appVersion = appVersion.replace('11_', '10_');


var userAgent = navigator.userAgent;
userAgent = userAgent.replace('11_', '10_');

navigator.__defineGetter__('appVersion', function(){
    return appVersion;
});

navigator.__defineGetter__('userAgent', function(){
    return userAgent;
});
