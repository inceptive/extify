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
