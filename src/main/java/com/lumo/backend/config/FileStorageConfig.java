package com.lumo.backend.config;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageConfig {

    @Value("${app.upload.root:/opt/uploads}")
    private String uploadRoot;

    @PostConstruct
    public void init() {
        List<String> folders = List.of(
            "students",
            "teachers",
            "gallery",
            "homework",
            "documents",
            "events"
        );

        for (String folder : folders) {
            File dir = new File(uploadRoot, folder);
            if (!dir.exists()) {
                boolean created = dir.mkdirs();
                if (created) {
                    System.out.println("Successfully created directory: " + dir.getAbsolutePath());
                } else {
                    System.err.println("Failed to create directory: " + dir.getAbsolutePath());
                }
            } else {
                System.out.println("Directory already exists: " + dir.getAbsolutePath());
            }
        }
    }
}
