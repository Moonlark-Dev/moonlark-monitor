<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>事件计数器</MDBCardTitle>
      <div class="d-flex justify-content-around text-center">
        <div>
          <div class="display-6 text-primary">{{ eventCounter.total }}</div>
          <div class="text-muted">总计</div>
        </div>
        <div>
          <div class="display-6 text-success">{{ eventCounter.success }}</div>
          <div class="text-muted">成功</div>
        </div>
        <div>
          <div class="display-6 text-danger">{{ eventCounter.failed }}</div>
          <div class="text-muted">失败</div>
        </div>
      </div>
      <div class="mt-3">
        <MDBProgress :height="20">
          <MDBProgressBar 
            :style="`width: ${(eventCounter.total > 0 ? (eventCounter.success / eventCounter.total) * 100 : 0)}%;`"
            color="success" 
            striped 
            animated
          >
            成功率: {{ eventCounter.total > 0 ? ((eventCounter.success / eventCounter.total) * 100).toFixed(1) : '0.0' }}%
          </MDBProgressBar>
        </MDBProgress>
      </div>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBProgress, MDBProgressBar } from 'mdb-vue-ui-kit';

interface EventCounter {
  total: number;
  success: number;
  failed: number;
}

defineProps<{
  eventCounter: EventCounter;
}>();
</script>