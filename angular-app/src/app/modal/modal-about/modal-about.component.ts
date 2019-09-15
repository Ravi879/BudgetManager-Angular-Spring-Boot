import {Component, OnInit} from '@angular/core';

import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalOption} from '../../ts/helper/ModalOption';


@Component({
  selector: 'app-about-modal',
  templateUrl: './modal-about.component.html',
  styleUrls: ['./modal-about.component.css']
})
export class ModalAboutComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  open(content) {

    this.modalRef = this.modalService.show(content, ModalOption.getOptions());

  }

}

