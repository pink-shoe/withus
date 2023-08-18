package com.proj.withus.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Component
public class ImageUtil {

	private final String localStorageDir = "C:/upload/";

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

	private void createDir() {
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
		createDir();
		File upload;
		try {
//			upload = new File(localStorageDir + localFile);
			upload = new File(localFile);
			file.transferTo(upload);
		} catch (IOException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "로컬 파일 업로드 실패했습니다.");
		}
		return upload;
	}

	public boolean removeFile(String fileName) {
		File localFile = new File(localStorageDir + fileName);
		if (localFile.exists()) {
			localFile.delete();
			return true;
		}
		return false;
	}
}
