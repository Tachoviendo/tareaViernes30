import { Component, inject, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, imageOutline } from 'ionicons/icons';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonSpinner,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [IonGrid, IonRow, IonCol, IonButton, IonIcon, IonCard, IonCardContent, IonSpinner],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export class HomePage {
  // Inyección de dependencias moderna sin constructor
  private http = inject(HttpClient);

  // Signals para el estado
  fileToUpload = signal<File | null>(null);
  selectedFileName = signal<string>('');
  previewUrl = signal<string | null>(null);
  isUploading = signal<boolean>(false);

  constructor() {
    addIcons({ imageOutline, cloudUploadOutline });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileToUpload.set(file);
      this.selectedFileName.set(file.name);
      this.previewUrl.set(URL.createObjectURL(file));
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
          'http://localhost:3000/images',
          formData,
        ),
      );
      this.isUploading.set(false);
      this.resetForm();
      console.info('Imagen subida con éxito', { res });
    } catch (err: any) {
      console.error('Error al subir la imagen:', err);
    } finally {
      this.isUploading.set(false);
    }
  }

  resetForm() {
    this.fileToUpload.set(null);
    this.selectedFileName.set('');
    this.previewUrl.set(null);
  }
}
