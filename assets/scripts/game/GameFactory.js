const global = require('global')
global.GameFactory ={
    _netFrefab:null,
    _isInitFinish:false,

    initGameFactory:function()
    {
        let self = this;
        cc.loader.loadRes("prefabs/fishNet", function (err, prefab) {
            if (err){
                cc.log("load err " + resPath +" = " + err);
            }
            self._netFrefab = prefab;
            self._isInitFinish = true;
        });
    },
    // 创建一个渔网
    createFishNet:function()
    {
        if(this._isInitFinish== true)
        {
            let node = cc.instantiate(this._netFrefab);
            return node;
        }
        return null;
    }
};