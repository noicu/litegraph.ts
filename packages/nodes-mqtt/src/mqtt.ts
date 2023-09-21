import { md5 } from './md5';

import type {
  IClientOptions,
  IClientSubscribeOptions,
  MqttClient,
} from 'mqtt';

import { connect } from 'mqtt/dist/mqtt';

export interface IClientManagerItem {
  url: string;
  connected: boolean;
  sub: (
    topic: string,
    callback?: (topic: string, payload: Buffer) => void
  ) => void;  
  unSub: (topic: string, opts?: IClientSubscribeOptions) => void;
  publish: (topic: string, payload: string | Buffer) => void;
  onMsg: (callback: (topic: string, payload: string) => void) => void;
  kill: () => void;
  topics: {
    [key: string]: boolean;
  };
  getClient: () => import('mqtt').MqttClient;
}

interface IClientManager {
  [key: string]: IClientManagerItem;
}

const CLIENT_MANAGER: IClientManager = {};
const CLIENTS: {
  [key: string]: MqttClient;
} = {};

export function useMqttManager() {
  return {
    clients: CLIENT_MANAGER,
    // 杀死所有客户端
    killAll: () => {
      Object.keys(CLIENT_MANAGER).forEach((key) => {
        CLIENT_MANAGER[key].getClient().end();
        delete CLIENT_MANAGER[key];
      });
    },
  };
}

export function useMqtt(brokerUrl: string, opts?: IClientOptions) {
  // const notification = useNotification()

  const key = md5(brokerUrl + (opts?.clientId || '')).toString();

  if (!CLIENT_MANAGER[key]) {
    CLIENTS[key] = connect(brokerUrl, opts);

    // 发生错误
    CLIENTS[key].on('error', (err) => {
      console.error(`发生错误: ${err.message}`);
    });

    // 连接成功
    CLIENTS[key].on('connect', () => {
      CLIENT_MANAGER[key].connected = true;
      console.log('连接成功');
    });

    // 断开连接
    CLIENTS[key].on('close', () => {
      CLIENT_MANAGER[key].connected = false;
      console.log('断开连接');
    });

    // 重连
    CLIENTS[key].on('reconnect', () => {
      console.warn('reconnect');
    });

    CLIENT_MANAGER[key] = {
      url: brokerUrl,
      topics: {},
      connected: false,
      getClient: () => CLIENTS[key],

      // 监听消息
      onMsg: (callback: (topic: string, payload: string) => void) => {
        CLIENT_MANAGER[key].getClient().on('message', (topic, payload) => {
          callback(topic, payload.toString());
        });
      },
      // 发布主题
      publish: (topic: string, payload: string | Buffer) => {
        CLIENT_MANAGER[key].getClient().publish(topic, payload, (err) => {
          if (err) console.error('发布主题失败');
        });
      },
      // 订阅主题
      sub: (
        topic: string,
        callback?: (topic: string, payload: Buffer) => void
      ) => {
        CLIENT_MANAGER[key].topics[topic] = false;
        CLIENT_MANAGER[key].getClient().subscribe(topic, (err) => {
          CLIENT_MANAGER[key].topics[topic] = !err;
          if (err) {
            console.error(`订阅 ${topic} 主题失败`);
          } else {
            console.log(`订阅 ${topic} 主题成功`);
          }
        });
        if (callback) {
          CLIENT_MANAGER[key].getClient().on('message', callback);
        }
      },
      // 取消订阅主题
      unSub: (topic: string, opts2?: IClientSubscribeOptions) => {
        CLIENT_MANAGER[key].topics[topic] = false;
        CLIENT_MANAGER[key].getClient().unsubscribe(topic, opts2, (err) => {
          if (err) {
            console.error(`取消订阅 ${topic} 主题失败`);
          } else {
            console.log(`取消订阅 ${topic} 主题成功`);
            delete CLIENT_MANAGER[key].topics[topic];
          }
        });
      },
      // 杀死客户端
      kill: () => {
        CLIENT_MANAGER[key].getClient().end();
        delete CLIENT_MANAGER[key];
      },
    };
  }

  return CLIENT_MANAGER[key];
}
