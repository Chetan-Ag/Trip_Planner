-- Sample data for development

-- Insert sample cities with popular tourist destinations
INSERT INTO cities (name, country, latitude, longitude, description, image_url) VALUES
('Paris', 'France', 48.8566, 2.3522, 'The City of Light, famous for its art, fashion, and culture', 'https://example.com/paris.jpg'),
('Tokyo', 'Japan', 35.6762, 139.6503, 'A bustling metropolis blending tradition and modernity', 'https://example.com/tokyo.jpg'),
('New York', 'USA', 40.7128, -74.0060, 'The city that never sleeps', 'https://example.com/nyc.jpg'),
('London', 'UK', 51.5074, -0.1278, 'Historic city with royal heritage', 'https://example.com/london.jpg'),
('Rome', 'Italy', 41.9028, 12.4964, 'The Eternal City with ancient history', 'https://example.com/rome.jpg'),
('Bangkok', 'Thailand', 13.7563, 100.5018, 'Vibrant city with temples, markets, and street food', 'https://example.com/bangkok.jpg'),
('Sydney', 'Australia', -33.8688, 151.2093, 'Harbor city with iconic Opera House', 'https://example.com/sydney.jpg'),
('Barcelona', 'Spain', 41.3851, 2.1734, 'Mediterranean city with unique architecture', 'https://example.com/barcelona.jpg'),
('Berlin', 'Germany', 52.5200, 13.4050, 'Historic city with rich culture and nightlife', 'https://example.com/berlin.jpg'),
('Mumbai', 'India', 19.0760, 72.8777, 'Bollywood capital and financial hub', 'https://example.com/mumbai.jpg');

-- Insert sample activities with realistic pricing
INSERT INTO activities (city_id, name, description, category, price, duration, rating, image_url) VALUES
-- Paris activities
(1, 'Eiffel Tower Visit', 'Visit the iconic Eiffel Tower with elevator access', 'Sightseeing', 29.40, 120, 4.5, 'https://example.com/eiffel.jpg'),
(1, 'Louvre Museum', 'Explore the world famous art museum', 'Culture', 17.00, 180, 4.7, 'https://example.com/louvre.jpg'),
(1, 'Seine River Cruise', 'Romantic boat cruise along the Seine', 'Leisure', 15.00, 60, 4.3, 'https://example.com/seine.jpg'),
(1, 'Versailles Palace', 'Day trip to the magnificent palace', 'History', 27.00, 300, 4.6, 'https://example.com/versailles.jpg'),

-- Tokyo activities
(2, 'Tokyo Skytree', 'Observation deck with panoramic city views', 'Sightseeing', 18.00, 90, 4.4, 'https://example.com/skytree.jpg'),
(2, 'Senso-ji Temple', 'Ancient Buddhist temple in Asakusa', 'Culture', 0.00, 60, 4.6, 'https://example.com/sensoji.jpg'),
(2, 'Tsukiji Fish Market', 'Famous fish market and sushi breakfast', 'Food', 25.00, 120, 4.5, 'https://example.com/tsukiji.jpg'),
(2, 'Mount Fuji Day Trip', 'Scenic trip to iconic Mount Fuji', 'Nature', 85.00, 480, 4.8, 'https://example.com/fuji.jpg'),

-- New York activities
(3, 'Statue of Liberty', 'Iconic symbol of freedom with ferry ride', 'Sightseeing', 23.50, 150, 4.3, 'https://example.com/liberty.jpg'),
(3, 'Central Park', 'Peaceful oasis in the heart of Manhattan', 'Nature', 0.00, 120, 4.4, 'https://example.com/centralpark.jpg'),
(3, 'Broadway Show', 'World-class theater performance', 'Entertainment', 120.00, 150, 4.7, 'https://example.com/broadway.jpg'),
(3, 'Empire State Building', 'Art Deco skyscraper with observation deck', 'Sightseeing', 37.00, 90, 4.2, 'https://example.com/empire.jpg'),

-- London activities
(4, 'Big Ben & Parliament', 'Iconic clock tower and government buildings', 'Sightseeing', 0.00, 60, 4.2, 'https://example.com/bigben.jpg'),
(4, 'British Museum', 'World-renowned museum with ancient artifacts', 'Culture', 0.00, 180, 4.6, 'https://example.com/britishmuseum.jpg'),
(4, 'Tower of London', 'Historic castle and Crown Jewels', 'History', 31.00, 150, 4.4, 'https://example.com/tower.jpg'),
(4, 'Thames River Cruise', 'Scenic boat trip along the Thames', 'Leisure', 20.00, 90, 4.1, 'https://example.com/thames.jpg'),

-- Rome activities
(5, 'Colosseum', 'Ancient Roman amphitheater', 'History', 16.00, 120, 4.8, 'https://example.com/colosseum.jpg'),
(5, 'Vatican Museums', 'Sistine Chapel and papal collections', 'Culture', 20.00, 180, 4.7, 'https://example.com/vatican.jpg'),
(5, 'Trevi Fountain', 'Baroque fountain for coin throwing', 'Sightseeing', 0.00, 30, 4.5, 'https://example.com/trevi.jpg'),
(5, 'Roman Forum', 'Ancient Roman marketplace ruins', 'History', 16.00, 90, 4.3, 'https://example.com/forum.jpg'),

-- Bangkok activities
(6, 'Grand Palace', 'Ornate royal palace complex', 'Culture', 15.00, 150, 4.5, 'https://example.com/grandpalace.jpg'),
(6, 'Floating Market', 'Traditional market on water canals', 'Shopping', 10.00, 120, 4.2, 'https://example.com/floating.jpg'),
(6, 'Wat Pho Temple', 'Temple of the Reclining Buddha', 'Culture', 3.50, 90, 4.6, 'https://example.com/watpho.jpg'),
(6, 'Street Food Tour', 'Authentic Thai street food experience', 'Food', 25.00, 180, 4.7, 'https://example.com/streetfood.jpg'),

-- Sydney activities
(7, 'Sydney Opera House', 'Iconic performing arts venue', 'Culture', 43.00, 120, 4.6, 'https://example.com/opera.jpg'),
(7, 'Harbour Bridge Climb', 'Climb the famous harbor bridge', 'Adventure', 174.00, 210, 4.8, 'https://example.com/bridge.jpg'),
(7, 'Bondi Beach', 'Famous surf beach and coastal walk', 'Nature', 0.00, 180, 4.3, 'https://example.com/bondi.jpg'),
(7, 'Blue Mountains', 'Scenic mountain region day trip', 'Nature', 65.00, 480, 4.5, 'https://example.com/bluemountains.jpg'),

-- Barcelona activities
(8, 'Sagrada Familia', 'Gaudi masterpiece basilica', 'Culture', 26.00, 90, 4.7, 'https://example.com/sagrada.jpg'),
(8, 'Park Güell', 'Colorful mosaic park by Gaudi', 'Sightseeing', 10.00, 120, 4.4, 'https://example.com/parkguell.jpg'),
(8, 'Las Ramblas', 'Famous pedestrian street', 'Shopping', 0.00, 90, 4.0, 'https://example.com/ramblas.jpg'),
(8, 'Flamenco Show', 'Traditional Spanish dance performance', 'Entertainment', 35.00, 90, 4.5, 'https://example.com/flamenco.jpg'),

-- Berlin activities
(9, 'Brandenburg Gate', 'Historic neoclassical monument', 'History', 0.00, 30, 4.3, 'https://example.com/brandenburg.jpg'),
(9, 'Berlin Wall Memorial', 'Remnants of the Cold War barrier', 'History', 0.00, 90, 4.5, 'https://example.com/wall.jpg'),
(9, 'Museum Island', 'UNESCO World Heritage museum complex', 'Culture', 19.00, 240, 4.6, 'https://example.com/museums.jpg'),
(9, 'Beer Garden Tour', 'Traditional German beer experience', 'Food', 30.00, 180, 4.4, 'https://example.com/beer.jpg'),

-- Mumbai activities
(10, 'Gateway of India', 'Iconic colonial monument', 'History', 0.00, 60, 4.1, 'https://example.com/gateway.jpg'),
(10, 'Bollywood Studio Tour', 'Behind-the-scenes film industry tour', 'Entertainment', 20.00, 180, 4.3, 'https://example.com/bollywood.jpg'),
(10, 'Elephanta Caves', 'Ancient rock-cut cave temples', 'History', 5.00, 240, 4.4, 'https://example.com/elephanta.jpg'),
(10, 'Street Food Tour', 'Authentic Mumbai street food experience', 'Food', 15.00, 150, 4.6, 'https://example.com/mumbaiFood.jpg');