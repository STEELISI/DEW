import { Component, Directive, Inject } from "@angular/core";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: "upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent {
  public files: NgxFileDropEntry[] = [];
  public filename:String="";

  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog){}
  public dropped(files: NgxFileDropEntry[]) {
    //this.files = files;
    for (const droppedFile of files) {
      this.files.push(droppedFile);
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.filename = file.name;
          // Here you can access the real file
          var reader = new FileReader();
          reader.onload = () => {
             // console.log(reader.result);
          };
          reader.readAsText(file);
        //  console.log(  );
 
         
          // You could upload it like this:
          // const formData = new FormData()
          // formData.append('logo', file, relativePath)
 
          // Headers
          // const headers = new HttpHeaders({
          //   'security-token': 'mytoken'
          // })
 
          // this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          // .subscribe(data => {
          //   // Sanitized logo returned from backend
          // })
         
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }
  delete(index:number){
    const fileEntry = this.files[index].fileEntry as FileSystemFileEntry;
    this._snackBar.open("File name "+fileEntry.name+" is deleted.", "Close", {
      duration: 2000,
    });
    this.files.splice(index, 1);
  }

  upload(item:NgxFileDropEntry){
    const fileEntry = item.fileEntry as FileSystemFileEntry;
    this._snackBar.open("File name "+fileEntry.name+" is uploaded!", "Close", {
      duration: 2000,
    });
  //   alert(fileEntry.name+" is uploaded!");
  }

  preview(item:NgxFileDropEntry) {
    const dialogRef = this.dialog.open(FilePreviewComponent, {
      data: item.fileEntry as FileSystemFileEntry
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     
    });
  }

}


@Component({
  selector: 'file-preview',
  templateUrl: 'file.preview.component.html',
})
export class FilePreviewComponent {

  fileContent:any;
  constructor(
    public dialogRef: MatDialogRef<FilePreviewComponent>,

    @Inject(MAT_DIALOG_DATA) public file: FileSystemFileEntry) {

      var t = this;
      file.file((file: File) => {
       
        // Here you can access the real file
        var reader = new FileReader();
        reader.onload = () => {
            t.fileContent=reader.result;
        };
        reader.readAsText(file);
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}