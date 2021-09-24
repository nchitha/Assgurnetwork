import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.scss']
})
export class ClientdetailsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '588px',
      panelClass: 'custom-dialog-client',
      data: {  }
    });

    dialogRef.afterClosed().subscribe( (result:any) => {
      console.log('The dialog was closed');
    });
  }

}
