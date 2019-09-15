import {Component, OnInit} from '@angular/core';

import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {

  reason = '';
  statusCode: number;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

}
