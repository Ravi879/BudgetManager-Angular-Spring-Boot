
export class Validation {
  public static userNamePattern = /^[a-zA-Z0-9 ]{4,}$/;
  public static emailPattern = /^([_a-zA-Z0-9\.]{4,18})*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  public static passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/;
}








