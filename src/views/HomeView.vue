<template>
  <div class="home">
    <baidu-map class="map"
               :center="center"
               :zoom="zoom"
               :scroll-wheel-zoom="true"
               @ready="handler">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false" :autoLocation="true"></bm-geolocation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <!--<bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>-->
      <bm-marker :position="{lng: 120.162005, lat: 30.254352}" :dragging="true" @click="infoWindowOpen">
        <!--<bm-label content="我爱杭州" :labelSyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"></bm-label>-->
        <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱杭州</bm-info-window>
      </bm-marker>
      <!--<bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true"></bm-polyline>-->
      <bm-overlay
        pane="labelPane"
        :class="{sample: true, active}"
        @draw="draw"
        @mouseover.native = "active = true"
        @mouseleave.native = "active = false">
        <div>我爱杭州西湖</div>
      </bm-overlay>
      <bm-driving start="西湖" end="西溪湿地" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
      <bml-lushu
        @stop="reset"
        :icon="icon"
        :path="path"
        :play="play"
        :rotation="true">
      </bml-lushu>
    </baidu-map>
  </div>
</template>

<script>
  import {BmlLushu} from 'vue-baidu-map'
  export default {
    name: 'HomeView',
    components: {
      BmlLushu
    },
    data () {
      return {
        center: {lng: 0, lat: 0},
        zoom: 3,
        show: false,
        active: false,
        polylinePath: [
          {lng: 120.162005, lat: 30.254352},
          {lng: 120.168015, lat: 30.254362},
          {lng: 120.173025, lat: 30.254372}
        ],
        play: true,
        path: [],
        icon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: {width: 52, height: 26},
          opts: {anchor: {width: 27, height: 13}}
        }
      }
    },
    methods: {
      handler ({BMap, map}) {
        this.center.lng = 120.162005
        this.center.lat = 30.254352
        this.zoom = 15
      },
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      },
      infoWindowOpen () {
        this.show = true
      },
      infoWindowClose () {
        this.show = false
      },
      draw ({el, BMap, map}) {
        const pixel = map.pointToOverlayPixel(new BMap.Point(120.172005, 30.294352))
        el.style.left = pixel.x - 60 + 'px'
        el.style.top = pixel.y - 20 + 'px'
      },
      handleSearchComplete (res) {
        this.path = res.getPlan(0).getRoute(0).getPath()
      },
      reset () {
        this.play = false
      }
    }
  }
</script>

<style type="text/css" scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  .map {
    width: 100%;
    height: 100%;
  }
  .sample {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: rgba(0,0,0,0.5);
    overflow: hidden;
    box-shadow: 0 0 5px #000;
    color: #fff;
    text-align: center;
    position: absolute;
  }
  .sample.active {
    background: rgba(0,0,0,0.75);
    color: #ffffff
  }

</style>
