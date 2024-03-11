package com.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.InputStream;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DocumentDto implements Serializable {
    private UUID id;
    private String name;
    private String type;
    private String category;
    private String assignUser; // user who uploaded the file
    private String customData;
    private UUID contractId;
    private UUID processStepId;
    @ToString.Exclude
    private InputStream file;
    private Long size;
    private Boolean downloadAvailable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
}