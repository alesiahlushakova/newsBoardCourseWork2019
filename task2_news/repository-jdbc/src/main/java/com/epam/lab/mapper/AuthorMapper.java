package com.epam.lab.mapper;


import com.epam.lab.model.Author;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class AuthorMapper implements RowMapper<Author> {

    @Override
    public Author mapRow(ResultSet resultSet, int i) throws SQLException {
        Author author = new Author();
        author.setId(resultSet.getLong("id"));
        author.setName(resultSet.getString("name"));
        author.setSurname(resultSet.getString("surname"));

        return author;
    }
}
