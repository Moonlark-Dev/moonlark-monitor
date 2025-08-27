import axios from 'axios';

// Define TypeScript interfaces based on the Python TypedDict definitions
export interface OnlineBotStatus {
  user_id: string;
  online: true;
  adapter_name: string;
  good: boolean;
  nickname: string | null;
}

export interface OfflineBotStatus {
  user_id: string;
  online: false;
}

export type BotStatus = OnlineBotStatus | OfflineBotStatus;

export interface ExceptionStatus {
  exception: string;
  session: string | null;
  message: string | null;
  bot_id: string;
  timestamp: number;
}

export interface EventCounter {
  total: number;
  success: number;
  failed: number;
}

export interface OpenAIHistory {
  model: string;
  identify: string;
  messages: Array<{ [key: string]: any }>;
}

export interface HandlerInfo {
  lineno: number;
  filename: string;
  name: string;
  plugin: string;
}

export interface RunResult {
  result: "success" | "skipped" | "failed";
  message: string;
  handler: HandlerInfo;
  timestamp: number;
}

export interface HandlerResult {
  command_name: string;
  message: string;
  result: RunResult[];
  matcher: string;
}

export interface StatusReport {
  bots: { [key: string]: BotStatus };
  exceptions: ExceptionStatus[];
  plugins: string[];
  event_counter: EventCounter;
  openai: OpenAIHistory[];
  command_usage: { [key: string]: number };
  handler_results: HandlerResult[];
}

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch status report
export const fetchStatusReport = async (): Promise<StatusReport> => {
  try {
    const response = await apiClient.get('/admin/status', {
      params: {
        token: import.meta.env.VITE_API_TOKEN,
        salt: import.meta.env.VITE_API_SALT,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching status report:', error);
    throw error;
  }
};