<template>
  <MDBCard class="h-100">
    <MDBCardBody>
      <MDBCardTitle>机器人状态</MDBCardTitle>
      <MDBListGroup flush>
        <MDBListGroupItem v-for="(bot, userId) in bots" :key="userId" class="d-flex justify-content-between align-items-center">
          <div>
            <MDBIcon :icon="bot.online ? 'circle' : 'circle-dot'" :class="bot.online ? 'text-success' : 'text-danger'" />
            <span class="ms-2">{{ isOnlineBot(bot) ? (bot.nickname || userId) : userId }}</span>
            <small class="text-muted d-block" v-if="isOnlineBot(bot) && bot.adapter_name">({{ bot.adapter_name }})</small>
          </div>
          <MDBBadge :color="bot.online ? (isOnlineBot(bot) && bot.good ? 'success' : 'warning') : 'secondary'">
            {{ bot.online ? (isOnlineBot(bot) && bot.good ? '在线' : '异常') : '离线' }}
          </MDBBadge>
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBCardBody>
  </MDBCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from 'mdb-vue-ui-kit';

interface OnlineBotStatus {
  user_id: string;
  online: true;
  adapter_name: string;
  good: boolean;
  nickname: string | null;
}

interface OfflineBotStatus {
  user_id: string;
  online: false;
}

type BotStatus = OnlineBotStatus | OfflineBotStatus;

const props = defineProps<{
  bots: { [key: string]: BotStatus };
}>();

// Type guard to check if a bot is online
const isOnlineBot = (bot: BotStatus): bot is OnlineBotStatus => {
  return bot.online;
};
</script>