package com.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import java.util.UUID;

@Getter
@Setter
@Entity
@Audited
@AuditTable(value = "attached_document_audit")
@Table(name = "attached_document")
public class Document extends BaseEntity {
    @Column(name = "contract_id", nullable = false)
    private UUID contractId;

    @Column(name = "process_step_id")
    private UUID processStepId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "bucket_link", nullable = false, length = Integer.MAX_VALUE)
    private String bucketLink;

    @Column(name = "document_type", nullable = false)
    private String type;

    @Column(name = "document_category", nullable = false)
    private String category;

    @Column(name = "document_size", nullable = false)
    private long size;

    @Column(name = "custom_data", length = Integer.MAX_VALUE)
    private String customData;

    @Column(name = "download_available")
    private Boolean downloadAvailable;
}