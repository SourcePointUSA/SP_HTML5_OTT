<img src="/images/logo.png" width=25%>

Sourcepoint's HTML5 OTT solution allows you to surface a Sourcepoint CMP message on devices such as Tizen and webOS for supported regulatory frameworks.

# Table of Contents

- [Implementation overview](#implementation-overview)
- [Supported campaigns](#supported-campaigns)
- [Resurface OTT message](#resurface-ott-message)
- [Global Privacy Platform (GPP) Multi-State Privacy (MSPS) support](#global-privacy-platform-gpp-multi-state-privacy-msps-support)
- [APIs](#apis)

## Implementation overview

Every implementation requires a bundle of scripts that must be added to your `index.html` file in order to surface the appropriate message configured in the Sourcepoint portal.

- [Stub file(s)](#stub-files)
- [Client configuration script](#client-configuration-script)
- [URL to messaging library](#url-to-messaging-library)

### Stub file(s)

The first part implementation script(s) contains the IAB stub functions. The stub functions set up the IAB privacy string object `__tcfapi` (for GDPR TCF campaigns) or `__uspapi` (for U.S. Privacy (Legacy) campaigns), respectively.

This makes it available on queue to be called and released when needed. It is important to have these stub file(s) in the first position to avoid errors and failure of service.

> Note: There is no stub file when configuring a GDPR Standard campaign for your project.

```javascript
// GDPR TCF stub file. Example only. Please use stub file generated in Sourcepoint portal as it may have changed.
<script type="text/javascript">
    function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(){for(var t,e,o=[],n=window,r=n;r;){try{if(r.frames.__tcfapiLocator){t=r;break}}catch(t){}if(r===n.top)break;r=n.parent}t||(function t(){var e=n.document,o=!!n.frames.__tcfapiLocator;if(!o)if(e.body){var r=e.createElement("iframe");r.style.cssText="display:none",r.name="__tcfapiLocator",e.body.appendChild(r)}else setTimeout(t,5);return!o}(),n.__tcfapi=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(!n.length)return o;"setGdprApplies"===n[0]?n.length>3&&2===parseInt(n[1],10)&&"boolean"==typeof n[3]&&(e=n[3],"function"==typeof n[2]&&n[2]("set",!0)):"ping"===n[0]?"function"==typeof n[2]&&n[2]({gdprApplies:e,cmpLoaded:!1,cmpStatus:"stub"}):o.push(n)},n.addEventListener("message",(function(t){var e="string"==typeof t.data,o={};if(e)try{o=JSON.parse(t.data)}catch(t){}else o=t.data;var n="object"===_typeof(o)?o.__tcfapiCall:null;n&&window.__tcfapi(n.command,n.version,(function(o,r){var a={__tcfapiReturn:{returnValue:o,success:r,callId:n.callId}};t&&t.source&&t.source.postMessage&&t.source.postMessage(e?JSON.stringify(a):a,"*")}),n.parameter)}),!1))}();
</script>
```

```javascript
// US Privacy (Legacy) stub file. Example only. Please use stub file generated in Sourcepoint portal as it may have changed.
<script>
    (function () { var e = false; var c = window; var t = document; function r() { if (!c.frames["__uspapiLocator"]) { if (t.body) { var a = t.body; var e = t.createElement("iframe"); e.style.cssText = "display:none"; e.name = "__uspapiLocator"; a.appendChild(e) } else { setTimeout(r, 5) } } } r(); function p() { var a = arguments; __uspapi.a = __uspapi.a || []; if (!a.length) { return __uspapi.a } else if (a[0] === "ping") { a[2]({ gdprAppliesGlobally: e, cmpLoaded: false }, true) } else { __uspapi.a.push([].slice.apply(a)) } } function l(t) { var r = typeof t.data === "string"; try { var a = r ? JSON.parse(t.data) : t.data; if (a.__cmpCall) { var n = a.__cmpCall; c.__uspapi(n.command, n.parameter, function (a, e) { var c = { __cmpReturn: { returnValue: a, success: e, callId: n.callId } }; t.source.postMessage(r ? JSON.stringify(c) : c, "*") }) } } catch (a) { } } if (typeof __uspapi !== "function") { c.__uspapi = p; __uspapi.msgHandler = l; c.addEventListener("message", l, false) } })();
</script>
```

```javascript
// US Multi-State Privacy stub file. Example only. Please use stub file generated in Sourcepoint portal as it may have changed.
window.__gpp_addFrame=function(e){if(!window.frames[e])if(document.body){var t=document.createElement("iframe");t.style.cssText="display:none",t.name=e,document.body.appendChild(t)}else window.setTimeout(window.__gpp_addFrame,10,e)},window.__gpp_stub=function(){var e=arguments;if(__gpp.queue=__gpp.queue||[],__gpp.events=__gpp.events||[],!e.length||1==e.length&&"queue"==e[0])return __gpp.queue;if(1==e.length&&"events"==e[0])return __gpp.events;var t=e[0],p=e.length>1?e[1]:null,s=e.length>2?e[2]:null;if("ping"===t)p({gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}},!0);else if("addEventListener"===t){"lastId"in __gpp||(__gpp.lastId=0),__gpp.lastId++;var n=__gpp.lastId;__gpp.events.push({id:n,callback:p,parameter:s}),p({eventName:"listenerRegistered",listenerId:n,data:!0,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else if("removeEventListener"===t){for(var a=!1,i=0;i<__gpp.events.length;i++)if(__gpp.events[i].id==s){__gpp.events.splice(i,1),a=!0;break}p({eventName:"listenerRemoved",listenerId:s,data:a,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else"hasSection"===t?p(!1,!0):"getSection"===t||"getField"===t?p(null,!0):__gpp.queue.push([].slice.apply(e))},window.__gpp_msghandler=function(e){var t="string"==typeof e.data;try{var p=t?JSON.parse(e.data):e.data}catch(e){p=null}if("object"==typeof p&&null!==p&&"__gppCall"in p){var s=p.__gppCall;window.__gpp(s.command,(function(p,n){var a={__gppReturn:{returnValue:p,success:n,callId:s.callId}};e.source.postMessage(t?JSON.stringify(a):a,"*")}),"parameter"in s?s.parameter:null,"version"in s?s.version:"1.1")}},"__gpp"in window&&"function"==typeof window.__gpp||(window.__gpp=window.__gpp_stub,window.addEventListener("message",window.__gpp_msghandler,!1),window.__gpp_addFrame("__gppLocator"));
</script>
```

### Client configuration script

### URL to messaging library

## Supported campaigns

Campaign are surfaced on yout HTML5 device by adding campaign objects to your configuration

The following Sourcepoint campaigns are supported via our HTML5 OTT solution:

| **Config object** | **Campaign**              |
| ----------------- | ------------------------- |
| `gdpr: {}`        | GDPR TCF or GDPR Standard |
| `ccpa: {}`        | U.S. Privacy (Legacy)     |

> U.S. Multi-State Privacy campaigns are currently not supported for HTML5 OTT devices. If your organization needs to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework, you will need to configure a U.S. Privacy (Legacy) campaign to do so. [Click here](#us-multi-state-privacy-campaign-support) for more information about this configuration.

## Resurface OTT message

The privacy manager JavaScript code is a snippet that is added to your project and allows an end-user to resurface a privacy manager. Using this link/button, end-users can directly manage their consent preferences on an ongoing basis without having to re-encounter your organization's first layer message.

Load the OTT message on demand by [retrieving the OTT message ID](https://docs.sourcepoint.com/hc/en-us/articles/20806618675603-Resurface-OTT-message) from the Sourcepoint portal and pass it to the `loadNativeOtt` function.

```javascript
//GDPR
window._sp_.gdpr.loadNativeOtt(GDPR_OTT_ID);

//U.S. Privacy (Legacy)
window._sp_.ccpa.loadNativeOtt(USP_LEGACY_OTT_ID);
```

Attach the `loadNativeOtt` function to an event handler on your project. Most organizations who implement this function will attach it to `onclick` event of an element.

```javascript
//GDPR
<button onclick="window._sp_.gdpr.loadNativeOtt(123456)">OTT GDPR</button>

//U.S. Privacy (Legacy)
<button onclick="window._sp_.ccpa.loadNativeOtt(987654)">OTT USP Legacy</button>
```

## Global Privacy Platform (GPP) Multi-State Privacy (MSPS) support

In the Sourcepoint portal, U.S. Multi-State Privacy campaigns are created to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework. Currently, U.S. Multi-State Privacy campaigns are not supported in Sourcepoint's HTML5 OTT solution.

If your organization wishes to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework you will need to specifically configure a U.S. Privacy (Legacy) campaign to do so.

> Once successfully, configured Sourcepoint will enable the Multi-State Privacy String (MSPS) alongside the U.S. Privacy String. The MSPS can be acessed via the [GPP API](https://sourcepoint-public-api.readme.io/reference/iab-global-privacy-platform-gpp-api).<br><br>Please be aware that this solution will only set the [U.S. National Privacy section of the MSPS](https://sourcepoint-public-api.readme.io/reference/us-national-privacy-section) and will not set values for sensitive data categories.

Add the GPP stub file in addition to the U.S. Privacy - CCPA stub file to `index.html`.

```javascript
//Example only. Please use stub file generated in Sourcepoint portal as it may have changed.
<script>
    window.__gpp_addFrame=function(e){if(!window.frames[e])if(document.body){var t=document.createElement("iframe");t.style.cssText="display:none",t.name=e,document.body.appendChild(t)}else window.setTimeout(window.__gpp_addFrame,10,e)},window.__gpp_stub=function(){var e=arguments;if(__gpp.queue=__gpp.queue||[],__gpp.events=__gpp.events||[],!e.length||1==e.length&&"queue"==e[0])return __gpp.queue;if(1==e.length&&"events"==e[0])return __gpp.events;var t=e[0],p=e.length>1?e[1]:null,s=e.length>2?e[2]:null;if("ping"===t)p({gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}},!0);else if("addEventListener"===t){"lastId"in __gpp||(__gpp.lastId=0),__gpp.lastId++;var n=__gpp.lastId;__gpp.events.push({id:n,callback:p,parameter:s}),p({eventName:"listenerRegistered",listenerId:n,data:!0,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else if("removeEventListener"===t){for(var a=!1,i=0;i<__gpp.events.length;i++)if(__gpp.events[i].id==s){__gpp.events.splice(i,1),a=!0;break}p({eventName:"listenerRemoved",listenerId:s,data:a,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else"hasSection"===t?p(!1,!0):"getSection"===t||"getField"===t?p(null,!0):__gpp.queue.push([].slice.apply(e))},window.__gpp_msghandler=function(e){var t="string"==typeof e.data;try{var p=t?JSON.parse(e.data):e.data}catch(e){p=null}if("object"==typeof p&&null!==p&&"__gppCall"in p){var s=p.__gppCall;window.__gpp(s.command,(function(p,n){var a={__gppReturn:{returnValue:p,success:n,callId:s.callId}};e.source.postMessage(t?JSON.stringify(a):a,"*")}),"parameter"in s?s.parameter:null,"version"in s?s.version:"1.1")}},"__gpp"in window&&"function"==typeof window.__gpp||(window.__gpp=window.__gpp_stub,window.addEventListener("message",window.__gpp_msghandler,!1),window.__gpp_addFrame("__gppLocator"));
</script>
```

Add the `includeGppApi` parameter to the `ccpa` object in your client configuration and set one of the following flag(s) depending on your organization's use case. [Click here](docs/MSPS_signatories.md) for more information on each attribute, possible values, and examples for signatories and non-signatories of the MSPA.

If `includeGppApi` is set to `true`, the following MSPA arguments will be set accordingly:

- `MspaCoveredTransaction`: `"no"`
- `MspaOptOutOptionMode`: `"na"`
- `MspaServiceProviderMode`: `"na"`

```
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        ccpa: {
            includeGppApi: true
        },
        propertyHref: 'https://www.testdemo.com',
```

Optionally, your organization can customize support for the MSPS by configuring the MSPA attributes as part of the GPP config.

```
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        ccpa: {
            includeGppApi: {
                "MspaCoveredTransaction": "yes",
                "MspaOptOutOptionMode": "yes",
                "MspaServiceProviderMode": "no"
            }
        },
        propertyHref: 'https://www.testdemo.com',
```

## APIs

Find comprehensive guides and documentation to help you start working with Sourcepoint's public APIs as quickly as possible for different regulatory frameworks in our [API Hub](https://sourcepoint-public-api.readme.io/reference/welcome-to-the-sourcepoint-api-hub).
