<img src="/images/logo.png" width=25%>

Sourcepoint's HTML5 OTT solution allows you to surface a Sourcepoint CMP message on devices such as Tizen and webOS for supported regulatory frameworks.

# Table of Contents

- [Implementation overview](#implementation-overview)
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

The client configuration script contains your organization's specific account configuration parameters. This configuration includes the necessary and optional parameters for your property to communicate with the Sourcepoint messaging platform and consent service libraries. The majority of customizations made to your implementation will be implemented in this script.

The following properties are **required** in the `config` object of the script to successfully surface messages set up in the Sourcepoint portal:

| **Property**       | **Data Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accountId`        | Number        | Value associates the property with your organization's Sourcepoint account. Your organization's accountId can be retrieved by contacting your Sourcepoint Account Manager or via the **My Account** page in your Sourcepoint account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `baseEndpoint`     | String        | A single server endpoint that serves the messaging experience.<br><br>For GDPR TCF, U.S. Multi-State Privacy, U.S. Privacy (Legacy), GDPR Standard, and Custom Messaging, the baseEndpoint is https://cdn.privacy-mgmt.com.<br><br>**Note**: The baseEndpoint can also be changed to a CNAME first-party subdomain in order to persist first-party cookies on Safari web browser (due to Safari’s ITP) by setting cookies through the server with set-cookie rather than using document.cookie on the page.                                                                                                                                                                                                     |
| `propertyHref`     | String        | Maps the implementation to a specific URL as set up in the Sourcepoint account dashboard. Use `propertyHref` to spoof messaging campaigns onto a local environment for testing or debugging.<br><br>**Note**: When a campaign is ready to launch publicly to your end-users, we recommend that you replace `propertyHref` with the more efficient `propertyId` parameter. [Click here](https://docs.sourcepoint.com/hc/en-us/articles/8938401981843-Best-practices-propertyHref#h_01GB81HYASFG9GJ4Q3GR0VSQK2) for more information on working with `propertyHref`.                                                                                                                                              |
| `propertyId`       | Number        | Maps the message to a specific property set up in the Sourcepoint portal. Use `propertyId` instead of `propertyHref` when launching your campaign to end-users publicly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| campaign object(s) | Object        | Campaigns are surfaced on yout HTML5 device by adding campaign objects to your client configuration script.<br><br>The following Sourcepoint campaigns are supported via our HTML5 OTT solution:<br><br>`gdpr: {}` - GDPR TCF or GDPR Standard campaigns<br>`ccpa: {}` - U.S. Privacy (Legacy) campaigns<br><br>U.S. Multi-State Privacy campaigns are currently not supported for HTML5 OTT devices. If your organization needs to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework, you will need to configure a U.S. Privacy (Legacy) campaign to do so. [<br>Click here<br>](<br>#us-multi-state-privacy-campaign-support<br>) for more information about this configuration. |

```javascript
<script type="text/javascript">
  window._sp_queue = [];
  window._sp_ = {
      config: {
          accountId: 22,
          baseEndpoint: 'https://cdn.privacy-mgmt.com',
          propertyHref: 'http://tizenapp',
          gdpr: { },
          ccpa: { }
      }
}
</script>
```

### URL to messaging library

The final script in the implementation is a URL that points to Sourcepoint's messaging libraries. This script only needs to be included once regardless of how many different types of messaging campaigns you run on the property.

```javascript
<script src="https://cdn.privacy-mgmt.com/unified/wrapperMessagingWithoutDetection.js"></script>
```

> If your organization has edited the baseEndpoint with a `CNAME DNS` record you will also need to edit the URL. Please follow the following format if necessary: `https://cname.subdomain/unified/wrapperMessagingWithoutDetection.js`

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
