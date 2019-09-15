
export class Validation {
  public static userNamePattern = /^[a-zA-Z0-9 ]{4,}$/;
  public static emailPattern = '^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$';
  public static passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/;
}








