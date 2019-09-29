package com.budget.manager.helper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class UserSession {

    private static String SESSION_ID = "users_id";
    private static String IS_FIRST_ITEM = "isFirstTimeAddingItem";


    public static Boolean isSessionExists(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        return session != null;
    }

    // ***************** setter and getter for SESSION_ID *****************
    public static void setUserId(HttpServletRequest req, Long userId) {
        HttpSession session = req.getSession(true);
        session.setAttribute(SESSION_ID, userId);
        Printer.print("UserId set in session is ===== " + session.getAttribute(SESSION_ID));
    }

    // make sure that, session is exists before calling this method.
    public static Long getUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return (Long) session.getAttribute(SESSION_ID);
    }
    // **********************************************************************


    // *****************  setter and getter for IS_FIRST_ITEM *****************
    // getFirstItem - is user first time adding income or expense item.
    public static void setFirstItem(HttpServletRequest req, Boolean isFirstItem) {
        HttpSession session = req.getSession(true);
        session.setAttribute(IS_FIRST_ITEM, isFirstItem);
        Printer.print("IS_FIRST_ITEM set in session is ===== " + session.getAttribute(IS_FIRST_ITEM));
    }

    public static Boolean isFirstItem(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return (Boolean) session.getAttribute(IS_FIRST_ITEM);
    }
    // **************************************************************************

}
