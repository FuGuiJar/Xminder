/**
 * @fileOverview
 *
 * 
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */
kity.extendClass(Minder, {

    disable: function() {
        var me = this;
        //禁用命令
        me.bkqueryCommandState = me.queryCommandState;
        me.bkqueryCommandValue = me.queryCommandValue;
        me.queryCommandState = function(type) {
            var cmd = this._getCommand(type);
            if (cmd && cmd.enableReadOnly === false) {
                return me.bkqueryCommandState.apply(me, arguments);
            }
            return -1;
        };
        me.queryCommandValue = function(type) {
            var cmd = this._getCommand(type);
            if (cmd && cmd.enableReadOnly === false) {
                return me.bkqueryCommandValue.apply(me, arguments);
            }
            return null;
        };
        this.setStatus('readonly');
        me.fire('interactchange');
    },

    enable: function() {
        var me = this;

        if (me.bkqueryCommandState) {
            me.queryCommandState = me.bkqueryCommandState;
            delete me.bkqueryCommandState;
        }
        if (me.bkqueryCommandValue) {
            me.queryCommandValue = me.bkqueryCommandValue;
            delete me.bkqueryCommandValue;
        }

        this.rollbackStatus();

        me.fire('interactchange');
    }
});