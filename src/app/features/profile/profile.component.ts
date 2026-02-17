import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTAMOS REACTIVE FORMS MODULE
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.services';

// Interfaz (se mantiene igual)
export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  city: string;
  mainAddress: string;
  reference: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  // 2. AGREGAMOS ReactiveFormsModule AQUÍ
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  firestore = inject(Firestore);
  fb = inject(FormBuilder); // 3. Inyectamos FormBuilder
  
  user$ = this.authService.user$;
  currentUser: any = null;
  savedAddresses: Address[] = [];
  
  isFormOpen = false;
  isEditing = false;
  editingId: string | null = null; // Para saber qué ID estamos editando
  
  // 4. DEFINIMOS EL FORM GROUP REACTIVO
  addressFormGroup: FormGroup;

  constructor() {
    // 5. INICIALIZAMOS EL FORMULARIO CON REGLAS DE VALIDACIÓN
    this.addressFormGroup = this.fb.group({
      recipientName: ['', [Validators.required, Validators.minLength(3)]],
      // VALIDACIÓN CLAVE: Exactamente 10 dígitos numéricos
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
      mainAddress: ['', Validators.required],
      reference: [''] // Referencia es opcional
    });
  }

  // --- GETTERS PARA ACCEDER FÁCILMENTE EN EL HTML ---
  get nameControl(): AbstractControl | null { return this.addressFormGroup.get('recipientName'); }
  get phoneControl(): AbstractControl | null { return this.addressFormGroup.get('phone'); }
  get cityControl(): AbstractControl | null { return this.addressFormGroup.get('city'); }
  get addressControl(): AbstractControl | null { return this.addressFormGroup.get('mainAddress'); }


  ngOnInit() {
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        this.currentUser = user;
        await this.loadAddresses(user.uid);
      }
    });
  }

  async loadAddresses(uid: string) {
    try {
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.savedAddresses = docSnap.data()['addresses'] || [];
      }
    } catch (error) {
      console.error("Error cargando direcciones:", error);
    }
  }

  openForm(addressToEdit?: Address) {
    if (!addressToEdit && this.savedAddresses.length >= 3) {
      alert('⚠️ Has alcanzado el límite de 3 direcciones.');
      return;
    }

    this.isFormOpen = true;
    if (addressToEdit) {
      this.isEditing = true;
      this.editingId = addressToEdit.id;
      // 6. CARGAMOS LOS DATOS AL FORMULARIO REACTIVO
      this.addressFormGroup.patchValue({
        recipientName: addressToEdit.recipientName,
        phone: addressToEdit.phone,
        city: addressToEdit.city,
        mainAddress: addressToEdit.mainAddress,
        reference: addressToEdit.reference
      });
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.addressFormGroup.reset(); // Limpiamos el formulario
    }
  }

  closeForm() {
    this.isFormOpen = false;
    this.addressFormGroup.reset();
    this.editingId = null;
  }

  async saveAddress() {
    // 7. VERIFICAMOS SI EL FORMULARIO ES VÁLIDO ANTES DE GUARDAR
    if (this.addressFormGroup.invalid) {
      // Marcamos todos los campos como "tocados" para que salgan los errores rojos
      this.addressFormGroup.markAllAsTouched();
      return;
    }

    // Obtenemos los valores limpios del formulario
    const formValues = this.addressFormGroup.value;

    const newAddress: Address = {
      id: this.editingId || Date.now().toString(),
      ...formValues
    };

    try {
      let newAddressesList = [...this.savedAddresses];
      if (this.isEditing) {
        const index = newAddressesList.findIndex(a => a.id === this.editingId);
        if (index !== -1) newAddressesList[index] = newAddress;
      } else {
        newAddressesList.push(newAddress);
      }

      const uid = this.currentUser.uid;
      const docRef = doc(this.firestore, 'users', uid);
      await setDoc(docRef, { addresses: newAddressesList }, { merge: true });

      this.savedAddresses = newAddressesList;
      this.closeForm();
    } catch (error) {
      console.error("Error guardando:", error);
      alert('Error al guardar en la nube.');
    }
  }

  async deleteAddress(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta dirección?')) return;
    try {
      const newAddressesList = this.savedAddresses.filter(a => a.id !== id);
      const uid = this.currentUser.uid;
      const docRef = doc(this.firestore, 'users', uid);
      await setDoc(docRef, { addresses: newAddressesList }, { merge: true });
      this.savedAddresses = newAddressesList;
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  }
}