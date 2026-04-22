<script lang="ts">
	let { images, selectedImage, onSelect } = $props<{
		images: string[];
		selectedImage: string;
		onSelect: (image: string) => void;
	}>();
</script>

<div class="gallery">
	{#each images as image, index (`${image}-${index}`)}
		<button
			type="button"
			class:selected={image === selectedImage}
			class="thumb"
			onclick={() => onSelect(image)}
			aria-label={`Select product image ${index + 1}`}
		>
			<img src={image} alt={`Product thumbnail ${index + 1}`} />
		</button>
	{/each}
</div>

<style>
	.gallery {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.thumb {
		padding: 0;
		border: 2px solid transparent;
		border-radius: 0.5rem;
		overflow: hidden;
		background: #f3f4f6;
		cursor: pointer;
		width: 8.5rem;
		height: 8.5rem;
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.thumb.selected {
		border-color: #38bdf8;
	}

	@media (max-width: 900px) {
		.gallery {
			flex-direction: row;
			flex-wrap: wrap;
		}

		.thumb {
			width: 6rem;
			height: 6rem;
		}
	}
</style>
