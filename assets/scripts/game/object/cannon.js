cc.Class({
    extends: cc.Component,

    properties: {
        spriteAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
    },

    onLoad: function () {

    },

    initWithData:function(config){
        if(!config) return;
        let animateConfig = config.animates;
        let animation = this.node.getComponent(cc.Animation);
        let sprite = this.node.getComponent(cc.Sprite);
        this.removeAnimationData();
        let spriteFrameList = this.getSpriteFrameList(animateConfig);
        sprite.spriteFrame = spriteFrameList[0];

        let clicp = cc.AnimationClip.createWithSpriteFrames(spriteFrameList,spriteFrameList.length);
        clicp.wrapMode = cc.WrapMode.Normal;
        animation.defaultClip = clicp;
        animation.setCurrentTime(animateConfig.speed);
        animation.addClip(clicp, "run");
    },

    playAction:function(){
        let animation = this.node.getComponent(cc.Animation);
        animation.stop("run");
        animation.play("run");
    },

    getSpriteFrameList: function (animateConfig) {
        let pre = animateConfig.pre;
        let start = animateConfig.start;
        let end = animateConfig.end;
        let spriteFrameList = [];
        for (let i = start ; i < (end + 1) ; i ++){
            let str = pre + "_" + i;
            let spriteFrame = this.spriteAtlas.getSpriteFrame(str);
            spriteFrameList.push(spriteFrame);
        }
        return spriteFrameList;
    },

    removeAnimationData:function()
    {
        let animation = this.getComponent(cc.Animation);
        let clips = animation.getClips();
        for (let index = 0; index < clips.length; index++) {
            animation.removeClip(clips[index],true);
        }
    },
});
