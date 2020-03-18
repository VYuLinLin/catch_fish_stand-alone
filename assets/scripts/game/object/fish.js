import Bezier from 'bezier'
const FishState = {
  Invalid: -1,
  Run: 1,
  RunFast: 2,
  Dead: 3
};
cc.Class({
  extends: cc.Component,

  properties: {
    spriteAtlas: {
      default: null,
      type: cc.SpriteAtlas
    },
    winGold: {
      default: null,
      type: cc.Prefab
    },
    _lastFishPos: {
      default: cc.Vec2(0, 0),
    }
  },

  // use this for initialization
  onLoad: function () {
    this.state = FishState.Invalid;
    this.runTime = 0;
    this._level = 0
  },
  initWithData: function (data) {
    //首先取出动画
    let config = data.config;
    let bezier = data.bezier;
    let animation = this.getComponent(cc.Animation);

    let clicpNameList = ['run', 'dead'];
    let animateConfig = config.animates;
    this._fishData = config
    this._level = config.level * 10 // 鱼的等级
    this._fishIntegral = this._level

    for (let i = 0; i < clicpNameList.length; i++) {
      const anim = animateConfig[clicpNameList[i]]
      let spriteFrameList = this.getSpriteFrameList(anim);
      // cc.log('sprite frame list = ' + spriteFrameList.length);
      let clicp = cc.AnimationClip.createWithSpriteFrames(spriteFrameList, spriteFrameList.length);
      if (clicpNameList[i] === 'run') {
        clicp.wrapMode = cc.WrapMode.Loop;
      }
      animation.defaultClip = clicp;
      animation.addClip(clicp, clicpNameList[i]);

    }

    //创建一条贝塞尔曲线
    const speed = this.random(config.minSpeed, config.minSpeed + 20)
    this.bezier = Bezier(bezier, 500, speed);
    this.setState(FishState.Run);

  },
  /**
  * 产生随机整数，包含上下限值
  * @param {Number} lower 下限
  * @param {Number} upper 上限
  * @return {Number} 返回在下限到上限之间的一个随机整数
  */
  random(lower, upper) {
    return Math.round(Math.random() * (upper - lower) + lower)
  },
  getSpriteFrameList: function (animateConfig) {
    let pre = animateConfig.pre;
    let start = animateConfig.start;
    let end = animateConfig.end;
    let spriteFrameList = [];
    for (let i = start; i < (end + 1); i++) {
      let str = pre + "_" + i;
      let spriteFrame = this.spriteAtlas.getSpriteFrame(str);
      spriteFrameList.push(spriteFrame);
    }
    return spriteFrameList;
  },

  setState: function (state) {
    if (this.state === state) {
      return
    }
    switch (state) {
      case FishState.Invalid:
        break;
      case FishState.Run:
        this.node.position = this.bezier.getPoint(0);
        this.getComponent(cc.Animation).play("run");
        break;
      case FishState.RunFast:
        break;
      case FishState.Dead:
        let animation = this.getComponent(cc.Animation);
        animation.stop("run");
        animation.on('finished', this.dead, this);
        animation.play("dead");
        break;
      default:
        break;
    }
    this.state = state;
  },

  dead() {
    this.node.destroy();
  },

  update: function (dt) {
    //开始运行
    this.runTime += dt;
    switch (this.state) {
      case FishState.Run:
        let position = this.bezier.getPoint(this.runTime);
        if (position == null) {
          this.dead();
          break;
        }

        let vecSub = cc.pSub(position, this.node.position);
        let direction = cc.pAngle(cc.p(1, 0), vecSub);
        var angle = direction / Math.PI * 180;

        //判断两个向量方向
        let result = cc.pCross(cc.p(1, 0), vecSub);
        if (result > 0) {
          angle = 360 - angle;
        }

        this.node.position = position;
        this.node.rotation = angle;

        break;
      case FishState.RunFast:
        break;
      default:
        break;
    }
  },

  onCollisionEnter(bulletNode, fishNode) {
    this._level -= bulletNode.node._cannonLevel * 2
    if (this._level < 1) {
      // 销毁碰撞组件
      this.node.getComponent(cc.BoxCollider).destroy()
      // 金币提示
      const winGold = cc.instantiate(this.winGold)
      winGold.getComponent('winGold').showWinGold(this._fishIntegral)
      winGold.parent = this.node;
      this.setState(FishState.Dead);
    }
    // cc.log("fish enter collision", bulletNode, fishNode)
  },
  onCollisionStay: function (other, self) {
    // console.log('on collision stay');
  },
  onCollisionExit: function (other, self) {
    // console.log('on collision exit');
  },

});
