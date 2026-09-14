-- Create AI Test Engineer Platform Database Schema

-- Projects table - stores user testing projects
CREATE TABLE IF NOT EXISTS ai_test_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  application_type TEXT NOT NULL CHECK (application_type IN ('web', 'mobile_android', 'mobile_ios', 'api')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table - stores application details to be tested
CREATE TABLE IF NOT EXISTS ai_test_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ai_test_projects(id) ON DELETE CASCADE,
  application_type TEXT NOT NULL CHECK (application_type IN ('web', 'mobile_android', 'mobile_ios', 'api')),
  
  -- Web application fields
  url TEXT,
  staging_url TEXT,
  authentication_required BOOLEAN DEFAULT FALSE,
  
  -- Mobile application fields
  app_file_path TEXT,
  app_package_name TEXT,
  app_version TEXT,
  platform_version TEXT,
  
  -- API fields
  api_base_url TEXT,
  api_documentation_url TEXT,
  
  -- Analysis results
  analysis_status TEXT DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'analyzing', 'completed', 'failed')),
  analysis_results JSONB,
  pages_detected INTEGER DEFAULT 0,
  controls_detected INTEGER DEFAULT 0,
  apis_detected INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Scenarios table - high-level test scenarios
CREATE TABLE IF NOT EXISTS ai_test_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ai_test_projects(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES ai_test_applications(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  category TEXT DEFAULT 'functional' CHECK (category IN ('functional', 'integration', 'regression', 'smoke', 'security', 'performance', 'accessibility')),
  ai_generated BOOLEAN DEFAULT TRUE,
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Cases table - detailed test cases
CREATE TABLE IF NOT EXISTS ai_test_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES ai_test_scenarios(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES ai_test_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  preconditions TEXT,
  test_steps JSONB NOT NULL,
  expected_results JSONB NOT NULL,
  test_data JSONB,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed', 'approved', 'automated')),
  ai_generated BOOLEAN DEFAULT TRUE,
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation Scripts table - generated automation code
CREATE TABLE IF NOT EXISTS ai_test_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case_id UUID NOT NULL REFERENCES ai_test_cases(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES ai_test_projects(id) ON DELETE CASCADE,
  framework TEXT NOT NULL CHECK (framework IN (
    'selenium_java', 'selenium_python', 'selenium_csharp', 'selenium_javascript',
    'playwright_javascript', 'playwright_typescript', 'playwright_python',
    'appium_java', 'appium_python', 'appium_csharp', 'appium_javascript',
    'cypress', 'webdriverio', 'rest_assured', 'postman'
  )),
  language TEXT NOT NULL,
  script_content TEXT NOT NULL,
  dependencies JSONB,
  configuration JSONB,
  ai_generated BOOLEAN DEFAULT TRUE,
  reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Executions table - test run records
CREATE TABLE IF NOT EXISTS ai_test_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES ai_test_projects(id) ON DELETE CASCADE,
  execution_name TEXT NOT NULL,
  execution_type TEXT DEFAULT 'manual' CHECK (execution_type IN ('manual', 'automated', 'ci_cd')),
  environment TEXT,
  browser TEXT,
  platform TEXT,
  status TEXT DEFAULT 'running' CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_tests INTEGER DEFAULT 0,
  passed_tests INTEGER DEFAULT 0,
  failed_tests INTEGER DEFAULT 0,
  skipped_tests INTEGER DEFAULT 0,
  execution_duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Results table - individual test results
CREATE TABLE IF NOT EXISTS ai_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID NOT NULL REFERENCES ai_test_executions(id) ON DELETE CASCADE,
  test_case_id UUID REFERENCES ai_test_cases(id) ON DELETE SET NULL,
  test_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'skipped', 'error')),
  error_message TEXT,
  stack_trace TEXT,
  screenshots JSONB,
  logs TEXT,
  execution_time INTEGER,
  ai_analysis JSONB,
  suggested_fixes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Reports table - generated test reports
CREATE TABLE IF NOT EXISTS ai_test_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID NOT NULL REFERENCES ai_test_executions(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES ai_test_projects(id) ON DELETE CASCADE,
  report_type TEXT DEFAULT 'html' CHECK (report_type IN ('html', 'pdf', 'json', 'xml')),
  report_content TEXT,
  report_url TEXT,
  summary JSONB,
  ai_insights TEXT,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_test_projects_user ON ai_test_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_projects_status ON ai_test_projects(status);
CREATE INDEX IF NOT EXISTS idx_ai_test_applications_project ON ai_test_applications(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_scenarios_project ON ai_test_scenarios(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_cases_scenario ON ai_test_cases(scenario_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_cases_project ON ai_test_cases(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_scripts_project ON ai_test_scripts(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_executions_project ON ai_test_executions(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_results_execution ON ai_test_results(execution_id);
CREATE INDEX IF NOT EXISTS idx_ai_test_reports_execution ON ai_test_reports(execution_id);

-- Enable RLS on all tables
ALTER TABLE ai_test_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_test_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access their own projects and related data
CREATE POLICY "Users can view their own projects" ON ai_test_projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" ON ai_test_projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON ai_test_projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON ai_test_projects
  FOR DELETE USING (auth.uid() = user_id);

-- Applications policies
CREATE POLICY "Users can view applications in their projects" ON ai_test_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_applications.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create applications in their projects" ON ai_test_applications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_applications.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update applications in their projects" ON ai_test_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_applications.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete applications in their projects" ON ai_test_applications
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_applications.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

-- Similar policies for other tables (scenarios, test cases, scripts, executions, results, reports)
CREATE POLICY "Users can manage scenarios in their projects" ON ai_test_scenarios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_scenarios.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage test cases in their projects" ON ai_test_cases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_cases.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage scripts in their projects" ON ai_test_scripts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_scripts.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage executions in their projects" ON ai_test_executions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_executions.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage results in their projects" ON ai_test_results
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_test_executions
      JOIN ai_test_projects ON ai_test_projects.id = ai_test_executions.project_id
      WHERE ai_test_executions.id = ai_test_results.execution_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage reports in their projects" ON ai_test_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM ai_test_projects
      WHERE ai_test_projects.id = ai_test_reports.project_id
      AND ai_test_projects.user_id = auth.uid()
    )
  );