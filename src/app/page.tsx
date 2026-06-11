import { StudioHome } from "@/components/studio-home";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/content";

export default function Home() {
  return (
    <StudioHome
      featuredPosts={getFeaturedPosts(2)}
      featuredProjects={getFeaturedProjects(1)}
    />
  );
}
