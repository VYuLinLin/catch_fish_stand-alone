// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    spriteAtlas: {
      default: null,
      type: cc.SpriteAtlas
    },
    goldNode: {
      default: null,
      type: cc.Node
    }
  },
  onLoad() {
    const actionTo = cc.moveTo(0.5, cc.v2(80, 80))
    setTimeout(() => {
      this.node.runAction(actionTo)
    }, 0)
  },
  /**
   * @description 显示赢了多少金币
   * @param {Number | String} num 金币数量
   */
  showWinGold(num = '') {
    const spriteFrames = {}
    for (let i = 0; i < 10; i++) {
      const spriteName = 'goldnum_' + i
      const spriteFrame = this.spriteAtlas.getSpriteFrame(spriteName)
      spriteFrames[i] = spriteFrame
    }
    num.toString().split('').forEach(n => {
      const node = cc.instantiate(this.goldNode)
      node.getComponent(cc.Sprite).spriteFrame = spriteFrames[n]
      node.parent = this.node
    })
  }
});
