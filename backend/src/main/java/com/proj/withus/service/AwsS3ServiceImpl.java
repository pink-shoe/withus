package com.proj.withus.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.proj.withus.util.ImageUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AwsS3ServiceImpl implements AwsS3Service{

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3Client amazonS3Client;
	private final ImageUtil imageUtil;

	public List<String> uploadFiles(List<MultipartFile> images) {
		List<String> fileNameList = new ArrayList<>();

		images.forEach(file -> {
			String fileName = imageUtil.createFileName(file.getOriginalFilename());

			File upload = imageUtil.saveLocal(file, fileName);

			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(upload.length());
			objectMetadata.setContentType(file.getContentType());

			try(InputStream inputStream = new FileInputStream(upload)) {
				amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
			} catch(IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
			}

			fileNameList.add(upload.getName());

			if (imageUtil.removeFile(fileName)) {
				System.out.println("로컬에 있는 이미지 삭제 성공");
			} else {
				System.out.println("로컬 이미지 삭제 실패");
			}
		});

		return fileNameList;
	}
}
