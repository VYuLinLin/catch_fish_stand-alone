const global = require('global')
const kRevolutionHeight = 720;
const kRevolutionWidth = 1280;
const M_PI = Math.PI;
const M_PI_2 = M_PI / 2;

cc.Class({
  extends: cc.Component,

  properties: {
    _startPos: cc.Vec2(0, 0),
    _action: null,
    _isStart: false,
    _bulletId: -1,

    _angle: 0,
    _bulletSpeed: 0,
    _dx: 0,
    _dy: 0,
  },

  onLoad: function () {

  },

  initBulletWithData: function (angle, startPos) {
    this._startPos = startPos;
    this.node.position = startPos;
    this.initActionData(angle * Math.PI / 180, 1000);
  },

  initActionData: function (angle, speed) {
    this._angle = angle;
    this._bulletSpeed = speed;
    this._dx = Math.sin(this._angle);
    this._dy = Math.cos(this._angle);
  },

  onCollisionEnter: function (other, self) {
    this.onBulletCollisionFish();
    // cc.log("bullet enter collision")
    this.node.destroy();
  },

  onCollisionStay: function (other, self) {
    // console.log('on collision stay');
  },

  onCollisionExit: function (other, self) {
    // console.log('on collision exit');
  },

  isBulletOutWindow: function () {
    let pos = this.node.position;
    // if (pos.x >680 || pos.x <-680 || pos.y>400 || pos.y<-400) {
    //     return true;
    // }
    return false;
  },

  setBulletId: function (id) {
    this._bulletId = id;
  },

  onBulletCollisionFish: function () {
    // 打开渔网
    let fishNet = global.GameFactory.createFishNet()
    fishNet.parent = this.node.parent;
    fishNet.position = this.node.position;
  },

  update: function (dt) {
    if (this.node) {
      let pt = this.node.getPosition();
      let deltaX = this._bulletSpeed * this._dx * dt;
      let deltaY = this._bulletSpeed * this._dy * dt;
      pt.x += deltaX;
      pt.y += deltaY;

      if (pt.x < -kRevolutionWidth / 2) {
        pt.x = pt.x + 2 * Math.abs(deltaX);
        this._dx = -this._dx;
        this._angle = -this._angle;
      }
      if (pt.x > kRevolutionWidth / 2) {
        pt.x = kRevolutionWidth / 2 - (pt.x - kRevolutionWidth / 2);
        this._dx = -this._dx;
        this._angle = -this._angle;
      }

      if (pt.y < -kRevolutionHeight / 2) {
        pt.y = pt.y + 2 * Math.abs(deltaY);
        this._dy = -this._dy;
        this._angle = M_PI - this._angle;
      }

      if (pt.y > kRevolutionHeight / 2) {
        pt.y = kRevolutionHeight / 2 - (pt.y - kRevolutionHeight / 2);
        this._dy = -this._dy;
        this._angle = M_PI - this._angle;
      }

      this.node.setPosition(pt);
      this.node.setRotation((this._angle) * 180 / M_PI);
    }
    else {
      console.log("tagget is no nonentity");
    }
  }
});
