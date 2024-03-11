package com.demo.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Map;

@Slf4j
public class DateTimeUtils {
    public static final Map<String, ZoneId> ALPHA_2_TO_ZONE_ID_MAP = Map.of(
            "UTC", ZoneOffset.UTC,
            "CH", ZoneId.of("Europe/Zurich"),
            "AT", ZoneId.of("Europe/Vienna")
    );

    /**
     * Converts LocalDateTime to new instance of LocalDateTime applying timezone
     *
     * @param localDateTime original LocalDateTime
     * @param countryCode   alpha 2 country code
     * @return LocalDateTime with timezone offset
     */
    public static LocalDateTime toLocalTimeWithTimezone(LocalDateTime localDateTime, String countryCode) {
        if (localDateTime == null) {
            return null;
        }

        if (countryCode == null) {
            log.error("Can't convert local date time to zoned date time. Input date: {}, country code: null", localDateTime);
            return localDateTime;
        }
        // first we convert local date time to zoned date time, specifying system time zone
        // it is needed since LocalDateTime represents time for current system and need to specify at which zone it is now
        // next make copy of zoned date time with a different time-zone
        // finally convert zoned date time back to local date time
        if (countryCode.equals("UTC")) {
            log.info("Country code is set to UTC for current request");
        }
        return localDateTime.atZone(ZoneOffset.systemDefault()).withZoneSameInstant(ALPHA_2_TO_ZONE_ID_MAP.get(countryCode)).toLocalDateTime();
    }

    public static LocalDate toLocalDate(String date) {
        LocalDate localDate = null;
        if (StringUtils.isNotBlank(date)) {
            localDate = LocalDate.parse(date);
        }
        return localDate;
    }
}