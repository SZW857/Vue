<template>
  <div class="catoon">
    <el-backtop :bottom="60" :right="10" >
      <el-icon><Top/></el-icon>
    </el-backtop>
    <div id="title">我们的公益短片:</div>
   <div>
    <video controls>
      <source src="@/static/vedio/catoon.mp4" type="video/mp4">
    </video>
   </div>
    <p/><p/>
    <p><span>你，为什么当志愿者？</span></p>
    <p><span>我：可以让自己更加充实，</span></p>
    <p><span>做更多有意义的事情。</span></p>
    <p><span>丰富生活。</span></p>
    <p><span>在帮助别人的同时，</span></p>
    <p><span>总有些嘈杂的声音让你动摇，</span></p>
    <p><span>志愿者不是一种身份</span></p>
    <p><span>更像是一种信念</span></p>
    <p><span>是与城市 国家 民族共同前行的力量</span></p>
    <p><span>是你，是我，也是每一个</span></p>
    <p><span>追梦前行的人</span></p>

    <div style="text-align: left;"><span style="color: brown;font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px;">当前公益组织在解决社会问题时面临巨大挑战</span>：处于发展初期的基层公益组织，由于经验和研发能力不足，面对巨大的社会需求无法拿出有效的解决方案；而部分经过实践检验的优质公益项目却因缺少相关能力和资源，无法进行有效的规模化推广。事实上，公益项目只有在更大范围内发挥成效，让更多人受益，才能大规模解决社会问题。</div><p/>
    <div style="text-align: left">2016年11月，由南都公益基金会等多家机构联合共建的好公益平台正式启动。秉承开放共享的发展策略，平台将优质公益项目的研发方、渴求好项目的基层公益组织，政府、基金会和企业等资源方，有机连接起来,<span style="color: brown;font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px">推动优质公益项目的产品化和推广复制，促进其规模化发展，以便更好地回应社会需求，高效和大规模地解决社会问题。</span></div><p/>
    <div style="text-align: left">目前，平台已遴选出覆盖教育、环保、助老、特殊人群帮扶、社区发展等领域的多个优质公益产品，为其规模化发展<span style="color: brown;font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px">提供学习资金和个性化资助；开展相关培训和咨询服务；链接多种资源，组织路演，助力品牌推广和筹资；促进规模化经验借鉴和分享。</span></div><p/>
    <div style="text-align: left">“十方缘-老人心灵呵护”是一款为临终老人提供专业心灵呵护服务的公益产品。入选平台前，产品从覆盖1个城市到覆盖5个城市用了4年，入选后从5个城市到63个城市只用了两年。在平台的协助下，越来越多的公益产品正在取得规模化的实质性突破。<span style="color: brown;font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px"></span></div><p/>

    <p><span style="color: brown; font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px;">社区公益平台，</span></p>
    <p><span style="color: brown; font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px;">集聚善，关联爱</span></p>
    <p><span style="color: brown; font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px;">把好公益带到你的身边</span></p>
    <p><span style="color: brown; font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px;">鼓励追梦前行的人</span></p>
    <p><span style="color: brown; font-size: 15px;font-family: 微软雅黑;font-weight: bold;letter-spacing: 1px;">让公益彰显最大价值！</span></p>

  </div>
</template>
<style scoped>
.catoon{
  width: 1200px;
  background-color: #b7b2b2;
  margin-left: 150px;
}
#title{
  height: 90px;
  text-align: left;
  top: 20px;
  color: red;
  font-size: 24px;
  font-weight: bold;
  position: relative;
}
p{
  height: 24px;
}
</style>
<script>
import {Position} from "@element-plus/icons";
export default {
  components: {Position}
}
</script>