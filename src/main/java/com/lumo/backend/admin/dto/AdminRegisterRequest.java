package com.lumo.backend.admin.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminRegisterRequest (

    @NotBlank(message = "mail is required")
    @Email(message = "invalid email")
    String emailId, 
  

    @NotBlank(message = "mobile number is required")
    @Pattern(regexp = "\\d{10}", message = "mobile number must be 10 digits")
    String mobileNumber,
    
    @NotBlank(message = "School name is required")
    String schoolName,

    @NotBlank(message = "Name is required")
    String name,
       
    @NotBlank(message = "password is required")
    @Size(min = 8, max = 20, message = "password must be between 8 and 20 characters")
    String  passwordHash
){}
