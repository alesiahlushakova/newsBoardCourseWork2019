package com.epam.lab.configuration;

import com.opentable.db.postgres.embedded.EmbeddedPostgres;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.configuration.FluentConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.SQLException;

@Configuration
public class TestConfiguration {

    @Profile("dev")
    @Bean
    public DataSource dataSource() throws SQLException, IOException {
        DataSource dataSource = EmbeddedPostgres.start().getTemplateDatabase();
        return dataSource;
    }

    @Bean
    public Flyway flyway(DataSource dataSource) {
        FluentConfiguration fluentConfiguration = Flyway.configure().dataSource(dataSource);

        return new Flyway(fluentConfiguration);
    }

}

