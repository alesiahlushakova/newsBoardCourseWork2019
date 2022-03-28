package com.epam.lab.repository;

import com.epam.lab.mapper.UserMapper;
import com.epam.lab.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserDao implements CrudDao<User> {
    private static final String INSERT_QUERY = "INSERT INTO users (name, surname, login, password) VALUES (?,?,?,?)";
    private static final String UPDATE_QUERY = "UPDATE users SET name = ?, surname = ?, login =?, password = ?" +
            "WHERE id = ?";
    private static final String DELETE_QUERY = "DELETE FROM users WHERE id = ?";
    private static final String GET_ALL_QUERY = "SELECT id, name, surname, login, password FROM users";
    private static final String FIND_USER_BY_ID = "SELECT name, surname, login, password FROM users WHERE id = ?";

    private JdbcTemplate jdbcTemplate;
    private UserMapper userMapper;

    @Autowired
    public UserDao(JdbcTemplate jdbcTemplate, UserMapper userMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.userMapper = userMapper;
    }

    @Override
    public void create(User user) {
        jdbcTemplate.update(INSERT_QUERY, user.getName(), user.getSurname(), user.getLogin(), user.getPassword());
    }

    @Override
    public void update(User user) {
        jdbcTemplate.update(UPDATE_QUERY, user.getName(), user.getSurname(), user.getLogin(), user.getPassword(),
                user.getId());
    }

    @Override
    public void delete(Long id) {
        jdbcTemplate.update(DELETE_QUERY, id);
    }

    public List<User> getAll() {
        return jdbcTemplate.query(GET_ALL_QUERY, userMapper);
    }

    @Override
    public List<User> findById(Long id) {
        return jdbcTemplate.query(FIND_USER_BY_ID, userMapper, id);
    }
}
