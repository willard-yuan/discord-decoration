import { useI18n } from '@/i18n/index.jsx';
import { avatarsData } from '@/data/avatars.js';
import { decorationsData } from '@/data/decorations.js';

const decorationCount = decorationsData.reduce((total, group) =>
  total + group.data.reduce((sum, category) => sum + category.i.length, 0), 0);

export default function ToolFacts() {
  const { lang } = useI18n();
  if (lang !== 'en') return null;
  return (
    <section aria-labelledby="tool-facts" className="mx-auto max-w-4xl px-6 py-10 text-text-secondary" lang="en">
      <h2 id="tool-facts" className="text-2xl font-bold text-text-primary mb-4">What does this avatar tool create?</h2>
      <p>Discord Decoration combines an avatar and a decorative frame into an image you can save.
        It does not add items to your Discord account or unlock native decorations or Nitro features.</p>
      <ul className="list-disc pl-6 my-4 space-y-2">
        <li>{avatarsData.length} avatar presets and {decorationCount} decoration entries in this version’s catalog.</li>
        <li>Image uploads accept 4 formats: PNG, JPEG, GIF and WebP.</li>
        <li>Save the composed avatar as an animated GIF, or use the GIF frame extractor when you need a still image.</li>
      </ul>
      <p>Counts come from the <a className="text-primary underline" href="https://github.com/willard-yuan/discord-decoration/tree/main/src/data">project catalog</a> and update with it.</p>
      <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">How is this different from Discord’s native decorations?</h3>
      <blockquote className="border-l-2 border-primary pl-4 my-3">
        “Avatar Decorations can be found and purchased in the Shop.”
        <cite className="block mt-2 not-italic">— <a className="text-primary underline" href="https://support.discord.com/hc/en-us/articles/13410113109911-Avatar-Decorations-FAQ">Discord Support, Avatar Decorations FAQ</a></cite>
      </blockquote>
      <p>That documentation explains native account decorations. This site provides image composition instead.
        For project details or corrections, visit <a className="text-primary underline" href="/about-us">About</a> or <a className="text-primary underline" href="/contact-support">Contact</a>.</p>
    </section>
  );
}
