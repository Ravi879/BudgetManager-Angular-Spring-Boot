import {Injectable} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {ModalErrorComponent} from '../../modal/modal-error/modal-error.component';
import {ModalOption} from '../helper/ModalOption';
import {ModalFailedComponent} from '../../modal/modal-failed/modal-failed.component';

@Injectable()
export class ErrorDialogService {

  constructor(public modalService: BsModalService) {
  }

  openDialog(data: object, isOpenUserErrorDialog: boolean = true): void {

    if(isOpenUserErrorDialog){
      this.modalService.show(ModalFailedComponent, ModalOption.getOptions(data));
    }else {
      this.modalService.show(ModalErrorComponent, ModalOption.getOptions(data));
    }

  }

}
