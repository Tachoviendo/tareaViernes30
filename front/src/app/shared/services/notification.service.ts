import { Service, signal } from '@angular/core';

export enum NOTIFICATION_TYPES {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}

export type Notification = {
    noti_type: NOTIFICATION_TYPES,
    message: string
}

@Service()
export class NotificationService {
    private _notifications = signal<Notification[]>([])

    public notifications = this._notifications.asReadonly()

    public addNotification(noti_type: NOTIFICATION_TYPES, msg: string) {
        this._notifications.update((n) => [...n, { noti_type: noti_type, message: msg }])
    }

    public cleanNotifications() {
        this._notifications.set([])
    }

    public delNotification(noti_idx: number) {
        this._notifications.update(n => n.filter((_, i) => i !== noti_idx))
    }
}
