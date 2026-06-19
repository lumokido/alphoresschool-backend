package com.lumo.backend.students.dto;

public record RefreshTokenResponse(boolean success, String message, String accessToken) {}
