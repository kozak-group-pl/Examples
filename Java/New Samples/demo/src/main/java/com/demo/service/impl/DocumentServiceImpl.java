package com.demo.service.impl;

import com.demo.dto.DocumentDto;
import com.demo.entity.Document;
import com.demo.exception.NotFoundException;
import com.demo.mapper.DocumentMapper;
import com.demo.model.RequestContext;
import com.demo.repository.DocumentRepository;
import com.demo.service.AwsService;
import com.demo.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository repository;
    private final DocumentMapper mapper;
    private final AwsService awsService;
    private final RequestContext requestContext;

    @Value("${spring.cloud.aws.s3.document-bucket}")
    private String documentBucket;

    @Override
    public DocumentDto getById(UUID id) {
        Document document = repository.findById(id).orElseThrow(() -> new NotFoundException(String.format("Document not found for ID: %s", id)));
        return downloadDocument(document);
    }

    @Override
    public DocumentDto add(DocumentDto dto) {
        String path = awsService.upload(documentBucket, dto);
        Document document = mapper.toEntity(dto);
        document.setBucketLink(path);
        return mapper.toDto(repository.persist(document), requestContext);
    }

    @Override
    public List<DocumentDto> getAll(int count) {
        throw new IllegalStateException("Not implemented");
    }

    @Override
    public DocumentDto update(DocumentDto dto) {
        throw new IllegalStateException("Not implemented");
    }

    @Override
    public boolean delete(UUID id) {
        throw new IllegalStateException("Not implemented");
    }

    private DocumentDto downloadDocument(Document document) {
        DocumentDto dto = mapper.toDto(document, requestContext);
        InputStream inputStream = awsService.download(documentBucket, document.getBucketLink());
        dto.setFile(inputStream);
        return dto;
    }

}
