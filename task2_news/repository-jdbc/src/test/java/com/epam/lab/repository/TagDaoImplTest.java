package com.epam.lab.repository;

import com.epam.lab.configuration.ConnectionConfig;
import com.epam.lab.configuration.TestConfiguration;
import com.epam.lab.model.Tag;
import org.flywaydb.core.Flyway;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {ConnectionConfig.class, TestConfiguration.class})
@ActiveProfiles("dev")
public class TagDaoImplTest {

    @Autowired
    private TagDao tagDao;
    private Tag tag;
    private List<Tag> tags;

    @Autowired
    private Flyway flyway;

    @Before
    public void setUp() throws Exception {
        flyway.migrate();

        tag = new Tag();
        tag.setId(1L);
        tag.setName("tag1");
        tags = new ArrayList<>();
        tags.add(tag);
    }

    @After
    public void tearDown() throws Exception {
        flyway.clean();
    }

    @Test
    public void createTag() {
        Tag tag = new Tag();
        tag.setId(11L);
        tag.setName("new tag");

        tagDao.create(tag);

        assertEquals(tag,tagDao.findById(11L).get(0));
    }

    @Test
    public void updateTag() {
        tag.setName("aedjfhdj");

        tagDao.update(tag);

        assertEquals(tags,tagDao.findById(1L));
    }

    @Test
    public void deleteTagById() {
        tagDao.delete(1L);

        assertEquals(Collections.emptyList(),tagDao.findById(1L));
    }

    @Test
    public void getAllTags() {
        Tag tag = new Tag();
        tag.setId(10L);
        tag.setName("tag10");

        tags.add(tag);
        List<Tag> actualTags = tagDao.getAll();
        List<Tag> firstAndLast = new ArrayList<>();
        firstAndLast.add(actualTags.get(0));
        firstAndLast.add(actualTags.get(9));


        assertEquals(tags,firstAndLast);
    }

    @Test
    public void findByIdCorrectData() {
        assertEquals(tags,tagDao.findById(1L));
    }

    @Test
    public void findByIdIncorrectData() {
        assertEquals(Collections.emptyList(),tagDao.findById(100L));
    }

}