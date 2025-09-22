-- Drop ONLY the trigger that sets owner on units.
-- Keep the shared function set_owner_id() because other tables depend on it.
drop trigger if exists trg_set_owner_units on public.units;

-- Keep the updated_at trigger/function:
--   trg_units_updated_at / set_updated_at

-- Do not drop public.set_owner_id(); many other tables still reference it.
