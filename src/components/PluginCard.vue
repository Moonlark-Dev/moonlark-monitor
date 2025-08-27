<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>插件列表 ({{ plugins.length }})</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(plugin, index) in plugins" :key="index">
          <MDBIcon icon="puzzle-piece" class="me-2 text-primary" />
          {{ plugin }}
        </MDBListGroupItem>
        <MDBListGroupItem v-if="plugins.length === 0" class="text-center text-muted">
          暂无插件
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-vue-ui-kit';

defineProps<{
  plugins: string[];
}>();
</script>