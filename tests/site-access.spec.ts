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
