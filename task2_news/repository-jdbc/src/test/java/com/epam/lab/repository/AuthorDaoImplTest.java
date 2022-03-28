package com.epam.lab.repository;

import com.epam.lab.configuration.ConnectionConfig;
import com.epam.lab.configuration.TestConfiguration;
import com.epam.lab.model.Author;
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

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {ConnectionConfig.class, TestConfiguration.class})
@ActiveProfiles("dev")
public class AuthorDaoImplTest {

    @Autowired
    private AuthorDao authorDao;
    private Author author;
    private List<Author> authorList;

    @Autowired
    private Flyway flyway;

    @Before
    public void setUp() throws Exception {
        flyway.migrate();

        author = new Author();
        author.setId(1L);
        author.setName("Alesia");
        author.setSurname("Hlushakova");

        authorList = new ArrayList<>();
        authorList.add(author);


    }

    @After
    public void tearDown() throws Exception {
        flyway.clean();
    }

    @Test
    public void getByNameAndSurnameWithCorrectData() {
        assertEquals(authorList,authorDao.getByNameAndSurname("Alesia","Hlushakova"));
    }
    @Test
    public void getByNameAndSurnameIncorrectSurname() {
        assertEquals(Collections.emptyList(),authorDao.getByNameAndSurname("Alesia","Pypkina"));
    }

    @Test
    public void getByNameAndSurnameIncorrectName() {
        assertEquals(Collections.emptyList(),authorDao.getByNameAndSurname("Maxim","Hlushakova"));
    }


    @Test
    public void getByNameAndSurnameIncorrectAllParams() {
        assertEquals(Collections.emptyList(),authorDao.getByNameAndSurname("Dfgt","Aaa"));
    }

    @Test
    public void createAuthor() {

        Author author = new Author();
        author.setId(11L);
        author.setName("Polina");
        author.setSurname("Scripkina");

        authorDao.create(author);

        assertEquals(author,authorDao.findById(11L).get(0));

    }

    @Test
    public void updateAuthor() {
        author.setSurname("Duben");
        authorDao.update(author);
        assertEquals(author,authorDao.findById(1L).get(0));
    }

    @Test
    public void deleteById() {
        authorDao.delete(1L);
        assertEquals(Collections.emptyList(),authorDao.findById(1L));
    }

    @Test
    public void getAllAuthors() {


        List<Author> actualAuthors = authorDao.getAll();
        List<Author> firstChanged = new ArrayList<>();
        firstChanged.add(actualAuthors.get(0));

        assertEquals(authorList,firstChanged);
    }

    @Test
    public void findByIdCorrectAuthorId() {
        assertEquals(authorList,authorDao.findById(1L));
    }

    @Test
    public void findByIdIncorrectAuthorId() {
        assertEquals(Collections.emptyList(),authorDao.findById(100L));
    }
}