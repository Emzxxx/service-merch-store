<script lang="ts">
	let { image, description } = $props<{
		image: string;
		description: string;
	}>();
</script>

<section class="main-display">
	<img src={image} alt="Selected product" class="hero" />
	<div class="description">
		<h2>Description</h2>
		<p>{description}</p>
	</div>
</section>

<style>
	.main-display {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.hero {
		width: 100%;
		max-width: 33rem;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		background: #f3f4f6;
		border-radius: 0.75rem;
	}

	.description h2 {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
	}

	.description p {
		margin: 0.5rem 0 0;
		color: #4b5563;
		line-height: 1.4;
	}
</style>
