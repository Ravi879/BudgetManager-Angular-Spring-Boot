package com.budget.manager.helper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class UserSession {

    private static String SESSION_ID = "users_id";

    public static Boolean isSessionExists(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        return session != null;
    }

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


}
