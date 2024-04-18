function EventsHandler (options) {
    options = options ? options : {};
    this.viewportModal = options.viewport || "[id^='sp_message_iframe_']";
    this.tvKey = {
        KEY_ENTER: 13,
    };
    this.onLoad();
}

EventsHandler.prototype = {
    onLoad: function () {
        this.bindEvents();
    },
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
    onClick: function(event){
        eventsHandler.triggerClick();
    },
    bindEvents: function() {
        var that = this;
        window.setTimeout(function(){
            var iframeWindow = (eventsHandler.getViewportWindow() && eventsHandler.getViewportWindow().contentDocument) || document;
            iframeWindow.body.addEventListener('click', that.onClick);
        }, 3000);
    }
};
