package com.demo.mapper;

import com.demo.dto.DocumentDto;
import com.demo.entity.Document;
import com.demo.model.RequestContext;
import com.demo.utils.DateTimeUtils;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-08T18:34:16+0200",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.5.jar, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class DocumentMapperImpl implements DocumentMapper {

    @Override
    public Document toEntity(DocumentDto dto) {
        if ( dto == null ) {
            return null;
        }

        Document document = new Document();

        document.setId( dto.getId() );
        document.setCreatedAt( dto.getCreatedAt() );
        document.setUpdatedAt( dto.getUpdatedAt() );
        document.setCreatedBy( dto.getCreatedBy() );
        document.setUpdatedBy( dto.getUpdatedBy() );
        document.setContractId( dto.getContractId() );
        document.setProcessStepId( dto.getProcessStepId() );
        document.setName( dto.getName() );
        document.setType( dto.getType() );
        document.setCategory( dto.getCategory() );
        if ( dto.getSize() != null ) {
            document.setSize( dto.getSize() );
        }
        document.setCustomData( dto.getCustomData() );
        document.setDownloadAvailable( dto.getDownloadAvailable() );

        return document;
    }

    @Override
    public DocumentDto toDto(Document entity, RequestContext requestContext) {
        if ( entity == null ) {
            return null;
        }

        DocumentDto.DocumentDtoBuilder documentDto = DocumentDto.builder();

        documentDto.id( entity.getId() );
        documentDto.name( entity.getName() );
        documentDto.type( entity.getType() );
        documentDto.category( entity.getCategory() );
        documentDto.customData( entity.getCustomData() );
        documentDto.contractId( entity.getContractId() );
        documentDto.processStepId( entity.getProcessStepId() );
        documentDto.size( entity.getSize() );
        documentDto.downloadAvailable( entity.getDownloadAvailable() );
        documentDto.createdBy( entity.getCreatedBy() );
        documentDto.updatedBy( entity.getUpdatedBy() );

        documentDto.createdAt( DateTimeUtils.toLocalTimeWithTimezone(entity.getCreatedAt(), requestContext.getCountryCode()) );
        documentDto.updatedAt( DateTimeUtils.toLocalTimeWithTimezone(entity.getUpdatedAt(), requestContext.getCountryCode()) );

        return documentDto.build();
    }

    @Override
    public Document partialUpdate(DocumentDto documentDto, Document document) {
        if ( documentDto == null ) {
            return document;
        }

        if ( documentDto.getId() != null ) {
            document.setId( documentDto.getId() );
        }
        if ( documentDto.getCreatedAt() != null ) {
            document.setCreatedAt( documentDto.getCreatedAt() );
        }
        if ( documentDto.getUpdatedAt() != null ) {
            document.setUpdatedAt( documentDto.getUpdatedAt() );
        }
        if ( documentDto.getCreatedBy() != null ) {
            document.setCreatedBy( documentDto.getCreatedBy() );
        }
        if ( documentDto.getUpdatedBy() != null ) {
            document.setUpdatedBy( documentDto.getUpdatedBy() );
        }
        if ( documentDto.getContractId() != null ) {
            document.setContractId( documentDto.getContractId() );
        }
        if ( documentDto.getProcessStepId() != null ) {
            document.setProcessStepId( documentDto.getProcessStepId() );
        }
        if ( documentDto.getName() != null ) {
            document.setName( documentDto.getName() );
        }
        if ( documentDto.getType() != null ) {
            document.setType( documentDto.getType() );
        }
        if ( documentDto.getCategory() != null ) {
            document.setCategory( documentDto.getCategory() );
        }
        if ( documentDto.getSize() != null ) {
            document.setSize( documentDto.getSize() );
        }
        if ( documentDto.getCustomData() != null ) {
            document.setCustomData( documentDto.getCustomData() );
        }
        if ( documentDto.getDownloadAvailable() != null ) {
            document.setDownloadAvailable( documentDto.getDownloadAvailable() );
        }

        return document;
    }

    @Override
    public List<DocumentDto> toDtoList(List<Document> entity, RequestContext requestContext) {
        if ( entity == null ) {
            return null;
        }

        List<DocumentDto> list = new ArrayList<DocumentDto>( entity.size() );
        for ( Document document : entity ) {
            list.add( toDto( document, requestContext ) );
        }

        return list;
    }

    @Override
    public List<DocumentDto> toDtoList(List<Document> entity) {
        if ( entity == null ) {
            return null;
        }

        List<DocumentDto> list = new ArrayList<DocumentDto>( entity.size() );
        for ( Document document : entity ) {
            list.add( documentToDocumentDto( document ) );
        }

        return list;
    }

    protected DocumentDto documentToDocumentDto(Document document) {
        if ( document == null ) {
            return null;
        }

        DocumentDto.DocumentDtoBuilder documentDto = DocumentDto.builder();

        documentDto.id( document.getId() );
        documentDto.name( document.getName() );
        documentDto.type( document.getType() );
        documentDto.category( document.getCategory() );
        documentDto.customData( document.getCustomData() );
        documentDto.contractId( document.getContractId() );
        documentDto.processStepId( document.getProcessStepId() );
        documentDto.size( document.getSize() );
        documentDto.downloadAvailable( document.getDownloadAvailable() );
        documentDto.createdAt( document.getCreatedAt() );
        documentDto.updatedAt( document.getUpdatedAt() );
        documentDto.createdBy( document.getCreatedBy() );
        documentDto.updatedBy( document.getUpdatedBy() );

        return documentDto.build();
    }
}
