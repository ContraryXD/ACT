-- Enable Row Level Security on contacts table
ALTER TABLE
    contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public contact submissions" ON contacts;

DROP POLICY IF EXISTS "Allow admin to read contacts" ON contacts;

DROP POLICY IF EXISTS "Allow admin to update contacts" ON contacts;

-- Allow anonymous users to insert contact form submissions
CREATE POLICY "Allow public contact submissions" ON contacts FOR
INSERT
    TO anon WITH CHECK (true);

-- Allow authenticated users (admins) to read all contacts
CREATE POLICY "Allow admin to read contacts" ON contacts FOR
SELECT
    TO authenticated USING (true);

-- Allow authenticated users (admins) to update contact status
CREATE POLICY "Allow admin to update contacts" ON contacts FOR
UPDATE
    TO authenticated USING (true);