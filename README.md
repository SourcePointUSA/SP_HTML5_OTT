<img src="/images/logo.png" width=25%>

Sourcepoint's HTML5 OTT solution allows you to surface a Sourcepoint CMP message on devices such as Tizen, webOS, and HbbTV for supported regulatory frameworks.

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Implementation overview](#implementation-overview)
    - [Stub file(s)](#stub-files)
    - [Client configuration script](#client-configuration-script)
    - [URL to messaging library](#url-to-messaging-library)
  - [Optional configuration parameters](#optional-configuration-parameters)
    - [Overall optional client configuration parameters](#overall-optional-client-configuration-parameters)
    - [GDPR campaign optional client configuration parameters](#gdpr-campaign-optional-client-configuration-parameters)
    - [U.S. Privacy (Legacy) optional client configuration parameters](#us-privacy-legacy-optional-client-configuration-parameters)
  - [Event callbacks](#event-callbacks)
  - [Resurface OTT message](#resurface-ott-message)
  - [Single page application](#single-page-application)
  - [HbbTV Support](#hbbtv-support)
  - [Message language controls](#message-language-controls)
  - [Global Privacy Platform (GPP) Multi-State Privacy (MSPS) support](#global-privacy-platform-gpp-multi-state-privacy-msps-support)
  - [APIs](#apis)
  - [Device remote control](#device-remote-control)
    - [`navigation.js` file](#navigationjs-file)
    - [`main.js` file](#mainjs-file)
    - [Close message on Back button selection](#close-message-on-back-button-selection)

## Implementation overview

Every implementation requires a bundle of scripts that must be added to your `index.html` file in order to surface the appropriate message configured in the Sourcepoint portal.

- [Stub file(s)](#stub-files)
- [Client configuration script](#client-configuration-script)
- [URL to messaging library](#url-to-messaging-library)

### Stub file(s)

The first part implementation script(s) contains the IAB stub functions. The stub functions set up the IAB privacy string object `__tcfapi` (for GDPR TCF campaigns) or `__uspapi` (for U.S. Privacy (Legacy) campaigns), respectively.

This makes it available on queue to be called and released when needed. It is important to have these stub file(s) in the first position to avoid errors and failure of service.

> :notebook: Note: There is no stub file when configuring a GDPR Standard campaign for your project.

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
<script>
 window.__gpp_addFrame=function(e){if(!window.frames[e])if(document.body){var t=document.createElement("iframe");t.style.cssText="display:none",t.name=e,document.body.appendChild(t)}else window.setTimeout(window.__gpp_addFrame,10,e)},window.__gpp_stub=function(){var e=arguments;if(__gpp.queue=__gpp.queue||[],__gpp.events=__gpp.events||[],!e.length||1==e.length&&"queue"==e[0])return __gpp.queue;if(1==e.length&&"events"==e[0])return __gpp.events;var t=e[0],p=e.length>1?e[1]:null,s=e.length>2?e[2]:null;if("ping"===t)p({gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}},!0);else if("addEventListener"===t){"lastId"in __gpp||(__gpp.lastId=0),__gpp.lastId++;var n=__gpp.lastId;__gpp.events.push({id:n,callback:p,parameter:s}),p({eventName:"listenerRegistered",listenerId:n,data:!0,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else if("removeEventListener"===t){for(var a=!1,i=0;i<__gpp.events.length;i++)if(__gpp.events[i].id==s){__gpp.events.splice(i,1),a=!0;break}p({eventName:"listenerRemoved",listenerId:s,data:a,pingData:{gppVersion:"1.1",cmpStatus:"stub",cmpDisplayStatus:"hidden",signalStatus:"not ready",supportedAPIs:["2:tcfeuv2","5:tcfcav1","6:uspv1","7:usnatv1","8:uscav1","9:usvav1","10:uscov1","11:usutv1","12:usctv1"],cmpId:0,sectionList:[],applicableSections:[],gppString:"",parsedSections:{}}},!0)}else"hasSection"===t?p(!1,!0):"getSection"===t||"getField"===t?p(null,!0):__gpp.queue.push([].slice.apply(e))},window.__gpp_msghandler=function(e){var t="string"==typeof e.data;try{var p=t?JSON.parse(e.data):e.data}catch(e){p=null}if("object"==typeof p&&null!==p&&"__gppCall"in p){var s=p.__gppCall;window.__gpp(s.command,(function(p,n){var a={__gppReturn:{returnValue:p,success:n,callId:s.callId}};e.source.postMessage(t?JSON.stringify(a):a,"*")}),"parameter"in s?s.parameter:null,"version"in s?s.version:"1.1")}},"__gpp"in window&&"function"==typeof window.__gpp||(window.__gpp=window.__gpp_stub,window.addEventListener("message",window.__gpp_msghandler,!1),window.__gpp_addFrame("__gppLocator"));
</script>
```

### Client configuration script

The client configuration script contains your organization's specific account configuration parameters. This configuration includes the necessary and optional parameters for your property to communicate with the Sourcepoint messaging platform and consent service libraries. The majority of customizations made to your implementation will be implemented in this script.

The following properties are **required** in the `config` object of the script to successfully surface messages set up in the Sourcepoint portal:

| **Property**       | **Data Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accountId`        | Number        | Value associates the property with your organization's Sourcepoint account. Your organization's accountId can be retrieved by contacting your Sourcepoint Account Manager or via the **My Account** page in your Sourcepoint account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `baseEndpoint`     | String        | A single server endpoint that serves the messaging experience.<br><br>For GDPR TCF, U.S. Multi-State Privacy, U.S. Privacy (Legacy), GDPR Standard, and Custom Messaging, the `baseEndpoint` is https://cdn.privacy-mgmt.com.<br><br>:notebook: **Note**: The `baseEndpoint` can also be changed to a CNAME first-party subdomain in order to persist first-party cookies on Safari web browser (due to Safari’s ITP) by setting cookies through the server with set-cookie rather than using document.cookie on the page.                                                                                                                                                                             |
| `isOTT`            | Boolean       | When set to `true` it confirms that the message being delivered is an OTT specific message.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `propertyHref`     | String        | Maps the implementation to a specific name as set up in the Sourcepoint account dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| campaign object(s) | Object        | Campaigns are surfaced on yout HTML5 device by adding campaign objects to your client configuration script.<br><br>The following Sourcepoint campaigns are supported via our HTML5 OTT solution:<br><br>`gdpr: {}` - GDPR TCF or GDPR Standard campaigns<br>`ccpa: {}` - U.S. Privacy (Legacy) campaigns<br><br>U.S. Multi-State Privacy campaigns are currently not supported for HTML5 OTT devices. If your organization needs to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework, you will need to configure a U.S. Privacy (Legacy) campaign to do so.<br><br>[Click here](#us-multi-state-privacy-campaign-support) for more information about this configuration. |

```javascript
<script type="text/javascript">
  window._sp_queue = [];
  window._sp_ = {
      config: {
          accountId: 22,
          baseEndpoint: 'https://cdn.privacy-mgmt.com',
          isOTT: true,
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

> :notebook: If your organization has edited the baseEndpoint with a `CNAME DNS` record you will also need to edit the URL. Please follow the following format if necessary: `https://cname.subdomain/unified/wrapperMessagingWithoutDetection.js`

## Optional configuration parameters

Optional configuration parameters are added to your client configuration script and allows your organization to customize the implementation to suit its needs. Certain parameters are implemented for your entire implementation while others are implemented on a per campaign type basis. Review the tables below for more information:

### Overall optional client configuration parameters

The following parameters can be added to your client configuration script to impact your entire implementation:

| **Optional Parameter** | **Data Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authId`               |               | Allows your organization to pass a consent identifier to Sourcepoint to be used with authenticated consent. [Click here](https://docs.sourcepoint.com/hc/en-us/articles/4403274791699-Authenticated-consent) to learn more.                                                                                                                                                                                                                             |
| `authCookie`           | String        | Allows your organization to configure a unique name for Sourcepoint's `authId` cookie. [Click here](https://docs.sourcepoint.com/hc/en-us/articles/4403274791699-Authenticated-consent) for more information on `authId`.                                                                                                                                                                                                                               |
| `campaignEnv`          | String        | Designates which campaign environment to use and accepts either `stage` or `prod`.<br><br>When set to `stage`, the implementation will default to campaigns configured in your stage campaign environment. When set to `prod`, the implementation will default to campaigns configured in your public campaign environment.<br><br>:notebook: **Note**: This parameter defaults to your `prod` campaign environment unless otherwise indicated.         |
| `hbbTvSupport`         | Boolean       | When set to `true`, will enable support for HBBTV devices.                                                                                                                                                                                                                                                                                                                                                                                              |
| `isSPA`                | Boolean       | When set to `true`, will confirm the implementation for a single page application and will show a message only when `window._sp_.executeMessaging();` is triggered.<br><br>[Click here](#single-page-application) to learn more about single page application functions.                                                                                                                                                                                |
| `joinHref`             | Boolean       | When set to `true`, will ensure that all directory regular expression functionality works in conjunction with the propertyHref parameter.<br><br>The `joinHref` parameter is solely used to test your implementation across different servers while still allowing for URL RegEx matching. For these reasons, Sourcepoint strongly recommends that `joinHref` is set to `true` to ensure full CMP functionality.                                        |
| `targetingParams`      | Object        | Targeting params allow a developer to set arbitrary key/value pairs. These key/value pairs are sent to Sourcepoint servers where they can be used to take a decision within the scenario builder. [Click here](https://docs.sourcepoint.com/hc/en-us/articles/4404822445587-Key-value-pair-targeting) to learn more.<br><br>:notebook: **Note**: `targetingParams`set within the U.S. Privacy (Legacy) or GDPR object will override this configuration. |

```javascript
//Example
<script type="text/javascript">
    window._sp_queue = [];
    window._sp_ = {
        config: {
            accountId: 1584,
            baseEndpoint: 'https://cdn.privacy-mgmt.com',
            propertyHref: 'https://www.testdemo.com',
            isOTT: true,
            gdpr: { },
            authCookie: 'test_uuid',
            campaignEnv: 'stage',
            isSPA: true,
            joinHref: true,
            targetingParams:{
                darkmode: true
            }
</script>
```

### GDPR campaign optional client configuration parameters

The following parameters can be added to the `gdpr: {}` object in your client configuration script to impact your entire implementation:

| **Optional Parameter**       | **Data Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `consentLanguage`            | String        | Ensure that the purposes or stack names listed in a consent message remain in the same language regardless of an end-user's browser language setting. [Click here](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) for a list of ISO 639-1 language codes.<br><br>If this parameter is absent, the stacks and purposes will appear according the user's preferred language.                                                |
| `shortCircuitPartialConsent` | Boolean       | When set to `true` will eliminate an extra network call when the end-user has at least partial consent.<br><br>:notebook: **Note**: When this parameter is set to `true`, an end-user will not receive a new message until their consent expires. Re-consent scenario steps will not be possible.                                                                                                                                        |
| `targetingParams`            | Object        | Targeting params allow a developer to set arbitrary key/value pairs. These key/value pairs are sent to Sourcepoint servers where they can be used to take a decision within the scenario builder. [Click here](https://docs.sourcepoint.com/hc/en-us/articles/4404822445587-Key-value-pair-targeting) to learn more.<br><br>:notebook: **Note**: `targetingParams` set within the `ccpa` object will override overall `targetingParams`. |

```javascript
//Example
<script type="text/javascript">
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        propertyHref: 'https://www.demotest.com',
        isOTT: true,
        gdpr: {
            consentLanguage: "fi",
            targetingParams:{
                darkmode: false
              },
            shortCircuitPartialConsent: true
        }
</script>
```

### U.S. Privacy (Legacy) optional client configuration parameters

The following parameters can be added to the `ccpa: {}` object in your client configuration script to impact your entire implementation:

| **Optional Parameter** | **Data Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alwaysDisplayDNS`     | Boolean       | Setting this parameter to `true` enables use cases where a Sourcepoint Do Not Sell (my data) notification is hardcoded.                                                                                                                                                                                                                                                                                                                  |
| `targetingParams`      | Object        | Targeting params allow a developer to set arbitrary key/value pairs. These key/value pairs are sent to Sourcepoint servers where they can be used to take a decision within the scenario builder. [Click here](https://docs.sourcepoint.com/hc/en-us/articles/4404822445587-Key-value-pair-targeting) to learn more.<br><br>:notebook: **Note**: `targetingParams` set within the `ccpa` object will override overall `targetingParams`. |

```javascript
//Example
<script type="text/javascript">
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        isOTT: true,
        ccpa: {
            alwaysDisplayDNS: false,
            targetingParams:{
                darkmode: true
              }
        },
        propertyHref: 'https://www.testdemo.com'
</script>
```

## Event callbacks

Sourcepoint provides 10 different event callbacks that can be utilized by your organization to execute custom code in response to key events (e.g. when an end user clicks the cancel button).

- `onMessageReady`
- `onMessageChoiceSelect`
- `onPrivacyManagerAction`
- `onPrivacyManagerActionStatus`
- `onMessageChoiceError`
- `onConsentReady`
- `onPMCancel`
- `onMessageReceiveData`
- `onSPPMObjectReady`
- `onError`

[Click here](https://docs.sourcepoint.com/hc/en-us/articles/4405397484307-Event-callbacks) to find comprehensive information on these event callbacks.

## Resurface OTT message

The resurface OTT message JavaScript code is a snippet that is added to your project and allows an end-user to resurface an OTT message. Using this link/button, end-users can directly manage their consent preferences on an ongoing basis.

Load the OTT message on demand by [retrieving the OTT message ID](https://docs.sourcepoint.com/hc/en-us/articles/20806618675603-Resurface-OTT-message) from the Sourcepoint portal and pass it to the appropriate function.

```javascript
//GDPR - OTT
window._sp_.gdpr.loadNativeOtt(GDPR_OTT_ID);

//GDPR - Legacy OTT
window._sp_.gdpr.loadPrivacyManagerOtt(GDPR_LEGACY_OTT_ID);

//U.S. Privacy (Legacy) - OTT
window._sp_.ccpa.loadNativeOtt(USP_OTT_ID);

//U.S. Privacy (Legacy) - Legacy OTT
window._sp_.ccpa.loadPrivacyManagerOtt(USP_LEGACY_OTT_ID);
```

Attach the function to an event handler on your project. Most organizations who implement this function will attach it to `onclick` event of an element.

## Single page application

Configuring your project as a single page application provides you with greater control over surfacing and dismissing your message. When implementing a single page application, you should include the `isSPA` parameter in your client configuration script and set the value to `true`.

```javascript
//Example
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        isOTT: true,
        gdpr: { },
        propertyHref: 'https://www.testdemo.com',
        isSPA: true
...
```

Including the `isSPA` parameter will confirm the implementation for a single page application and enable the use of the following functions:

| **Function**                      | **Description**                                                                                                                                                                                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `window._sp_.executeMessaging();` | Trigger the function in order to surface a message on a single page application. This function should be called on each (virtual) pageload.<br><br>:notebook: **Note**: A message will only surface if your configured scenario dictates that a message should appear. |
| `window._sp_.destroyMessages();`  | Trigger the function to dismiss all messages.                                                                                                                                                                                                                          |

## HbbTV Support

When implementing Sourcepoint's HTML5 OTT solution on HbbTV devices, your organization will need to include the `hbbTvSupport` property in your client configuration script and set the value to `true` to enable support on these devices.

```javascript
<script type="text/javascript">
  window._sp_queue = [];
  window._sp_ = {
      config: {
          accountId: 22,
          baseEndpoint: 'https://cdn.privacy-mgmt.com',
          isOTT: true,
          hbbTvSupport: true,
          propertyHref: 'https://hbbtvapp',
          gdpr: { }
      }
}
</script>
```

## Message language controls

By default, your message will be delivered using the language set as **Default** in the message builder. If you wish to show your message in any other language other than your configured **Default** language you can:

- configure the appropriate translations for the message components and vendor list components in your selected language.
- include the `consentLanguage` parameter in your client configuration script and set the value of the parameter to the [two-letter ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes).

```javascript
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        isOTT: true,
        gdpr: { },
        propertyHref: 'https://www.testdemo.com',
        consentLanguage: 'de', //message will be shown using German translation
        isSPA: true
...
```

> :notebook: **Note**: Currently, there is no way to detect the language of an end-user's device and dynamically surface the corresponding message translation in Sourcepoint's HTML5 solution.

## Global Privacy Platform (GPP) Multi-State Privacy (MSPS) support

In the Sourcepoint portal, U.S. Multi-State Privacy campaigns are created to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework. Currently, U.S. Multi-State Privacy campaigns are not supported in Sourcepoint's HTML5 OTT solution.

If your organization wishes to support the Global Privacy Platform (GPP) Multi-State Privacy (MSPS) framework you will need to specifically configure a U.S. Privacy (Legacy) campaign to do so.

> :notebook: Once successfully, configured Sourcepoint will enable the Multi-State Privacy String (MSPS) alongside the U.S. Privacy String. The MSPS can be acessed via the [GPP API](https://sourcepoint-public-api.readme.io/reference/iab-global-privacy-platform-gpp-api).<br><br>Please be aware that this solution will only set the [U.S. National Privacy section of the MSPS](https://sourcepoint-public-api.readme.io/reference/us-national-privacy-section) and will not set values for sensitive data categories.

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

```javascript
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        isOTT: true,
        ccpa: {
            includeGppApi: true
        },
        propertyHref: 'https://www.testdemo.com',
```

Optionally, your organization can customize support for the MSPS by configuring the MSPA attributes as part of the GPP config.

```javascript
window._sp_queue = [];
window._sp_ = {
    config: {
        accountId: 1584,
        baseEndpoint: 'https://cdn.privacy-mgmt.com',
        isOTT: true,
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

## Device remote control

In the following sections we will cover how remote control key bindings are implemented in the solution and customizations your organization way want to utilize.

- [`navigation.js` file](#navigationjs-file)
- [`main.js` file](#mainjs-file)
- [Close message on Back button selection](#close-message-on-back-button-selection)

### `navigation.js` file

Remote control key bindings can be included in an external `navigation.js` file for your project. Each example project folder included in this repository ([Tizen](/tizen-example/js/navigation.js) and [webOS](/webOS-example/js/navigation.js)) includes a `navigation.js` file with pre-built key bindings.

### `main.js` file

Each example project folder in this repository ([Tizen](/tizen-example/js/main.js) and [webOS](/webOS-example/js/main.js)) includes a `main.js` file that is used to initialize the key binding defined in the `navigation.js` when the window loads.

### Close message on Back button selection

To close a message whenever an end-user presses the **Back button** on their device's remote, you will need to implement your project as [single page application](#single-page-application) since this gives you better control over the visibility of your message.

Once your project is implemented as a single page application you will have access to the `window._sp_.destroyMessages();` function which can be used to dismiss messages.

Tie the `window._sp_.destroyMessages();` function to JavaScript's native event listener methods to close the message whenever the **Back button** is pressed by the end-user.
