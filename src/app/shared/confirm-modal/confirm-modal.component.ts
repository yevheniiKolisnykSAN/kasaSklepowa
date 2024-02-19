import {Component, inject} from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog"
import {MatButton} from "@angular/material/button"
import {JsonPipe} from "@angular/common"

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    JsonPipe
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  dialogRef: MatDialogRef<ConfirmModalComponent> = inject(MatDialogRef)
  data: any = inject(MAT_DIALOG_DATA)
}
