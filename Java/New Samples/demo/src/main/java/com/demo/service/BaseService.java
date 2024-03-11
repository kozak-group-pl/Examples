package com.demo.service;

import java.util.List;
import java.util.UUID;

public interface BaseService<T> {
    T getById(UUID id);

    List<T> getAll(int count);

    T add(T dto);

    T update(T dto);

    boolean delete(UUID id);
}
