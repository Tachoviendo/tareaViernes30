import { Component, computed, inject, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, imageOutline } from 'ionicons/icons';
import { Camera } from '@capacitor/camera';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonCardSubtitle,
  IonToast,
  IonContent,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { NOTIFICATION_TYPES } from '../../model/notifications';

@Component({
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonCardSubtitle,
  ],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export class HomePage {
  // Inyección de dependencias moderna sin constructor
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  // Signals para el estado
  fileToUpload = signal<File | null>(null);
  selectedFileName = computed(() => {
    const file: File | null = this.fileToUpload();
    if (!file) return null;
    return file.name;
  });
  previewUrl = computed(() => {
    const file: File | null = this.fileToUpload();
    if (!file) return null;
    return URL.createObjectURL(file);
  });
  isUploading = signal<boolean>(false);

  constructor() {
    addIcons({ imageOutline, cloudUploadOutline });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileToUpload.set(file);
    }
  }

  // Método POST usando HttpClient
  public async uploadImage() {
    const file = this.fileToUpload();
    if (!file) return;

    this.isUploading.set(true);

    const formData = new FormData();
    formData.append('file', file); // 'file' coincide con lo que espera request.file()

    try {
      const res = await firstValueFrom(
        this.http.post<{ message: string; filename: string; url: string }>(
          'http://10.4.200.117:3001/images',
          formData,
        ),
      );
      this.isUploading.set(false);
      this.notificationService.addNotification(
        NOTIFICATION_TYPES.OK,
        'Se subió la imagen.' + file.name + ' y se guardó como ' + res.filename,
      );
      this.resetForm();
    } catch (err: any) {
      console.error('Error al subir la imagen:', err);
      this.notificationService.addErrorFromError(err);
    } finally {
      this.isUploading.set(false);
    }
  }

  resetForm() {
    this.fileToUpload.set(null);
  }
}
