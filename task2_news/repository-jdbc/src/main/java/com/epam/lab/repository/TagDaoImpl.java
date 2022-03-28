package com.epam.lab.repository;

import com.epam.lab.mapper.TagMapper;
import com.epam.lab.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TagDaoImpl implements TagDao {
    private static final String INSERT_QUERY = "INSERT INTO tag (name) VALUES (?)";
    private static final String UPDATE_QUERY = "UPDATE tag SET name = ? WHERE id = ?";
    private static final String DELETE_QUERY = "DELETE FROM tag WHERE id = ?";
    private static final String GET_ALL_QUERY = "SELECT id, name FROM tag";
    private static final String FIND_TAG_BY_ID = "SELECT id, name FROM tag WHERE id = ?";
    private static final String GET_TAG_BY_NAME = "SELECT id, name FROM tag WHERE name = ?";

    private JdbcTemplate jdbcTemplate;
    private TagMapper tagMapper;

    @Autowired
    public TagDaoImpl(JdbcTemplate jdbcTemplate, TagMapper tagMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.tagMapper = tagMapper;
    }

    @Override
    public void create(Tag tag) {
        jdbcTemplate.update(INSERT_QUERY, tag.getName());
    }

    @Override
    public void update(Tag tag) {
        jdbcTemplate.update(UPDATE_QUERY, tag.getName(), tag.getId());
    }

    @Override
    public void delete(Long id) {
        jdbcTemplate.update(DELETE_QUERY, id);
    }

    @Override
    public List<Tag> getAll() {
        return jdbcTemplate.query(GET_ALL_QUERY, tagMapper);
    }

    @Override
    public List<Tag> findById(Long id) {
        return jdbcTemplate.query(FIND_TAG_BY_ID, tagMapper, id);
    }

    @Override
    public List<Tag> getTagByName(String name) {
        return jdbcTemplate.query(GET_TAG_BY_NAME, tagMapper, name);
    }
}
