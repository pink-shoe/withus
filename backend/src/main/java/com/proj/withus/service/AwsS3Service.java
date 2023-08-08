package com.proj.withus.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AwsS3Service {

    public List<String> uploadFiles(List<MultipartFile> images);
}
