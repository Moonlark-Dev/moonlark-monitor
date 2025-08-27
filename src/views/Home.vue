<template>
  <div class="container-fluid py-4">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="text-center mb-4">系统状态面板</h1>
      </div>
    </div>
    
    <!-- Loading and error states -->
    <div v-if="loading" class="d-flex justify-content-center my-5">
      <MDBSpinner color="primary" size="lg" />
    </div>
    
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <h4 class="alert-heading">加载失败</h4>
      <p>{{ error }}</p>
      <hr>
      <button class="btn btn-primary" @click="fetchData">重新加载</button>
    </div>
    
    <!-- Main dashboard content -->
    <div v-else>
      <!-- First row: Bot status and Event counter -->
      <div class="row mb-4">
        <div class="col-lg-8 col-md-12 mb-4 mb-lg-0">
          <BotStatusCard :bots="statusReport.bots" />
        </div>
        <div class="col-lg-4 col-md-12">
          <EventCounterCard :eventCounter="statusReport.event_counter" />
        </div>
      </div>
      
      <!-- Second row: Exceptions and Plugins -->
      <div class="row mb-4">
        <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <ExceptionCard :exceptions="statusReport.exceptions" />
        </div>
        <div class="col-lg-6 col-md-12">
          <PluginCard :plugins="statusReport.plugins" />
        </div>
      </div>
      
      <!-- Third row: Command usage and OpenAI history -->
      <div class="row mb-4">
        <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <CommandUsageCard :commandUsage="statusReport.command_usage" />
        </div>
        <div class="col-lg-6 col-md-12">
          <OpenAIHistoryCard :openaiHistory="statusReport.openai" />
        </div>
      </div>
      
      <!-- Fourth row: Handler results -->
      <div class="row mb-4">
        <div class="col-12">
          <HandlerResultsCard :handlerResults="statusReport.handler_results" />
        </div>
      </div>
      
      <!-- Refresh button -->
      <div class="row">
        <div class="col-12 text-center">
          <button class="btn btn-primary" @click="fetchData">
            <MDBIcon icon="sync" class="me-2" />
            刷新数据
          </button>
          <small class="d-block mt-2 text-muted">
            最后更新: {{ lastUpdated ? formatTimestamp(lastUpdated) : '从未' }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  MDBSpinner, 
  MDBIcon 
} from 'mdb-vue-ui-kit';
import { fetchStatusReport, type StatusReport } from '../services/api';
import { formatTimestamp } from '../utils/dateUtils';
import BotStatusCard from '../components/BotStatusCard.vue';
import ExceptionCard from '../components/ExceptionCard.vue';
import PluginCard from '../components/PluginCard.vue';
import EventCounterCard from '../components/EventCounterCard.vue';
import OpenAIHistoryCard from '../components/OpenAIHistoryCard.vue';
import CommandUsageCard from '../components/CommandUsageCard.vue';
import HandlerResultsCard from '../components/HandlerResultsCard.vue';

// Reactive data
const statusReport = ref<StatusReport>({
  bots: {},
  exceptions: [],
  plugins: [],
  event_counter: { total: 0, success: 0, failed: 0 },
  openai: [],
  command_usage: {},
  handler_results: []
});

const loading = ref(true);
const error = ref<string | null>(null);
const lastUpdated = ref<number | null>(null);

// Fetch data function
const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;
    const data = await fetchStatusReport();
    statusReport.value = data;
    lastUpdated.value = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误';
  } finally {
    loading.value = false;
  }
};

// Fetch data on component mount
onMounted(() => {
  fetchData();
});
</script>
