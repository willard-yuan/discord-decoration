const base = process.env.VITE_BASE_IMAGE_URL || "";

export const generateMeta = (html, { title, description, image }) => {
	// Add title tag and meta tags for social media
	const metaHtml = `
		<meta property="og:description" content="${description}">
		<meta property="og:title" content="${title}">
		<meta property="og:image" content="${image}">
		<meta name="description" content="${description}">
		<meta name="twitter:title" content="${title}">
		<meta name="twitter:description" content="${description}">
		<meta name="twitter:card" content="summary">
		<meta name="twitter:image" content="${image}">
		<title>${title}</title>`;

	return html.replace(/(?<=<head>)/, metaHtml);
};
