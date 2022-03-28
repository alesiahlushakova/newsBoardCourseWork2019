package com.epam.lab.repository;

import com.epam.lab.model.Tag;

import java.util.List;


public interface TagDao extends CrudDao<Tag> {
    List<Tag> getAll();

    List<Tag> getTagByName(String name);
}
