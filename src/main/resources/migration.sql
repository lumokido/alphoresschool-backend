-- Migration Script for File Management Module

-- 1. Drop existing gallery tables to implement the new gallery schema
DROP TABLE IF EXISTS gallery_images CASCADE;
DROP TABLE IF EXISTS galleries CASCADE;

-- 2. Create the new gallery table
CREATE TABLE gallery (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    type VARCHAR(255),
    image_url VARCHAR(2000) NOT NULL,
    uploaded_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

-- 3. Create the homework_files table
CREATE TABLE homework_files (
    id BIGSERIAL PRIMARY KEY,
    homework_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL
);

-- 4. Alter the students table to add profilePhotoUrl
ALTER TABLE students ADD COLUMN IF NOT EXISTS profile_photo_url VARCHAR(500);
