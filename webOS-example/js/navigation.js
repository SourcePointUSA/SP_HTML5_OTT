function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
    this.tvKey = {
        KEY_BACK_KEYBOARD: 8,   // Back
        KEY_ENTER: 13,          // Enter           0x0D
        KEY_BACK: 461,          // Back            0x1CD
        KEY_0: 48,              // 0
    };
    this.onLoad();
}

Navigation.prototype = {
    onLoad: function () {
        try{
            webOS.fetchAppInfo(function (info) {
                console.log('Widget version: ', info.version);
            }, webOS.fetchAppRootPath() + 'appinfo.json');
            
            webOS.deviceInfo(function (info) {
                console.log('Model name:', info.modelName);
                console.log('Platform:', info.sdkVersion);
            });
        } catch (e) {
            console.log('Something goes wrong on getting an application info');
        }
        this.bindEvents();
    },
    /**
      * Returns the window object of an iframe from options
      */
    getViewportWindow: function (retriesCounter) {
        if (typeof(retriesCounter) === "undefined") { retriesCounter = 0; }
        var that = this;
        var viewport = document.querySelector(this.viewportModal);
        retriesCounter = retriesCounter + 1;
        if (retriesCounter <= 3) {
            setTimeout(function () {
                (viewport === null) ? that.getViewportWindow(retriesCounter) : viewport = viewport.contentWindow;
            }, 1000);
        }
        return viewport;
    },
    /**
      * Returns the active element of a page,
      * regardless of shadow root or iframe window.
      * @returns {HTMLElement}
      */
    getActiveElement: function (element) {
        if (typeof(element) === "undefined") { element = document.activeElement; }
        const shadowRoot = element.shadowRoot;
        const contentDocument = element.contentDocument;
        if (shadowRoot && shadowRoot.activeElement) {
            return this.getActiveElement(shadowRoot.activeElement);
        }
        if (contentDocument && contentDocument.activeElement) {
            return this.getActiveElement(contentDocument.activeElement);
        }
        return element;
    },
    getBackButton: function (){
        var iframeWindow = tileNavigation.getViewportWindow(),
            backButtonCollection = iframeWindow.contentDocument.body.querySelectorAll('div.message-component.message-button'),
            returnButtonCollection = iframeWindow.contentDocument.body.querySelectorAll('div.back-button.focusable');
        return !!backButtonCollection.length ? backButtonCollection[0] : !!returnButtonCollection.length ? returnButtonCollection[0] : null;
    },
    /**
     * Dispatch enter button event on an active DOM element
     */
    triggerClick: function(activeElement){
        if (typeof (activeElement) === "undefined" ) { activeElement = this.getActiveElement(); }
        var enterEvent = new Event('keydown', {bubbles: true, cancelable: true});
        enterEvent.keyCode = this.tvKey.KEY_ENTER;
        if (activeElement.parentElement.className.split(' ').indexOf('categories') >= 0 ){
            enterEvent = new KeyboardEvent('keypress',{key: 'Enter', bubbles: true, charCode: 0, keyCode: this.tvKey.KEY_ENTER});
        }
        if (activeElement.tagName === 'BUTTON' && activeElement.className.split(' ').indexOf('ott-switch') >=0){
            return;
        }
        activeElement.dispatchEvent(enterEvent);
    },
    /**
     * Handles remotes key press event.
     * Dispatch fired event to the iframe window.
     */
    onKeyDown: function(event) {
        if (event.keyCode === tileNavigation.tvKey.KEY_BACK || event.keyCode === tileNavigation.tvKey.KEY_BACK_KEYBOARD) {
            var backButton = tileNavigation.getBackButton();
            if (backButton){
                backButton.focus();
                tileNavigation.triggerClick(backButton);
            } else {
                webOS.platformBack();
            }
        }
    },
    onClick: function(event){
        tileNavigation.triggerClick();
    },
    bindEvents: function() {
        var that = this;
        window.setTimeout(function() {
            var iframeWindow = tileNavigation.getViewportWindow();
            if (!!iframeWindow){
                iframeWindow.contentDocument.body.addEventListener('keydown', that.onKeyDown);
                iframeWindow.contentDocument.body.addEventListener('click', that.onClick);
            }
        }, 3000);
    }
};
