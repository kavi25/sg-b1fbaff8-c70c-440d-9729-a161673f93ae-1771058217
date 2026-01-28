export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  tags: string[];
  comments: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Playwright Automation",
    slug: "playwright-automation",
    excerpt: "Playwright is a powerful automation framework developed by Microsoft that enables end-to-end testing for web applications. It supports multiple browsers, including Chromium, Firefox, and WebKit.",
    content: `
      <h2>Introduction</h2>
      <p>Playwright is a powerful automation framework developed by Microsoft that enables end-to-end testing for web applications. It supports multiple browsers, including Chromium, Firefox, and WebKit, and works seamlessly across different operating systems. Playwright is widely used for automated UI testing, web scraping, and performance monitoring.</p>
      
      <h2>Why Choose Playwright?</h2>
      <ul>
        <li><strong>Cross-browser Support:</strong> Test on Chromium, Firefox, and WebKit with a single API</li>
        <li><strong>Auto-wait:</strong> Playwright automatically waits for elements to be ready before performing actions</li>
        <li><strong>Fast Execution:</strong> Parallel test execution and browser context isolation</li>
        <li><strong>Modern Features:</strong> Network interception, mobile emulation, and headless testing</li>
        <li><strong>Developer Tools:</strong> Built-in test generator and debugging tools</li>
      </ul>
      
      <h2>Setting Up Playwright</h2>
      <h3>1. Installing Playwright</h3>
      <p>Install Playwright using npm:</p>
      <pre><code>npm init playwright@latest</code></pre>
      
      <h3>2. Writing Your First Test</h3>
      <p>Create a simple test to verify a page title:</p>
      <pre><code>import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
});</code></pre>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use page object models for maintainable tests</li>
        <li>Leverage parallel execution for faster test runs</li>
        <li>Implement proper error handling and retry logic</li>
        <li>Use selectors wisely - prefer data-testid attributes</li>
        <li>Keep tests independent and isolated</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Playwright is an excellent choice for modern web testing, offering reliability, speed, and developer-friendly features. Whether you're doing end-to-end testing, API testing, or web scraping, Playwright provides the tools you need.</p>
    `,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    author: {
      name: "ITProBit Team",
      avatar: "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff"
    },
    date: "2024-11-26",
    category: "Testing",
    tags: ["playwright", "automation", "testing", "e2e"],
    comments: 0
  },
  {
    id: "2",
    title: "Automation Testing—Software Testing",
    slug: "automation-testing-software-testing",
    excerpt: "Automated testing means using special software for tasks that people usually do when checking and testing a software product. Learn how automation testing enhances software quality.",
    content: `
      <h2>What is Automation Testing?</h2>
      <p>Automated testing means using special software for tasks that people usually do when checking and testing a software product. Nowadays, many software projects use automation testing from start to end, especially in agile and DevOps methods.</p>
      
      <h2>Benefits of Automation Testing</h2>
      <ul>
        <li><strong>Faster Execution:</strong> Tests run much faster than manual testing</li>
        <li><strong>Reusability:</strong> Test scripts can be reused across projects</li>
        <li><strong>Consistency:</strong> Tests perform the same operations precisely every time</li>
        <li><strong>Cost-Effective:</strong> Reduces long-term testing costs</li>
        <li><strong>24/7 Testing:</strong> Tests can run unattended overnight or on weekends</li>
        <li><strong>Better Coverage:</strong> More test scenarios can be covered</li>
      </ul>
      
      <h2>Types of Automation Testing</h2>
      <h3>1. Unit Testing</h3>
      <p>Testing individual components or functions in isolation.</p>
      
      <h3>2. Integration Testing</h3>
      <p>Verifying that different modules work together correctly.</p>
      
      <h3>3. Functional Testing</h3>
      <p>Testing the application against functional requirements.</p>
      
      <h3>4. Regression Testing</h3>
      <p>Ensuring new changes don't break existing functionality.</p>
      
      <h3>5. Performance Testing</h3>
      <p>Testing application performance under various conditions.</p>
      
      <h2>Popular Automation Tools</h2>
      <ul>
        <li>Selenium - Web application testing</li>
        <li>Playwright - Modern end-to-end testing</li>
        <li>Cypress - JavaScript-based testing</li>
        <li>JUnit/TestNG - Unit testing frameworks</li>
        <li>Appium - Mobile automation</li>
      </ul>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Choose the right tool for your needs</li>
        <li>Start with critical test cases</li>
        <li>Maintain test scripts regularly</li>
        <li>Implement proper reporting mechanisms</li>
        <li>Integrate with CI/CD pipelines</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    author: {
      name: "ITProBit Team",
      avatar: "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff"
    },
    date: "2024-11-11",
    category: "Testing",
    tags: ["automation", "software testing", "qa"],
    comments: 0
  },
  {
    id: "3",
    title: "What is Manual Testing?",
    slug: "what-is-manual-testing",
    excerpt: "Manual testing is the process of testing software applications manually by a human tester to find bugs, verify functionality, and ensure the software meets the required specifications.",
    content: `
      <h2>Introduction to Manual Testing</h2>
      <p>Manual testing is the process of testing software applications manually by a human tester to find bugs, verify functionality, and ensure the software meets the required specifications and standards. Unlike automation testing, where tests are executed using tools or scripts, manual testing relies on human effort to perform tests and evaluate the results.</p>
      
      <h2>Key Aspects of Manual Testing</h2>
      
      <h3>1. Test Planning</h3>
      <p>Creating comprehensive test plans and test cases based on requirements.</p>
      
      <h3>2. Test Execution</h3>
      <p>Manually executing test cases and documenting results.</p>
      
      <h3>3. Bug Reporting</h3>
      <p>Identifying, documenting, and reporting defects found during testing.</p>
      
      <h3>4. Exploratory Testing</h3>
      <p>Simultaneously learning, designing, and executing tests.</p>
      
      <h2>Types of Manual Testing</h2>
      <ul>
        <li><strong>Black Box Testing:</strong> Testing without knowledge of internal code</li>
        <li><strong>White Box Testing:</strong> Testing with knowledge of internal structure</li>
        <li><strong>Gray Box Testing:</strong> Combination of black and white box testing</li>
        <li><strong>Acceptance Testing:</strong> Validating against business requirements</li>
        <li><strong>System Testing:</strong> Testing the complete integrated system</li>
        <li><strong>Usability Testing:</strong> Evaluating user experience</li>
      </ul>
      
      <h2>When to Use Manual Testing</h2>
      <ul>
        <li>Exploratory testing scenarios</li>
        <li>Usability and user experience testing</li>
        <li>Ad-hoc testing requirements</li>
        <li>Short-term projects</li>
        <li>Initial testing phases</li>
        <li>Testing that requires human judgment</li>
      </ul>
      
      <h2>Advantages of Manual Testing</h2>
      <ul>
        <li>Better for usability testing</li>
        <li>Catches visual issues easily</li>
        <li>Flexible and adaptable</li>
        <li>No programming knowledge required</li>
        <li>Cost-effective for small projects</li>
      </ul>
      
      <h2>Challenges</h2>
      <ul>
        <li>Time-consuming for large test suites</li>
        <li>Human error possibilities</li>
        <li>Not suitable for performance testing</li>
        <li>Difficult to test large datasets</li>
        <li>Regression testing can be tedious</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    author: {
      name: "ITProBit Team",
      avatar: "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff"
    },
    date: "2024-11-11",
    category: "Testing",
    tags: ["manual testing", "qa", "software testing"],
    comments: 0
  },
  {
    id: "4",
    title: "Selenium Automation Testing",
    slug: "selenium-automation-testing",
    excerpt: "Selenium is a popular open-source automation testing tool used for automating web applications across various browsers and platforms.",
    content: `
      <h2>What is Selenium?</h2>
      <p>Selenium is a popular open-source automation testing tool used for automating web applications across various browsers and platforms. It is widely used in functional testing to ensure that web applications behave as expected. Selenium provides a suite of tools that allow testers to automate browser actions such as clicks, form submissions, and navigation.</p>
      
      <h2>Selenium Components</h2>
      
      <h3>1. Selenium WebDriver</h3>
      <p>The core component that directly controls the browser through browser-specific drivers.</p>
      
      <h3>2. Selenium IDE</h3>
      <p>A browser extension for recording and playing back test scripts.</p>
      
      <h3>3. Selenium Grid</h3>
      <p>Enables parallel test execution across multiple machines and browsers.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li><strong>Cross-Browser Testing:</strong> Support for Chrome, Firefox, Safari, Edge, and more</li>
        <li><strong>Multiple Language Support:</strong> Java, Python, C#, Ruby, JavaScript</li>
        <li><strong>Open Source:</strong> Free to use with large community support</li>
        <li><strong>Platform Independent:</strong> Works on Windows, Mac, and Linux</li>
        <li><strong>Integration:</strong> Works with TestNG, JUnit, Maven, Jenkins</li>
      </ul>
      
      <h2>Getting Started with Selenium</h2>
      
      <h3>Installation (Python)</h3>
      <pre><code>pip install selenium</code></pre>
      
      <h3>Basic Example</h3>
      <pre><code>from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://www.example.com")

element = driver.find_element(By.ID, "username")
element.send_keys("test@example.com")

driver.find_element(By.ID, "submit").click()
driver.quit()</code></pre>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use explicit waits instead of implicit waits</li>
        <li>Implement Page Object Model (POM)</li>
        <li>Use meaningful test names and comments</li>
        <li>Handle exceptions properly</li>
        <li>Keep tests independent and isolated</li>
        <li>Use data-driven testing for better coverage</li>
      </ul>
      
      <h2>Common Challenges</h2>
      <ul>
        <li>Dynamic elements and timing issues</li>
        <li>Browser compatibility</li>
        <li>Test maintenance overhead</li>
        <li>Flaky tests</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Selenium remains one of the most popular automation testing tools due to its flexibility, extensive browser support, and strong community. While it has some challenges, following best practices can help create robust and maintainable test suites.</p>
    `,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    author: {
      name: "ITProBit Team",
      avatar: "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff"
    },
    date: "2024-11-10",
    category: "Testing",
    tags: ["selenium", "automation", "testing", "webdriver"],
    comments: 0
  },
  {
    id: "5",
    title: "Cypress with Cucumber for Seamless End-to-End Testing",
    slug: "cypress-cucumber-e2e-testing",
    excerpt: "Cypress with cucumber framework is a popular combination for development. Learn how to combine these powerful tools for BDD-style testing.",
    content: `
      <h2>Introduction</h2>
      <p>Cypress with cucumber framework is a popular combination for development and in recent years it has gained significant popularity among the "three amigos" (Business, Testing, and Developers). Cucumber helps non-technical stakeholders, such as business analysts and product owners to understand test scenarios written in natural language using Gherkin syntax.</p>
      
      <h2>Why Cypress + Cucumber?</h2>
      <ul>
        <li><strong>BDD Approach:</strong> Write tests in natural language</li>
        <li><strong>Collaboration:</strong> Bridge gap between technical and non-technical teams</li>
        <li><strong>Readability:</strong> Tests are easy to understand for everyone</li>
        <li><strong>Reusability:</strong> Step definitions can be reused across scenarios</li>
        <li><strong>Documentation:</strong> Tests serve as living documentation</li>
      </ul>
      
      <h2>Setting Up Cypress with Cucumber</h2>
      
      <h3>1. Install Dependencies</h3>
      <pre><code>npm install --save-dev cypress
npm install --save-dev @badeball/cypress-cucumber-preprocessor</code></pre>
      
      <h3>2. Configure Cypress</h3>
      <p>Update your cypress.config.js:</p>
      <pre><code>const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler());
      return config;
    },
  },
});</code></pre>
      
      <h2>Writing Feature Files</h2>
      <pre><code>Feature: User Login
  
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the dashboard</code></pre>
      
      <h2>Step Definitions</h2>
      <pre><code>import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.visit('/login');
});

When('I enter valid credentials', () => {
  cy.get('#username').type('user@example.com');
  cy.get('#password').type('password123');
});

When('I click the login button', () => {
  cy.get('#login-button').click();
});

Then('I should see the dashboard', () => {
  cy.url().should('include', '/dashboard');
});</code></pre>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Keep scenarios focused and independent</li>
        <li>Use Background for common setup steps</li>
        <li>Implement data tables for multiple test cases</li>
        <li>Use tags for organizing and filtering tests</li>
        <li>Keep step definitions reusable</li>
        <li>Avoid technical details in feature files</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Combining Cypress with Cucumber provides a powerful testing solution that promotes collaboration, improves test readability, and ensures better alignment between business requirements and test coverage.</p>
    `,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    author: {
      name: "ITProBit Team",
      avatar: "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff"
    },
    date: "2024-04-22",
    category: "Testing",
    tags: ["cypress", "cucumber", "bdd", "testing"],
    comments: 0
  },
  {
    id: "6",
    title: "Why Software Testing is Important?",
    slug: "why-software-testing-is-important",
    excerpt: "Software testing is important; you already know that. But how do you share its value with the rest of your company? Learn practical tips for communicating testing value.",
    content: `
      <h2>The Importance of Software Testing</h2>
      <p>Software testing is important; you already know that. But how do you share its value with the rest of your company? Understanding the importance of testing and communicating it effectively is crucial for maintaining quality standards.</p>
      
      <h2>Key Reasons Why Testing Matters</h2>
      
      <h3>1. Quality Assurance</h3>
      <p>Testing ensures that the software meets quality standards and works as intended. It helps identify defects before the product reaches end users.</p>
      
      <h3>2. Cost Reduction</h3>
      <p>Finding and fixing bugs early in development is significantly cheaper than addressing them after release. The cost of fixing a bug increases exponentially as it moves through the development lifecycle.</p>
      
      <h3>3. Security</h3>
      <p>Testing helps identify vulnerabilities and security issues that could be exploited by malicious users, protecting both the business and its customers.</p>
      
      <h3>4. Customer Satisfaction</h3>
      <p>High-quality, well-tested software leads to better user experiences, increased customer satisfaction, and positive reviews.</p>
      
      <h3>5. Compliance</h3>
      <p>Many industries require compliance with specific standards. Testing helps ensure your software meets these regulatory requirements.</p>
      
      <h2>Types of Testing Value</h2>
      
      <h3>Business Value</h3>
      <ul>
        <li>Reduced support costs</li>
        <li>Faster time to market</li>
        <li>Better reputation</li>
        <li>Higher revenue</li>
      </ul>
      
      <h3>Technical Value</h3>
      <ul>
        <li>Code quality improvement</li>
        <li>Better architecture</li>
        <li>Easier maintenance</li>
        <li>Reduced technical debt</li>
      </ul>
      
      <h2>Communicating Testing Value</h2>
      
      <h3>To Management</h3>
      <ul>
        <li>Focus on ROI and cost savings</li>
        <li>Highlight risk mitigation</li>
        <li>Show metrics and trends</li>
        <li>Connect to business objectives</li>
      </ul>
      
      <h3>To Developers</h3>
      <ul>
        <li>Emphasize faster debugging</li>
        <li>Show code quality improvements</li>
        <li>Highlight regression prevention</li>
        <li>Discuss technical benefits</li>
      </ul>
      
      <h3>To Stakeholders</h3>
      <ul>
        <li>Focus on user experience</li>
        <li>Highlight competitive advantages</li>
        <li>Show quality metrics</li>
        <li>Demonstrate customer satisfaction</li>
      </ul>
      
      <h2>Measuring Testing Effectiveness</h2>
      <ul>
        <li>Defect detection rate</li>
        <li>Test coverage metrics</li>
        <li>Time to find and fix bugs</li>
        <li>Production incident rates</li>
        <li>Customer satisfaction scores</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Software testing is not just a technical necessity—it's a business imperative. By understanding its value and communicating it effectively, testing teams can ensure they receive the support and resources needed to maintain high-quality standards.</p>
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    author: {
      name: "ITProBit Team",
      avatar: "https://ui-avatars.com/api/?name=ITProBit&background=3b82f6&color=fff"
    },
    date: "2024-04-17",
    category: "Testing",
    tags: ["software testing", "qa", "quality assurance"],
    comments: 0
  }
];

export const categories = [
  { name: "Testing", count: 13 },
  { name: "Design", count: 3 },
  { name: "Creative", count: 3 },
  { name: "Branding", count: 2 },
  { name: "It Solution", count: 2 },
  { name: "Corporate", count: 1 }
];

export const tags = [
  "Testing",
  "playwright",
  "automation",
  "Cucumber",
  "Software",
  "selenium",
  "Design",
  "App",
  "Codes",
  "Marketing",
  "Unit Test",
  "Testautomation"
];