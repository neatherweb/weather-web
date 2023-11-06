<script setup>
import WindChart from './WindChart.vue'
import WindGuage from './WindGuage.vue'
</script>

<template>
  <WindGuage size="150" warnstart=20 warnend=90 
                        greenstart=30 greenend=80 
                        winddirection=45 windspeed="10" windgust="13" windunit="kmh"></WindGuage>
  <WindChart></WindChart>
</template>
