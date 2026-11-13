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
  selector: 'app-foto',
  styleUrl: './foto.page.css',
  templateUrl: './foto.page.html',
})
export class FotoPage {
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

  public async takePhoto() {
    try {
      const result = await Camera.takePhoto({
        quality: 90,
        includeMetadata: true,
      });
      // result.webPath can be set directly as the src of an image element

      // On native: pass result.uri to the Filesystem API to get the full-resolution base64,
      // or use result.thumbnail for a lower-resolution base64 preview.
      // On Web: result.thumbnail contains the full image base64 encoded.
      const metadata = result.metadata;
      console.log({ result });
      //Convertir el resultado de la cámara (Uri/WebPath) a un objeto File
      if (!result.webPath || !result.metadata?.format) {
        console.error('No se pudo obtener la ruta web de la foto.');
        return;
      }
      const response = await fetch(result.webPath);
      const blob = await response.blob();

      // Generar un nombre de archivo dinámico basado en la extensión o la fecha
      const extension = result.metadata.format || 'jpeg';
      const fileName = `photo_${Date.now()}.${extension}`;

      console.log({ fileName, extension });

      const file = new File([blob], fileName, { type: `image/${extension}` });

      this.fileToUpload.set(file);
    } catch (e) {
      const error = e as any;
      // error.code contains the structured error code (e.g. 'OS-PLUG-CAMR-0003')
      // when thrown by the native layer. See the Errors section for all codes.
      const message = error.code ? `[${error.code}] ${error.message}` : error.message;
      console.error('takePhoto failed:', message);
      this.notificationService.addNotification(
        NOTIFICATION_TYPES.ERROR,
        `takePhoto failed: ${message}`,
      );
      this.fileToUpload.set(null);
    }
  }
}
