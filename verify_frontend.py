import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            record_video_dir="videos/",
            viewport={"width": 1280, "height": 800}
        )
        page = await context.new_page()

        await page.goto("http://localhost:5173")
        await page.wait_for_load_state('networkidle')

        await page.screenshot(path="screenshot.png", full_page=True)

        await context.close()
        await browser.close()

asyncio.run(run())
