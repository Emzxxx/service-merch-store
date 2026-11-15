<script lang="ts">
  import { refreshAll } from '$app/navigation';

  let { data } = $props();
  let { supabase } = $derived(data);

  async function logout() {

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
      return;
    }
    console.error('Logout Successful');
    refreshAll();

  }
</script>

<main>
    <button onclick={logout}>
        Log Out
    </button>
</main>