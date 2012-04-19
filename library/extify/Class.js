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