define(["dojo/topic"], function(topic) {
    /*
    * Custom Javascript to be executed while the application is initializing goes here
    */

    // The application is ready
    topic.subscribe("tpl-ready", function(){
        /*
        * Custom Javascript to be executed when the application is ready goes here
        */
        var entry, bookmark;

        //Send a message to navigate to bookmark to the iframe belonging to the entry
        var sendNavigateToBookmarkMessageToIframe = function(entry, bookmark){
            var action =  {
                method: 'NAVIGATE',
                bookmark: bookmark
            };
            var iframe = $('iframe')[entry];
            iframe.contentWindow.postMessage(action, '*');
        }

        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to messages from embedded story maps (iframes)
        eventer(messageEvent,function(e) {
            if(e.data.method === 'NAVIGATE'){
                entry = e.data.entry;
                bookmark = e.data.bookmark;
                topic.publish("story-navigate-entry", entry);
                if(bookmark){
                    //Send navigation request if Cascade StoryMap already is loaded
                    sendNavigateToBookmarkMessageToIframe(entry, bookmark);
                }
            } else if(e.data.method === 'INIT_COMPLETED'){
                if(entry != null && bookmark != null){
                    //Send navigation request after Cascade StoryMap has loaded
                    sendNavigateToBookmarkMessageToIframe(entry, bookmark);
                    entry = null;
                    bookmark = null;
                }
            }
        }, false); 
    });

});
