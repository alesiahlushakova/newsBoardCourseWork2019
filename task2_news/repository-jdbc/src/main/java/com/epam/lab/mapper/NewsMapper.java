package com.epam.lab.mapper;

import com.epam.lab.model.News;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class NewsMapper implements RowMapper<News> {

    @Override
    public News mapRow(ResultSet resultSet, int i) throws SQLException {
        News news = new News();
        news.setId(resultSet.getLong("id"));
        news.setTitle(resultSet.getString("title"));
        news.setShortText(resultSet.getString("short_text"));
        news.setFullText(resultSet.getString("full_text"));
        news.setCreationDate(resultSet.getDate("creation_date").toLocalDate());
        news.setModificationDate(resultSet.getDate("modification_date").toLocalDate());

        return news;
    }
}
