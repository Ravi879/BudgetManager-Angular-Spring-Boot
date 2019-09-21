import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Validation} from '../../ts/helper/Validation';
import {UserService} from '../../ts/network/service/user.service';
import {User} from '../../ts/modal/user';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalSuccessComponent} from '../modal-success/modal-success.component';
import {ModalOption} from '../../ts/helper/ModalOption';
import {ErrorHandlerService} from '../../ts/service/error-handler.service';

@Component({
  selector: 'app-modal-sign-up',
  templateUrl: './modal-sign-up.component.html',
  styleUrls: ['./modal-sign-up.component.css']
})
export class ModalSignUpComponent implements OnInit {

  @Input('btnText')
  btnText = 'Sign up';
  @Input('btnColor')
  btnColor = 'btnBlue';

  modalRef: BsModalRef;
  form: FormGroup = ModalSignUpComponent.getFormGroup();
  btnSubmitText = 'Submit';

  constructor(private modalService: BsModalService, private errorHandlerService: ErrorHandlerService, private userService: UserService) {
  }

  ngOnInit() {
  }

  private static getFormGroup(): FormGroup {
    return new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern(Validation.userNamePattern)]),
      email: new FormControl('', [Validators.required, Validators.pattern(Validation.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6),
        Validators.pattern(Validation.passwordPattern)]),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  open(content) {
    this.modalRef = this.modalService.show(content, ModalOption.getOptions(null, true));
  }

  onSubmit() {
    const user = this.getUserDetails();

    this.showLoading();
    this.userService.registerNewUser(user)
      .subscribe(successMsg => {
          this.hideLoading();
          this.hideDialog();

          const initialState = {
            msg: successMsg
          };
          this.modalService.show(ModalSuccessComponent, {initialState});

        }, error => {
          this.hideLoading();

          this.errorHandlerService.resolve(error);
        }
      );
  }

  private getUserDetails(): User {
    const user = new User();
    user.name = this.form.get('userName').value.toString().trim();
    user.email = this.form.get('email').value.toString().trim();
    user.password = this.form.get('password').value.toString().trim();
    return user;
  }


  private showLoading() {
    this.btnSubmitText = 'Please wait....';
  }

  private hideLoading() {
    this.btnSubmitText = 'Submit';
  }

  private hideDialog() {
    this.modalRef.hide();
  }

}
