"""Browser acceptance checks: run against a running Vite server with Python Playwright."""
from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(locale="es-AR")
    page.goto("http://127.0.0.1:5173/", wait_until="networkidle")
    page.evaluate("localStorage.clear()")
    page.reload(wait_until="networkidle")
    assert page.locator("html").get_attribute("data-theme") == "dark"
    page.get_by_role("button", name="Cambiar tema de color").click()
    assert page.locator("html").get_attribute("data-theme") == "light"
    page.reload(wait_until="networkidle")
    assert page.locator("html").get_attribute("data-theme") == "light"
    page.get_by_role("button", name="EN", exact=True).click()
    assert page.locator("html").get_attribute("lang") == "en"
    assert page.get_by_role("heading", name="Architecture & systems").is_visible()
    page.get_by_role("button", name="DoubleLink", exact=False).click()
    assert page.locator(".inspector h3").inner_text() == "DoubleLink"
    assert page.locator(".schematic svg").is_visible()
    page.get_by_role("button", name="Certifications", exact=True).click()
    assert page.locator("#certificados").is_visible()
    page.get_by_role("button", name="ES", exact=True).click()
    assert page.locator("html").get_attribute("lang") == "es"
    browser.close()
