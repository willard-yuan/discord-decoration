import { ARTICLES } from '@/seo/articles.js';
import { SITE_NAME } from '@/seo/schema.js';

export default function ArticleByline({ route }) {
  const dates = ARTICLES[route];
  return (
    <p className="mx-auto max-w-4xl px-4 py-4 text-sm text-text-secondary">
      By <a href="/about-us/" className="underline">{SITE_NAME}</a>
      {' · Published '}<time dateTime={dates.datePublished}>{dates.datePublished}</time>
      {dates.dateModified !== dates.datePublished && <>{' · Updated '}<time dateTime={dates.dateModified}>{dates.dateModified}</time></>}
    </p>
  );
}
