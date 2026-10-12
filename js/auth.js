/* Supabase auth wiring for the Reserve login/signup gate.
   ONE-TIME SETUP: create a free project at https://supabase.com, then paste its
   Project URL and anon/public key (Settings > API) below. Until filled in,
   LPOS_AUTH.getClient() returns null and the reserve dialog shows "not ready". */
(function () {
  const SUPABASE_URL = "";
  const SUPABASE_ANON_KEY = "";
  let client = null;
  function getClient() {
    if (client) return client;
    if (!window.supabase || !SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return client;
  }
  async function getSession() {
    const c = getClient();
    if (!c) return null;
    const { data } = await c.auth.getSession();
    return data.session;
  }
  async function signUp(email, password) {
    const c = getClient();
    if (!c) throw new Error("auth_not_configured");
    return c.auth.signUp({ email, password });
  }
  async function signIn(email, password) {
    const c = getClient();
    if (!c) throw new Error("auth_not_configured");
    return c.auth.signInWithPassword({ email, password });
  }
  async function signOut() {
    const c = getClient();
    if (c) await c.auth.signOut();
  }
  window.LPOS_AUTH = { getClient, getSession, signUp, signIn, signOut };
})();
