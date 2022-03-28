package com.epam.lab.repository;

import com.epam.lab.mapper.NewsMapper;
import com.epam.lab.model.News;
import com.epam.lab.repository.constant.NewsConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class NewsDaoImpl implements NewsDao {
    private static final String INSERT_QUERY = "INSERT INTO news (title, short_text, full_text, creation_date," +
            " modification_date) VALUES (?,?,?,current_date,current_date)";
    private static final String UPDATE_QUERY = "UPDATE news SET title = ?, short_text = ?, full_text = ?," +
            " modification_date = current_date WHERE id = ?";
    private static final String DELETE_QUERY = "DELETE FROM news WHERE id = ?";
    private static final String GET_ALL_QUERY = "SELECT n.id, n.title, n.short_text, n.full_text, n.creation_date, n.modification_date, " +
            "  a.name, t.name FROM news n LEFT JOIN news_author na ON n.id = na.news_id LEFT JOIN author a" +
            " ON a.id = na.author_id LEFT JOIN news_tag nt ON n.id = nt.news_id LEFT JOIN tag t" +
            " ON t.id = nt.tag_id ";

    private static final String FIND_NEWS_BY_AUTHOR_ID = "SELECT id, title, short_text, full_text, creation_date," +
            " modification_date FROM news_author JOIN news ON news.id = news_id WHERE author_id = ?";
    private static final String FIND_NEWS_BY_ID = "SELECT id, title, short_text, full_text, creation_date," +
            " modification_date FROM news WHERE id = ?";
    private static final String FIND_NEWS_BY_TITLE_AND_FULL_TEXT = "SELECT id, title, short_text, full_text, creation_date," +
            " modification_date FROM news WHERE title = ? AND full_text = ?";

    private static final String FILL_NEWS_AUTHOR_TABLE = "INSERT INTO news_author (news_id, author_id) VALUES (?, ?)";

    private static final String FILL_NEWS_TAG_TABLE = "INSERT INTO news_tag (news_id, tag_id) VALUES (?, ?)";

    private static final String GET_AUTHOR_ID_BY_NEWS_ID = "SELECT author_id FROM news_author WHERE news_id = ?";

    private static final String GET_TAGS_ID_BY_NEWS_ID = "SELECT tag_id FROM news_tag WHERE news_id = ?";

    private static final String DELETE_NEWS_AUTHOR_ASSOCIATIONS = "DELETE FROM news_author WHERE author_id = ?";

    private static final String DELETE_NEWS_TAG_ASSOCIATIONS = "DELETE FROM news_tag WHERE tag_id = ?";

    private JdbcTemplate jdbcTemplate;
    private NewsMapper newsMapper;

    @Autowired
    public NewsDaoImpl(JdbcTemplate jdbcTemplate, NewsMapper newsMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.newsMapper = newsMapper;
    }

    @Override
    public void create(News news) {
        jdbcTemplate.update(INSERT_QUERY, news.getTitle(), news.getShortText(), news.getFullText());
    }

    @Override
    public void update(News news) {
        jdbcTemplate.update(UPDATE_QUERY, news.getTitle(), news.getShortText(), news.getFullText(), news.getId());
    }

    @Override
    public void delete(Long id) {
        jdbcTemplate.update(DELETE_QUERY, id);
    }

    @Override
    public List<News> findById(Long id) {
        return jdbcTemplate.query(FIND_NEWS_BY_ID, newsMapper, id);
    }

    @Override
    public List<News> getAll(String searchByAuthorName,
                             String searchByTagName, String searchByTitle, String sortBy, String order) {
        String query = GET_ALL_QUERY +
                "WHERE " + "n.title LIKE CONCAT('%',?,'%')" +
                (Objects.nonNull(searchByTagName) ? " AND t.name LIKE CONCAT('%',?,'%') " : "") +
                (Objects.nonNull(searchByAuthorName) ? "AND a.name LIKE CONCAT('%',?,'%')" : "") +
                (Objects.nonNull(sortBy) ? " ORDER BY " + NewsConstants.NEWS_FIELDS_DB_FORMAT.get(sortBy) +
                        (Objects.nonNull(order) ? " " + order : "") : "");
        if (Objects.isNull(searchByAuthorName)) {
            if (Objects.isNull(searchByTagName)) {
                return jdbcTemplate.query(query, newsMapper, searchByTitle);
            }
            return jdbcTemplate.query(query, newsMapper, searchByTitle, searchByTagName);
        } else {
            if (Objects.isNull(searchByTagName)) {
                return jdbcTemplate.query(query, newsMapper, searchByTitle, searchByAuthorName);
            }
            return jdbcTemplate.query(query, newsMapper, searchByTitle, searchByTagName, searchByAuthorName);
        }
    }

    @Override
    public List<News> findNewsByAuthorId(Long authorId) {
        return jdbcTemplate.query(FIND_NEWS_BY_AUTHOR_ID, newsMapper, authorId);
    }

    @Override
    public List<News> findNewsByTitleAndFullText(String title, String fullText) {
        List<News> news = jdbcTemplate.query(FIND_NEWS_BY_TITLE_AND_FULL_TEXT, newsMapper, title, fullText);
        return news;
    }

    @Override
    public void associateNewsWithAuthor(Long newsId, Long authorId) {
        jdbcTemplate.update(FILL_NEWS_AUTHOR_TABLE, newsId, authorId);
    }

    @Override
    public void associateNewsWithTags(Long newsId, Long tagId) {
        jdbcTemplate.update(FILL_NEWS_TAG_TABLE, newsId, tagId);
    }

    @Override
    public boolean findNewsAuthorAssociationByNewsId(Long id) {
        List<Long> result =
                jdbcTemplate.query(GET_AUTHOR_ID_BY_NEWS_ID, (resultSet, i) -> resultSet.getLong(1), id);
        return !result.isEmpty();
    }

    @Override
    public List<Long> getAuthorIdByNewsId(Long id) {
        return jdbcTemplate.query(GET_AUTHOR_ID_BY_NEWS_ID, (resultSet, i) -> resultSet.getLong(1), id);
    }

    @Override
    public List<Long> getTagsIdByNewsId(Long id) {
        return jdbcTemplate.query(GET_TAGS_ID_BY_NEWS_ID, (resultSet, i) -> resultSet.getLong(1), id);
    }

    @Override
    public void deleteNewsAuthorAssociations(Long authorId) {
        jdbcTemplate.update(DELETE_NEWS_AUTHOR_ASSOCIATIONS, authorId);
    }

    @Override
    public void deleteNewsTagAssociations(Long tagId) {
        jdbcTemplate.update(DELETE_NEWS_TAG_ASSOCIATIONS, tagId);
    }
}
