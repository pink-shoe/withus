package com.proj.withus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proj.withus.config.provider.GoogleUserInfo;
import com.proj.withus.domain.Member;
import com.proj.withus.repository.MemberRepository;

@Service
public class UserService {

	@Autowired
	private MemberRepository memberRepository;

	public void googleLogin(GoogleUserInfo userInfo) {
		Member exist = memberRepository.findByEmail(userInfo.getEmail());

		if (exist == null) {
			Member newUser = new Member();
			newUser.setId(2L);
			newUser.setEmail(userInfo.getEmail());
			newUser.setNickname(userInfo.getName());
			newUser.setPassword(null);
			newUser.setLoginType("google");
			newUser.setAccessToken(null);
			newUser.setToken(null);
			newUser.setCreatedAt(null);
			newUser.setDeletedAt(null);
			memberRepository.save(newUser);
		}

	}
}
