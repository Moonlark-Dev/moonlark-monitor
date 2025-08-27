<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>OpenAI 历史记录</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(history, index) in openaiHistory.toReversed()" :key="index">
          <div class="d-flex justify-content-between align-items-center cursor-pointer" @click="toggleSession(index)">
            <div>
              <div>{{ history.model }}</div>
              <small class="text-muted">{{ history.identify }}</small>
            </div>
            <div class="d-flex align-items-center">
              <MDBBadge color="info" class="me-2">{{ history.messages.length }} 条消息</MDBBadge>
              <span>{{ expandedSessions[index] ? '▲' : '▼' }}</span>
            </div>
          </div>
          <ul v-if="expandedSessions[index]" class="mt-2">
            <li v-for="(message, msgIndex) in history.messages" :key="msgIndex">
              <span class="badge bg-info">{{ message.role.toUpperCase() }}</span>
              <div v-if="['system', 'user'].includes(message.role)">
                <span v-for="(line, lineno) in message.content.split('\n')" :key="lineno">
                  <br v-if="lineno !== 0" />
                  {{ line }}
                </span>
              </div>
              <div v-else-if="message.role === 'assistant'">
                <span v-if="message.content" v-for="(line, lineno) in message.content.split('\n')" :key="lineno">
                  <br v-if="lineno !== 0" />
                  {{ line }}
                </span>
                <ul v-if="message.tool_calls">
                  <li v-for="(call, call_index) in message.tool_calls" :key="call_index">
                    Moonlark 使用了 {{ call.function.name }}<br>
                    <span class="text-secondary">{{ call.function.arguments }}</span>
                  </li>
                </ul>
              </div>
              <div v-else-if="message.role === 'tool'">
                <pre style="white-space: pre-wrap;">{{ message.content }}</pre>
              </div>
            </li>
          </ul>
        </MDBListGroupItem>
        <MDBListGroupItem v-if="openaiHistory.length === 0" class="text-center text-muted">
          暂无 OpenAI 历史记录
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { defineProps, ref, reactive } from 'vue';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdb-vue-ui-kit';

interface OpenAIHistory {
  model: string;
  identify: string;
  messages: Array<{ [key: string]: any }>;
}

defineProps<{
  openaiHistory: OpenAIHistory[];
}>();

// Reactive state to track expanded sessions
const expandedSessions = reactive<Record<number, boolean>>({});

// Function to toggle session expansion
const toggleSession = (index: number) => {
  expandedSessions[index] = !expandedSessions[index];
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>