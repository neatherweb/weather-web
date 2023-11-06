<template>
    <div class="windguage">
        <svg :width="props.size" :height="props.size" :viewBox="viewbox" version="1.1">
            <g>
                <circle style="fill:#f4b4b4;stroke-width:1" :r="outer_radius" :cy="outer_radius" :cx="outer_radius" />
                <path style="fill:#efab23;stroke-width:1" :d="warnzonearc" />
                <path style="fill:#008000;stroke-width:1" :d="greenzonearc" />
                <text :x="outer_radius" y="4" font-size="6" dominant-baseline="middle" text-anchor="middle"
                    fill="black">N</text>
                <text :x="outer_radius" y="78" font-size="6" dominant-baseline="middle" text-anchor="middle"
                    fill="black">S</text>
                <text x="3" :y="outer_radius" font-size="6" dominant-baseline="middle" text-anchor="middle"
                    fill="black">W</text>
                <text x="77" :y="outer_radius" font-size="6" dominant-baseline="middle" text-anchor="middle"
                    fill="black">E</text>
                <g :transform="inner_shift">
                    <circle style="fill:#c3e1e3;stroke-width:1" id="circle1" :r="inner_radius" :cy="inner_radius"
                        :cx="inner_radius" />
                    <path :fill="windindicatorcolor" style="stroke-width:1" id="circle2" :d="windindicator" />
                </g>
                <g :transform="inner_inner_shift">
                    <circle style="fill:#ffffff;stroke-width:1" id="circle1" :r="inner_inner_radius"
                        :cy="inner_inner_radius" :cx="inner_inner_radius" />
                    <g transform="translate(1,0)"> <!-- just to center the text with units better-->
                        <text x="25" y="9" font-size="11" dominant-baseline="middle" text-anchor="middle" fill="black">{{
                            props.winddirection }}<tspan font-size="8">&deg;</tspan></text>
                        <text x="25" y="27" font-size="20" dominant-baseline="middle" text-anchor="middle" fill="black">10<tspan font-size="8">{{ props.windunit }}</tspan></text>
                        <text x="25" y="42" font-size="11" dominant-baseline="middle" text-anchor="middle" fill="black">14<tspan font-size="6">{{ props.windunit }}</tspan></text>
                    </g>
                </g>
        </g>
    </svg>
    <span class="tooltiptext">The outer arc shows green for flyable direction, amber for border-line. The direction
        indicator points to current wind direction (changing color for status). Wind direction, speed and gust is shown
        in the inner guage.</span>
</div></template>


<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    size: String,
    warnstart: String,
    warnend: String,
    greenstart: String,
    greenend: String,
    winddirection: String,
    windspeed: String,
    windgust: String,
    windunit: String
})
const objsize = 80  // Note. if changed then the text locations and sizes also need to be changed or calculated (shouldn't need to -so I couldn't be bothered computing them)
const outer_radius = objsize / 2
const inner_radius = outer_radius * 0.85
const inner_shift = `translate(${outer_radius-inner_radius},${outer_radius-inner_radius})`
const inner_inner_radius = inner_radius * 0.70
const inner_inner_shift = `translate(${outer_radius-inner_inner_radius},${outer_radius-inner_inner_radius})`
const viewbox = ref(`0 0 ${objsize} ${objsize}`)
const windindicator = computed(() => {
    return computeArcPath(inner_radius,inner_radius,inner_radius,Number(props.winddirection)-5,Number(props.winddirection)+5)
})
const windindicatorcolor = computed(() => {
    var c = "#BA1111"
    if (Number(props.winddirection) >= Number(props.warnstart) && Number(props.winddirection) <= Number(props.warnend)) {
        c = "#F78707"
    }
    if (Number(props.winddirection) >= Number(props.greenstart) && Number(props.winddirection) <= Number(props.greenend)) {
        c = "#03D80A"
    }
    return c
})
const warnzonearc = ref(computeArcPath(outer_radius,outer_radius,outer_radius,Number(props.warnstart),Number(props.warnend)))
const greenzonearc = ref(computeArcPath(outer_radius,outer_radius,outer_radius,Number(props.greenstart),Number(props.greenend)))

function computeArcPath(cx, cy, radius, startBearing, endBearing) {
    const mx = cx + radius * Math.sin(startBearing * Math.PI/180)
    const my = cy - radius * Math.cos(startBearing * Math.PI/180)
    const nx = cx + radius * Math.sin(endBearing * Math.PI/180)
    const ny = cy - radius * Math.cos(endBearing * Math.PI/180)
    const dx = nx - mx
    const dy = ny - my
    return `m ${mx},${my} a ${radius},${radius} 0 0 1 ${dx},${dy} L ${radius},${radius} z`
}

</script>

<style scoped>

.windguage .tooltiptext {
  visibility: hidden;
  width: 180px;
  background-color: rgb(81, 80, 80);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.windguage:hover .tooltiptext {
  visibility: visible;
}
</style>