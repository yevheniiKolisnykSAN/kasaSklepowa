import {inject, Injectable} from '@angular/core'
import {ConfirmModalComponent} from "../shared/confirm-modal/confirm-modal.component"
import {firstValueFrom} from "rxjs"
import {MatDialog} from "@angular/material/dialog"
import {PayModalComponent} from "../shared/pay-modal/pay-modal.component"

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialog: MatDialog = inject(MatDialog)

  async confirm(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      disableClose: true,
      data: {message}
    })
    return await firstValueFrom(dialogRef.afterClosed())
  }

  async submit() {
    const dialogRef = this.dialog.open(PayModalComponent, {
      disableClose: true,
    })
    return await firstValueFrom(dialogRef.afterClosed())
  }
}
