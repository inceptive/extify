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
});