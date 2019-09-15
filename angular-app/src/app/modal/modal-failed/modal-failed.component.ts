import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-failed',
  templateUrl: './modal-failed.component.html',
  styleUrls: ['./modal-failed.component.css']
})
export class ModalFailedComponent implements OnInit {

  msg = '';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
