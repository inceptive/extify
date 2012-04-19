/**
 * @class Ext.util.ClassObservable
 * 
 * Mixin class to support event handling inside of classes.
 */
Ext.define("Ext.util.ClassObservable", {

    
    extend: 'Object',
    
    
    /**
     * Array holding all known event names
     * @private     
     */         
    eventNames: [],
    
    
    /**
     * Object map holding all listener functions
     * referenced by name      
     * @private     
     */         
    listenersMap: {},
    
    
    /**
     * @cfg {Object} listeners Listeners object containing event name to handler function map
     */
    listeners: {},


    /**
     * Processes the this.listeners object maybe containing
     * event handler methods.
     * @return void
     */
    processListenersObject: function() {
        for (eventName in this.listeners) {
            this.on(eventName, this.listeners[eventName]);
        }
    },

    
    /**
     * Fires a named event
     * 
     * @param {String} evtName Name of the event to fire
     * @param {Mixed] ... As many additional params as you want to transmit to the event handler.
     * @return void                   
     */         
    fireEvent: function(evtName /*, ...*/) {
    
        var shouldRemoveListener = false, currentAdditionalOpts = null,
            delayListenerExecution = false, bufferListenerExecution = false,
            targetListenerCheck = false;
        
        if (Ext.Array.indexOf(this.eventNames, evtName) < 0) {
            throw "The event with name " + evtName + " cannot be fired. " +
                  "It wasn't added before. (@see addEvents(...)).";
        }

        var newArgs = [];
        for (index in arguments) {
            if (index > 0) {
                newArgs.push(arguments[index]);
            }
        }
    
        // Call any registered listener directly with the given arguments
        for (var i=0; i<this.listenersMap[evtName].length; i++) {
            
            if (Ext.isDefined(this.listenersMap[evtName][i])) {
                
                // Temporary variables for special listener
                // option handling
                shouldRemoveListener = false;
                delayListenerExecution = false;
                bufferListenerExecution = false;
                targetListenerCheck = false;
                currentAdditionalOpts = this.listenersMap[evtName][i].additionalOpts; 
                
                // Handle additional options
                if (Ext.isDefined(currentAdditionalOpts) 
                    && Ext.isObject(currentAdditionalOpts)) {
                    
                    
                    // Check for "single" option
                    if (Ext.isDefined(currentAdditionalOpts.single) &&
                        currentAdditionalOpts.single === true) {
                        shouldRemoveListener = true;
                    }
                    
                    // Check for "delay" option
                    if (Ext.isDefined(currentAdditionalOpts.delay) &&
                        Ext.isNumber(currentAdditionalOpts.delay)) {
                        delayListenerExecution = true;
                    }
                    
                    // Check for "buffer" option
                    if (Ext.isDefined(currentAdditionalOpts.buffer) &&
                        Ext.isNumber(currentAdditionalOpts.buffer)) {
                        bufferListenerExecution = true;
                    }
                    
                    // Check for "target" option
                    if (Ext.isDefined(currentAdditionalOpts.target) &&
                        Ext.isNumber(currentAdditionalOpts.target)) {
                        targetListenerCheck = true;
                    }
                }
                
                // Do not execute if listener is marked as single executible
                // and it was marked (so it was already executed)
                if (Ext.isDefined(this.listenersMap[evtName][i].$singleWasExecuted)) {
                    return;
                }
                
                // If "target" is given we need to check if "this" 
                // equals the target instance. The listener should only
                // be called on this instance. This is useful when an
                // event is relayed
                if (targetListenerCheck === true) {
                    if (currentAdditionalOpts.target !== this) {
                        return;
                    }
                }
                
                if (delayListenerExecution === true) {
                
                    // Delay the execution by currentAdditionalOpts.delay
                    setTimeout(Ext.Function.bind(function() {
                        this.listenersMap[evtName][i].apply(this, newArgs);
                    }, this), currentAdditionalOpts.delay);
                    
                } else if (bufferListenerExecution === true) {
                
                    // If buffer is set by date timestamp
                    // check against (stored timestamp + buffer ms - 
                    // current timestamp) > 0 execute
                    if (Ext.isDefined(this.listenersMap[evtName][i].$bufferTimestamp) &&
                        Ext.isDate(this.listenersMap[evtName][i].$bufferTimestamp)) {
                        
                        if (((this.listenersMap[evtName][i].$bufferTimestamp.getTime() + 
                             currentAdditionalOpts.buffer) - new Date().getTime()) > 0) {
                             
                            // Execute the buffered function and reset buffer flag
                            this.listenersMap[evtName][i].apply(this, newArgs);
                            
                            // Reset buffer flag
                            delete this.listenersMap[evtName][i].$bufferTimestamp;
                        }
                        
                    } else {
                        
                        // Set current timestamp of time when the buffer was started
                        this.listenersMap[evtName][i].$bufferTimestamp = new Date();
                        return;
                    }
                    
                } else {
                
                    // Standard direct execution
                    this.listenersMap[evtName][i].apply(this, newArgs);
                }
                
                // Remove listener if single option was enabled
                if (shouldRemoveListener) {
                    this.listenersMap[evtName][i].$singleWasExecuted = true;
                }
            }
        }
    },
    
    
    /**
     * Fires a named event.
     * Shortcut for fireEvent()
     * 
     * @param {String} evtName Name of the event to fire
     * @param {Mixed] ... As many additional params as you want to transmit to the event handler.
     * @return void                   
     */
    trigger: function(evtName /*, ...*/) {
        this.fireEvent.apply(this, arguments);
    },

    
    /**
     * Registers event names
     * 
     * @param {String} ... As many event names as you want to register
     * @return void               
     */         
    addEvents: function(/*...*/) {

        if (Ext.isDefined(arguments[0]) && Ext.isArray(arguments[0])) {
            throw "Don't use array as input. Just provide a lot of event names in sequence!";
        }
        
        // Create a listener array in the 
        // listeners map for any event name
        for (var i=0; i<arguments.length; i++) {
        
            // Push to known event names list
            this.eventNames.push(arguments[i]);
            
            // Create named listener stack
            this.listenersMap[arguments[i]] = [];
        }    
    },
    
   
    /**
     * Registers the given event handler function 
     * for the given event name. If the event gets fired
     * all registered event handlers will be called.
     * 
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register      
     * @param {Object} additionalOpts Additional options                    
     * @return void
     */               
    addListener: function(evtName, fn, additionalOpts) {

        var regListener = function(evtName, fn, additionalOpts) {
            
            // Additional opts
            fn.additionalOpts = additionalOpts;
            
            // Add to the listeners map
            this.listenersMap[evtName].push(fn);
        };
         
        try {
            regListener.call(this, evtName, fn, additionalOpts);
        } catch (e) {
        
            // Automatically add the event 
            this.addEvents(evtName);
            regListener.call(this, evtName, fn, additionalOpts);
        }
    },
    
    
    /**
     * Registers the given event handler function 
     * for the given event name. If the event gets fired
     * all registered event handlers will be called.
     * Shortcut for addListener()
     * 
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register        
     * @param {Object} additionalOpts Additional options                  
     * @return void
     */ 
    on: function(evtName, fn, additionalOpts) {
    
        // Call core method for that...
        return this.addListener(evtName, fn, additionalOpts);
    },


    /**
     * Registers the given event handler function 
     * for the given event name. If the event gets fired
     * all registered event handlers will be called.
     * Shortcut for addListener() 
     *
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register  
     * @param {Object} additionalOpts Additional options                        
     * @return void
     */ 
    bind: function(evtName, fn, additionalOpts) {
    
        // Call core method for that...
        return this.addListener(evtName, fn, additionalOpts);
    },
    
    
    /**
     * Relays events to the given component instance
     * so they get fired on the given class instance too.     
     * 
     * @param {Object} clsInst Class instance object (Mixin: Ext.util.ClassObservable)
     * @param {Array} eventNames Events to relay from source class instance               
     * @return void    
     */         
    relayEvents: function(clsInst, eventNames) {
        
        var me = this,
            execScope = null;

        if (Ext.isDefined(clsInst.addEvents) &&
            Ext.isFunction(clsInst.addEvents)) {
            
            me.addEvents(eventNames);

            // For each event of the clsInst to attach
            // register a local listener which fires the
            // local, relay event 
            for (var i=0; i<eventNames.length; i++) {

                execScope = {};
                execScope.me = me;
                execScope._eventName = eventNames[i];
                execScope._clsInst = clsInst;

                with (execScope) {

                    _clsInst.on(_eventName, function() {

                        debug("Relayed event EXPERIMENTAL fired:");
                        debug(_eventName);
                        debug("Relayed event EXPERIMENTAL fired:");

                        me.fireEvent(_eventName, arguments);
                    });
                }
            }    
        }
    },
    

    /**
     * Removes one or many listeners from the instance depending on the
     * call parameters.
     *
     * // Removes all listeners
     * removeListener() 
     *
     * // Removes all listeners named 'message'
     * removeListener('message')
     *
     * // Remove the specific listener function
     * removeListener('message', this.onMessage)
     *
     * @param {String} targetEvtName Name of the event to remove [Optional]
     * @param {Function} handlerFn Specific handler function previously attached [Optional]
     * @return void
     */
    removeListener: function(targetEvtName, handlerFn) {
        
        var eventName, i;
        for (eventName in this.listenersMap) {
            for (i=0; i<this.listenersMap[eventName].length; i++) {
                
                if (Ext.isDefined(targetEvtName) && Ext.isString(targetEvtName)) {
                    
                    // If name is given, only remove if name matches
                    if (targetEvtName === eventName) {
                        
                        // If handler given also check for handler matching
                        if (Ext.isDefined(handlerFn) && Ext.isFunction(handlerFn)) {
                        
                            // Check for handler
                            if (this.listenersMap[eventName][i] === handlerFn) {
                                this.listenersMap[eventName] = Ext.Array.remove(this.listenersMap[eventName], this.listenersMap[eventName][i]);
                            }
                        
                        } else {
                        
                            // No handler given? Remove all listeners with matching name
                            this.listenersMap[eventName] = Ext.Array.remove(this.listenersMap[eventName], this.listenersMap[eventName][i]);
                        }
                    }
                    
                } else {
                    
                    // Remove all handlers if targetEvtName is not a String or not defined
                    this.listenersMap[eventName] = Ext.Array.remove(this.listenersMap[eventName], this.listenersMap[eventName][i]);
                }
            }
        }
    },
    

    /**
     * Removes one or many listeners from the instance depending on the
     * call parameters.
     * Shortcut for removeListener()
     *
     * // Removes all listeners
     * removeListener() 
     *
     * // Removes all listeners named 'message'
     * removeListener('message')
     *
     * // Remove the specific listener function
     * removeListener('message', this.onMessage)
     *
     * @param {String} targetEvtName Name of the event to remove [Optional]
     * @param {Function} handlerFn Specific handler function previously attached [Optional]
     * @return void
     */
    un: function(fn) {
        this.removeListener.apply(this, arguments);
    },
    

    /**
     * Removes one or many listeners from the instance depending on the
     * call parameters.
     * Shortcut for removeListener()
     *
     * // Removes all listeners
     * removeListener() 
     *
     * // Removes all listeners named 'message'
     * removeListener('message')
     *
     * // Remove the specific listener function
     * removeListener('message', this.onMessage)
     *
     * @param {String} targetEvtName Name of the event to remove [Optional]
     * @param {Function} handlerFn Specific handler function previously attached [Optional]
     * @return void
     */
    unbind: function(fn) {
        this.removeListener.apply(this, arguments);
    }
});
