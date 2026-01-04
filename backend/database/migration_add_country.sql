-- Migration to add country column to trips table
ALTER TABLE trips ADD COLUMN country VARCHAR(100);

-- Update existing trips with default country
UPDATE trips SET country = 'Unknown' WHERE country IS NULL;