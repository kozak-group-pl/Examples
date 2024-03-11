package com.demo.repository;

import com.demo.entity.Document;
import io.hypersistence.utils.spring.repository.BaseJpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DocumentRepository extends BaseJpaRepository<Document, UUID> {
    List<Document> findAll();

    List<Document> findAllByContractId(Pageable pageable, UUID contractId);

    List<Document> findAllByContractId(UUID contractId);

    List<Document> findAllByContractIdAndCategory(UUID contractId, String documentCategory);

    Optional<Document> findByIdAndContractId(UUID id, UUID contractId);

    long countByContractId(UUID contractId);
}
