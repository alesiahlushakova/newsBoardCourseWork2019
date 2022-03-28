package com.epam.lab.repository;

import com.epam.lab.model.Author;

import java.util.List;


public interface AuthorDao extends CrudDao<Author> {
    List<Author> getByNameAndSurname(String name, String surname);

    List<Author> getAll();
}
