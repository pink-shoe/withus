package com.proj.withus.config;

import com.proj.withus.interceptor.ValidTokenInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 일단, 이 config는 interceptor만을 위한 config
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ValidTokenInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/api/oauth/**") // real pattern
                .excludePathPatterns("/kakao/login") // practice pattern
                .excludePathPatterns("/auth/google/callback")
                .excludePathPatterns("/swagger-resources/**", "/swagger-ui/**", "/v2/api-docs");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            // .allowedOrigins("*") // 허용할 도메인 목록
            .allowedOriginPatterns("*")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") // 허용할 HTTP 메서드
            .allowedHeaders("*") // 허용할 헤더
            .allowCredentials(true) // 인증 헤더를 허용할지 여부
            .maxAge(3600);
    }
}
