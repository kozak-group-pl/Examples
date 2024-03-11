package com.demo.service;

import com.demo.dto.DocumentDto;

import java.util.UUID;

public interface DocumentService extends BaseService<DocumentDto>{
    DocumentDto getById(UUID id);
}
