package com.proj.withus.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

	private final String localStorageDir = "C:/upload/";

	public List<String> uploadFiles(List<MultipartFile> images) {
		List<String> fileNameList = new ArrayList<>();

		createDir();

		images.forEach(file -> {
			String fileName = createFileName(file.getOriginalFilename());
			String localFile = localStorageDir + fileName;

			File upload = saveLocal(file, localFile);

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

			if (removeFile(localFile)) {
				System.out.println("로컬에 있는 이미지 삭제 성공");
			} else {
				System.out.println("로컬 이미지 삭제 실패");
			}
		});

		return fileNameList;
	}

	public String createFileName(String fileName) {
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}

	public String getFileExtension(String fileName) {
		try {
			return fileName.substring(fileName.lastIndexOf("."));
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}

	public void createDir() {
		Path dirPath = Paths.get(localStorageDir);
		if (!Files.exists(dirPath)) {
			try {
				Files.createDirectories(dirPath);
			} catch (IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "로컬 저장소 디렉토리를 생성할 수 없음");
			}
		}
	}

	public File saveLocal(MultipartFile file, String localFile) {
		File upload;
		try {
			upload = new File(localFile);
			file.transferTo(upload);
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "로컬 파일 업로드 실패했습니다.");
		}
		return upload;
	}

	private boolean removeFile(String fileName) {
		File localFile = new File(fileName);
		if (localFile.exists()) {
			localFile.delete();
			return true;
		}
		return false;
	}
}
