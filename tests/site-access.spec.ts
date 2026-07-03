import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/blog/chinese-as-product-memory",
  "/blog/raynode-standalone-deployment",
  "/blog/homepage-truth-source-audit",
  "/blog/agent-handoff-loop",
  "/blog/evidence-without-precision-theater",
  "/blog/designing-command-surfaces",
  "/blog/homepage-density-case-study",
  "/blog/external-proof-over-portfolio-theater",
  "/blog/anyreader-deep-reading-interface-teardown",
  "/blog/openprofile-as-agentic-profile-infrastructure",
  "/blog/case-study-diff-as-portfolio-format",
  "/blog/interface-is-a-promise",
  "/blog/calm-systems-for-creative-work",
  "/blog/commands-that-respect-attention",
  "/projects",
  "/projects/openprofile-agent-workflow",
  "/projects/anyreader-interface-teardown",
  "/projects/lumen",
  "/projects/studio-knowledge-base",
  "/projects/codex-feishu-bridge",
  "/photos",
  "/music",
  "/knowledge",
  "/knowledge/public-reachable-before-internal-complete",
  "/knowledge/interfaces-are-promises",
  "/knowledge/truth-source-before-polish",
  "/knowledge/deployment-is-product-surface",
  "/knowledge/agent-handoff-contract",
  "/knowledge/evidence-without-precision-theater",
  "/knowledge/external-proof-over-self-reference",
  "/knowledge/project-evidence-minimum-standard",
  "/knowledge/socratic-reading-surfaces",
  "/knowledge/selection-anchors-are-product-state",
  "/knowledge/agent-team-as-product-surface",
  "/knowledge/case-study-diff-format",
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

  test("primary surfaces are reachable from public navigation", async ({ page }) => {
    await page.goto("/");

    const isMobile = (page.viewportSize()?.width ?? 1024) < 800;
    if (isMobile) {
      await page.getByRole("button", { name: "Open navigation" }).click();
    }

    const mainNavigation = page.getByRole("navigation", {
      name: isMobile ? "Mobile primary navigation" : "Main navigation",
    });

    for (const href of ["/blog", "/projects", "/knowledge", "/uses", "/lab", "/about"]) {
      await expect(mainNavigation.locator(`a[href="${href}"]`)).toHaveCount(1);
    }

    await expect(page.locator("#uses")).toBeVisible();
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.getByRole("link", { name: /Open uses/ })).toHaveAttribute("href", "/uses");
    await expect(page.getByRole("link", { name: /Read profile/ })).toHaveAttribute("href", "/about");
  });

  test("home exposes a guided personal OS pulse", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Studio Pulse" })).toBeVisible();
    await expect(page.getByLabel("Studio pulse signal")).toContainText('pulse.live("studio")');
    await expect(page.getByRole("link", { name: /Knowledge Public memory graph/ })).toContainText(
      'studio.pulse("knowledge")',
    );
    await expect(page.getByRole("button", { name: "最近在做什么？" })).toBeVisible();

    await page.getByRole("button", { name: "最近在做什么？" }).click();

    await expect(page.getByTestId("home-ask-response")).toContainText('ask.ray("recent-work")');
    await expect(page.getByTestId("home-ask-response")).toContainText("Personal OS");
    await expect(page.getByTestId("home-ask-response").getByRole("link", { name: /Open route/ })).toHaveAttribute(
      "href",
      "/projects",
    );

    await page.getByTestId("home-copy-ask-response").click();
    await expect(page.getByTestId("command-trace-toast")).toContainText('ask.copy("recent-work")');
  });

  test("ambient cursor field activates only as progressive enhancement", async ({ page }) => {
    await page.goto("/");
    await page.mouse.move(240, 220);

    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.cursor))
      .toBe("active");
  });

  test("lab exposes the personal OS zoo and copyable object commands", async ({ page }) => {
    await page.goto("/lab");

    await expect(page.getByRole("heading", { name: "A living homepage, not a dashboard." })).toBeVisible();
    await expect(page.getByText("StudioPulse")).toBeVisible();
    await expect(page.getByText("AskMeTerminal")).toBeVisible();
    await expect(page.getByText("Flaw ledger", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "推荐一个入口" }).click();
    await expect(page.getByTestId("personal-os-zoo-response")).toContainText('ask.ray("recommend")');

    await expect(page.getByTestId("source-link-lab-selected-global-command-menu")).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/blob/main/src/components/global-command-menu.tsx",
    );
  });

  test("mobile navigation exposes primary and secondary surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/uses");

    await page.getByRole("button", { name: "Open navigation" }).click();

    const mobileNavigation = page.getByRole("navigation", { name: "Mobile primary navigation" });
    await expect(mobileNavigation.getByRole("link", { name: /About/ })).toHaveAttribute("href", "/about");
    await expect(mobileNavigation.getByRole("link", { name: /Lab/ })).toHaveAttribute("href", "/lab");
    await expect(page.getByRole("link", { name: "Collaboration" })).toHaveAttribute(
      "href",
      "/collaboration",
    );
  });

  test("audited pages do not create horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const route of [
      "/",
      "/blog/chinese-as-product-memory",
      "/knowledge/public-reachable-before-internal-complete",
      "/uses",
      "/about",
      "/lab",
      "/collaboration",
    ]) {
      await page.goto(route);
      const width = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));

      expect(width.scroll, route).toBeLessThanOrEqual(width.client + 1);
    }
  });

  test("Chinese pilot content is visible across core surfaces", async ({ page }) => {
    await page.goto("/blog/chinese-as-product-memory");
    await expect(page.getByRole("heading", { name: "把中文作为产品记忆" })).toBeVisible();
    await expect(page.getByText("中文不只是翻译层")).toBeVisible();

    await page.goto("/knowledge");
    await expect(page.getByRole("heading", { name: "公开可达优先于内部完成" })).toBeVisible();

    await page.goto("/uses");
    await expect(page.getByText("中文复盘", { exact: true })).toBeVisible();

    await page.goto("/about");
    await expect(page.getByRole("button", { name: /中文承载判断/ })).toBeVisible();
  });

  test("Phase 25 content assets are publicly reachable", async ({ page }) => {
    await page.goto("/blog/raynode-standalone-deployment");
    await expect(page.getByRole("heading", { name: "RayNode 自托管部署复盘" })).toBeVisible();

    await page.goto("/projects/codex-feishu-bridge");
    await expect(page.getByRole("heading", { name: "Codex Feishu Bridge" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open surface/ })).toHaveAttribute(
      "href",
      "https://scnlb1lk96sb.feishu.cn/wiki/UYrLwuB1AieALIk9VKOcnLzqnwb",
    );

    await page.goto("/knowledge/truth-source-before-polish");
    await expect(page.getByRole("heading", { name: "事实源先于视觉打磨" })).toBeVisible();
  });

  test("Phase 26 external proof network is publicly reachable", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('a[href="/blog/external-proof-over-portfolio-theater"]').first()).toContainText(
      "外部证据比作品集叙事更重要",
    );
    await expect(page.locator('a[href="/projects/openprofile-agent-workflow"]').first()).toContainText(
      "OpenProfile Agent Workflow",
    );

    await page.goto("/projects/openprofile-agent-workflow");
    await expect(page.getByRole("heading", { name: "OpenProfile Agent Workflow" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open surface/ })).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/OpenProfile",
    );
    await expect(page.getByTestId("project-evidence-openprofile-agent-workflow-public-repository")).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/OpenProfile",
    );

    await page.goto("/projects/anyreader-interface-teardown");
    await expect(page.getByRole("heading", { name: "AnyReader Interface Teardown" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open surface/ })).toHaveAttribute(
      "href",
      "https://app.exnju.top",
    );
    await expect(page.getByRole("heading", { name: "The product promise" })).toBeVisible();

    await page.goto("/blog/anyreader-deep-reading-interface-teardown");
    await expect(page.getByRole("heading", { name: "AnyReader 深度阅读界面拆解" })).toBeVisible();

    await page.goto("/knowledge/external-proof-over-self-reference");
    await expect(page.getByRole("heading", { name: "外部证据优先于自指叙事" })).toBeVisible();
    await expect(page.getByLabel("Knowledge trails")).toContainText("OpenProfile Agent Workflow");
  });
});

test.describe("core interaction contracts", () => {
  test("command menu opens real lab route", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("home-command-trigger").click();
    await page.getByTestId("global-command-search").fill("lab");
    await page.getByTestId("command-result-action-lab").click();

    await expect(page).toHaveURL(/\/lab$/);
    await expect(page.getByTestId("command-trace-toast")).toContainText('cmd.open("/lab")');
  });

  test("command menu traps and restores keyboard focus", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByTestId("home-command-trigger");
    await trigger.click();
    await expect(page.getByTestId("global-command-search")).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect
      .poll(() => page.evaluate(() => Boolean(document.activeElement?.id.startsWith("command-result-"))))
      .toBe(true);

    await page.keyboard.press("Tab");
    await expect(page.getByTestId("global-command-search")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
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

  test("source reveal exposes real GitHub source links", async ({ page }) => {
    await page.goto("/knowledge");

    const knowledgeSource = page.getByTestId("source-link-knowledge-filters-before-search");
    await page.locator("#filters-before-search").hover();
    await expect(knowledgeSource).toContainText("source src/data/knowledge.ts");
    await expect(knowledgeSource).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/blob/main/src/data/knowledge.ts",
    );

    await page.goto("/projects");

    const projectSource = page.locator('[data-testid^="source-link-project-"]').first();
    await page.locator(".project-card").first().hover();
    await expect(projectSource).toContainText("source src/content/projects/");
    await expect(projectSource).toHaveAttribute(
      "href",
      /https:\/\/github\.com\/njueeRay\/elegant-developer-studio\/blob\/main\/src\/content\/projects\/.+\.mdx/,
    );

    await page.goto("/lab");

    await expect(page.locator(".lab-component-row").first().locator(".source-reveal")).toContainText(
      "source src/",
    );
    await expect(page.getByTestId("source-link-lab-selected-global-command-menu")).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/blob/main/src/components/global-command-menu.tsx",
    );
  });

  test("knowledge entries expose backlinks to public routes", async ({ page }) => {
    await page.goto("/knowledge");

    const knowledgeCard = page.locator("#interfaces-are-promises");

    await expect(knowledgeCard.locator(".knowledge-backlinks")).toContainText("Backlinks");
    await expect(knowledgeCard.getByRole("link", { name: /The Interface is a Promise/ })).toHaveAttribute(
      "href",
      "/blog/interface-is-a-promise#a-promise-has-shape",
    );
    await expect(knowledgeCard.getByRole("link", { name: "Open detail" })).toHaveAttribute(
      "href",
      "/knowledge/interfaces-are-promises",
    );
  });

  test("knowledge detail pages expose bidirectional public trails", async ({ page }) => {
    await page.goto("/knowledge/public-reachable-before-internal-complete");

    await expect(page.getByRole("heading", { name: "公开可达优先于内部完成" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Knowledge" })).toHaveAttribute(
      "href",
      "/knowledge",
    );
    await expect(page.getByLabel("Knowledge reference object")).toContainText(
      'knowledge.trace("public-reachable-before-internal-complete")',
    );
    await expect(page.getByRole("heading", { name: "What it protects" })).toBeVisible();
    await expect(page.getByText("导航审计")).toBeVisible();
    await expect(page.getByText("PR 说明")).toBeVisible();

    const trails = page.getByLabel("Knowledge trails");

    const relatedWriting = trails.getByLabel("Related writing");
    const projectEvidence = trails.getByLabel("Project evidence");

    await expect(relatedWriting).toContainText("Related writing");
    await expect(relatedWriting.getByRole("link", { name: /把中文作为产品记忆/ })).toHaveAttribute(
      "href",
      "/blog/chinese-as-product-memory",
    );
    await expect(projectEvidence).toContainText("Project evidence");
    await expect(projectEvidence.getByRole("link", { name: /Studio Knowledge Base/ })).toHaveAttribute(
      "href",
      "/projects/studio-knowledge-base",
    );

    await expect(page.getByLabel("Knowledge reference object")).toContainText(
      'knowledge.trace("public-reachable-before-internal-complete")',
    );
    await page.getByTestId("knowledge-detail-copy-ref").click();
    await expect(page.getByTestId("knowledge-detail-copy-ref")).toContainText("Copied ref");
    await expect(page.getByTestId("command-trace-toast")).toContainText(
      'ref.copy("knowledge/public-reachable-before-internal-complete")',
    );
  });

  test("project case studies expose before and after proof", async ({ page }) => {
    await page.goto("/projects/lumen");

    await expect(page.getByRole("heading", { name: "Proof you can inspect" })).toBeVisible();
    await expect(page.getByTestId("project-evidence-lumen-component-source")).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/tree/main/src/components",
    );
    await expect(page.getByTestId("project-evidence-lumen-component-source")).toContainText("source");
    await expect(page.getByTestId("project-evidence-lumen-production-surface")).toHaveAttribute(
      "href",
      "https://raynode.me",
    );
    await expect(page.getByTestId("project-evidence-lumen-production-surface")).toContainText(
      "RayNode",
    );
    await expect(page.getByTestId("project-evidence-lumen-regression-suite")).toContainText(
      "Playwright covers public routes",
    );
    await expect(page.getByTestId("project-evidence-lumen-regression-suite")).toContainText(
      "mobile overflow",
    );
    await expect(page.getByRole("heading", { name: "What changed" })).toBeVisible();
    await expect(page.locator(".case-study-diff-card").first()).toContainText("Before");
    await expect(page.locator(".case-study-diff-card").first()).toContainText("After");
    await expect(page.locator(".case-study-diff-card").first()).toContainText("Proof");
    await expect(page.locator(".case-study-diff")).toContainText("Shared styling now supports");
    await expect(page.locator(".case-study-diff").getByRole("link", { name: "Open evidence" }).first()).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/tree/main/src/app",
    );
  });

  test("reading focus copy emits a command echo", async ({ page }) => {
    await page.goto("/blog/interface-is-a-promise");

    await expect(page.getByTestId("reading-focus-lens")).toBeVisible();
    await page.getByTestId("reading-focus-copy").click();

    await expect(page.getByTestId("reading-focus-copy")).toContainText("Copied ref");
    await expect(page.getByTestId("command-trace-toast")).toContainText("read.copy(");
  });

  test("lab component preview switches modes and exposes source", async ({ page }) => {
    await page.goto("/lab");

    await expect(page.getByTestId("component-preview")).toContainText('lab.preview("global-command-menu")');

    const componentPreview = page.getByTestId("component-preview");

    await componentPreview.getByRole("button", { name: "mobile" }).click();
    await expect(componentPreview.locator(".component-preview-stage")).toHaveAttribute(
      "data-viewport",
      "mobile",
    );

    await page.getByRole("tab", { name: "trace" }).click();
    await expect(page.getByTestId("component-preview")).toContainText("Reusable for");

    await page.getByRole("tab", { name: "source" }).click();
    await expect(page.getByTestId("source-link-lab-preview-global-command-menu")).toHaveAttribute(
      "href",
      "https://github.com/njueeRay/elegant-developer-studio/blob/main/src/components/global-command-menu.tsx",
    );
  });

  test("filters update visible content", async ({ page }) => {
    await page.goto("/blog");

    await page.getByTestId("filter-filter-writing-systems").click();

    await expect(page.getByTestId("filter-filter-writing-systems")).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/\/blog\?tag=Systems$/);
    await expect(page.getByRole("link", { name: /Calm Systems for Creative Work/ })).toBeVisible();
  });

  test("list filters can be opened from URL query", async ({ page }) => {
    await page.goto("/blog?tag=Product+Systems&language=%E4%B8%AD%E6%96%87");

    await expect(page.getByTestId("filter-filter-writing-product-systems")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByTestId("filter-filter-language-4e2d-6587")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("link", { name: /把中文作为产品记忆/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /The Interface is a Promise/ })).toHaveCount(0);

    await page.goto("/projects?stack=GitHub");
    await expect(page.getByTestId("filter-filter-work-github")).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("link", { name: /Studio Knowledge Base/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Lumen Design System/ })).toHaveCount(0);
  });

  test("command menu opens query-backed content views", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("home-command-trigger").click();
    await page.getByTestId("global-command-search").fill("Chinese writing");
    await page.getByTestId("command-result-action-writing-chinese").click();

    await expect(page).toHaveURL(/\/blog\?language=%E4%B8%AD%E6%96%87$/);
    await expect(page.getByTestId("filter-filter-language-4e2d-6587")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByTestId("command-trace-toast")).toContainText(
      'cmd.open("/blog?language=%E4%B8%AD%E6%96%87")',
    );

    await page.keyboard.press(process.platform === "darwin" ? "Meta+K" : "Control+K");
    await page.getByTestId("global-command-search").fill("Decision knowledge");
    await page.getByTestId("command-result-action-knowledge-decisions").click();

    await expect(page).toHaveURL(/\/knowledge\?kind=Decision$/);
    await expect(page.getByTestId("filter-filter-knowledge-decision")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("knowledge filter query survives detail navigation history", async ({ page }) => {
    await page.goto("/knowledge?kind=Decision");

    await expect(page.getByTestId("filter-filter-knowledge-decision")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("heading", { name: "公开可达优先于内部完成" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Interfaces are promises" })).toHaveCount(0);

    await page
      .locator("#public-reachable-before-internal-complete")
      .getByRole("link", { name: "Open detail" })
      .click();
    await expect(page).toHaveURL(/\/knowledge\/public-reachable-before-internal-complete$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/knowledge\?kind=Decision$/);
    await expect(page.getByTestId("filter-filter-knowledge-decision")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("blog language filter reaches Chinese writing", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByLabel("Writing system")).toContainText("中文承载判断");

    await page.getByTestId("filter-filter-language-4e2d-6587").click();

    await expect(page.getByTestId("filter-filter-language-4e2d-6587")).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/language=%E4%B8%AD%E6%96%87/);
    await expect(page.getByRole("link", { name: /把中文作为产品记忆/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /The Interface is a Promise/ })).toHaveCount(0);
  });

  test("article code copy has visible feedback", async ({ page }) => {
    await page.goto("/blog/interface-is-a-promise");

    await page.getByTestId("code-copy").click();

    await expect(page.getByTestId("code-copy")).toContainText("Copied");
  });

  test("article reading focus exposes active section refs", async ({ page }) => {
    await page.goto("/blog/interface-is-a-promise");

    await expect(page.getByTestId("reading-focus-lens")).toBeVisible();
    await expect(page.getByTestId("reading-focus-section")).toContainText("A promise has shape");
    await expect(page.getByTestId("reading-focus-lens")).toContainText(
      'read.focus("a-promise-has-shape")',
    );

    await page.locator("#the-technical-texture").evaluate((element) => {
      element.scrollIntoView({ block: "start" });
    });
    await expect(page.getByTestId("reading-focus-section")).toContainText("The technical texture");

    await page.getByTestId("reading-focus-copy").click();

    await expect(page.getByTestId("reading-focus-copy")).toContainText("Copied ref");
  });

  test("article related reading exposes public trails", async ({ page }) => {
    await page.goto("/blog/chinese-as-product-memory");

    const related = page.getByLabel("Related reading");

    await expect(related).toContainText('read.next("chinese-as-product-memory")');
    await expect(related.getByRole("link", { name: /Calm Systems for Creative Work/ })).toHaveAttribute(
      "href",
      "/blog/calm-systems-for-creative-work",
    );
    await expect(related.getByRole("link", { name: /公开可达优先于内部完成/ })).toHaveAttribute(
      "href",
      "/knowledge/public-reachable-before-internal-complete",
    );
    await expect(related.getByRole("link", { name: /Studio Knowledge Base/ })).toHaveAttribute(
      "href",
      "/projects/studio-knowledge-base",
    );
  });

  test("knowledge reference copy has visible feedback", async ({ page }) => {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/knowledge");

    await page.getByTestId("knowledge-copy-filters-before-search").click();

    await expect(page.getByTestId("knowledge-copy-filters-before-search")).toContainText(
      "Copied Markdown",
    );
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toContain("[Filters before full search](");
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toContain("/knowledge/filters-before-search");
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

  test("lab and command center expose the reading focus component", async ({ page }) => {
    await page.goto("/lab");

    await expect(page.getByRole("button", { name: /ReadingFocusLens/ })).toBeVisible();

    await page.getByTestId("lab-command-trigger").click();
    await page.getByTestId("global-command-search").fill("reading focus");

    await expect(page.getByTestId("command-result-lab-reading-focus-lens")).toBeVisible();
  });

  test("photo lightbox traps and restores keyboard focus", async ({ page }) => {
    await page.goto("/photos");

    const firstPhoto = page.locator(".photo-feature-card").first();
    await firstPhoto.click();

    await expect(page.getByRole("dialog", { name: "Photo viewer" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Close photo viewer" })).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(page.getByRole("button", { name: "Next photo" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Close photo viewer" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect
      .poll(() =>
        page.evaluate(() => Boolean(document.activeElement?.classList.contains("photo-feature-card"))),
      )
      .toBe(true);
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
    expect(config).toContain("https://raynode.me/contact");
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
