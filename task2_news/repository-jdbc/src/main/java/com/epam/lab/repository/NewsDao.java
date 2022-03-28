package com.epam.lab.repository;

import com.epam.lab.model.News;

import java.util.List;


public interface NewsDao extends CrudDao<News> {
    List<News> findNewsByAuthorId(Long authorId);

    List<News> findNewsByTitleAndFullText(String title, String fullText);

    void associateNewsWithAuthor(Long newId, Long authorId);

    void associateNewsWithTags(Long newsId, Long tagId);

    boolean findNewsAuthorAssociationByNewsId(Long id);

    List<Long> getAuthorIdByNewsId(Long id);

    List<Long> getTagsIdByNewsId(Long id);

    List<News> getAll(String searchByAuthorName,
                      String searchByTagName, String searchByTitle, String sortBy, String order);

    void deleteNewsAuthorAssociations(Long authorId);

    void deleteNewsTagAssociations(Long tagId);
}


