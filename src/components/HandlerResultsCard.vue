<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>处理器结果</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(handlerResult, index) in handlerResults.toReversed()" :key="index" class="d-flex flex-column">
          <div class="d-flex justify-content-between">
            <strong>{{ handlerResult.command_name }}</strong>
            <small class="text-muted">{{ handlerResult.matcher }}</small>
          </div>
          <div class="mt-1">
            <small>{{ handlerResult.message }}</small>
          </div>
          <div class="mt-2">
            <div v-for="(result, resultIndex) in handlerResult.result" :key="resultIndex" class="d-flex justify-content-between align-items-center mt-1">
              <span>
                <MDBIcon 
                  :icon="{'success': 'check-circle', 'skipped': 'minus-circle', 'failed': 'times-circle'}[result.result]"
                  :class="{'success': 'text-success', 'skipped': 'text-warning', 'failed': 'text-danger'}[result.result]"
                />
                {{ result.handler.name }}
                <span class="text-secondary">({{ result.handler.filename.split('\\').pop()?.split('/').pop() || result.handler.filename }}:{{ result.handler.lineno }} @ {{ result.handler.plugin }})</span>
                <span v-if="result.message" class="badge bg-info">{{ result.message }}</span>
              </span>
              <small class="text-muted">{{ formatTimeAgo(result.timestamp) }}</small>
            </div>
          </div>
        </MDBListGroupItem>
        <MDBListGroupItem v-if="handlerResults.length === 0" class="text-center text-muted">
          暂无处理器结果
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdb-vue-ui-kit';
import { formatTimeAgo } from '../utils/dateUtils';

interface HandlerInfo {
  lineno: number;
  filename: string;
  name: string;
  plugin: string;
}

interface RunResult {
  result: "success" | "skipped" | "failed";
  message: string;
  handler: HandlerInfo;
  timestamp: number;
}

interface HandlerResult {
  command_name: string;
  message: string;
  result: RunResult[];
  matcher: string;
}

defineProps<{
  handlerResults: HandlerResult[];
}>();
</script>