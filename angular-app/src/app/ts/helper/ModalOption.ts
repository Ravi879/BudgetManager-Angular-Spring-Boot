import {ModalOptions} from 'ngx-bootstrap';

export class ModalOption {

  public static getOptions(data: object = null, isShowModalCenter: boolean = false,
                           isBackgroundTransparent: boolean = false): ModalOptions {

    const options: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    if (data) {
      options.initialState = data;
    }

    //modal-transparent : it is a css class written in global style.css, to make bootstrap dialog background transparent
    if (isBackgroundTransparent && isShowModalCenter) {
      options.class = 'modal-dialog-centered modal-transparent';
    } else if (isShowModalCenter) {
      options.class = 'modal-dialog-centered';
    }

    return options;

  }


}
