<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>OpenAI 历史记录</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(history, index) in openaiHistory" :key="index" class="d-flex justify-content-between align-items-center">
          <div>
            <div>{{ history.model }}</div>
            <small class="text-muted">{{ history.identify }}</small>
          </div>
          <MDBBadge color="info">{{ history.messages.length }} 条消息</MDBBadge>
        </MDBListGroupItem>
        <MDBListGroupItem v-if="openaiHistory.length === 0" class="text-center text-muted">
          暂无 OpenAI 历史记录
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdb-vue-ui-kit';

interface OpenAIHistory {
  model: string;
  identify: string;
  messages: Array<{ [key: string]: any }>;
}

defineProps<{
  openaiHistory: OpenAIHistory[];
}>();
</script>