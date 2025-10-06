-- Insert sample users
INSERT INTO users (wallet_address, username) VALUES
  ('0x1234567890abcdef1234567890abcdef12345678', 'CryptoWhale'),
  ('0xabcdef1234567890abcdef1234567890abcdef12', 'MemeKing'),
  ('0x9876543210fedcba9876543210fedcba98765432', 'DiamondHands')
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert sample tokens
INSERT INTO tokens (
  contract_address, name, symbol, description, image_url, 
  market_cap, price, volume_24h, price_change_24h, holders_count,
  creator_id
) VALUES
  (
    '0xtoken1234567890abcdef1234567890abcdef1234',
    'Pepe Classic',
    'PEPE',
    'The original meme coin on BSC',
    '/placeholder.svg?height=200&width=200',
    1250000,
    0.000045,
    450000,
    15.5,
    3420,
    (SELECT id FROM users WHERE username = 'CryptoWhale')
  ),
  (
    '0xtoken2345678901bcdef2345678901bcdef234567',
    'Doge Moon',
    'DMOON',
    'To the moon and beyond',
    '/placeholder.svg?height=200&width=200',
    890000,
    0.000032,
    320000,
    -8.2,
    2150,
    (SELECT id FROM users WHERE username = 'MemeKing')
  ),
  (
    '0xtoken3456789012cdef3456789012cdef3456789',
    'Wojak Tears',
    'WOJAK',
    'Feel the pain, gain the gains',
    '/placeholder.svg?height=200&width=200',
    2100000,
    0.000067,
    780000,
    42.3,
    5680,
    (SELECT id FROM users WHERE username = 'DiamondHands')
  ),
  (
    '0xtoken4567890123def4567890123def456789012',
    'Chad Finance',
    'CHAD',
    'Only chads allowed',
    '/placeholder.svg?height=200&width=200',
    560000,
    0.000021,
    180000,
    5.7,
    1890,
    (SELECT id FROM users WHERE username = 'CryptoWhale')
  )
ON CONFLICT (contract_address) DO NOTHING;

-- Insert sample transactions
INSERT INTO transactions (token_id, user_id, transaction_type, amount, price, transaction_hash)
SELECT 
  t.id,
  u.id,
  'buy',
  1000,
  t.price,
  '0xtx' || gen_random_uuid()::text
FROM tokens t
CROSS JOIN users u
LIMIT 10;
