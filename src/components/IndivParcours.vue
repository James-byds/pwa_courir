<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  parcours: {
    type: Object,
    required: true,
  },
})

console.log('parcours props:', props.parcours)
</script>

<template>
  <h2>Parcours Details</h2>
  {{ props.parcours.name }} - {{ props.parcours.description }}
  <pre>{{ props.parcours.deroulement }}</pre>
</template>
