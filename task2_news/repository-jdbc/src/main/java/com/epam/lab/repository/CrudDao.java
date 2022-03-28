package com.epam.lab.repository;

import java.util.List;

public interface CrudDao<T> {
    void create(T object);

    void update(T object);

    void delete(Long id);

    List<T> findById(Long id);
}
