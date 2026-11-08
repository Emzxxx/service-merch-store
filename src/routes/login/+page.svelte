<script lang="ts">
    import GoogleLogo from "$lib/assets/google-logo.svg";
</script>

<section class="fixed inset-0 flex items-center justify-center bg-white px-4">
    <div class="w-full max-w-80 bg-white px-8 py-8 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">

        <h1 class="mb-3 text-center text-xl font-normal text-black">
            Log In
        </h1>

        <form method="POST" action="?/google_login">
            <button
                type="submit"
                class="flex h-9 w-full items-center justify-center gap-2 rounded-[10px] border border-gray-500 bg-white text-xs text-black transition-colors hover:bg-gray-100"
            >
                <img
                    src={GoogleLogo}
                    alt="Google Logo"
                    class="h-4 w-4"
                />
                <span>Log in/Sign up with UP Mail</span>
            </button>
        </form>

    </div>
</section>
