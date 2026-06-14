import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/blog/interface-is-a-promise",
  "/blog/calm-systems-for-creative-work",
  "/blog/commands-that-respect-attention",
  "/projects",
  "/projects/lumen",
  "/projects/studio-knowledge-base",
  "/photos",
  "/music",
  "/knowledge",
  "/uses",
  "/about",
  "/collaboration",
  "/contact",
  "/lab",
  "/rss.xml",
  "/sitemap.xml",
  "/robots.txt",
];

test.describe("public routes and links", () => {
  for (const route of routes) {
    test(`serves ${route}`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.status(), route).toBeLessThan(400);
    });
  }

  test("home page does not expose placeholder links", async ({ page }) => {
    await page.goto("/");

    const links = await page.locator("a").evaluateAll((anchors) =>
      anchors.map((anchor) => ({
        text: anchor.textContent?.replace(/\s+/g, " ").trim(),
        href: anchor.getAttribute("href"),
      })),
    );

    expect(links).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "#" }),
        expect.objectContaining({ href: "https://github.com/" }),
        expect.objectContaining({ href: "https://x.com/" }),
        expect.objectContaining({ href: "https://linkedin.com/" }),
        expect.objectContaining({ href: "mailto:hello@ray.studio" }),
      ]),
    );

    await expect(page.locator("#media")).toBeVisible();
    await expect(page.getByRole("link", { name: "Ray Studio home" })).toHaveAttribute("href", "/");
  });
});

test.describe("core interaction contracts", () => {
  test("command menu opens real lab route", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("home-command-trigger").click();
    await page.getByTestId("global-command-search").fill("lab");
    await page.getByTestId("command-result-action-lab").click();

    await expect(page).toHaveURL(/\/lab$/);
  });

  test("contact entry points resolve to the contact route", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Contact" }).first().click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole("heading", { name: "Contact", exact: true })).toBeVisible();

    await page.getByTestId("contact-command-trigger").click();
    await page.getByTestId("global-command-search").fill("contact");
    await page.getByTestId("command-result-action-contact").click();

    await expect(page).toHaveURL(/\/contact$/);
  });

  test("contact route exposes real discussion links and copy feedback", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByRole("link", { name: /Open a structured issue/ })).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/issues/new?template=contact.yml",
    );
    await expect(page.getByRole("link", { name: /Inspect the repository/ })).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio",
    );
    await expect(page.getByRole("link", { name: /Read collaboration guide/ })).toHaveAttribute(
      "href",
      "/collaboration",
    );

    await page.getByTestId("contact-copy-brief").click();

    await expect(page.getByTestId("contact-copy-brief")).toContainText("Copied");
  });

  test("collaboration route exposes governance and creative backlog", async ({ page }) => {
    await page.goto("/collaboration");

    await expect(page.getByRole("heading", { name: "Collaboration", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open structured issue/ })).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/issues/new?template=contact.yml",
    );
    await expect(page.getByRole("heading", { name: "Command Trace" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Studio Companion" })).toBeVisible();

    await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
    await page.getByTestId("global-command-search").fill("source hover");

    await expect(page.getByTestId("command-result-creative-source-hover")).toBeVisible();
  });

  test("filters update visible content", async ({ page }) => {
    await page.goto("/blog");

    await page.getByTestId("filter-filter-writing-systems").click();

    await expect(page.getByTestId("filter-filter-writing-systems")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("link", { name: /Calm Systems for Creative Work/ })).toBeVisible();
  });

  test("article code copy has visible feedback", async ({ page }) => {
    await page.goto("/blog/interface-is-a-promise");

    await page.getByTestId("code-copy").click();

    await expect(page.getByTestId("code-copy")).toContainText("Copied");
  });

  test("knowledge reference copy has visible feedback", async ({ page }) => {
    await page.goto("/knowledge");

    await page.getByTestId("knowledge-copy-filters-before-search").click();

    await expect(page.getByTestId("knowledge-copy-filters-before-search")).toContainText("Copied");
  });

  test("uses stack copy has visible feedback", async ({ page }) => {
    await page.goto("/uses");

    await page.getByTestId("uses-copy-stack").click();

    await expect(page.getByTestId("uses-copy-stack")).toContainText("Copied");
  });

  test("about intro copy has visible feedback", async ({ page }) => {
    await page.goto("/about");

    await page.getByTestId("about-copy-intro").click();

    await expect(page.getByTestId("about-copy-intro")).toContainText("Copied");
  });

  test("lab import copy has visible feedback", async ({ page }) => {
    await page.goto("/lab");

    await page.getByTestId("lab-copy-import").click();

    await expect(page.getByTestId("lab-copy-import")).toContainText("Copied import");
  });

  test("music controls update the active track", async ({ page }) => {
    await page.goto("/music");

    await page.getByRole("button", { name: "Play track" }).click();
    await page.getByRole("button", { name: "Next track" }).click();

    await expect(page.getByRole("button", { name: "Pause track" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Quiet refactor/ })).toHaveClass(/active/);
  });
});

test.describe("repository collaboration contracts", () => {
  test("issue templates preserve the public collaboration intake", async () => {
    const contactTemplate = readFileSync(".github/ISSUE_TEMPLATE/contact.yml", "utf8");
    const bugTemplate = readFileSync(".github/ISSUE_TEMPLATE/bug_report.yml", "utf8");
    const featureTemplate = readFileSync(".github/ISSUE_TEMPLATE/feature_request.yml", "utf8");
    const config = readFileSync(".github/ISSUE_TEMPLATE/config.yml", "utf8");

    expect(contactTemplate).toContain("Studio collaboration or project discussion");
    expect(contactTemplate).toContain("Context");
    expect(contactTemplate).toContain("Goal");
    expect(contactTemplate).toContain("Surface");
    expect(contactTemplate).toContain("Public thread agreement");
    expect(bugTemplate).toContain("Steps to reproduce");
    expect(featureTemplate).toContain("Proposed first slice");
    expect(config).toContain("blank_issues_enabled: false");
    expect(config).toContain("https://elegant-developer-studio.vercel.app/contact");
  });

  test("community governance files describe contribution and review flow", async () => {
    const contributing = readFileSync("CONTRIBUTING.md", "utf8");
    const pullRequestTemplate = readFileSync(".github/PULL_REQUEST_TEMPLATE.md", "utf8");

    expect(contributing).toContain("首选语言");
    expect(contributing).toContain("贡献入口");
    expect(contributing).toContain("创意变更");
    expect(pullRequestTemplate).toContain("变更类型");
    expect(pullRequestTemplate).toContain("验证");
  });
});
