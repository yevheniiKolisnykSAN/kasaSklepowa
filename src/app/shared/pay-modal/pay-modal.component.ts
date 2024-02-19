import {Component, inject, OnInit} from '@angular/core'
import {MatButton} from "@angular/material/button"
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog"
import {MatProgressSpinner} from "@angular/material/progress-spinner"

@Component({
  selector: 'app-pay-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatProgressSpinner
  ],
  templateUrl: './pay-modal.component.html',
  styleUrl: './pay-modal.component.scss'
})
export class PayModalComponent implements OnInit {
  dialogRef: MatDialogRef<PayModalComponent> = inject(MatDialogRef)

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close(true)
    }, 1500)
  }
}
