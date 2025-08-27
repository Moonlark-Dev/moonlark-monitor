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

async function getToken(salt: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${password}+${salt}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Function to fetch status report
export const fetchStatusReport = async (): Promise<StatusReport> => {
  const salt = (Math.random() * 1000000).toFixed(0).toString();
  const token = await getToken(salt, import.meta.env.VITE_API_PASSWORD);
  try {
    const response = await apiClient.get('/admin/status', {
      params: {
        token, salt
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching status report:', error);
    throw error;
  }
};