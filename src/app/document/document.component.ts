import { DocumentBase64Str } from './../model/documentBase64Str';
import { DocumentService } from './../services/document.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  file: HttpResponse<Blob>;
  imgUrl: string;
  base64data: any;
  constructor(
    private docService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getDocumentStr();
  }

  private getDocumentStr(): void {
    const ID = this.route.snapshot.paramMap.get('id');
    this.docService.getDocument(ID).subscribe(byteString => { this.file = byteString; } );

    console.log('neeche dekh');
    // console.log(btoa(this.file));
    // console.log(atob(this.file.toString()));

    console.log('uper dekh');

    // this.imgUrl = this.file.toString();
    // console.log(this.file);
    const reader = new FileReader();
    // reader.onload = (e) => this.imgUrl = e.target.result;
    // reader.readAsDataURL(this.file);
    // reader.onloadend = (e) => this.base64data = reader.result;
    // this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(this.base64data);
    // this.imgUrl = this.base64data;
    // console.log(this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.base64data));
  }
}
