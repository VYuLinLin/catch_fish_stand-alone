cc.Class({
    extends: cc.Component,

    properties: {
        gameCannon:{
            default:null,
            type:cc.Node
        },
        gameBg:{
            default:null,
            type:cc.Node
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        netPrefab:{
            default: null,
            type: cc.Prefab
        },
        _cannonPos:cc.Vec2(0,0),
        _cannonScript:null,
        _cannonLevel: 0 // 大炮等级
    },

    onLoad: function () {
        this.node.on('touchstart',function(event){
            this.onTouchStart(event);
        }, this);

        this.initCannonPos();
        this._cannonLevel = 1
    },

    initCannonPos:function()
    {
        this._cannonPos = new cc.Vec2(-214,-320);
        this._cannonScript = this.gameCannon.getComponent('cannon');
    },
    // 点击屏幕
    onTouchStart:function(event)
    {
        let pos = event.getLocation();
        pos =  this.node.convertToNodeSpaceAR(pos);

        let vecSub = cc.pSub(pos,this._cannonPos);
        let direction = cc.pAngle(cc.p(0,1), vecSub);
        var angle = direction / Math.PI * 180; 
        let result = cc.pCross(cc.p(0,1), vecSub);
        if(result>0)
        {
            angle = -1*angle;
        }
        this.gameCannon.rotation=angle;
        this.initCannonPos();

        this._cannonScript.playAction();
        this.createBullet(angle, this._cannonPos);
    },
    // 创建子弹
    createBullet:function(angle,startPos){
        let bulletNode = cc.instantiate(this.bulletPrefab);
        bulletNode.parent = this.node;
        bulletNode.position = startPos;
        bulletNode._cannonLevel = this._cannonLevel

        bulletNode.setRotation(angle);
        bulletNode.getComponent('bullet').initBulletWithData(angle,startPos);
    },
    // 升级炮
    onAddCannon:function(event, customEventData)
    {
        let tempLevel = this._cannonLevel+1;
        let gameControler= this.node.getComponent('GameControler');
        let data ;
        [data, this._cannonLevel]  = gameControler.getCannonConfig(tempLevel);
        this._cannonScript.initWithData(data); 
    },
    // 降级炮
    onSubCannon:function(event, customEventData)
    {
        let tempLevel = this._cannonLevel-1;
        let gameControler= this.node.getComponent('GameControler');
        let data ;
        [data, this._cannonLevel]  = gameControler.getCannonConfig(tempLevel);
        this._cannonScript.initWithData(data); 
    }
});
