CREATE TABLE public.tributes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tributes"
  ON public.tributes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit a tribute"
  ON public.tributes FOR INSERT
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 60
    AND char_length(relationship) BETWEEN 1 AND 60
    AND char_length(message) BETWEEN 1 AND 600
  );

CREATE INDEX tributes_created_at_idx ON public.tributes (created_at DESC);

ALTER PUBLICATION supabase_realtime ADD TABLE public.tributes;