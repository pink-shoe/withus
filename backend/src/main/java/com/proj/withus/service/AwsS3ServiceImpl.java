package com.proj.withus.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.proj.withus.exception.CustomException;
import com.proj.withus.exception.ErrorCode;
import com.proj.withus.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AwsS3ServiceImpl implements AwsS3Service{

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3Client amazonS3Client;
	private final ImageUtil imageUtil;

//	public List<String> uploadFiles(List<MultipartFile> images) {
//		List<String> fileNameList = new ArrayList<>();
//
//		images.forEach(file -> {
//			String fileName = imageUtil.createFileName(file.getOriginalFilename());
//
//			File upload = imageUtil.saveLocal(file, fileName);
//
//			ObjectMetadata objectMetadata = new ObjectMetadata();
//			objectMetadata.setContentLength(upload.length());
//			objectMetadata.setContentType(file.getContentType());
//
//			try(InputStream inputStream = new FileInputStream(upload)) {
//				amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
//					.withCannedAcl(CannedAccessControlList.PublicRead));
//			} catch(IOException e) {
//				throw new CustomException(ErrorCode.S3_IMAGE_LOAD_FAIl);
//			}
//
//			fileNameList.add(upload.getName());
//
//			if (!imageUtil.removeFile(fileName)) {
//				throw new CustomException(ErrorCode.LOCAL_IMAGE_NOT_DELETED);
//			}
//		});
//
//		return fileNameList;
//	}

	public String uploadFile(MultipartFile image) {
//		List<String> fileNameList = new ArrayList<>();

//		String fileName = imageUtil.createFileName(image.getOriginalFilename());
		String fileName = image.getOriginalFilename();

//			File upload = imageUtil.saveLocal(image, fileName);

		ObjectMetadata objectMetadata = new ObjectMetadata();
//		objectMetadata.setContentLength(upload.length());
		objectMetadata.setContentLength(image.getSize());
		objectMetadata.setContentType(image.getContentType());

		try(InputStream inputStream = image.getInputStream()) {
			amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch(IOException e) {
			throw new CustomException(ErrorCode.S3_IMAGE_LOAD_FAIl);
		}

//		fileNameList.add(upload.getName());

//		if (!imageUtil.removeFile(fileName)) {
//			throw new CustomException(ErrorCode.LOCAL_IMAGE_NOT_DELETED);
//		}

		return amazonS3Client.getUrl(bucket, fileName).toString();
	}
}
