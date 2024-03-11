package com.demo.service.impl;

import com.demo.dto.DocumentDto;
import com.demo.service.AwsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsServiceImpl implements AwsService {
    private final S3Client s3Client;


    @Override
    public InputStream download(String bucket, String path) {
        log.info("Downloading object, path: {}", path);
        GetObjectRequest request = GetObjectRequest.builder().bucket(bucket).key(path).build();
        return s3Client.getObject(request);
    }

    @Override
    public String upload(String bucket, DocumentDto dto) {
        log.info("Saving file to AWS bucket: {}", bucket);
        String key = generateKey(dto);
        PutObjectRequest requestMetadata = PutObjectRequest.builder().bucket(bucket).key(key).build();
        RequestBody requestBody = RequestBody.fromInputStream(dto.getFile(), dto.getSize());
        s3Client.putObject(requestMetadata, requestBody);
        log.info("File successfully saved to AWS: {}", key);
        return key;
    }

    @Override
    public void delete(String bucket, String path) {
        log.info("Deleting object: {}", path);
        DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder().bucket(bucket).key(path).build();
        s3Client.deleteObject(deleteRequest);
    }

    private String generateKey(DocumentDto dto) {
        String fileName = addUidToFileName(dto.getName());
        String folder = dto.getContractId() + File.separator + dto.getCategory();
        return folder + File.separator + fileName;
    }

    private String addUidToFileName(String filename) {
        String uid = UUID.randomUUID().toString();
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex == -1) { // no extension
            return filename + '_' + uid;
        } else {
            return new StringBuilder(filename)
                    .insert(dotIndex, '_' + uid).toString();
        }
    }
}
