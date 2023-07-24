package com.proj.withus.config.oauth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;
import com.nimbusds.oauth2.sdk.token.Tokens;
import com.proj.withus.config.oauth.provider.GoogleUserInfo;
import com.proj.withus.service.MemberService;
import com.proj.withus.service.TokenService;

@Service
public class OAuth2UserServiceImp extends DefaultOAuth2UserService {

	@Autowired
	private MemberService memberService;

	@Autowired
	private OAuth2AuthorizedClientService oAuth2AuthorizedClientService;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		OAuth2User user = super.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

		GoogleUserInfo googleUserInfo = new GoogleUserInfo(user);

		String accessToken = userRequest.getAccessToken().getTokenValue();
		OAuth2AccessToken access = userRequest.getAccessToken();

		// OAuth2AuthorizedClient client = oAuth2AuthorizedClientService.loadAuthorizedClient(registrationId, user.getName());
		// OAuth2RefreshToken refreshToken = client.getRefreshToken();

		// OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
		// OAuth2AuthorizedClient client = oAuth2AuthorizedClientService.loadAuthorizedClient(registrationId, oauthToken.getName());
		// OAuth2RefreshToken refreshToken = client.getRefreshToken();
		//
		// if (refreshToken != null) {
		// 	String refreshTokenValue = refreshToken.getTokenValue();
		// 	System.out.println("Refresh Token: " + refreshTokenValue);
		// } else {
		// 	System.out.println("Refresh Token not available.");
		// }

		memberService.googleLogin(googleUserInfo, accessToken, null);
		return googleUserInfo;
	}

	// @Override
	// public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
	// 	// OAuth2UserService delegate = (OAuth2UserService) new DefaultOAuth2UserService();
	// 	OAuth2User user = super.loadUser(userRequest);
	//
	// 	String registrationId = userRequest.getClientRegistration().getRegistrationId();
	// 	String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
	//
	// 	GoogleUserInfo googleUserInfo = new GoogleUserInfo(user);
	//
	// 	String accessToken = userRequest.getAccessToken().getTokenValue();
	// 	OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
	// 	OAuth2AuthorizedClient client = oAuth2AuthorizedClientService.loadAuthorizedClient(registrationId, oauthToken.getName());
	// 	OAuth2RefreshToken refreshToken = client.getRefreshToken();
	//
	// 	String refreshTokenValue = null;
	// 	if (refreshToken != null) {
	// 		refreshTokenValue = refreshToken.getTokenValue();
	// 	}
	// 	System.out.println("000000000000000000000000000");
	// 	System.out.println(refreshToken.getTokenValue());
	// 	memberService.googleLogin(googleUserInfo, accessToken, refreshTokenValue);
	// 	return googleUserInfo;
	// }


}
