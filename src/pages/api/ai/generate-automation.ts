import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { projectId, userId, framework } = req.body;

    if (!projectId || !userId || !framework) {
      return res.status(400).json({ error: "Project ID, User ID, and framework are required" });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get test cases for this project
    const { data: testCases, error: testCasesError } = await supabase
      .from("ai_test_cases")
      .select("*")
      .eq("project_id", projectId)
      .limit(5); // Generate for first 5 test cases

    if (testCasesError || !testCases || testCases.length === 0) {
      return res.status(404).json({ error: "No test cases found for this project" });
    }

    let scriptsGenerated = 0;

    // Generate automation script for each test case
    for (const testCase of testCases) {
      const scriptContent = generateScript(testCase, framework);
      const fileName = generateFileName(testCase, framework);
      const language = getLanguage(framework);

      const { error } = await supabase
        .from("ai_test_scripts")
        .insert({
          project_id: projectId,
          test_case_id: testCase.id,
          framework: framework,
          language: language,
          file_name: fileName,
          script_content: scriptContent
        });

      if (!error) scriptsGenerated++;
    }

    return res.status(200).json({
      success: true,
      scriptsGenerated,
      framework,
      message: "Automation scripts generated successfully"
    });
  } catch (error: any) {
    console.error("Error generating automation:", error);
    return res.status(500).json({ error: error.message || "Failed to generate automation scripts" });
  }
}

function getLanguage(framework: string): string {
  const languageMap: { [key: string]: string } = {
    "selenium-java": "java",
    "cypress": "javascript",
    "playwright": "typescript",
    "appium-java": "java",
    "rest-assured": "java"
  };
  return languageMap[framework] || "java";
}

function generateFileName(testCase: any, framework: string): string {
  const safeName = testCase.title
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const extensions: { [key: string]: string } = {
    "selenium-java": ".java",
    "cypress": ".cy.js",
    "playwright": ".spec.ts",
    "appium-java": ".java",
    "rest-assured": ".java"
  };

  return safeName + (extensions[framework] || ".java");
}

function generateScript(testCase: any, framework: string): string {
  switch (framework) {
    case "selenium-java":
      return generateSeleniumJavaScript(testCase);
    case "cypress":
      return generateCypressScript(testCase);
    case "playwright":
      return generatePlaywrightScript(testCase);
    case "appium-java":
      return generateAppiumScript(testCase);
    case "rest-assured":
      return generateRestAssuredScript(testCase);
    default:
      return generateSeleniumJavaScript(testCase);
  }
}

function generateSeleniumJavaScript(testCase: any): string {
  const testSteps = Array.isArray(testCase.test_steps) ? testCase.test_steps : [];
  const expectedResults = Array.isArray(testCase.expected_results) ? testCase.expected_results : [];

  return `import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

/**
 * ${testCase.title}
 * ${testCase.description}
 * Priority: ${testCase.priority}
 */
public class ${testCase.title.replace(/[^a-zA-Z0-9]/g, "_")}Test {
    
    private WebDriver driver;
    private WebDriverWait wait;
    
    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    @Test
    @DisplayName("${testCase.title}")
    public void ${testCase.title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}() {
        // Test Steps:
${testSteps.map((step: string, idx: number) => `        // Step ${idx + 1}: ${step}`).join("\n")}
        
        driver.get("https://your-application-url.com");
        
${testSteps.map((step: string, idx: number) => {
  const action = generateSeleniumAction(step, idx);
  return `        // ${step}\n${action}`;
}).join("\n\n")}
        
        // Verify Expected Results:
${expectedResults.map((result: string, idx: number) => `        // ${idx + 1}. ${result}\n        // Add assertion here`).join("\n")}
    }
    
    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
    
    // Helper method to wait for element
    private WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
}`;
}

function generateSeleniumAction(step: string, index: number): string {
  const lowerStep = step.toLowerCase();
  
  if (lowerStep.includes("navigate") || lowerStep.includes("go to")) {
    return `        driver.get("https://your-application-url.com/path");`;
  } else if (lowerStep.includes("click")) {
    return `        WebElement element${index} = waitForElement(By.id("elementId"));
        element${index}.click();`;
  } else if (lowerStep.includes("enter") || lowerStep.includes("type") || lowerStep.includes("input")) {
    return `        WebElement inputField${index} = waitForElement(By.id("inputId"));
        inputField${index}.sendKeys("test data");`;
  } else if (lowerStep.includes("select")) {
    return `        WebElement selectElement${index} = waitForElement(By.id("selectId"));
        selectElement${index}.click();`;
  } else if (lowerStep.includes("verify") || lowerStep.includes("check")) {
    return `        WebElement verifyElement${index} = waitForElement(By.id("elementId"));
        Assertions.assertTrue(verifyElement${index}.isDisplayed());`;
  } else {
    return `        // TODO: Implement step: ${step}`;
  }
}

function generateCypressScript(testCase: any): string {
  const testSteps = Array.isArray(testCase.test_steps) ? testCase.test_steps : [];
  const expectedResults = Array.isArray(testCase.expected_results) ? testCase.expected_results : [];

  return `/**
 * ${testCase.title}
 * ${testCase.description}
 * Priority: ${testCase.priority}
 */

describe('${testCase.title}', () => {
  beforeEach(() => {
    cy.visit('https://your-application-url.com');
  });

  it('${testCase.description}', () => {
    // Test Steps:
${testSteps.map((step: string, idx: number) => `    // ${idx + 1}. ${step}`).join("\n")}
    
${testSteps.map((step: string) => {
  return `    // ${step}\n${generateCypressAction(step)}`;
}).join("\n\n")}
    
    // Expected Results:
${expectedResults.map((result: string, idx: number) => `    // ${idx + 1}. ${result}\n    // Add assertion here`).join("\n")}
  });
});`;
}

function generateCypressAction(step: string): string {
  const lowerStep = step.toLowerCase();
  
  if (lowerStep.includes("navigate") || lowerStep.includes("go to")) {
    return `    cy.visit('/path');`;
  } else if (lowerStep.includes("click")) {
    return `    cy.get('[data-testid="button"]').click();`;
  } else if (lowerStep.includes("enter") || lowerStep.includes("type")) {
    return `    cy.get('[data-testid="input"]').type('test data');`;
  } else if (lowerStep.includes("select")) {
    return `    cy.get('[data-testid="select"]').select('option');`;
  } else if (lowerStep.includes("verify") || lowerStep.includes("check")) {
    return `    cy.get('[data-testid="element"]').should('be.visible');`;
  } else {
    return `    // TODO: Implement step: ${step}`;
  }
}

function generatePlaywrightScript(testCase: any): string {
  const testSteps = Array.isArray(testCase.test_steps) ? testCase.test_steps : [];
  const expectedResults = Array.isArray(testCase.expected_results) ? testCase.expected_results : [];

  return `import { test, expect } from '@playwright/test';

/**
 * ${testCase.title}
 * ${testCase.description}
 * Priority: ${testCase.priority}
 */

test.describe('${testCase.title}', () => {
  test('${testCase.description}', async ({ page }) => {
    // Test Steps:
${testSteps.map((step: string, idx: number) => `    // ${idx + 1}. ${step}`).join("\n")}
    
    await page.goto('https://your-application-url.com');
    
${testSteps.map((step: string) => {
  return `    // ${step}\n${generatePlaywrightAction(step)}`;
}).join("\n\n")}
    
    // Expected Results:
${expectedResults.map((result: string, idx: number) => `    // ${idx + 1}. ${result}\n    // Add assertion here`).join("\n")}
  });
});`;
}

function generatePlaywrightAction(step: string): string {
  const lowerStep = step.toLowerCase();
  
  if (lowerStep.includes("navigate") || lowerStep.includes("go to")) {
    return `    await page.goto('/path');`;
  } else if (lowerStep.includes("click")) {
    return `    await page.getByTestId('button').click();`;
  } else if (lowerStep.includes("enter") || lowerStep.includes("type")) {
    return `    await page.getByTestId('input').fill('test data');`;
  } else if (lowerStep.includes("select")) {
    return `    await page.getByTestId('select').selectOption('option');`;
  } else if (lowerStep.includes("verify") || lowerStep.includes("check")) {
    return `    await expect(page.getByTestId('element')).toBeVisible();`;
  } else {
    return `    // TODO: Implement step: ${step}`;
  }
}

function generateAppiumScript(testCase: any): string {
  return `import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import org.junit.jupiter.api.*;

/**
 * ${testCase.title}
 * ${testCase.description}
 */
public class ${testCase.title.replace(/[^a-zA-Z0-9]/g, "_")}Test {
    private AppiumDriver driver;
    
    @BeforeEach
    public void setUp() {
        // Configure Appium driver
    }
    
    @Test
    public void ${testCase.title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}() {
        // Test implementation
    }
    
    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;
}

function generateRestAssuredScript(testCase: any): string {
  return `import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

/**
 * ${testCase.title}
 * ${testCase.description}
 */
public class ${testCase.title.replace(/[^a-zA-Z0-9]/g, "_")}Test {
    
    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = "https://api.your-domain.com";
    }
    
    @Test
    @DisplayName("${testCase.title}")
    public void ${testCase.title.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}() {
        given()
            .header("Content-Type", "application/json")
        .when()
            .get("/endpoint")
        .then()
            .statusCode(200)
            .body("key", equalTo("expectedValue"));
    }
}`;
}