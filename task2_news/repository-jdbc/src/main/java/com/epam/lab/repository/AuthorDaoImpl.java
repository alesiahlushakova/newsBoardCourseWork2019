package com.epam.lab.repository;

import com.epam.lab.mapper.AuthorMapper;
import com.epam.lab.model.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AuthorDaoImpl implements AuthorDao {
    private static final String INSERT_QUERY = "INSERT INTO author (name, surname) VALUES (?,?)";
    private static final String UPDATE_QUERY = "UPDATE author SET name = ?, surname = ? WHERE id = ?";
    private static final String DELETE_QUERY = "DELETE FROM author WHERE id = ?";
    private static final String GET_ALL_QUERY = "SELECT id, name, surname FROM author";
    private static final String FIND_AUTHOR_BY_ID = "SELECT id, name, surname FROM author WHERE id = ?";
    private static final String GET_AUTHOR_BY_NAME_AND_SURNAME =
            "SELECT id, name, surname FROM author WHERE name = ? AND surname = ?";

    private JdbcTemplate jdbcTemplate;
    private AuthorMapper authorMapper;

    @Autowired
    public AuthorDaoImpl(JdbcTemplate jdbcTemplate, AuthorMapper authorMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.authorMapper = authorMapper;
    }

    @Override
    public List<Author> getByNameAndSurname(String name, String surname) {
        return jdbcTemplate.query(GET_AUTHOR_BY_NAME_AND_SURNAME, authorMapper, name, surname);
    }

    @Override
    public void create(Author author) {
        jdbcTemplate.update(INSERT_QUERY, author.getName(), author.getSurname());
    }

    @Override
    public void update(Author author) {
        jdbcTemplate.update(UPDATE_QUERY, author.getName(), author.getSurname(), author.getId());
    }

    @Override
    public void delete(Long id) {
        jdbcTemplate.update(DELETE_QUERY, id);
    }

    @Override
    public List<Author> getAll() {
        return jdbcTemplate.query(GET_ALL_QUERY, authorMapper);
    }

    @Override
    public List<Author> findById(Long id) {
        return jdbcTemplate.query(FIND_AUTHOR_BY_ID, authorMapper, id);
    }


}
