/**
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
});