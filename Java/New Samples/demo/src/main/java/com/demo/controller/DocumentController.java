package com.demo.controller;

import com.demo.dto.DocumentDto;
import com.demo.service.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/documents")
@Slf4j
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @QueryMapping
    DocumentDto getDocumentById(@Argument UUID id) {
        return documentService.getById(id);
    }

    @MutationMapping
    DocumentDto addDocument(@Argument DocumentDto document) {
        return documentService.add(document);
    }

    //    REST endpoint for uploading documents
    @PostMapping
    DocumentDto uploadDocumentsRest(@RequestParam MultipartFile file,
                                    @RequestParam String category,
                                    @RequestParam String contractId,
                                    @RequestParam Optional<String> customData,
                                    @RequestParam Optional<UUID> processStepId) throws IOException {

        DocumentDto documentDto = DocumentDto.builder()
                .file(file.getInputStream())
                .size(file.getSize())
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .category(category)
                .customData(customData.orElse(null))
                .contractId(UUID.fromString(contractId))
                .processStepId(processStepId.orElse(null))
                .build();
        log.info("Received upload document request: {}", documentDto);
        return documentService.add(documentDto);
    }



}
