TRUNCATE public.articles, public.categories CASCADE;
INSERT INTO public.categories (id, name, slug) VALUES
('c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 'politics'),
('e80f8fd6-8650-4e87-8099-d53f2708b311', 'Sports', 'sports'),
('ced0d666-3616-4476-b235-ea93db4a9217', 'Agriculture', 'agriculture'),
('83bca33e-fca9-4513-8be9-8e4ae34ce235', 'Business', 'business'),
('2bd0c7ff-8a13-463c-8468-3dd7855a8783', 'Culture', 'culture'),
('154f49c0-4631-4693-9fbe-5dd5566ce589', 'Health', 'health'),
('c81dbcdb-0007-4043-970e-2f3ed696dcd6', 'Infrastructure', 'infrastructure'),
('1bc9ec9a-3ca1-4109-9275-01592ac72df2', 'Local News', 'local-news'),
('d40265b8-79f7-48ce-b40c-9ab9dc5cd5d1', 'Breaking', 'breaking'),
('98564e56-f933-4243-8e3d-b547a9ea37a6', 'Punjab', 'punjab'),
('f295b308-012b-47f9-bb32-1df01d1ca5cd', 'Cricket', 'cricket'),
('a206e868-45da-4d49-8fed-f40c1c7c9cab', 'Hockey', 'hockey'),
('b8e23c7a-9ab4-4a1f-bef4-1d1c701a5ae4', 'Kabaddi', 'kabaddi'),
('aa41279b-8bb3-4fc2-9b13-4212f18ce4d7', 'Pollywood', 'pollywood'),
('3f755afc-b2de-4d0f-8edf-c5dbbe705923', 'Film', 'film'),
('3f2f0852-6c0c-49e2-a0a8-a923706ae05a', 'Music', 'music'),
('c50e1204-58d1-4f1c-8afe-e4f94e35eb54', 'Awards', 'awards'),
('71265a7a-ab44-46b5-a0c6-e3f5bddde284', 'Markets', 'markets'),
('fae698f9-c302-455a-80e0-f31a435fc613', 'Industry', 'industry'),
('b5ca4858-5830-487b-81e0-9ae2b7038812', 'Religion', 'religion');

INSERT INTO public.articles (id, title, brief, content, image_url, category_id, tag, view_count, comment_count, is_published) VALUES
('7396e956-4d5b-40e1-b521-eec5893a0090', 'High Alert in Amritsar After Intelligence Report; Security
                                    Forces Deploy at Key Border Points', '', '', 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&q=75', '1bc9ec9a-3ca1-4109-9275-01592ac72df2', 'Local News', 100, 10, true),
('02dc0ba4-2c1a-4855-8384-96fcd2481b05', 'PM Modi Calls Emergency Meeting Over Indus Waters Treaty
                                    Dispute; Punjab Delegation Invited', '', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=75', '1bc9ec9a-3ca1-4109-9275-01592ac72df2', 'Local News', 100, 10, true),
('f2ff1ae6-3666-4dc8-ab6f-ee4a07f8c016', 'Punjab''s Textile Export Surges 22% — Ludhiana Hosiery Hub
                                    Leads With ₹3,200 Crore Deals', '', '', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&q=75', '1bc9ec9a-3ca1-4109-9275-01592ac72df2', 'Local News', 100, 10, true),
('89057e63-5c79-4c46-b713-25867a838a0b', 'Stubble Burning Down 67%: Punjab''s Satellite-Monitored
                                    Farming Revolution Shows Real Results for Third Consecutive Season', '', '', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=75', '98564e56-f933-4243-8e3d-b547a9ea37a6', 'Punjab', 100, 10, true),
('9705e3e9-3676-4c0b-ab0c-42c11112ec90', 'Startup Punjab 2026: 847 New Tech Startups Registered in
                                    Mohali This Year as Silicon Valley of North India Vision Takes Shape', '', '', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=75', '83bca33e-fca9-4513-8be9-8e4ae34ce235', 'Business', 100, 10, true),
('8df568c4-10cc-4885-8106-d97671ce0ca4', 'Bhagwant Mann Holds Public Durbar in Sangrur; 4,000
                                    Grievances Filed in Single Day', '', '', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=70', 'c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 100, 10, true),
('609b0fec-5a95-4dbf-85ce-783de9998556', 'Congress Punjab Chief Announces 10-Point Manifesto for 2027
                                    Assembly Polls, Targets Rural Voters', '', '', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70', 'c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 100, 10, true),
('74b911f7-7cd6-4fe4-93d0-dbdf78ebd727', 'SAD Intensifies Protest Against Power Cuts; Calls Hartal in
                                    8 Districts on Friday', '', '', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=70', 'c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 100, 10, true),
('746bcb6e-b2eb-4b16-be87-a8042f05df2b', 'BJP Punjab Launches ''Mission 40'' Strategy to Recapture Lost
                                    Ground Before State Elections', '', '', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=70', 'c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 100, 10, true),
('395b85a9-48bf-4b64-bef8-92cb550dc7bb', 'Shubman Gill Named Punjab''s Pride Award Winner for
                                    Record-Breaking ODI Century Streak This Season', '', '', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=70', 'f295b308-012b-47f9-bb32-1df01d1ca5cd', 'Cricket', 100, 10, true),
('2db6f0d8-8ce7-4741-8256-dafbf8a8d5f2', 'Punjab Hockey Team Sweeps National Championship 7th Time;
                                    Coach Credits Indigenous Training Methods', '', '', 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=70', 'a206e868-45da-4d49-8fed-f40c1c7c9cab', 'Hockey', 100, 10, true),
('7ab7754d-3458-4540-aa6c-ac6e46c600b5', 'Punjab Warriors Crush Haryana Steelers 54-38 in Pro Kabaddi
                                    League — Home Crowd Goes Wild at Patiala Arena', '', '', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=70', 'b8e23c7a-9ab4-4a1f-bef4-1d1c701a5ae4', 'Kabaddi', 100, 10, true),
('c7c9bc18-5d85-4d4b-93b4-e2df908d6522', 'Diljit Dosanjh''s New Album "Waris" Breaks Spotify Records —
                                    40 Million Streams in 24 Hours', '', '', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=70', 'aa41279b-8bb3-4fc2-9b13-4212f18ce4d7', 'Pollywood', 100, 10, true),
('dad64f47-b4a9-41e5-b9d6-62732470894f', 'Punjabi Blockbuster "Sardar" Opens to Record ₹22 Crore
                                    Opening Weekend; Stampede Scenes at Multiplexes', '', '', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=70', '3f755afc-b2de-4d0f-8edf-c5dbbe705923', 'Film', 100, 10, true),
('a8549359-1d3e-48f1-af3b-edbae91d9e14', 'AP Dhillon Performs at Chandigarh Music Festival — 50,000
                                    Fans Attend Despite Unexpected Rain', '', '', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=70', '3f2f0852-6c0c-49e2-a0a8-a923706ae05a', 'Music', 100, 10, true),
('5852c3fd-ec2d-4182-8471-1ea2957cfa10', 'PTC Punjabi Film Awards 2026: Winners List — "Mitti Na Fol"
                                    Sweeps 5 Major Categories', '', '', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=70', 'c50e1204-58d1-4f1c-8afe-e4f94e35eb54', 'Awards', 100, 10, true),
('937d6ee4-6559-4700-a983-0746586782c5', 'Sensex Crosses 85,000 Mark for First Time — Punjab''s
                                    Banking Stocks Lead the Rally', '', '', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=70', '71265a7a-ab44-46b5-a0c6-e3f5bddde284', 'Markets', 100, 10, true),
('44c0be60-64c9-4514-95bb-4f15bba08b92', 'Amazon Opens Largest Distribution Hub in Ludhiana — 3,000
                                    Jobs Created; Punjab Becomes Logistics Capital', '', '', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=70', 'fae698f9-c302-455a-80e0-f31a435fc613', 'Industry', 100, 10, true),
('946198f5-0e75-4f66-a969-bb6dabda5d94', 'MSP for Wheat Raised to ₹2,450/Quintal — Punjab Farmers
                                    React Mixed; Kisan Unions Call It Insufficient', '', '', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=70', 'ced0d666-3616-4476-b235-ea93db4a9217', 'Agriculture', 100, 10, true),
('5718d576-8286-40df-89ec-ab81721b26ae', 'Golden Temple''s New Langar Kitchen to Serve 2 Lakh Pilgrims Daily
                                Using Solar Energy', '', '', 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?w=400&q=80', 'b5ca4858-5830-487b-81e0-9ae2b7038812', 'Religion', 100, 10, true),
('90c88475-a49f-44c9-86a8-0c23068a1d71', 'AAP Government Tables ₹12,000 Crore Budget for Infrastructure in
                                Upcoming Assembly Session', '', '', 'https://images.unsplash.com/photo-1542601906897-ecd20a0c7b21?w=400&q=80', 'c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 100, 10, true),
('2a239d96-f98d-45f8-a7b4-5c83f55e5638', 'Punjab''s New Water Conservation Mission: 4,000 Villages Set to Receive Solar Tube-Wells', 'The initiative aims to save up to 30% of groundwater resources while providing free, renewable energy to farmers across the state. Phase 1 begins next month.', '', 'https://picsum.photos/400/800', 'd40265b8-79f7-48ce-b40c-9ab9dc5cd5d1', 'Breaking', 500, 50, true),
('89bc2798-b058-4374-8fb6-a66f7de77655', 'State Assembly Passes Resolution on Education Reform Funding', '12,000 Crore allocated specifically for rural school infrastructure, digital classrooms, and teacher training programs starting this fiscal year.', '', 'https://picsum.photos/400/800', 'c3c7d69a-77ca-4969-a1b7-2aba93ec5485', 'Politics', 500, 50, true),
('b46ca745-b2e1-4864-af09-e52022424cb9', 'Punjab FC Triumphs in ISL Semifinals with Stunning 90th-Minute Goal', 'The local heroes secure their spot in the finals after a breathtaking finish against the defending champions in front of a sold-out home crowd.', '', 'https://picsum.photos/400/800', 'e80f8fd6-8650-4e87-8099-d53f2708b311', 'Sports', 500, 50, true),
('24bf409d-82a5-4c22-b297-8841570a2985', 'Record Wheat Procurement Expected This Season Across Mandis', 'State procurement agencies have geared up with enhanced logistics and digital payment gateways to ensure seamless transactions for farmers within 48 hours.', '', 'https://picsum.photos/400/800', 'ced0d666-3616-4476-b235-ea93db4a9217', 'Agriculture', 500, 50, true),
('aa97d7dc-d84f-4c6c-937e-aef51785f836', 'Major Tech Hub Proposed for Mohali to Attract Global Investments', 'The proposed IT city expansion is expected to generate over 50,000 direct jobs and solidify Punjab''s position as a premier destination for tech enterprises.', '', 'https://picsum.photos/400/800', '83bca33e-fca9-4513-8be9-8e4ae34ce235', 'Business', 500, 50, true),
('122d8e4f-5c37-48e5-b25f-67f03bd8c96f', 'Amritsar Heritage Walk Initiative Draws Record International Tourist Footfall', 'The newly launched guided tours exploring the rich history and architecture of the walled city have been a massive hit among international travelers.', '', 'https://picsum.photos/400/800', '2bd0c7ff-8a13-463c-8468-3dd7855a8783', 'Culture', 500, 50, true),
('9a22e317-c22b-4c2f-ab0b-2d11f2494af7', 'New Super-Specialty Hospital Inaugurated in Bathinda', 'The 500-bed facility brings advanced cardiac and oncology care to the Malwa region, significantly reducing the need for patients to travel to Chandigarh.', '', 'https://picsum.photos/400/800', '154f49c0-4631-4693-9fbe-5dd5566ce589', 'Health', 500, 50, true),
('3821a61c-2afe-41dc-9147-c4dd26a8229b', 'Delhi-Amritsar-Katra Expressway Progress on Fast Track', 'Construction of the vital economic corridor is ahead of schedule, promising to reduce travel time between major cities and boost regional trade.', '', 'https://picsum.photos/400/800', 'c81dbcdb-0007-4043-970e-2f3ed696dcd6', 'Infrastructure', 500, 50, true);
