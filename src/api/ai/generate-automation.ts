import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Selenium WebDriver (Java) template
const generateSeleniumJava = (testCase: any, projectName: string) => {
  return `import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test {
    private WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }
    
    @Test
    public void test${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}() {
        // Test: ${testCase.title}
        // Description: ${testCase.description}
        
        ${testCase.test_steps ? testCase.test_steps.map((step: string, idx: number) => `
        // Step ${idx + 1}: ${step}
        // TODO: Implement step ${idx + 1}
        `).join('\n') : '// No test steps provided'}
        
        ${testCase.expected_results ? testCase.expected_results.map((result: string, idx: number) => `
        // Verify: ${result}
        // Assert.assertTrue(condition, "${result}");
        `).join('\n') : ''}
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;
};

// Cypress (JavaScript/TypeScript) template
const generateCypress = (testCase: any, projectName: string) => {
  return `/// <reference types="cypress" />

describe('${testCase.title}', () => {
  beforeEach(() => {
    cy.visit('/'); // Update with your app URL
  });

  it('${testCase.description}', () => {
    // Test: ${testCase.title}
    
    ${testCase.test_steps ? testCase.test_steps.map((step: string, idx: number) => `
    // Step ${idx + 1}: ${step}
    // TODO: Implement step ${idx + 1}
    `).join('\n') : '// No test steps provided'}
    
    ${testCase.expected_results ? testCase.expected_results.map((result: string) => `
    // Verify: ${result}
    // cy.get('selector').should('be.visible');
    `).join('\n') : ''}
  });
});`;
};

// Playwright (TypeScript) template
const generatePlaywright = (testCase: any, projectName: string) => {
  return `import { test, expect } from '@playwright/test';

test.describe('${testCase.title}', () => {
  test('${testCase.description}', async ({ page }) => {
    // Navigate to application
    await page.goto('https://your-app-url.com');
    
    ${testCase.preconditions ? testCase.preconditions.map((pre: string) => `
    // Precondition: ${pre}
    `).join('\n') : ''}
    
    ${testCase.test_steps ? testCase.test_steps.map((step: string, idx: number) => `
    // Step ${idx + 1}: ${step}
    // TODO: Implement step ${idx + 1}
    // await page.click('selector');
    // await page.fill('selector', 'text');
    `).join('\n') : '// No test steps provided'}
    
    ${testCase.expected_results ? testCase.expected_results.map((result: string) => `
    // Verify: ${result}
    // await expect(page.locator('selector')).toBeVisible();
    `).join('\n') : ''}
  });
});`;
};

// Appium (Java) template for mobile
const generateAppiumJava = (testCase: any, projectName: string) => {
  return `import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.net.URL;

public class ${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test {
    private AppiumDriver<MobileElement> driver;
    
    @BeforeMethod
    public void setUp() throws Exception {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "Android");
        caps.setCapability("deviceName", "Android Emulator");
        caps.setCapability("app", "/path/to/your/app.apk");
        
        driver = new AndroidDriver<>(new URL("http://localhost:4723/wd/hub"), caps);
    }
    
    @Test
    public void test${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}() {
        // Test: ${testCase.title}
        // Description: ${testCase.description}
        
        ${testCase.test_steps ? testCase.test_steps.map((step: string, idx: number) => `
        // Step ${idx + 1}: ${step}
        // TODO: Implement step ${idx + 1}
        // MobileElement element = driver.findElementById("elementId");
        // element.click();
        `).join('\n') : '// No test steps provided'}
        
        ${testCase.expected_results ? testCase.expected_results.map((result: string) => `
        // Verify: ${result}
        // Assert.assertTrue(condition, "${result}");
        `).join('\n') : ''}
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;
};

// REST Assured (Java) for API testing
const generateRestAssured = (testCase: any, projectName: string) => {
  return `import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class ${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test {
    
    @BeforeClass
    public void setUp() {
        RestAssured.baseURI = "https://api.your-app.com";
    }
    
    @Test
    public void test${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}() {
        // Test: ${testCase.title}
        // Description: ${testCase.description}
        
        ${testCase.test_steps ? testCase.test_steps.map((step: string, idx: number) => `
        // Step ${idx + 1}: ${step}
        // Response response = given()
        //     .header("Content-Type", "application/json")
        //     .body("{ \\"key\\": \\"value\\" }")
        //     .when()
        //     .post("/endpoint")
        //     .then()
        //     .statusCode(200)
        //     .extract().response();
        `).join('\n') : '// No test steps provided'}
        
        ${testCase.expected_results ? testCase.expected_results.map((result: string) => `
        // Verify: ${result}
        // Assert.assertEquals(response.jsonPath().getString("field"), "expected");
        `).join('\n') : ''}
    }
}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { projectId, userId, framework } = req.body;

    if (!projectId || !userId || !framework) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify user owns the project
    const { data: project, error: projectError } = await supabase
      .from("ai_test_projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", userId)
      .single();

    if (projectError || !project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Get all test cases for the project
    const { data: testCases, error: casesError } = await supabase
      .from("ai_test_cases")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (casesError) {
      throw casesError;
    }

    if (!testCases || testCases.length === 0) {
      return res.status(400).json({ error: "No test cases found. Please generate test cases first." });
    }

    // Generate automation scripts for each test case
    const scripts: any[] = [];

    for (const testCase of testCases) {
      let scriptContent = "";
      let language = "";
      let fileName = "";

      switch (framework) {
        case "selenium-java":
          scriptContent = generateSeleniumJava(testCase, project.name);
          language = "java";
          fileName = `${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test.java`;
          break;

        case "cypress":
          scriptContent = generateCypress(testCase, project.name);
          language = "javascript";
          fileName = `${testCase.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.cy.js`;
          break;

        case "playwright":
          scriptContent = generatePlaywright(testCase, project.name);
          language = "typescript";
          fileName = `${testCase.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.spec.ts`;
          break;

        case "appium-java":
          scriptContent = generateAppiumJava(testCase, project.name);
          language = "java";
          fileName = `${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test.java`;
          break;

        case "rest-assured":
          scriptContent = generateRestAssured(testCase, project.name);
          language = "java";
          fileName = `${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test.java`;
          break;

        default:
          scriptContent = generateSeleniumJava(testCase, project.name);
          language = "java";
          fileName = `${testCase.title.replace(/[^a-zA-Z0-9]/g, '')}Test.java`;
      }

      // Save script to database
      const { data: script, error: scriptError } = await supabase
        .from("ai_test_automation_scripts")
        .insert({
          project_id: projectId,
          test_case_id: testCase.id,
          framework,
          language,
          script_content: scriptContent,
          file_name: fileName
        })
        .select()
        .single();

      if (scriptError) {
        console.error("Error saving script:", scriptError);
        continue;
      }

      scripts.push(script);
    }

    // Update project metadata
    await supabase
      .from("ai_test_projects")
      .update({
        metadata: {
          ...project.metadata,
          automation_framework: framework,
          scripts_generated: true,
          scripts_count: scripts.length
        }
      })
      .eq("id", projectId);

    return res.status(200).json({
      success: true,
      scriptsGenerated: scripts.length,
      framework,
      scripts
    });

  } catch (error: any) {
    console.error("Error generating automation scripts:", error);
    return res.status(500).json({ error: error.message || "Failed to generate automation scripts" });
  }
}