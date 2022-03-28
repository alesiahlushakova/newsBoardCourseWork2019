//package com.epam.lab.configuration;
//
//import com.fasterxml.jackson.annotation.JsonAutoDetect;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.annotation.PropertyAccessor;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.converter.HttpMessageConverter;
//import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.List;
//
//@Configuration
//@EnableWebMvc
//@ComponentScan(basePackages = {"com.epam.lab"})
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void configureMessageConverters(
//            List<HttpMessageConverter<?>> converters) {
//        converters.add(new MappingJackson2HttpMessageConverter(
//                new Jackson2ObjectMapperBuilder().serializationInclusion(JsonInclude.Include.NON_NULL)
//                        .serializationInclusion(JsonInclude.Include.NON_EMPTY)
//                        .visibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE)
//                        .visibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY).build()));
//    }
//}
