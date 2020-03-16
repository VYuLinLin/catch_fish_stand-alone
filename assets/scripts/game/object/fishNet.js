cc.Class({
  extends: cc.Component,

  // properties: {
  //     fishAnim:{
  //         default:null,
  //         type:cc.Animation
  //     },
  // },

  // use this for initialization
  onLoad() {
    const anim = this.getComponent(cc.Animation);
    anim.on('finished', this.dead, this);
    anim.play("netAnimation");
  },

  dead() {
    this.node.destroy();
  }
});
