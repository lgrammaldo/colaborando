package com.example.ColaborandoApplication.Util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class DateUtils {
    private DateUtils(){
    }

    private static final String MASK_DATE = "dd-MM-yyyy";

    public static String formatMaskDate(final Date date) {

        if (date == null) {
            return null;
        }

        SimpleDateFormat dateFormatAll = new SimpleDateFormat(MASK_DATE);

        return dateFormatAll.format(date);
    }

    public static Date parseMaskDate(final String date) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat dateFormatAll = new SimpleDateFormat(MASK_DATE);
        try {
            return dateFormatAll.parse(date);
        } catch (ParseException e) {
            // e.printStackTrace();
            return null;
        }
    }
}
