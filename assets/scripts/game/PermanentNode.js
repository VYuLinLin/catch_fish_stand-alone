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
  onLoad() {
    this.init()
  },
  init() {
    // 调整画布前的回调
    cc.view.resizeWithBrowserSize(true);
    cc.view.setResizeCallback(this.resizeCallback)
    cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.resizeCallback);
    cc.game.addPersistRootNode(this.node);
    cc.director.loadScene('gameScene')
    return
    // 场景跳转
    const { userId, roomId } = myglobal.playerData
    console.log('userId = ', userId)
    console.log('roomId = ', roomId)
    if (!userId) {
      cc.director.loadScene('loginScene')
    } else if (!roomId) {
      cc.director.loadScene('hallScene')
    } else {
      cc.director.loadScene('gameScene')
    }
  },
  resizeCallback() {
    console.log('resizeCallback')
    var canvas = cc.find("Canvas").getComponent(cc.Canvas)
    const width = window ? window.innerWidth : cc.view.getVisibleSize().width
    const height = window ? window.innerHeight : cc.view.getVisibleSize().height
    var t = width / canvas.designResolution.width
    var n = height / canvas.designResolution.height;
    t < n
      ? (canvas.fitWidth = !0, canvas.fitHeight = !1) : n < t
        ? (canvas.fitWidth = !1, canvas.fitHeight = !0) : (canvas.fitWidth = !1, canvas.fitHeight = !1)
  }
});
