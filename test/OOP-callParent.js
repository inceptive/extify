Ext.define('Handler', {
    getAbc: function(ss) {
        console.debug("ABC", ss);
    }
});


Ext.define('HandlerEx', {
    extend: 'Handler',
    singleton: true,
    getAbc: function() {
        this.callParent(['huhu']);
        console.debug("BCE");
    }
});
HandlerEx.getAbc();
