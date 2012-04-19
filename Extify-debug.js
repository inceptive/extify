/*!
 * Copyright(c) 2011 Aron Homberg and the Extify Community.
 * http://extify.jsyn.de
 */
/*!
 * Extify - runs everywhere
 * 
 * High performance, ultra-minimal, opensource OOP javascript framework in style 
 * of Ext Core. Reimplements portions of the Ext Core 3.1 and Ext JS 4 API 
 * in a clean way. Extify is MIT licensed.
 *  
 * USED PORTIONS OF:
 * 
 * Ext Core Library 3.1
 * http://extjs.com/
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * 
 * MIT Licensed - http://extjs.com/license/mit.txt
 *
 * The MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

 
// Node JS is executing
if (typeof GLOBAL !== "undefined") {
    window = global = GLOBAL;
} else  if (typeof window !== "undefined") {
    window = global = GLOBAL = window;
} else {
    window = global = GLOBAL = window = this;
} 

 
/**
 * @class Ext
 * Ext core utilities and functions.
 * @singleton
 */
Ext = {

    enableLogging: true,
    USE_NATIVE_JSON : true,
    version: '4.0.0',
    frameworkName: 'Extify'
};


/**
 * Copies all the properties of config to obj.
 * @param {Object} obj The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 * @member Ext apply
 */
Ext.apply = function(o, c, defaults) {
    if(defaults){
        Ext.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            if (true) {
                o[p] = c[p];
            }
        }
    }
    return o;
};

(function(){
    var toString = Object.prototype.toString;
    
    
    Ext.apply(Ext, {

         
        /**
         * @cfg {Boolean} enableLogging Controls, if log messages will be shown or not (default: false)
         */
        enableLogging: true,
        
        
        /**
         * @type {String} LOGLEVEL_WARN Logs only warning messages 
         */
        LOGLEVEL_WARN: 'warn',
        
        
        /**
         * @type {String} LOGLEVEL_INFO Logs all appearing messages
         */
        LOGLEVEL_INFO: 'info',
        
        
        /**
         * @type {String} LOGLEVEL_DEBUG Logs warning and debug messages
         */
        LOGLEVEL_DEBUG: 'debug',
        
        
        /**
         * Method for logging
         *      
         * @param {Mixed} logMessage Message to log (Can be array)
         * @param {String} severity  Severity role name
         * @return void
         */
        _log: function(logMessage) {
        
            var severity = Ext.LOGLEVEL_INFO, toLog = [];
            if (Ext.isDefined(arguments[1])) {
                severity = arguments[1];
            }
            toLog.push(
                Ext.frameworkName + '[' + severity + ']:'
            );
            
            for (var i=0; i<logMessage.length; i++) {
                toLog.push(logMessage[i]);
            }
            
            // Only log if debugging is enabled
            if (Ext.enableLogging === true) {

                try {
                    console.log.apply(this, toLog);
                } catch (e) {
                    console.log(toLog);
                }
                
            }
        },
        log: function() { Ext._log(arguments, Ext.LOGLEVEL_DEBUG)},
        info: function() { Ext._log(arguments, Ext.LOGLEVEL_INFO)},
        debug: function() { Ext._log(arguments, Ext.LOGLEVEL_DEBUG)},
        warn: function() { Ext._log(arguments, Ext.LOGLEVEL_WARN)}
    });
     
    // global is a reference for the global scope.
    // We reference global methods here as shortcuts.
    global.log = Ext.log;
    global.warn = Ext.warn;
    global.debug = Ext.debug;
    global.dir = Ext.log;
    global.alert = Ext.warn;
    global.info = Ext.info;

        
    Ext.apply(Ext, {
    
        /**
         * Copies all the properties of config to obj if they don't already exist.
         * @param {Object} obj The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf : function(o, c){
            if(o){
                for(var p in c){
                    if(!Ext.isDefined(o[p])){
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },

        
        /**
         * <p>Extends one class to create a subclass and optionally overrides members with the passed literal. This method
         * also adds the function "override()" to the subclass that can be used to override members of the class.</p>
         * For example, to create a subclass of Ext GridPanel:
         * <pre><code>
MyGridPanel = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(config) {

//      Create configuration for this Grid.
        var store = new Ext.data.Store({...});
        var colModel = new Ext.grid.ColumnModel({...});

//      Create a new config object containing our computed properties
//      *plus* whatever was in the config parameter.
        config = Ext.apply({
            store: store,
            colModel: colModel
        }, config);

        MyGridPanel.superclass.constructor.call(this, config);

//      Your postprocessing here
    },

    yourMethod: function() {
        // etc.
    }
});
</code></pre>
         *
         * <p>This function also supports a 3-argument call in which the subclass's constructor is
         * passed as an argument. In this form, the parameters are as follows:</p>
         * <div class="mdetail-params"><ul>
         * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
         * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
         * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
         * prototype, and are therefore shared among all instances of the new class.</div></li>
         * </ul></div>
         *
         * @param {Function} superclass The constructor of class being extended.
         * @param {Object} overrides <p>A literal with members which are copied into the subclass's
         * prototype, and are therefore shared between all instances of the new class.</p>
         * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
         * to define the constructor of the new class, and is returned. If this property is
         * <i>not</i> specified, a constructor is generated and returned which just calls the
         * superclass's constructor passing on its parameters.</p>
         * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
         * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
         */
        extend : function() {
            var io = function(o){
                for(var m in o){
                    if (this) {
                        this[m] = o[m];
                    }
                }
            };
            var oc = Object.prototype.constructor;

            return function(sb, sp, overrides){
                
                // If sb or sp is undefined
                if (!Ext.isDefined(sb) || !Ext.isDefined(sp)) {
                    return null;
                }

                if(Ext.isObject(sp)){
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function(){sp.apply(this, arguments);};
                }
                var F = function(){},
                    sbp,
                    spp = sp.prototype;

                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    Ext.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function(){
                    return spp;
                });
                sbp.override = io;
                Ext.override(sb, overrides);
                sb.extend = function(o){return Ext.extend(sb, o);};
                
                
                return sb;
            };
        }(),
        
        
        /**
         * Defines a class prototype in Ext JS 4-style.
         * 
         * Currently supported:
         * - singleton
         * - extend
         * - statics
         * - mixins (multiple inheritance)  
         * - implicit naming (given string name references class constructor function)
         * - callback after define
         * - alias name
         * - auto dependency check -> but no autoloading! (antipattern!)  
         * 
         *  Example of old style Ext JS 3 (also works):
         *                    
         *  var lala = Ext.extend(Object, {
         *    muah1: true  
         *  });
         *  new lala();
         *  
         *  // You can now use:
         *           
         *  Ext.define("lulu", {
         *     haha: 15
         *  });
         *                   
         *  Ext.define("lala2.lala", {
         *      muah: false,
         *      extend: 'lala',         
         *      mixins: ['lulu'],
         *      statics: {
         *          uha: true
         *      },
         *      alias: 'another.classname',
         *      singleton: true                  
         *  }, function(classRef) {
         *      console.debug('yeah, class was defined!');
         *  });
         *  
         *  Ext.log(another.classname;                                        
         *  
         * @param {String} className Name of the class (even with namespaces)
         * @param {Object} classDef Class definition 
         * @param {Function} callback Callback function called when class is defined
         * @return {Function} Class proto constructor function                                                  
         */                          
        define: function() {
        
            var nameOfClass = arguments[0],
                classDef = arguments[1],
                cb = arguments[2],
                superClassRef = Object, i, 
                mName = null, currentMixRef = {},
                clsProto;

            if (!Ext.isDefined(nameOfClass)) {
                throw "Error: Please specify a class name when using Ext.define()!";
            }
            
            if (!Ext.isDefined(classDef)) {
                throw "Error: Please provide a class definition object for class '" + nameOfClass + "' when using Ext.define()!";
            }
            
            if (!Ext.isDefined(cb)) {
                cb = function() {};
            }
                
            // Dereference extend class
            if (!Ext.isDefined(classDef.extend)) {
                classDef.extend = 'Ext.Class';
            }
            
            if (Ext.isDefined(classDef.extend)) {
                var clsNotPresentErr = "Error: The class '" + classDef.extend + "' the class '" + nameOfClass + "' should extend from isn't present.";
                try {
                    superClassRef = eval("(" + classDef.extend + ")");

                    if (!Ext.isDefined(superClassRef)) {
                        throw clsNotPresentErr;
                    }

                } catch (e) {
                    throw clsNotPresentErr;
                }
            }
            
            // Handle multiple inheritance, mixins
            if (Ext.isDefined(classDef.mixins) && Ext.isArray(classDef.mixins)) {
                for (i=0; i<classDef.mixins.length; i++) {

                    try {
                        currentMixRef = eval("(" + classDef.mixins[i] + ")");
                    } catch(e) {
                        throw "Error: The class '" + classDef.mixins[i] + "' you want to mixin in '" + nameOfClass + "' is not present.";
                    }
                    
                    // Apply prototype objects of mixins onto classDef by native order
                    if (Ext.isDefined(currentMixRef) && Ext.isFunction(currentMixRef)) {
                        
                        delete currentMixRef.prototype.constructor;
                        Ext.apply(classDef, currentMixRef.prototype);
                    }
                }  
            }

            // Annotate the method name to any function
            // to allow callParent() to know their names.
            for (mName in classDef) {
                if (Ext.isFunction(classDef[mName])) {
                    //console.debug("Annotating", classDef[mName], mName);
                    classDef[mName]['$name'] = mName;
                }
            }
            
            // Extend the extending class of object
            clsProto = Ext.extend(superClassRef, classDef);
            
            // Annotate the superclass on instance level
            clsProto.prototype['$superclass'] = superClassRef;
            
            if (clsProto == null) {
                throw "The class definition of class named " + nameOfClass + " failed. Maybe the inheritance function references are undefined.";
            } 
            
            // If singleton, instantiate
            if (Ext.isDefined(classDef.singleton) && 
                classDef.singleton === true) {
                clsProto = new clsProto();
            }       

            // Apply all statics statically
            for (name in classDef.statics) {

                // Bind the class def to the static methods so they can even work
                // with this.* on prototype level ;-)
                clsProto[name] = Ext.Function.bind(classDef.statics[name], clsProto);
            }


            // Namespacing with references
            var nameRef = function(name, ref) {
            
                var scope, 
                    splits = name.split("."),
                    len = splits.length;
                
                if (len == 1) {
                    scope = window[splits[0]] = ref;
                    return scope;
                } else {
                    scope = window[splits[0]] = window[splits[0]] || {};
                }   
                
                var splitIter = 1;
                Ext.each(splits.slice(1), function(nameSplit) {
                
                    splitIter++;
                    
                    if (len == splitIter) {
                        scope = scope[nameSplit] = ref;
                    } else {
                        scope = scope[nameSplit] = scope[nameSplit] || {};
                    }
                });
                return scope;
            };
            
            // Reference the given class name with the proto
            nameRef(nameOfClass, clsProto);     
            
            // Assign alias name if given
            if (Ext.isDefined(classDef.alias)) {
                nameRef(classDef.alias, clsProto);
            }      
            
            // Call after-create callback function
            cb(clsProto);
            
            // Return reference to class proto constructor
            return clsProto;
        },
        

        /**
         * Creates an instance of the named class with an instance overlay
         * to use.
         * 
         * @param {String} className Name of the class (even with namespaces)
         * @param {Object} instOverlay Overlay configuration for the instance 
         * @return {Object} Class instance
         */
        create: function(className, instOverlay) {
            var splits = className.split("."),
                len = splits.length, i, prevRef = window, inst;

            for (i=0; i<len; i++) {
                prevRef = prevRef[splits[i]];

                if (!Ext.isDefined(prevRef) || prevRef == null) {
                    throw "The class you want to instantiate is not defined: " + className;  
                }
            }

            if (!Ext.isDefined(instOverlay) || !Ext.isObject(instOverlay)) {
                instOverlay = {}
            }

            if (!Ext.isFunction(prevRef))  {
                throw "The given class name " + className + " is not of type function (not a constructor!)";
            }            
            return new prevRef(instOverlay);
        },
        
        
        /**
         * Iterates an array calling the supplied function.
         * @param {Array/NodeList/Mixed} array The array to be iterated. If this
         * argument is not really an array, the supplied function is called once.
         * @param {Function} fn The function to be called with each item. If the
         * supplied function returns false, iteration stops and this method returns
         * the current <code>index</code>. This function is called with
         * the following arguments:
         * <div class="mdetail-params"><ul>
         * <li><code>item</code> : <i>Mixed</i>
         * <div class="sub-desc">The item at the current <code>index</code>
         * in the passed <code>array</code></div></li>
         * <li><code>index</code> : <i>Number</i>
         * <div class="sub-desc">The current index within the array</div></li>
         * <li><code>allItems</code> : <i>Array</i>
         * <div class="sub-desc">The <code>array</code> passed as the first
         * argument to <code>Ext.each</code>.</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed.
         * Defaults to the <code>item</code> at the current <code>index</code>
         * within the passed <code>array</code>.
         * @return See description for the fn parameter.
         */
        each : function(array, fn, scope){
            if(Ext.isEmpty(array, true)){
                return;
            }
            if(Ext.isPrimitive(array)){
                array = [array];
            }
            
            // Todo: Extanium recursion fix
            for(var i = 0, len = array.length; i < len; i++){
                if(fn.call(scope || array[i], array[i], i, array) === false){
                    return i;
                };
            }
        },
        
        
        /**
         * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
         * Usage:<pre><code>
Ext.override(MyClass, {
    newMethod1: function(){
        // etc.
    },
    newMethod2: function(foo){
        // etc.
    }
});
</code></pre>
         * @param {Object} origclass The class to override
         * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
         * containing one or more methods.
         * @method override
         */
        override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                Ext.apply(p, overrides);
            }
        },
        
        
        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
         * <pre><code>
Ext.namespace('Company', 'Company.data');
Ext.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
         * @param {String} namespace1
         * @param {String} namespace2
         * @param {String} etc
         * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
         * @method namespace
         */
        namespace : function(){
            var o, d;
            
            // Todo: Extanium recursion fix
            Ext.each(arguments, function(v) {
                d = v.split(".");
                o = window[d[0]] = window[d[0]] || {};
                Ext.each(d.slice(1), function(v2){
                    o = o[v2] = o[v2] || {};
                });
            });
            return o;
        },
        

        /**
         * Appends content to the query string of a URL, handling logic for whether to place
         * a question mark or ampersand.
         * @param {String} url The URL to append to.
         * @param {String} s The content to append to the URL.
         * @return (String) The resulting URL
         */
        urlAppend : function(url, s){
            if(!Ext.isEmpty(s)){
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },

        
        isIterable : function(v){
            //check for array or arguments
            if(Ext.isArray(v) || v.callee){
                return true;
            }
        },
        
        
        
        /**
         * Iterates either the elements in an array, or each of the properties in an object.
         * <b>Note</b>: If you are only iterating arrays, it is better to call {@link #each}.
         * @param {Object/Array} object The object or array to be iterated
         * @param {Function} fn The function to be called for each iteration.
         * The iteration will stop if the supplied function returns false, or
         * all array elements / object properties have been covered. The signature
         * varies depending on the type of object being interated:
         * <div class="mdetail-params"><ul>
         * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
         * <div class="sub-desc">
         * When iterating an array, the supplied function is called with each item.</div></li>
         * <li>Objects : <tt>(String key, Object value, Object)</tt>
         * <div class="sub-desc">
         * When iterating an object, the supplied function is called with each key-value pair in
         * the object, and the iterated object</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed. Defaults to
         * the <code>object</code> being iterated.
         */
        iterate : function(obj, fn, scope){
            if(Ext.isEmpty(obj)){
                return;
            }
            if(Ext.isIterable(obj)){
                Ext.each(obj, fn, scope);
                return;
            }else if(Ext.isObject(obj)){
                for(var prop in obj){
                    if(obj.hasOwnProperty(prop)){
                        if(fn.call(scope || obj, prop, obj[prop], obj) === false){
                            return;
                        };
                    }
                }
            }
        },
      
        
        /**
         * Converts any iterable (numeric indices and a length property) into a true array
         * Don't use this on strings. IE doesn't support "abc"[0] which this implementation depends on.
         * For strings, use this instead: "abc".match(/./g) => [a,b,c];
         * @param {Iterable} the iterable object to be turned into a true Array.
         * @return (Array) array
         */
        toArray : function(){
             return function(a, i, j){
                     return Array.prototype.slice.call(a, i || 0, j || a.length);
                 };
        }(),

        
        /**
         * <p>Returns true if the passed value is empty.</p>
         * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
         * <li>null</li>
         * <li>undefined</li>
         * <li>an empty array</li>
         * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
         * </ul></div>
         * @param {Mixed} value The value to test
         * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         */
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || ((Ext.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },

        
        /**
         * Returns true if the passed value is a JavaScript array, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isArray : function(v){
            return toString.apply(v) === '[object Array]';
        },
        
        
        /**
         * Returns true if the passed object is a JavaScript date object, otherwise false.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },
        
        
        /**
         * Returns true if the passed value is a JavaScript Object, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isObject : function(v){
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        },
        
        
        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isPrimitive : function(v){
            return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
        },
        
        
        /**
         * Returns true if the passed value is a JavaScript Function, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isFunction : function(v){
            return toString.apply(v) === '[object Function]';
        },
        
        
        /**
         * Returns true if the passed value is a number. Returns false for non-finite numbers.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isNumber : function(v){
            return typeof v === 'number' && isFinite(v);
        },
        
        
        /**
         * Returns true if the passed value is a string.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isString : function(v){
            return typeof v === 'string';
        },
        
        
        /**
         * Returns true if the passed value is a boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean : function(v){
            return typeof v === 'boolean';
        },
        
        
        /**
         * Returns true if the passed value is not undefined.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isDefined : function(v){
            return typeof v !== 'undefined';
        },


        /**
         * Returns a unique Ext id
         * @return {String}
         */
        idSequence: 0,
        id: function() {
            Ext.idSequence++;
            return "ext-" + Ext.idSequence;
        }
    });
})();

// Shorten reference
Ext.ns = Ext.namespace;
Ext.ns("Ext.util", "Ext.lib", "Ext.data");
/**
 * @class Ext.util.Serializable
 * Implements a method to serialize data transfer objects
 */
Ext.define('Ext.util.Serializable', {


    extend: 'Object',
    
    
    /**
     * Encodes the object to JSON
     * @return {String}
     */
    serialize: function() {
        return Ext.encode(this);
    }
});/**
 * @class Ext.util.ClassObservable
 * 
 * Mixin class to support event handling inside of classes.
 *
 * TODO: Implement removal: unbind, un, removeListener
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
     * TODO: Implement third argument cfg which supports the
     *       most important complex behaviour bindings like Ext JS 4
     *       e.g.: single, buffer, delay
     * 
     * @param {String} evtName Name of the event
     * @param {Function} fn Function to register                         
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
/**
 * @class Ext.Class
 * 
 * Base class of all other classes specialized for instantiation
 * and dynamic configuration.   
 */
Ext.define('Ext.Class', {

    mixins: ['Ext.util.ClassObservable', 'Ext.util.Serializable'],
    
    
    extend: 'Object',


    /**
     * @cfg {String} id Id of the component _instance_
     */
    id: null,


    /**
     * Gets called on instance creation.
     * Maps the given config object onto the
     * local object instance if given.          
     *                    
     * @param {Object} cfg Optional overlay config     
     * @private
     */         
    constructor: function(/*{Object} cfg*/) {
    
        if (Ext.isDefined(arguments[0]) &&
            Ext.isObject(arguments[0])) {
           
            // Apply config object onto local instance
            Ext.apply(this, arguments[0]);
        }

        // Register in component manager with id
        // If this.id is null, a id will be auto-generated (sequence)
        Ext.Instances.push(this);

        // Process Ext.util.Observable listeners object
        // of this.listeners
        this.processListenersObject();
    },
    
    
    /**
     * Calls the parent method of this class
     *
     * @param {Array} args Arguments to be called with
     * @retrun void
     */
    callParent: function(args) {
        
        var methodCallerRef = this.callParent.caller;

        if (!Ext.isDefined(methodCallerRef)) {
            throw "callParent() failed. Caller not found.";
        }
        
        if (!Ext.isDefined(this.constructor.prototype.$superclass.prototype)) {
            throw "callParent() failed. There is no superclass that could be referred to.";
        }
        
        if (!Ext.isDefined(this.constructor.prototype.$superclass.prototype[methodCallerRef.$name]) || 
            !Ext.isFunction(this.constructor.prototype.$superclass.prototype[methodCallerRef.$name])) {
             throw "callParent() failed. There is no parent method (function) named " + methodCallerRef.$name + " in superclass.";
        } else {
            this.constructor.prototype.$superclass.prototype[methodCallerRef.$name].apply(this, args || []);
        }
    }
}, function() {
    
    // Create the Instances array if not existing
    if (!Ext.isDefined(Ext.Instances)) {
        Ext.Instances = [];
    }
});
/**
 * Prototype extensions for function
 * @class Function
 */ 
Ext.apply(Function.prototype, {


    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = sayHi.createInterceptor(function(name){
    return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
</code></pre>
     * @param {Function} fcn The function to call before the original
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
     * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
     * @return {Function} The new function
     */
    createInterceptor : function(fcn, scope){
        var method = this;
        return !Ext.isFunction(fcn) ?
                this :
                function() {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },


    /**
     * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
     * Call directly on any function. Example: <code>myFunction.createCallback(arg1, arg2)</code>
     * Will create a function that is bound to those 2 args. <b>If a specific scope is required in the
     * callback, use {@link #createDelegate} instead.</b> The function returned by createCallback always
     * executes in the window scope.
     * <p>This method is required when you want to pass arguments to a callback function.  If no arguments
     * are needed, you can simply pass a reference to the function as a callback (e.g., callback: myFn).
     * However, if you tried to pass a function with arguments (e.g., callback: myFn(arg1, arg2)) the function
     * would simply execute immediately when the code is parsed. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// clicking the button alerts "Hi, Fred"
new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody(),
    handler: sayHi.createCallback('Fred')
});
</code></pre>
     * @return {Function} The new function
    */
    createCallback : function(/*args...*/){
        var args = arguments,
            method = this;
        return function() {
            return method.apply(window, args);
        };
    },


    /**
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
     * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
     * callback points to obj. Example usage:
     * <pre><code>
var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
});

// This callback will execute in the scope of the
// button instance. Clicking the button alerts
// "Hi, Fred. You clicked the "Say Hi" button."
btn.on('click', sayHi.createDelegate(btn, ['Fred']));
</code></pre>
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    createDelegate : function(obj, args, appendArgs){
        var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0);                 var applyArgs = [appendArgs, 0].concat(args); 
                Array.prototype.splice.apply(callArgs, applyArgs);             }
            return method.apply(obj || window, callArgs);
        };
    },


    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
sayHi.defer(2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
(function(){
    alert('Anonymous');
}).defer(100);
</code></pre>
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer : function(millis, obj, args, appendArgs){
        var fn = this.createDelegate(obj, args, appendArgs);
        if(millis > 0){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});


/**
 * @class Ext.Function
 * @singleton 
 * 
 * Singleton class as helper for working with functions    
 */ 
Ext.define("Ext.Function", {

    singleton: true,
   
   
    /**
     *
     * UNTESTED
     *               
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = Ext.Function.createInterceptor(sayHi, function(name){
    return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
</code></pre>                                          
     * @param {Function} fn The function to work with
     * @param {Function} fcn The function to call before the original
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
     * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
     * @return {Function} The new function
     */
    createInterceptor : function(fn, fcn, scope){
        var method = fn;
        return !Ext.isFunction(fcn) ?
                this :
                function() {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },


    /**
     *
     * UNTESTED
     *     
     * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
     * Call directly on any function. Example: <code>Ext.Function.createCallback(myFunction, arg1, arg2)</code>
     * Will create a function that is bound to those 2 args. <b>If a specific scope is required in the
     * callback, use {@link #createDelegate} instead.</b> The function returned by createCallback always
     * executes in the window scope.
     * <p>This method is required when you want to pass arguments to a callback function.  If no arguments
     * are needed, you can simply pass a reference to the function as a callback (e.g., callback: myFn).
     * However, if you tried to pass a function with arguments (e.g., callback: myFn(arg1, arg2)) the function
     * would simply execute immediately when the code is parsed. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// clicking the button alerts "Hi, Fred"
new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody(),
    handler: Ext.Function.createCallback(sayHi, 'Fred')
});
</code></pre>                                        
     * @param {Function} fn The function to work with
     * @return {Function} The new function
    */
    createCallback : function(fn /*, args...*/){
        var args = Array.prototype.slice.call(arguments, 1);
            method = fn;
        return function() {
            return method.apply(window, args);
        };
    },


    /**
     *
     * UNTESTED
     *     
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
     * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
     * callback points to obj. Example usage:
     * <pre><code>
var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
});

// This callback will execute in the scope of the
// button instance. Clicking the button alerts
// "Hi, Fred. You clicked the "Say Hi" button."
btn.on('click', Ext.Function.createDelegate(sayHi, btn, ['Fred']));
</code></pre>
     * @param {Function} fn The function to work with
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    bind : function(fn, obj, args, appendArgs){
        var method = fn;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0);                 
                var applyArgs = [appendArgs, 0].concat(args); 
                Array.prototype.splice.apply(callArgs, applyArgs);             
            }
            return method.apply(obj || window, callArgs);
        };
    },


    /**
     *
     * UNTESTED
     *     
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
<pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
Ext.Function.defer(sayHi, 2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
(function(){
    alert('Anonymous');
}).defer(100);
</code></pre>
     * @param {Function} fn The function to work with
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer : function(fn, millis, obj, args, appendArgs){
        var fn = Ext.Function.createDelegate(obj, args, appendArgs);
        if(millis > 0){
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});/**
 * @class String
 * These functions are available on every String object.
 */
Ext.applyIf(String, {


    /**
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = String.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
     * </code></pre>
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     * @static
     */
    format : function(format){
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});



/**
 * @class Ext.String
 * @singleton
 * Singleton class as helper working with string.   
 */ 
Ext.define("Ext.String", {

    singleton: true,
    
    
    /**
     *
     * UNTESTED 
     *              
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = String.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
     * </code></pre>
     * @param {String} input Input string     
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     * @static
     */
    format : function(format){
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i){
            return args[i];
        });
    }
});/**
 * @class Array
 */
Ext.applyIf(Array.prototype, {


    /**
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(o, from){
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(this[from] === o){
                return from;
            }
        }
        return -1;
    },
    
    
    /**
     * Removes the specified object from the array.  If the object is not found nothing happens.
     * @param {Object} o The object to remove
     * @return {Array} this array
     */
    remove : function(o){
        var index = this.indexOf(o);
        if(index != -1){
            this.splice(index, 1);
        }
        return this;
    }
});


/**
 * @class Ext.Array
 * @singleton
 * Singleton class as helper working with arrays.   
 */ 
Ext.define("Ext.Array", {

    singleton: true,
   
   
    /**
     *
     * UNTESTED
     *     
     * Checks whether or not the specified object exists in the array.
     * 
     * @param {Array} ar Input array to work on          
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf : function(ar, o, from){
        var len = ar.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(ar[from] === o){
                return from;
            }
        }
        return -1;
    },
    
    
    /**
     *
     * UNTESTED
     *     
     * Removes the specified object from the array.  
     * If the object is not found nothing happens.
     * 
     * @param {Array} ar Input array to work on     
     * @param {Object} o The object to remove
     * @return {Array} The array
     */
    remove : function(ar, o){
        var index = ar.indexOf(o);
        if(index != -1){
            ar.splice(index, 1);
        }
        return ar;
    } 
});/**
 * @class Ext.Template
 * <p>Represents a fragment template. Templates may be {@link #compile precompiled}
 * for greater performance.</p>
 * <p>For example usage {@link #Template see the constructor}.</p>
 * 
 * @constructor
 * An instance of this class may be created by passing to the constructor either
 * a single argument, or multiple arguments:
 * <div class="mdetail-params"><ul>
 * <li><b>single argument</b> : String/Array
 * <div class="sub-desc">
 * The single argument may be either a String or an Array:<ul>
 * <li><tt>String</tt> : </li><pre><code>
var t = new Ext.Template("&lt;div>Hello {0}.&lt;/div>");
t.{@link #append}('some-element', ['foo']);
 * </code></pre>
 * <li><tt>Array</tt> : </li>
 * An Array will be combined with <code>join('')</code>.
<pre><code>
var t = new Ext.Template([
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name:trim} {value:ellipsis(10)}&lt;/span&gt;',
    '&lt;/div&gt;',
]);
t.{@link #compile}();
t.{@link #append}('some-element', {id: 'myid', cls: 'myclass', name: 'foo', value: 'bar'});
</code></pre>
 * </ul></div></li>
 * <li><b>multiple arguments</b> : String, Object, Array, ...
 * <div class="sub-desc">
 * Multiple arguments will be combined with <code>join('')</code>.
 * <pre><code>
var t = new Ext.Template(
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name} {value}&lt;/span&gt;',
    '&lt;/div&gt;',
    // a configuration object:
    {
        compiled: true,      // {@link #compile} immediately
        disableFormats: true // See Notes below.
    } 
);
 * </code></pre>
 * <p><b>Notes</b>:</p>
 * <div class="mdetail-params"><ul>
 * <li>Formatting and <code>disableFormats</code> are not applicable for Ext Core.</li>
 * <li>For a list of available format functions, see {@link Ext.util.Format}.</li>
 * <li><code>disableFormats</code> reduces <code>{@link #apply}</code> time
 * when no formatting is required.</li>
 * </ul></div>
 * </div></li>
 * </ul></div>
 * @param {Mixed} config
 */
Ext.Template = function(content){
    var me = this,
    	a = arguments,
    	buf = [];

    if (Ext.isArray(content)) {
        content = content.join("");
    } else if (a.length > 1) {
	    Ext.each(a, function(v) {
            if (Ext.isObject(v)) {
                Ext.apply(me, v);
            } else {
                buf.push(v);
            }
        });
        content = buf.join('');
    }

    /**@private*/
    me.content = content;
    /**
     * @cfg {Boolean} compiled Specify <tt>true</tt> to compile the template
     * immediately (see <code>{@link #compile}</code>).
     * Defaults to <tt>false</tt>.
     */
    if (me.compiled) {
        me.compile();
    }
};

Ext.Template.prototype = {
    /**
     * @cfg {RegExp} re The regular expression used to match template variables.
     * Defaults to:<pre><code>
     * re : /\{([\w-]+)\}/g                                     // for Ext Core
     * re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g      // for Ext JS
     * </code></pre>
     */
    re : /\{([\w-]+)\}/g,
    /**
     * See <code>{@link #re}</code>.
     * @type RegExp
     * @property re
     */

    /**
     * Returns an content fragment of this template with the specified <code>values</code> applied.
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @return {String} The content fragment
     */
    applyTemplate : function(values){
		    var me = this;

        return me.compiled ?
        		me.compiled(values) :
				      me.content.replace(me.re, function(m, name){
		        	return values[name] !== undefined ? values[name] : "";
		        });
	   },

    /**
     * Sets the content used as the template and optionally compiles it.
     * @param {String} content
     * @param {Boolean} compile (optional) True to compile the template (defaults to undefined)
     * @return {Ext.Template} this
     */
    set : function(content, compile){
	    var me = this;
        me.content = content;
        me.compiled = null;
        return compile ? me.compile() : me;
    },

    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     */
    compile : function(){
        var me = this,
        	  sep = "+";

        function fn(m, name){                        
	        name = "values['" + name + "']";
	        return "'"+ sep + '(' + name + " == undefined ? '' : " + name + ')' + sep + "'";
        }
                
        //eval("this.compiled = function(values){ return " + (Ext.isGecko ? "'" : "['") +
        eval("this.compiled = function(values){ return " + ("'") +
             me.content.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.re, fn) +   
             ("';};"));
        //     (Ext.isGecko ?  "';};" : "'].join('');};"));
        return me;
    }
};
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified <code>values</code> applied.
 * @param {Object/Array} values
 * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
 * or an object (i.e. <code>{foo: 'bar'}</code>).
 * @return {String} The HTML fragment
 * @member Ext.Template
 * @method apply
 */
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;

/**
 * @class Ext.util.TaskRunner
 * Provides the ability to execute one or more arbitrary tasks in a multithreaded
 * manner.  Generally, you can use the singleton {@link Ext.TaskMgr} instead, but
 * if needed, you can create separate instances of TaskRunner.  Any number of
 * separate tasks can be started at any time and will run independently of each
 * other. Example usage:
 * <pre><code>
// Start a simple clock task that updates a div once per second
var updateClock = function(){
    Ext.fly('clock').update(new Date().format('g:i:s A'));
} 
var task = {
    run: updateClock,
    interval: 1000 //1 second
}
var runner = new Ext.util.TaskRunner();
runner.start(task);

// equivalent using TaskMgr
Ext.TaskMgr.start({
    run: updateClock,
    interval: 1000
});

 * </code></pre>
 * Also see {@link Ext.util.DelayedTask}. 
 * 
 * @constructor
 * @param {Number} interval (optional) The minimum precision in milliseconds supported by this TaskRunner instance
 * (defaults to 10)
 */
Ext.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], 
    	removeQueue = [],
    	id = 0,
    	running = false,

    	// private
    	stopThread = function(){
	        running = false;
	        clearInterval(id);
	        id = 0;
	    },

    	// private
    	startThread = function(){
	        if(!running){
	            running = true;
	            id = setInterval(runTasks, interval);
	        }
	    },

    	// private
    	removeTask = function(t){
	        removeQueue.push(t);
	        if(t.onStop){
	            t.onStop.apply(t.scope || t);
	        }
	    },
	    
    	// private
    	runTasks = function(){
	    	var rqLen = removeQueue.length,
	    		now = new Date().getTime();	    			    		
	    
	        if(rqLen > 0){
	            for(var i = 0; i < rqLen; i++){
	                tasks.remove(removeQueue[i]);
	            }
	            removeQueue = [];
	            if(tasks.length < 1){
	                stopThread();
	                return;
	            }
	        }	        
	        for(var i = 0, t, itime, rt, len = tasks.length; i < len; ++i){
	            t = tasks[i];
	            itime = now - t.taskRunTime;
	            if(t.interval <= itime){
	                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
	                t.taskRunTime = now;
	                if(rt === false || t.taskRunCount === t.repeat){
	                    removeTask(t);
	                    return;
	                }
	            }
	            if(t.duration && t.duration <= (now - t.taskStartTime)){
	                removeTask(t);
	            }
	        }
	    };

    /**
     * Starts a new task.
     * @method start
     * @param {Object} task A config object that supports the following properties:<ul>
     * <li><code>run</code> : Function<div class="sub-desc">The function to execute each time the task is run. The
     * function will be called at each interval and passed the <code>args</code> argument if specified.  If a
     * particular scope is required, be sure to specify it using the <code>scope</code> argument.</div></li>
     * <li><code>interval</code> : Number<div class="sub-desc">The frequency in milliseconds with which the task
     * should be executed.</div></li>
     * <li><code>args</code> : Array<div class="sub-desc">(optional) An array of arguments to be passed to the function
     * specified by <code>run</code>.</div></li>
     * <li><code>scope</code> : Object<div class="sub-desc">(optional) The scope (<tt>this</tt> reference) in which to execute the
     * <code>run</code> function. Defaults to the task config object.</div></li>
     * <li><code>duration</code> : Number<div class="sub-desc">(optional) The length of time in milliseconds to execute
     * the task before stopping automatically (defaults to indefinite).</div></li>
     * <li><code>repeat</code> : Number<div class="sub-desc">(optional) The number of times to execute the task before
     * stopping automatically (defaults to indefinite).</div></li>
     * </ul>
     * @return {Object} The task
     */
    this.start = function(task){
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };

    /**
     * Stops an existing running task.
     * @method stop
     * @param {Object} task The task to stop
     * @return {Object} The task
     */
    this.stop = function(task){
        removeTask(task);
        return task;
    };

    /**
     * Stops all tasks that are currently running.
     * @method stopAll
     */
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};


/**
 * @class Ext.TaskMgr
 * @extends Ext.util.TaskRunner
 * A static {@link Ext.util.TaskRunner} instance that can be used to start and stop arbitrary tasks.  See
 * {@link Ext.util.TaskRunner} for supported methods and task config properties.
 * <pre><code>
// Start a simple clock task that updates a div once per second
var task = {
    run: function(){
        Ext.fly('clock').update(new Date().format('g:i:s A'));
    },
    interval: 1000 //1 second
}
Ext.TaskMgr.start(task);
</code></pre>
 * @singleton
 */
Ext.TaskMgr = new Ext.util.TaskRunner();
/**
 * @class Ext.util.DelayedTask
 * <p> The DelayedTask class provides a convenient way to "buffer" the execution of a method,
 * performing setTimeout where a new timeout cancels the old timeout. When called, the
 * task will wait the specified time period before executing. If durng that time period,
 * the task is called again, the original call will be cancelled. This continues so that
 * the function is only called a single time for each iteration.</p>
 * <p>This method is especially useful for things like detecting whether a user has finished
 * typing in a text field. An example would be performing validation on a keypress. You can
 * use this class to buffer the keypress events for a certain number of milliseconds, and
 * perform only if they stop for that amount of time.  Usage:</p><pre><code>
var task = new Ext.util.DelayedTask(function(){
    alert(Ext.getDom('myInputField').value.length);
});
// Wait 500ms before calling our function. If the user presses another key 
// during that 500ms, it will be cancelled and we'll wait another 500ms.
Ext.get('myInputField').on('keypress', function(){
    task.{@link #delay}(500); 
});
 * </code></pre> 
 * <p>Note that we are using a DelayedTask here to illustrate a point. The configuration
 * option <tt>buffer</tt> for {@link Ext.util.Observable#addListener addListener/on} will
 * also setup a delayed task for you to buffer events.</p> 
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to call.
 * @param {Object} scope The default scope (The <code><b>this</b></code> reference) in which the
 * function is called. If not specified, <code>this</code> will refer to the browser window.
 * @param {Array} args (optional) The default Array of arguments.
 */
Ext.util.DelayedTask = function(fn, scope, args){
    var me = this,
    	id,    	
    	call = function(){
    		clearInterval(id);
	        id = null;
	        fn.apply(scope, args || []);
	    };
	    
    /**
     * Cancels any pending timeout and queues a new one
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
     * is specified, <code>this</code> will refer to the browser window.
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    me.delay = function(delay, newFn, newScope, newArgs){
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    /**
     * Cancel the last queued timeout
     */
    me.cancel = function(){
        if(id){
            clearInterval(id);
            id = null;
        }
    };
};
/**
 * @class Ext.Registry
 * @singleton
 * 
 * Class for working with global variables. 
 */ 
Ext.define("Ext.Registry", {


    singleton: true,
    
    
    /**
     * Sets a value identified by name
     *
     * @param {String} name Name identifier
     * @param {Mixed} value Value to set
     * @return {void}
     */
    set: function(name, value) {
        global.registry[name] = value;
    },
    
    
    /**
     * Returns value by name
     *
     * @return {Mixed} Value
     */
    get: function(name) {
        return global.registry[name];
    },
    
    
    /**
     * Checks if a key is exisitng in global registry
     * 
     * @return {Boolean}          
     */         
    isset: function(name) {
        if (global.registry[name]) {
            return true;
        }
        return false;
    }
});

// Create registry namespace in global scope
global.registry = {};
