function Navigation (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
    this.tvKey = {
        KEY_ENTER: 13,          // Enter
        KEY_0: 48,              // 0
        KEY_RETURN: 10009,      // Back
        KEY_EXIT: 10182,        // Exit
    };
    this.onLoad();
}

Navigation.prototype = {
    onLoad: function () {
        this.registerKey('0');
        this.bindEvents();
    },
    /**
      * Returns the window object of an iframe from options
      */
    getViewportWindow: function () {
        const viewport = document.querySelector(this.viewportModal);
        return !!viewport ? viewport.contentWindow : false;
    },
    /**
      * Returns the active element of a page,
      * regardless of shadow root or iframe window.
      * @returns {HTMLElement}
      */
    getActiveElement: function ( element ) {
        if (!element) {element = document.activeElement;}
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
    /**
     * Dispatch enter button event on an active DOM element
     */
    triggerClick: function(){
        const activeElement = this.getActiveElement();
        var enterEvent = new Event('keydown', {bubbles: true, cancelable: true});
        enterEvent.keyCode = this.tvKey.KEY_ENTER;
        if (activeElement.parentElement.className.split(' ').indexOf('categories') >= 0 ){
            enterEvent = new KeyboardEvent('keypress',{key: 'Enter', bubbles: true, charCode: 0, keyCode: this.tvKey.KEY_ENTER});
        }
        activeElement.dispatchEvent(enterEvent);
    },
    registerKey: function (keyName) {
        window.tizen.tvinputdevice.registerKey(keyName);
    },

    unregisterKey: function (keyName) {
        window.tizen.tvinputdevice.unregisterKey(keyName);
    },
    /**
     * Handles remotes key press event.
     * Dispatch fired event to the iframe window.
     */
    onKeyDown: function(event) {
        const iframeWindow = tileNavigation.getViewportWindow();
        switch (event.keyCode) {
            case tileNavigation.tvKey.KEY_ENTER:
                if (!!iframeWindow) {
                    tileNavigation.triggerClick();
                }
                break;
            case tileNavigation.tvKey.KEY_EXIT:
                window.tizen.application.getCurrentApplication().exit();
                break;
            case tileNavigation.tvKey.KEY_0:
                window.location.reload();
                break;
            default:
                if (!!iframeWindow){
                    const evnt = new Event('keydown', {'bubbles': true, 'cancelable': true});
                    evnt.currentTarget = event.currentTarget;
                    evnt.keyCode = event.keyCode;
                    iframeWindow.dispatchEvent(evnt);
                }
                break;
        }
    },
    bindEvents: function() {
        window.addEventListener('keydown', this.onKeyDown);
    }
};
