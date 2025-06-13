-- Enable Row Level Security on contacts table
ALTER TABLE
    contacts ENABLE ROW LEVEL SECURITY;

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

-- Add status column if it doesn't exist (for tracking contact status)
DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM
        information_schema.columns
    WHERE
        table_name = 'contacts'
        AND column_name = 'status'
) THEN
ALTER TABLE
    contacts
ADD
    COLUMN status VARCHAR(20) DEFAULT 'new';

END IF;

END $ $;