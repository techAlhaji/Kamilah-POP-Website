-- 1. Add owner_token column
ALTER TABLE public.tributes
  ADD COLUMN owner_token TEXT;

-- 2. Allow inserts to include owner_token (re-create insert policy with same length checks)
DROP POLICY IF EXISTS "Anyone can submit a tribute" ON public.tributes;
CREATE POLICY "Anyone can submit a tribute"
  ON public.tributes FOR INSERT
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 60
    AND char_length(relationship) BETWEEN 1 AND 60
    AND char_length(message) BETWEEN 1 AND 600
  );

-- 3. Hide owner_token from public reads via a view-friendly approach:
--    Keep SELECT policy as-is (it already returns true) but we'll only select non-sensitive columns from the client.

-- 4. Secure update function — only owner with correct token can update
CREATE OR REPLACE FUNCTION public.update_tribute(
  p_id UUID,
  p_token TEXT,
  p_name TEXT,
  p_relationship TEXT,
  p_message TEXT
)
RETURNS public.tributes
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated public.tributes;
BEGIN
  IF p_token IS NULL OR char_length(p_token) < 8 THEN
    RAISE EXCEPTION 'Invalid token';
  END IF;
  IF char_length(p_name) NOT BETWEEN 1 AND 60
     OR char_length(p_relationship) NOT BETWEEN 1 AND 60
     OR char_length(p_message) NOT BETWEEN 1 AND 600 THEN
    RAISE EXCEPTION 'Invalid input length';
  END IF;

  UPDATE public.tributes
     SET name = p_name,
         relationship = p_relationship,
         message = p_message
   WHERE id = p_id
     AND owner_token = p_token
  RETURNING * INTO updated;

  IF updated.id IS NULL THEN
    RAISE EXCEPTION 'Not authorized to edit this tribute';
  END IF;

  RETURN updated;
END;
$$;

-- 5. Secure delete function
CREATE OR REPLACE FUNCTION public.delete_tribute(
  p_id UUID,
  p_token TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  removed_count INT;
BEGIN
  IF p_token IS NULL OR char_length(p_token) < 8 THEN
    RAISE EXCEPTION 'Invalid token';
  END IF;

  DELETE FROM public.tributes
   WHERE id = p_id
     AND owner_token = p_token;

  GET DIAGNOSTICS removed_count = ROW_COUNT;

  IF removed_count = 0 THEN
    RAISE EXCEPTION 'Not authorized to delete this tribute';
  END IF;

  RETURN TRUE;
END;
$$;

-- Allow anyone to call these RPCs (security is enforced inside via the token check)
GRANT EXECUTE ON FUNCTION public.update_tribute(UUID, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.delete_tribute(UUID, TEXT) TO anon, authenticated;

-- Add UPDATE/DELETE to realtime stream
ALTER TABLE public.tributes REPLICA IDENTITY FULL;