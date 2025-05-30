package com.webfejl.beadando.dto;

import java.sql.Timestamp;


public record TaskDTO(
        String taskId,
        String taskTitle,
        String taskStatus,
        int taskPriority,
        Timestamp taskDate,
        String taskDesc,
        String projectId) {
}
