<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>异常记录</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(exception, index) in exceptions" :key="index" class="d-flex flex-column">
          <div class="d-flex justify-content-between">
            <strong class="text-danger">{{ exception.exception }}</strong>
            <small class="text-muted">{{ formatTimeAgo(exception.timestamp) }}</small>
          </div>
          <div class="mt-1">
            <small class="text-muted">机器人ID: {{ exception.bot_id }}</small>
          </div>
          <div v-if="exception.message" class="mt-1">
            <small>消息: {{ exception.message }}</small>
          </div>
          <div v-if="exception.session" class="mt-1">
            <small class="text-muted">会话: {{ exception.session }}</small>
          </div>
        </MDBListGroupItem>
        <MDBListGroupItem v-if="exceptions.length === 0" class="text-center text-muted">
          暂无异常记录
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem } from 'mdb-vue-ui-kit';
import { formatTimeAgo } from '../utils/dateUtils';

interface ExceptionStatus {
  exception: string;
  session: string | null;
  message: string | null;
  bot_id: string;
  timestamp: number;
}

defineProps<{
  exceptions: ExceptionStatus[];
}>();
</script>