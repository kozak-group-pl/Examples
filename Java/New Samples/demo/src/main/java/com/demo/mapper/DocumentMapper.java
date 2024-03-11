package com.demo.mapper;

import com.demo.dto.DocumentDto;
import com.demo.entity.Document;
import com.demo.model.RequestContext;
import com.demo.utils.DateTimeUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, imports = {DateTimeUtils.class})
public interface DocumentMapper {
    Document toEntity(DocumentDto dto);

    //    @AddAssignedUserName
    @Mapping(target = "createdAt", expression = "java(DateTimeUtils.toLocalTimeWithTimezone(entity.getCreatedAt(), requestContext.getCountryCode()))")
    @Mapping(target = "updatedAt", expression = "java(DateTimeUtils.toLocalTimeWithTimezone(entity.getUpdatedAt(), requestContext.getCountryCode()))")
    DocumentDto toDto(Document entity, @Context RequestContext requestContext);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Document partialUpdate(DocumentDto documentDto, @MappingTarget Document document);

    List<DocumentDto> toDtoList(List<Document> entity, @Context RequestContext requestContext);

    List<DocumentDto> toDtoList(List<Document> entity);
}