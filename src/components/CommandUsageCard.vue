<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>命令使用统计</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(count, command) in commandUsage" :key="command" class="d-flex justify-content-between align-items-center">
          <span>{{ command }}</span>
          <MDBBadge color="primary">{{ count }}</MDBBadge>
        </MDBListGroupItem>
        <MDBListGroupItem v-if="Object.keys(commandUsage).length === 0" class="text-center text-muted">
          暂无命令使用记录
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdb-vue-ui-kit';

defineProps<{
  commandUsage: { [key: string]: number };
}>();
</script>