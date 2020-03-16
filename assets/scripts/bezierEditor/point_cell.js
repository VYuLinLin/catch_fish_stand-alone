cc.Class({
    extends: cc.Component,

    properties: {
        indexLabel:cc.Label
    },

    // use this for initialization
    onLoad: function () {

    },

    initPoint:function(index)
    {
        if(this.indexLabel)
        {
            this.indexLabel.string = index.toString();
        }
    }

});
