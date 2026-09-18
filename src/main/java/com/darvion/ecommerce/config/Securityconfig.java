package com.darvion.ecommerce.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class Securityconfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public Securityconfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth

                // Public Home Page
                .requestMatchers("/").permitAll()

                // Register & Login
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login"
                ).permitAll()

                // Public Product APIs - GET only
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/products/**"
                ).permitAll()

                // Admin Product APIs
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/products/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/products/**"
                ).hasRole("ADMIN")

                // Public Category APIs - GET only
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/categories/**"
                ).permitAll()

                // Admin Category APIs
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/categories/**"
                ).hasRole("ADMIN")

                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/categories/**"
                ).hasRole("ADMIN")

                // Checkout
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/orders/checkout/**"
                ).hasAnyRole("USER", "ADMIN")

                // Everything else needs authentication
                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}

