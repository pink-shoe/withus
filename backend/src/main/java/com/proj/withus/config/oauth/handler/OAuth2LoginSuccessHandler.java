package com.proj.withus.config.oauth;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	@Override
	protected void handle(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {

		if (authentication instanceof OAuth2AuthenticationToken) {
			OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
			String registrationId = oauthToken.getAuthorizedClientRegistrationId();

			// Grant different roles based on the social login provider
			Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
			List<GrantedAuthority> updatedAuthorities = new ArrayList<>(authorities);

			if ("google".equals(registrationId)) {
				updatedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
			}

			// Create a new Authentication object with the updated authorities
			Authentication updatedAuthentication = new OAuth2AuthenticationToken(
				(OAuth2User)authentication.getPrincipal(),
				updatedAuthorities,
				registrationId
			);

			// Set the updated Authentication object back to the SecurityContext
			SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
		}

		// Continue with the default success handling
		super.handle(request, response, authentication);
	}
}
