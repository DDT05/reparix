/*
  # Fix Reparix table RLS policy for anonymous email insertions

  1. Security Changes
    - Drop existing restrictive INSERT policy that blocks anonymous users
    - Create new INSERT policy allowing anonymous (anon) role to insert emails
    - Maintain existing SELECT policy for authenticated users
    - Keep RLS enabled for security

  This resolves the "new row violates row-level security policy" error
  by allowing public email subscription form submissions.
*/

-- Drop the existing INSERT policy that's blocking anonymous users
DROP POLICY IF EXISTS "Allow anonymous email insertion" ON public."Reparix";

-- Create a new INSERT policy that allows anonymous users to insert emails
CREATE POLICY "Allow public email insertion"
  ON public."Reparix"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure the SELECT policy exists for authenticated users (keep existing if present)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'Reparix' 
    AND policyname = 'Allow authenticated users to read emails'
  ) THEN
    CREATE POLICY "Allow authenticated users to read emails"
      ON public."Reparix"
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;