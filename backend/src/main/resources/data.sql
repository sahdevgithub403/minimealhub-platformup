-- Clear existing data if needed (H2 memory usually clears on restart, but good practice)
-- DELETE FROM meals; 

INSERT INTO meals (name, description, day_of_week, image_url, is_vegetarian, price) VALUES
('Mini Idli Delight', 'Soft button idlis with mild coconut chutney and fresh apple slices.', 'Monday', 'https://images.unsplash.com/photo-1589301760576-47c4dd1096cc?q=80&w=1000&auto=format&fit=crop', true, 120.00),

('Power Wrap', 'Whole wheat roll stuffed with paneer, veggies, and homemade mild sauce.', 'Tuesday', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000&auto=format&fit=crop', true, 140.00),

('Rainbow Pulao', 'Colorful mixed vegetable pulao served with sweet beetroot raita and a banana.', 'Wednesday', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000&auto=format&fit=crop', true, 130.00),

('Pasta Party', 'Whole wheat pasta in hidden veggie white sauce with a side of fruit yogurt.', 'Thursday', 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?q=80&w=1000&auto=format&fit=crop', true, 150.00),

('Paratha Treat', 'Soft aloo paratha served with mild curd and a small jaggery treat.', 'Friday', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop', true, 110.00);
