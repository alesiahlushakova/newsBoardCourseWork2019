package com.epam.lab.repository.constant;

import java.util.HashMap;
import java.util.Map;

public class NewsConstants {
    private static final String NEWS_TITLE_DB_FORMAT = "n.title";
    private static final String NEWS_AUTHOR_NAME_DB_FORMAT = "a.name";
    private static final String NEWS_TAG_NAME_DB_FORMAT = "t.name";
    private static final String NEWS_TAG_CREATION_DATE_DB_FORMAT = "n.creation_date";

    private static final String NEWS_TITLE = "title";
    private static final String NEWS_AUTHOR_NAME = "authorName";
    private static final String NEWS_TAG = "tagName";
    private static final String NEWS_CREATION_DATE = "creationDate";

    public static final Map<String, String> NEWS_FIELDS_DB_FORMAT = new HashMap<>();

    static {
        NEWS_FIELDS_DB_FORMAT.put(NEWS_TITLE, NEWS_TITLE_DB_FORMAT);
        NEWS_FIELDS_DB_FORMAT.put(NEWS_AUTHOR_NAME, NEWS_AUTHOR_NAME_DB_FORMAT);
        NEWS_FIELDS_DB_FORMAT.put(NEWS_TAG, NEWS_TAG_NAME_DB_FORMAT);
        NEWS_FIELDS_DB_FORMAT.put(NEWS_CREATION_DATE, NEWS_TAG_CREATION_DATE_DB_FORMAT);
    }

}
