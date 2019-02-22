<template>
  <div>
    <h1>MY-COMPONENT</h1>
    <p>{{ msg }}</p>
    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goback">goback</a>
    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goCtn">goContainer</a>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      msg: 'This is my component'
    }
  },
  methods: {
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    },
    goCtn: function (event) {
      console.log(this.$router)
      this.$router.go('/ctn-tabbar')
      
      
      
      // 绑定双指操作
      /* setTimeout(function() {
        
        // var box = document.querySelector("#box")
        var boxes = document.querySelectorAll(".box")
        
        const toScaleMin = 1;
        const toScaleMax = 3;
        
        _.forEach(boxes, function(box, idx) {
            // let box = boxes[idx]
            // console.log('name:', name, 'idx:', idx, 'box:', box)
          let originScale = 1;
          
          let boxGesture = setGesture(box); //得到一个对象
          boxGesture.gesturestart = function() { //双指开始
            box.style.backgroundColor = "yellow";
            let _originScale = box.querySelector('.photo-holder').querySelector('img').style.transform.match(/scale\((.*)\)/)[1]
            if (parseFloat(_originScale) !== NaN && !!parseFloat(_originScale).toFixed) {
              originScale = parseFloat(_originScale).toFixed(2)
            }
          };
          boxGesture.gesturemove = function(e) { //双指移动
            // box.innerHTML = e.scale + "<br />" + e.rotation;
            // box.style.transform = "scale(" + e.scale + ") rotate(" + e.rotation + "deg)"; //改变目标元素的大小和角度
            // box.style.transform = "scale(" + e.scale + ")"; //改变目标元素的大小
            
            console.log('>>>', box.querySelector('.photo-holder').classList)
            // box.querySelector('.photo-holder').classList.add('in-scale')
            
            // 计算缩放
            let toScale = (parseFloat(originScale) * parseFloat(e.scale)).toFixed(2)
            if (toScale > toScaleMax) {
              toScale = toScaleMax
            } else if (toScale < toScaleMin)  {
              toScale = toScaleMin
            }
            
            box.querySelector('.photo-holder').querySelector('img').style.transform = "scale(" +  toScale  + ")"
          };
          boxGesture.gestureend = function() { //双指结束
            // box.innerHTML = "";
            // box.style.cssText = "background-color:red";
            box.style.backgroundColor = "red";
          };
        })
        
      }, 1000); */
    }
  }
}
</script>

<style>

</style>
