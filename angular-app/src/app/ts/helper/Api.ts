export class Api {


  private static baseUrl = 'http://localhost:8080/budgety';


  //=================== User ===================
  public static signUpUrl = Api.baseUrl + '/user/register';

  public static loginUrl = Api.baseUrl + '/user/login';

  public static logoutUrl = Api.baseUrl + '/user/logout';

  //=================== Item ===================
  public static saveIncomeItem = Api.baseUrl + '/item/income/%id%';

  public static saveExpenseItem = Api.baseUrl + '/item/expense/%id%';


  public static getAllItem = Api.baseUrl + '/item/all';


  public static deleteIncomeItem = Api.baseUrl + '/item/income/%id%';

  public static deleteExpenseItem = Api.baseUrl + '/item/expense/%id%';


}



