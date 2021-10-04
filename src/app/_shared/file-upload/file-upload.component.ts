import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {


  @Output() uploaded = new EventEmitter<any>();

  file: any;
  fileSize: any;
  isFileUploaded: boolean = false;
  fileName: any;


  constructor() { }

  ngOnInit() {
  }

  onFileDrop(event: any) {
    event.preventDefault();
    if (event.dataTransfer.files.length > 1) {
      console.log("Multiple files not allowed");
      return;
    }

    this.file = event.dataTransfer.files[0];
    this.getDetailsFromFile();
    this.uploaded.emit(this.file);

  }

  allowDrop(event:any) {
    event.preventDefault();
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.getDetailsFromFile();
    this.uploaded.emit(this.file);
  }

  getDetailsFromFile() {
    this.isFileUploaded = true;
    this.fileSize = (this.file.size / 64).toFixed(2) + " KB";
    this.fileName = this.file.name;
  }

}
