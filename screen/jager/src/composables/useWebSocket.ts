import { io, Socket } from "socket.io-client";
import { ref } from "vue";

// 配置项
interface WbeSocketOptions {
  // 是否自动连接
  autoConnect?: boolean;

  // 重连次数
  reconnectionAttempts?: number;

  // 重连间隔
  reconnectionDelay?: number;
}

// websocket状态
type WebSocketStatus = "connecting" | "connected" | "disconnected" | "error";

// 事件回调类型
type EventCallback<T = any> = (data: T) => void;

export default function useWebSocket(
  url: string,
  options: WbeSocketOptions = {},
) {
  // 解构配置项
  const {
    autoConnect = true,
    reconnectionAttempts = 5,
    reconnectionDelay = 3000,
  } = options;

  // socket实例
  const socket = ref<Socket | null>(null);

  // 当前连接状态
  const connectionStatus = ref<WebSocketStatus>("disconnected");

  // 最后的错误信息
  const lastError = ref<Error | null>(null);

  // 存储所有事件回调
  const eventCallbacks = new Map<string, EventCallback>();

  // 初始化socket
  const initSocket = () => {
    socket.value = io(url, {
      autoConnect,
      reconnectionAttempts,
      reconnectionDelay,
    });

    // 连接成功
    socket.value.on("connect", () => {
      connectionStatus.value = "connected";
      lastError.value = null;
    });

    // 断开连接
    socket.value.on("disconnect", () => {
      connectionStatus.value = "disconnected";
    });

    // 连接错误
    socket.value.on("error", (error: Error) => {
      connectionStatus.value = "error";
      lastError.value = error;
    });

    // 监听所有事件
    socket.value.onAny((eventName: string, data: any) => {
      // 根据事件名找到对应回调
      const callback = eventCallbacks.get(eventName);

      // 执行回调
      if (callback) {
        callback(data);
      }
    });
  };

  // 订阅事件
  const subscribe = <T>(eventName: string, callback: EventCallback<T>) => {
    eventCallbacks.set(eventName, callback);
  };

  // 取消订阅
  const unsubscribe = (eventName: string) => {
    eventCallbacks.delete(eventName);
  };

  // 手动连接
  const connect = () => {
    // 没初始化才初始化
    if (!socket.value) {
      initSocket();
    }

    socket.value?.connect();
  };

  // 断开连接
  const disconnect = () => {
    socket.value?.disconnect();

    // 清空所有事件
    eventCallbacks.clear();
  };

  // 自动连接
  if (autoConnect) {
    initSocket();
  }

  return {
    // socket实例
    socket,

    // 连接状态
    connectionStatus,

    // 错误信息
    lastError,

    // 订阅事件
    subscribe,

    // 取消订阅
    unsubscribe,

    // 手动连接
    connect,

    // 断开连接
    disconnect,
  };
}
