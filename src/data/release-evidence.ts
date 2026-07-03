export type ReleaseEvidence = {
  schemaVersion: 1;
  channel: "raynode";
  siteUrl: string;
  previewUrl: string;
  repositoryUrl: string;
  commitSha: string;
  fullCommitSha: string;
  branch: string;
  builtAt: string;
  generatedAt: string;
  package: {
    name: string;
    version: string;
  };
  runtime: {
    framework: string;
    server: string;
    reverseProxy: string;
    processManager: string;
    service: string;
    runtimePath: string;
  };
  contentCounts: {
    posts: number;
    projects: number;
    knowledge: number;
  };
  routesCount: number;
  publicRoutes: string[];
  qualityGates: Array<{
    id: string;
    command: string;
    status: "pending" | "passed" | "manual";
    required: boolean;
  }>;
};

export const releaseEvidencePath = "/release-evidence.json";
