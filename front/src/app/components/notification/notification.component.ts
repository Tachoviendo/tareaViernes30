import { Component, computed, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'notifications',
  styleUrl: './notification.component.css',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {

  public notifications = signal([])

  public hayNotificaciones = computed(() => this.notifications().length > 0)

  cleanNoti() {

  }
}
