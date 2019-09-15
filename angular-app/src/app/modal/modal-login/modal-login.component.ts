import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Validation} from '../../ts/helper/Validation';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {UserService} from '../../ts/network/service/user.service';
import {User} from '../../ts/modal/user';
import {Router} from '@angular/router';
import {ModalOption} from '../../ts/helper/ModalOption';
import {ErrorHandlerService} from '../../ts/service/error-handler.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  constructor(private modalService: BsModalService, private errorHandlerService: ErrorHandlerService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  modalRef: BsModalRef;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(Validation.emailPattern)]),
    password: new FormControl('', [Validators.required])
  });

  btnLoginText = 'Login';

  open(content) {
    this.modalRef = this.modalService.show(content, ModalOption.getOptions(null, true));
  }

  onSubmit() {
    const user = this.getUserDetails();
    this.showLoading();
    this.userService.loginUser(user.email, user.password)
      .subscribe(
        successMsg => {
          this.hideLoading();
          this.hideDialog();

          this.router.navigate(['/dashboard']);

        }, error => {
          this.hideLoading();

          this.errorHandlerService.resolve(error);

        }
      );
  }

  private getUserDetails(): User {
    const user = new User();
    user.email = this.form.get('email').value.toString().trim();
    user.password = this.form.get('password').value.toString().trim();
    return user;
  }

  private showLoading() {
    this.btnLoginText = 'Please wait....';
  }

  private hideLoading() {
    this.btnLoginText = 'Login';
  }

  private hideDialog() {
    this.modalRef.hide();
  }
}
