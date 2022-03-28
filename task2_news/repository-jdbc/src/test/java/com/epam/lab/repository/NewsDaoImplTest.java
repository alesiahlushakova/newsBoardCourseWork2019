package com.epam.lab.repository;

import com.epam.lab.configuration.ConnectionConfig;
import com.epam.lab.configuration.TestConfiguration;
import com.epam.lab.model.News;
import org.flywaydb.core.Flyway;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {ConnectionConfig.class, TestConfiguration.class})
@ActiveProfiles("dev")
public class NewsDaoImplTest {

    @Autowired
    private NewsDao newsDao;
    private News news;
    private List<News> newsList;

    @Autowired
    private Flyway flyway;


    @Before
    public void setUp() throws Exception {
        flyway.migrate();

        news = new News();
        news.setId(1L);
        news.setTitle("Story1");
        news.setShortText("Sample text.");
        news.setFullText("Sample text but much bigger.");
        news.setCreationDate(LocalDate.now());
        news.setModificationDate(LocalDate.now());
        newsList = new ArrayList<>();
        newsList.add(news);
    }

    @After
    public void tearDown() throws Exception {
        flyway.clean();
    }

    @Test
    public void createNews() {
        News news = new News();
        news.setId(11L);
        news.setTitle("lllllllllll");
        news.setShortText("S klf flnvlfjnvlfnvldnv");
        news.setFullText("djfkjglrkjglkrjg jg fdkgjjg ojgj");
        news.setCreationDate(LocalDate.now());
        news.setModificationDate(LocalDate.now());

        newsDao.create(news);

        assertEquals(news, newsDao.findById(11L).get(0));
    }

    @Test
    public void updateNews() {
        news.setTitle("new title");

        newsDao.update(news);

        assertEquals(newsList, newsDao.findById(1L));
    }

    @Test
    public void deleteNews() {
        newsDao.delete(1L);

        assertEquals(Collections.emptyList(), newsDao.findById(1L));
    }

    @Test
    public void findByIdCorrectData() {
        assertEquals(newsList, newsDao.findById(1L));
    }

    @Test
    public void findByIdIncorrectData() {
        assertEquals(Collections.emptyList(), newsDao.findById(100L));
    }



    @Test
    public void getAllSearchByTag() {
        News newsFirst = new News();
        newsFirst.setId(2L);
        newsFirst.setTitle("Story2");
        newsFirst.setShortText("Sample text.");
        newsFirst.setFullText("Sample text but much bigger.");
        newsFirst.setCreationDate(LocalDate.now());
        newsFirst.setModificationDate(LocalDate.now());

        News news = new News();
        news.setId(7L);
        news.setTitle("Story7");
        news.setShortText("Sample text.");
        news.setFullText("Sample text but much bigger.");
        news.setCreationDate(LocalDate.now());
        news.setModificationDate(LocalDate.now());

        List<News> foundNews = new ArrayList<>();
        foundNews.add(newsFirst);
        foundNews.add(news);
        assertEquals(
                foundNews, newsDao.getAll("", "tag4", "", null, ""));
    }

    @Test
    public void getAllSearchByTitle() {

        assertEquals(
                newsList, newsDao.getAll("", "", "Story1", null, ""));
    }

    @Test
    public void getAllSearchByTagAndSortAsc() {
        News newsFirst = new News();
        newsFirst.setId(9L);
        newsFirst.setTitle("Story9");
        newsFirst.setShortText("Sample text.");
        newsFirst.setFullText("Sample text but much bigger.");
        newsFirst.setCreationDate(LocalDate.now());
        newsFirst.setModificationDate(LocalDate.now());

        News newsSecond = new News();
        newsSecond.setId(3L);
        newsSecond.setTitle("Story3");
        newsSecond.setShortText("Sample text.");
        newsSecond.setFullText("Sample text but much bigger.");
        newsSecond.setCreationDate(LocalDate.now());
        newsSecond.setModificationDate(LocalDate.now());

        List<News> foundNews = new ArrayList<>();
        foundNews.add(news);
        foundNews.add(newsSecond);
        foundNews.add(newsFirst);

        assertEquals(
                foundNews, newsDao.getAll("", "tag1", "", "title", "ASC"));
    }

    @Test
    public void getAllSearchByTagAndSortDesc() {

        News newsFirst = new News();
        newsFirst.setId(9L);
        newsFirst.setTitle("Story9");
        newsFirst.setShortText("Sample text.");
        newsFirst.setFullText("Sample text but much bigger.");
        newsFirst.setCreationDate(LocalDate.now());
        newsFirst.setModificationDate(LocalDate.now());

        News newsSecond = new News();
        newsSecond.setId(3L);
        newsSecond.setTitle("Story3");
        newsSecond.setShortText("Sample text.");
        newsSecond.setFullText("Sample text but much bigger.");
        newsSecond.setCreationDate(LocalDate.now());
        newsSecond.setModificationDate(LocalDate.now());

        List<News> foundNews = new ArrayList<>();
        foundNews.add(newsFirst);
        foundNews.add(newsSecond);
        foundNews.add(news);

        assertEquals(
                foundNews, newsDao.getAll("", "tag1", "", "title", "DESC"));
    }

    @Test
    public void findNewsByAuthorIdCorrectData() {
        news.setId(2L);
        news.setTitle("Story2");
        assertEquals(newsList, newsDao.findNewsByAuthorId(4L));
    }

    @Test
    public void findNewsByAuthorIdIncorrectData() {
        assertEquals(Collections.emptyList(), newsDao.findNewsByAuthorId(100L));
    }


    @Test
    public void findNewsByTitleAndFullTextCorrectData() {
        assertEquals(newsList, newsDao.findNewsByTitleAndFullText(news.getTitle(), news.getFullText()));
    }

    @Test
    public void findNewsByTitleAndFullTextIncorrectData() {
        assertEquals(Collections.emptyList(), newsDao.findNewsByTitleAndFullText("gaV", news.getFullText()));
    }

    @Test
    public void findNewsByTitleAndFullTextIncorrectFullText() {
        assertEquals(Collections.emptyList(), newsDao.findNewsByTitleAndFullText(news.getTitle(), "ss"));
    }

    @Test
    public void findNewsByTitleAndFullTextIncorrectBothParams() {
        assertEquals(Collections.emptyList(), newsDao.findNewsByTitleAndFullText("ss", "ss"));
    }


    @Test
    public void associateNewsWithTagsCorrectData() {
        newsDao.associateNewsWithTags(1L, 2L);

        assertEquals(news.getId(), newsDao.getTagsIdByNewsId(1L).get(0));
    }


    @Test
    public void findNewsAuthorAssociationByNewsId() {
        assertTrue(newsDao.findNewsAuthorAssociationByNewsId(news.getId()));
    }

    @Test
    public void findNewsAuthorAssociationByNewsIdNotExist() {
        assertFalse(newsDao.findNewsAuthorAssociationByNewsId(100L));
    }

    @Test
    public void getAuthorIdByNewsIdCorrectData() {

        assertEquals(new Long(2L), newsDao.getAuthorIdByNewsId(1L).get(0));
    }

    @Test
    public void getAuthorIdByNewsIdIncorrectData() {

        assertEquals(Collections.emptyList(), newsDao.getAuthorIdByNewsId(100L));
    }

    @Test
    public void getTagsIdByNewsIdCorrect() {
        List<Long> tagsId = new ArrayList<>();
        tagsId.add(2L);
        tagsId.add(4L);
        assertEquals(tagsId, newsDao.getTagsIdByNewsId(2L));
    }

    @Test
    public void getTagsIdByNewsId_incorrectNewsId_emptyList() {

        assertEquals(Collections.emptyList(), newsDao.getTagsIdByNewsId(100L));
    }

    @Test
    public void deleteNewsAuthorAssociationsCorrect() {
        newsDao.deleteNewsAuthorAssociations(2L);

        assertEquals(Collections.emptyList(), newsDao.findNewsByAuthorId(2L));
    }

    @Test
    public void deleteNewsTagAssociations() {
        newsDao.deleteNewsTagAssociations(1L);

        assertEquals(Collections.emptyList(), newsDao.getTagsIdByNewsId(1L));
    }
}