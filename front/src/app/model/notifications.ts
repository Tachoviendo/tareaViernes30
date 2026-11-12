export enum NOTIFICATION_TYPES {
  ERROR = 'danger',
  WARNING = 'warning',
  INFO = 'light',
  OK = 'success',
}

export type Notification = {
  noti_type: NOTIFICATION_TYPES;
  message: string;
};
