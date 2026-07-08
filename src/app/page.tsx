import { StudioHome } from "@/components/studio-home";
import { homeEditorialPolicy } from "@/data/home-editorial";
import { knowledgeEntries } from "@/data/knowledge";
import { getAllPostMeta, getAllProjectMeta } from "@/lib/content";

export default function Home() {
  const posts = getAllPostMeta();
  const projects = getAllProjectMeta();
  const featuredEssay = posts.find(
    (post) => post.slug === homeEditorialPolicy.slots.featuredEssay.postSlug,
  );
  const selectedWork = projects.find(
    (project) => project.slug === homeEditorialPolicy.slots.selectedWork.projectSlug,
  );
  const latestWriting = homeEditorialPolicy.slots.latestWriting.postSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post) => post !== undefined);
  const knowledgeSignal = homeEditorialPolicy.slots.knowledgeSignal.entrySlugs
    .map((slug) => knowledgeEntries.find((entry) => entry.slug === slug))
    .filter((entry) => entry !== undefined)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      href: `/knowledge/${entry.slug}`,
    }));

  if (!featuredEssay || !selectedWork || latestWriting.length === 0) {
    throw new Error("Homepage editorial policy references missing content.");
  }

  return (
    <StudioHome
      featuredEssay={{
        post: featuredEssay,
        ...homeEditorialPolicy.slots.featuredEssay,
      }}
      selectedWork={{
        project: selectedWork,
        ...homeEditorialPolicy.slots.selectedWork,
      }}
      latestWriting={{
        posts: latestWriting,
        ...homeEditorialPolicy.slots.latestWriting,
      }}
      mediaEntry={homeEditorialPolicy.slots.mediaEntry}
      knowledgeSignal={{
        entries: knowledgeSignal,
        ...homeEditorialPolicy.slots.knowledgeSignal,
      }}
    />
  );
}
