import { knowledgeEntries } from "@/data/knowledge";
import { getCommandItems } from "@/lib/command-index";
import { getAllPostMeta, getAllProjectMeta } from "@/lib/content";

const POST_REVIEW_TRIGGER = 15;
const KNOWLEDGE_REVIEW_TRIGGER = 25;

export type ContentScaleStatus = {
  posts: number;
  projects: number;
  knowledge: number;
  commandItems: number;
  featuredPosts: number;
  externalProofPosts: number;
  nextPostTriggersReview: boolean;
  postReviewTrigger: number;
  knowledgeReviewTrigger: number;
};

export function getContentScaleStatus(): ContentScaleStatus {
  const posts = getAllPostMeta();
  const projects = getAllProjectMeta();
  const commandItems = getCommandItems();

  return {
    posts: posts.length,
    projects: projects.length,
    knowledge: knowledgeEntries.length,
    commandItems: commandItems.length,
    featuredPosts: posts.filter((post) => post.featured).length,
    externalProofPosts: posts.filter((post) => post.tags.includes("External proof")).length,
    nextPostTriggersReview: posts.length >= POST_REVIEW_TRIGGER,
    postReviewTrigger: POST_REVIEW_TRIGGER,
    knowledgeReviewTrigger: KNOWLEDGE_REVIEW_TRIGGER,
  };
}
