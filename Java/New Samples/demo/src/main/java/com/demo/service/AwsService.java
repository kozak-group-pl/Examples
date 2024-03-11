package com.demo.service;


import com.demo.dto.DocumentDto;

import java.io.InputStream;

public interface AwsService {
    InputStream download(String bucket, String path);

    String upload(String bucket, DocumentDto dto);

    void delete(String bucket, String path);
}