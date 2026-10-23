import { computeMsgId } from '@angular/compiler';
import { Component, computed, inject, signal } from '@angular/core';
import { compatForm } from '@angular/forms/signals/compat';

@Component({
  imports: [],
  selector: 'notifications',
  styleUrl: './notification.component.css',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {


  public notifications = signal([
    // {
    //   noti_type: "info",
    //   message: "Esto es un info"
    // },
    // {
    //   noti_type: "warning",
    //   message: "Esto es un warning "
    // },
    // {
    //   noti_type: "error",
    //   message: "Esto es un error "
    // }
  ])
  public hayNotificaciones = computed(() => this.notifications().length > 0)

  cleanNoti() {

  }
}
