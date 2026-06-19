package com.lumo.backend.students.dto;

public record StudentLoginResponse(boolean success, String message, String accessToken, String refreshToken) {}
