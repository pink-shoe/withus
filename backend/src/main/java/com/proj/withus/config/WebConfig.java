package com.proj.withus.config;

import com.proj.withus.util.ValidTokenInterceptor;
import org.springframework.context.annotation.Configuration;
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
                .addPathPatterns("/api/oauth/**");
    }
}
