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

  imgUrl: any;
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
    this.docService.getDocument(ID).subscribe(byteString => {
      const objUrl = URL.createObjectURL(byteString);
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objUrl);
    } );
    // Solution to use Blob Object
    // https://stackoverflow.com/questions/55591871/view-blob-response-as-image-in-angular
  }
}
