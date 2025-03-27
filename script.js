document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navigation component
    const navigation = `
        <header class="fixed w-full bg-white/80 backdrop-blur-sm z-30 border-b">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 class="text-xl font-bold">ML Prediction Models</h1>
                <nav class="hidden md:flex space-x-8">
                    <a href="#overview" class="nav-link text-gray-700 hover:text-blue-600" data-section="overview">Overview</a>
                    <a href="#salary" class="nav-link text-gray-700 hover:text-blue-600" data-section="salary">Salary</a>
                    <a href="#satisfaction" class="nav-link text-gray-700 hover:text-blue-600" data-section="satisfaction">Satisfaction</a>
                </nav>
                <button class="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </header>
    `;
    document.getElementById('navigation').innerHTML = navigation;
    
    // Section switching logic
    const overviewBtn = document.getElementById('overview-btn');
    const salaryBtn = document.getElementById('salary-btn');
    const satisfactionBtn = document.getElementById('satisfaction-btn');
    const overviewSection = document.getElementById('overview-section');
    const salarySection = document.getElementById('salary-section');
    const satisfactionSection = document.getElementById('satisfaction-section');
    
    function showSection(section) {
        overviewSection.classList.add('hidden');
        salarySection.classList.add('hidden');
        satisfactionSection.classList.add('hidden');
        section.classList.remove('hidden');
        
        // Update navigation highlight
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-blue-600', 'font-medium');
        });
        
        if (section === overviewSection) {
            document.querySelector('.nav-link[data-section="overview"]')
                .classList.add('text-blue-600', 'font-medium');
        } 
        else if (section === salarySection) {
            document.querySelector('.nav-link[data-section="salary"]')
                .classList.add('text-blue-600', 'font-medium');
        } 
        else if (section === satisfactionSection) {
            document.querySelector('.nav-link[data-section="satisfaction"]')
                .classList.add('text-blue-600', 'font-medium');
        }
    }
    
    overviewBtn.addEventListener('click', () => {
        showSection(overviewSection);
        overviewBtn.classList.replace('btn-outline', 'btn-primary');
        salaryBtn.classList.replace('btn-primary', 'btn-outline');
        satisfactionBtn.classList.replace('btn-primary', 'btn-outline');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    salaryBtn.addEventListener('click', () => {
        showSection(salarySection);
        salaryBtn.classList.replace('btn-outline', 'btn-primary');
        overviewBtn.classList.replace('btn-primary', 'btn-outline');
        satisfactionBtn.classList.replace('btn-primary', 'btn-outline');
        window.scrollTo({ top: salarySection.offsetTop - 100, behavior: 'smooth' });
    });
    
    satisfactionBtn.addEventListener('click', () => {
        showSection(satisfactionSection);
        satisfactionBtn.classList.replace('btn-outline', 'btn-primary');
        overviewBtn.classList.replace('btn-primary', 'btn-outline');
        salaryBtn.classList.replace('btn-primary', 'btn-outline');
        window.scrollTo({ top: satisfactionSection.offsetTop - 100, behavior: 'smooth' });
    });
    
    // Add click handlers for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            
            if (section === 'overview') {
                overviewBtn.click();
            } 
            else if (section === 'salary') {
                salaryBtn.click();
            } 
            else if (section === 'satisfaction') {
                satisfactionBtn.click();
            }
        });
    });
    
    // Load content dynamically
    overviewSection.innerHTML = `
        <div class="mb-12">
            ${createProjectOverview()}
        </div>
        
        <div class="mb-12">
            ${createProjectBackground()}
        </div>
        
        <div class="mb-12">
            ${createDataAnalysis()}
        </div>
        
        <div class="mb-12">
            ${createProjectInfo()}
        </div>
    `;
    
    salarySection.innerHTML = `
        ${createSalaryHikePrediction()}
        
        <div class="mt-16">
            ${createProjectConclusion()}
        </div>
    `;
    
    satisfactionSection.innerHTML = `
        ${createJobSatisfactionPrediction()}
        
        <div class="mt-16">
            ${createProjectConclusion()}
        </div>
    `;
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'translate-y-10');
            scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            scrollTopBtn.classList.add('opacity-0', 'translate-y-10');
            scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.section-fade-in').forEach(section => {
        observer.observe(section);
    });

    // Segment switching functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('segment-btn')) {
            // Remove active class from all buttons
            document.querySelectorAll('.segment-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            const segment = e.target.dataset.segment;
            
            // Hide all segment contents
            document.querySelectorAll('.segment-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show selected segment content
            document.querySelector(`.segment-content[data-segment="${segment}"]`).classList.remove('hidden');
        }
    });
});

// COMPONENT CREATION FUNCTIONS

function createProjectOverview() {
    return `
        <div class="section-fade-in">
            <h2 class="text-3xl font-bold mb-6">Project Overview</h2>
            <div class="glass-card rounded-xl p-6 md:p-8">
                <p class="text-gray-700 mb-6 text-lg">
                    This project develops machine learning models to predict two key employee metrics: 
                    salary hike percentage and job satisfaction level. These models enable HR departments 
                    to make data-driven decisions about compensation and employee engagement strategies.
                </p>
                
                <h3 class="text-xl font-semibold mb-4">Key Objectives</h3>
                <ul class="list-disc pl-6 space-y-3 text-gray-700 mb-8">
                    <li>Predict salary hike percentage based on employee attributes and performance metrics</li>
                    <li>Classify job satisfaction levels into Low, Medium, and High categories</li>
                    <li>Identify the most influential factors affecting both salary hikes and job satisfaction</li>
                    <li>Provide actionable insights to improve employee retention and satisfaction</li>
                </ul>
                
                <h3 class="text-xl font-semibold mb-4">Methodology</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-blue-50 rounded-lg p-4">
                        <h4 class="font-medium mb-2">Data Collection</h4>
                        <p class="text-sm text-gray-600">Gathered employee data including demographics, job roles, performance metrics, and satisfaction surveys</p>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4">
                        <h4 class="font-medium mb-2">Data Preprocessing</h4>
                        <p class="text-sm text-gray-600">Cleaned data, handled missing values, and performed feature engineering</p>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4">
                        <h4 class="font-medium mb-2">Model Development</h4>
                        <p class="text-sm text-gray-600">Built and evaluated multiple ML models for both regression and classification tasks</p>
                    </div>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">Expected Outcomes</h3>
                <div class="bg-blue-50/50 rounded-lg p-6">
                    <ul class="space-y-3">
                        <li class="flex items-start">
                            <span class="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span>
                            <span>Accurate prediction models for salary adjustments</span>
                        </li>
                        <li class="flex items-start">
                            <span class="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span>
                            <span>Identification of employees at risk of dissatisfaction</span>
                        </li>
                        <li class="flex items-start">
                            <span class="bg-blue-100 text-blue-800 rounded-full p-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </span>
                            <span>Data-driven recommendations for HR policies</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function createProjectBackground() {
    return `
        <div class="section-fade-in" style="transition-delay: 100ms">
            <h2 class="text-3xl font-bold mb-6">Project Background</h2>
            <div class="glass-card rounded-xl p-6 md:p-8">
                <h3 class="text-xl font-semibold mb-4">Business Context</h3>
                <p class="text-gray-700 mb-6">
                    Employee retention and satisfaction are critical challenges in today's competitive job market. 
                    Companies struggle with high turnover rates and the associated costs of hiring and training new employees. 
                    This project addresses these challenges by providing predictive insights into employee satisfaction 
                    and compensation expectations.
                </p>
                
                <h3 class="text-xl font-semibold mb-4">Problem Statement</h3>
                <p class="text-gray-700 mb-6">
                    Traditional HR approaches often rely on reactive strategies and gut feelings rather than data-driven insights. 
                    This leads to:
                </p>
                <ul class="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                    <li>Inefficient allocation of salary budgets</li>
                    <li>Late identification of dissatisfied employees</li>
                    <li>Reactive rather than proactive retention strategies</li>
                    <li>Lack of transparency in compensation decisions</li>
                </ul>
                
                <h3 class="text-xl font-semibold mb-4">Solution Approach</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-green-50 rounded-lg p-5">
                        <h4 class="font-medium text-green-800 mb-3">Salary Hike Prediction</h4>
                        <p class="text-sm text-gray-700">
                            Regression model that predicts appropriate salary increases based on employee attributes, 
                            performance metrics, and market benchmarks.
                        </p>
                    </div>
                    <div class="bg-purple-50 rounded-lg p-5">
                        <h4 class="font-medium text-purple-800 mb-3">Job Satisfaction Prediction</h4>
                        <p class="text-sm text-gray-700">
                            Classification model that identifies employees at risk of dissatisfaction based on 
                            various work-related factors.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createDataAnalysis() {
    return `
        <div class="section-fade-in" style="transition-delay: 200ms">
            <h2 class="text-3xl font-bold mb-6">Data Analysis</h2>
            <div class="glass-card rounded-xl p-6 md:p-8">
                <h3 class="text-xl font-semibold mb-4">Dataset Overview</h3>
                <div class="overflow-x-auto mb-8">
                    <table class="min-w-full bg-white/50">
                        <thead>
                            <tr class="border-b">
                                <th class="px-4 py-3 text-left">Feature</th>
                                <th class="px-4 py-3 text-left">Type</th>
                                <th class="px-4 py-3 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="px-4 py-3">Age</td>
                                <td class="px-4 py-3">Numerical</td>
                                <td class="px-4 py-3">Employee age in years</td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">Education</td>
                                <td class="px-4 py-3">Categorical</td>
                                <td class="px-4 py-3">Education level (1-5)</td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">JobLevel</td>
                                <td class="px-4 py-3">Categorical</td>
                                <td class="px-4 py-3">Job hierarchy level</td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">MonthlyIncome</td>
                                <td class="px-4 py-3">Numerical</td>
                                <td class="px-4 py-3">Current monthly salary</td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">PercentSalaryHike</td>
                                <td class="px-4 py-3">Numerical</td>
                                <td class="px-4 py-3">Last salary increase percentage</td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">JobSatisfaction</td>
                                <td class="px-4 py-3">Categorical</td>
                                <td class="px-4 py-3">Self-reported satisfaction (1-4)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">Key Insights</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-orange-50 rounded-lg p-5">
                        <h4 class="font-medium text-orange-800 mb-3">Salary Distribution</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            The data shows a right-skewed distribution with most employees earning between 
                            $2,000-$6,000 monthly, and a few high earners above $10,000.
                        </p>
                        <div class="bg-white rounded p-2 text-center text-xs text-gray-500">
                            [Salary distribution chart would appear here]
                        </div>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-5">
                        <h4 class="font-medium text-blue-800 mb-3">Satisfaction Levels</h4>
                        <p class="text-sm text-gray-700 mb-3">
                            Job satisfaction is relatively evenly distributed across the 4 levels, 
                            with slightly more employees reporting level 3 satisfaction.
                        </p>
                        <div class="bg-white rounded p-2 text-center text-xs text-gray-500">
                            [Satisfaction distribution chart would appear here]
                        </div>
                    </div>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">Correlation Analysis</h3>
                <div class="bg-gray-50 rounded-lg p-5 mb-6">
                    <p class="text-sm text-gray-700 mb-3">
                        Strongest positive correlations with salary hike:
                    </p>
                    <ul class="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Performance Rating (0.82)</li>
                        <li>Job Level (0.78)</li>
                        <li>Years at Company (0.65)</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function createProjectInfo() {
    return `
        <div class="section-fade-in" style="transition-delay: 300ms">
            <div class="glass-card rounded-xl p-6 md:p-8">
                <h2 class="text-2xl font-semibold mb-2">Group Project (BUSI 651-HBD-WINTER25-01)</h2>
                <h3 class="text-lg font-medium mb-6 text-gray-500">Presented by: Team 7</h3>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div class="bg-gray-100 rounded-lg p-4 animate-fade-in">
                        <p class="font-medium">Hamza Ahmed Siddiqui</p>
                        <p class="text-sm text-gray-600">ID: 2242917</p>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-4 animate-fade-in" style="animation-delay: 150ms">
                        <p class="font-medium">Himani Rajput</p>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-4 animate-fade-in" style="animation-delay: 300ms">
                        <p class="font-medium">Numan Safiullakhan Pathan</p>
                        <p class="text-sm text-gray-600">ID: 2242732</p>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-4 animate-fade-in" style="animation-delay: 450ms">
                        <p class="font-medium">Rabin Khadka</p>
                        <p class="text-sm text-gray-600">ID: 2321194</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createSalaryHikePrediction() {
    return `
        <div class="section-fade-in">
            <h2 class="text-3xl font-bold mb-6">Salary Hike Prediction</h2>
            
            <div class="glass-card rounded-xl p-6 md:p-8 mb-8">
                <h3 class="text-xl font-semibold mb-4">Model Performance</h3>
                
                <!-- Linear Regression Images -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 class="text-lg font-medium mb-2">Linear Regression: Predicted vs Actual</h4>
                        <div class="model-image bg-gray-100 p-4 text-center">
                            <img src="images/linear_predicted_vs_actual.png" alt="Linear Regression Predicted vs Actual" class="w-full h-auto">
                            <p class="text-sm text-gray-600 mt-2">Comparison of predicted vs actual salary hike percentages</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-medium mb-2">Linear Regression: Residual Distribution</h4>
                        <div class="model-image bg-gray-100 p-4 text-center">
                            <img src="images/linear_residuals.png" alt="Linear Regression Residuals" class="w-full h-auto">
                            <p class="text-sm text-gray-600 mt-2">Distribution of prediction errors</p>
                        </div>
                    </div>
                </div>
                
                <!-- Polynomial Regression Images -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 class="text-lg font-medium mb-2">Polynomial Regression (Degree 2): Predicted vs Actual</h4>
                        <div class="model-image bg-gray-100 p-4 text-center">
                            <img src="images/poly_predicted_vs_actual.png" alt="Polynomial Regression Predicted vs Actual" class="w-full h-auto">
                            <p class="text-sm text-gray-600 mt-2">Non-linear relationship modeling</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-medium mb-2">Polynomial Regression: Residual Distribution</h4>
                        <div class="model-image bg-gray-100 p-4 text-center">
                            <img src="images/poly_residuals.png" alt="Polynomial Regression Residuals" class="w-full h-auto">
                            <p class="text-sm text-gray-600 mt-2">Error distribution with polynomial features</p>
                        </div>
                    </div>
                </div>
                
                <!-- Model Comparison -->
                <h3 class="text-xl font-semibold mb-4">Model Performance Comparison</h3>
                <div class="model-comparison">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div class="bg-white p-4 rounded-lg border">
                            <h4 class="font-medium mb-2 text-center">R² Score</h4>
                            <div class="text-center">
                                <p class="text-sm text-gray-600 mb-1">Linear Regression</p>
                                <p class="text-2xl font-bold text-blue-600">0.6153</p>
                            </div>
                            <div class="text-center mt-3">
                                <p class="text-sm text-gray-600 mb-1">Polynomial Regression</p>
                                <p class="text-2xl font-bold text-purple-600">0.4520</p>
                            </div>
                        </div>
                        <div class="bg-white p-4 rounded-lg border">
                            <h4 class="font-medium mb-2 text-center">RMSE</h4>
                            <div class="text-center">
                                <p class="text-sm text-gray-600 mb-1">Linear Regression</p>
                                <p class="text-2xl font-bold text-blue-600">2.3615</p>
                            </div>
                            <div class="text-center mt-3">
                                <p class="text-sm text-gray-600 mb-1">Polynomial Regression</p>
                                <p class="text-2xl font-bold text-purple-600">2.8186</p>
                            </div>
                        </div>
                        <div class="bg-white p-4 rounded-lg border">
                            <h4 class="font-medium mb-2 text-center">MAE</h4>
                            <div class="text-center">
                                <p class="text-sm text-gray-600 mb-1">Linear Regression</p>
                                <p class="text-2xl font-bold text-blue-600">1.9491</p>
                            </div>
                            <div class="text-center mt-3">
                                <p class="text-sm text-gray-600 mb-1">Polynomial Regression</p>
                                <p class="text-2xl font-bold text-purple-600">2.2764</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="model-comparison-grid">
                        <div class="bg-white p-4 rounded-lg border">
                            <h4 class="font-medium mb-3 text-center">R² Score Comparison</h4>
                            <img src="images/r2_comparison.png" alt="R² Score Comparison" class="w-full h-auto">
                        </div>
                        <div class="bg-white p-4 rounded-lg border">
                            <h4 class="font-medium mb-3 text-center">RMSE Comparison</h4>
                            <img src="images/rmse_comparison.png" alt="RMSE Comparison" class="w-full h-auto">
                        </div>
                        <div class="bg-white p-4 rounded-lg border">
                            <h4 class="font-medium mb-3 text-center">MAE Comparison</h4>
                            <img src="images/mae_comparison.png" alt="MAE Comparison" class="w-full h-auto">
                        </div>
                    </div>
                </div>
                
                <!-- Feature Importance -->
                <h3 class="text-xl font-semibold mb-4">Top Features for Predicting Salary Hike</h3>
                <div class="feature-importance">
                    <div class="mb-6">
                        <p class="text-gray-700 mb-4">The following features were found to be most important in predicting salary hike percentage:</p>
                        
                        <div class="space-y-3">
                            <div class="feature-bar" style="width: 95%">PerformanceRating (2.42)</div>
                            <div class="feature-bar" style="width: 85%">WorkLifeBalance (2.18)</div>
                            <div class="feature-bar" style="width: 78%">MaritalStatus (1.95)</div>
                            <div class="feature-bar" style="width: 72%">BusinessTravel (1.82)</div>
                            <div class="feature-bar" style="width: 68%">NumCompaniesWorked (1.75)</div>
                            <div class="feature-bar" style="width: 65%">JobInvolvement (1.68)</div>
                            <div class="feature-bar" style="width: 60%">EnvironmentSatisfaction (1.55)</div>
                            <div class="feature-bar" style="width: 55%">Gender (1.42)</div>
                            <div class="feature-bar" style="width: 50%">DistanceFromHome (1.35)</div>
                            <div class="feature-bar" style="width: 45%">HourlyRate (1.28)</div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-100 p-4 rounded-lg text-center">
                        <img src="images/feature_importance.png" alt="Feature Importance Chart" class="w-full max-w-md mx-auto h-auto">
                    </div>
                </div>
                
                <!-- Prediction Example -->
                <h3 class="text-xl font-semibold mb-4">Prediction Example</h3>
                <div class="bg-white rounded-lg border p-6 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-medium mb-3">Employee Attributes</h4>
                            <ul class="space-y-2 text-gray-700">
                                <li class="flex justify-between">
                                    <span>Age:</span>
                                    <span class="font-medium">32</span>
                                </li>
                                <li class="flex justify-between">
                                    <span>Job Level:</span>
                                    <span class="font-medium">3</span>
                                </li>
                                <li class="flex justify-between">
                                    <span>Performance Rating:</span>
                                    <span class="font-medium">4</span>
                                </li>
                                <li class="flex justify-between">
                                    <span>Years at Company:</span>
                                    <span class="font-medium">5</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-medium mb-3">Prediction Results</h4>
                            <div class="bg-blue-50 rounded-lg p-4">
                                <div class="text-center">
                                    <p class="text-sm text-blue-800 mb-1">Recommended Salary Hike</p>
                                    <p class="text-3xl font-bold text-blue-600">12.4%</p>
                                    <p class="text-xs text-blue-600 mt-1">(Confidence: 85%)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createJobSatisfactionPrediction() {
    return `
        <div class="section-fade-in">
            <h2 class="text-3xl font-bold mb-6">Job Satisfaction Prediction</h2>
            <div class="glass-card rounded-xl p-6 md:p-8 mb-8">
                <h3 class="text-xl font-semibold mb-4">Model Comparison</h3>
                <div class="overflow-x-auto mb-8">
                    <table class="min-w-full bg-white/50">
                        <thead>
                            <tr class="border-b">
                                <th class="px-4 py-3 text-left">Model</th>
                                <th class="px-4 py-3 text-left">Accuracy</th>
                                <th class="px-4 py-3 text-left">Precision</th>
                                <th class="px-4 py-3 text-left">Recall</th>
                                <th class="px-4 py-3 text-left">F1 Score</th>
                                <th class="px-4 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="px-4 py-3">Random Forest</td>
                                <td class="px-4 py-3">26.7</td>
                                <td class="px-4 py-3">23.5%</td>
                                <td class="px-4 py-3">26.7%</td>
                                <td class="px-4 py-3">24.07%</td>
                                <td class="px-4 py-3"><span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Baseline</span></td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">Gradient Boosting</td>
                                <td class="px-4 py-3">25.73%</td>
                                <td class="px-4 py-3">22.02%</td>
                                <td class="px-4 py-3">25.73%</td>
                                <td class="px-4 py-3">23.11%</td>
                                <td class="px-4 py-3"><span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Underperforming</span></td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">Logistic Regression</td>
                                <td class="px-4 py-3">25.8%</td>
                                <td class="px-4 py-3">15.8%</td>
                                <td class="px-4 py-3">25.8%</td>
                                <td class="px-4 py-3">19.6%</td>
                                <td class="px-4 py-3"><span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Underperforming</span></td>
                            </tr>
                            <tr class="border-b bg-green-50">
                                <td class="px-4 py-3 font-medium">KNN</td>
                                <td class="px-4 py-3 font-medium">27.3%</td>
                                <td class="px-4 py-3 font-medium">27.1%</td>
                                <td class="px-4 py-3 font-medium">27.3%</td>
                                <td class="px-4 py-3 font-medium">27.3%</td>
                                <td class="px-4 py-3"><span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"></span>Experimental</td>
                            </tr>
                            <tr class="border-b">
                                <td class="px-4 py-3">Neural Network</td>
                                <td class="px-4 py-3">28.1%</td>
                                <td class="px-4 py-3">27.58%</td>
                                <td class="px-4 py-3">28.1%</td>
                                <td class="px-4 py-3">27.78%</td>
                                <td class="px-4 py-3"><span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Best Model</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 class="text-xl font-medium mb-4">Selected Features for Job Satisfaction</h3>
                        <div class="bg-white p-4 rounded-lg border mb-6">
                            <p class="text-gray-700 mb-4">The model identified these 11 features as most important:</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">1. DistanceFromHome</p>
                                    <p class="text-sm text-gray-600">Miles from workplace</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">2. EducationField</p>
                                    <p class="text-sm text-gray-600">Field of study</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">3. HourlyRate</p>
                                    <p class="text-sm text-gray-600">Compensation rate</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">4. JobRole</p>
                                    <p class="text-sm text-gray-600">Position in company</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">5. NumCompaniesWorked</p>
                                    <p class="text-sm text-gray-600">Prior employers</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">6. PercentSalaryHike</p>
                                    <p class="text-sm text-gray-600">Recent raise</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">7. TrainingTimesLastYear</p>
                                    <p class="text-sm text-gray-600">Skill development</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">8. YearsExperienceBeforeCompany</p>
                                    <p class="text-sm text-gray-600">Prior experience</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">9. YearsInCurrentRole</p>
                                    <p class="text-sm text-gray-600">Role tenure</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">10. YearsSinceLastPromotion</p>
                                    <p class="text-sm text-gray-600">Career progression</p>
                                </div>
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="font-medium">11. YearsWithCurrManager</p>
                                    <p class="text-sm text-gray-600">Manager relationship</p>
                                </div>
                            </div>
                        </div>
                        
                        <h3 class="text-xl font-medium mb-4">KNN Confusion Matrix</h3>
                        <div class="bg-white p-4 rounded-lg border">
                            <img src="images/knn_confusion_matrix.png" alt="KNN Confusion Matrix" class="w-full h-auto mb-4">
                            <h4 class="font-medium mb-2">Key Insights:</h4>
                            <ul class="list-disc pl-6 space-y-1 text-sm text-gray-700">
                                <li>Diagonal values show correct predictions</li>
                                <li>Class 3 was predicted correctly 28 times</li>
                                <li>19 instances of class 2 misclassified as class 0</li>
                                <li>Class 3 had 14 samples predicted as class 1</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-xl font-medium mb-4">Employee Clustering Using PCA</h3>
                        <div class="bg-white p-4 rounded-lg border mb-6">
                            <img src="images/pca_clustering.png" alt="PCA Clustering" class="w-full h-auto">
                            <div class="mt-4">
                                <h4 class="font-medium mb-2">Cluster Characteristics:</h4>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div class="bg-blue-50 rounded-lg p-3 text-center">
                                        <p class="text-sm font-medium">Principal Components</p>
                                        <p class="text-xs text-gray-600">Summarize attributes</p>
                                    </div>
                                    <div class="bg-blue-50 rounded-lg p-3 text-center">
                                        <p class="text-sm font-medium">Cluster Density</p>
                                        <p class="text-xs text-gray-600">Indicates similarity</p>
                                    </div>
                                    <div class="bg-blue-50 rounded-lg p-3 text-center">
                                        <p class="text-sm font-medium">Distinct Clusters</p>
                                        <p class="text-xs text-gray-600">Represent segments</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3 class="text-xl font-medium mb-4">Employee Segments</h3>
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <button class="segment-btn" data-segment="0">
                                <div class="w-3 h-3 rounded-full bg-purple-800 mx-auto mb-1"></div>
                                <p class="text-xs">At-Risk</p>
                            </button>
                            <button class="segment-btn active" data-segment="1">
                                <div class="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                                <p class="text-xs">Stable</p>
                            </button>
                            <button class="segment-btn" data-segment="2">
                                <div class="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1"></div>
                                <p class="text-xs">High Performers</p>
                            </button>
                        </div>
                        
                        <div class="segment-content hidden" data-segment="0">
                            <div class="flex items-center mb-3">
                                <div class="w-3 h-3 rounded-full bg-purple-800 mr-2"></div>
                                <h4 class="font-medium">At-Risk Employees</h4>
                            </div>
                            <p class="text-sm text-gray-700 mb-3">
                                Showing signs of disengagement (Avg satisfaction: 1.8/5)
                            </p>
                            <div class="grid grid-cols-3 gap-2 mb-4">
                                <div class="bg-purple-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">High Overtime</p>
                                </div>
                                <div class="bg-purple-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">Low Balance</p>
                                </div>
                                <div class="bg-purple-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">No Promotion</p>
                                </div>
                            </div>
                            <div class="bg-white border rounded-lg p-4">
                                <p class="text-sm text-gray-700">
                                    <span class="font-medium">Recommendations:</span> 
                                    Conduct stay interviews, review workloads, provide career development opportunities.
                                </p>
                            </div>
                        </div>
                        
                        <div class="segment-content" data-segment="1">
                            <div class="flex items-center mb-3">
                                <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                <h4 class="font-medium">Stable Contributors</h4>
                            </div>
                            <p class="text-sm text-gray-700 mb-3">
                                Reliable employees with moderate satisfaction (Avg: 3.1/5)
                            </p>
                            <div class="grid grid-cols-3 gap-2 mb-4">
                                <div class="bg-green-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">Avg Income</p>
                                </div>
                                <div class="bg-green-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">Medium Tenure</p>
                                </div>
                                <div class="bg-green-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">Technical</p>
                                </div>
                            </div>
                            <div class="bg-white border rounded-lg p-4">
                                <p class="text-sm text-gray-700">
                                    <span class="font-medium">Recommendations:</span> 
                                    Regular check-ins, skill development programs, clear career paths.
                                </p>
                            </div>
                        </div>
                        
                        <div class="segment-content hidden" data-segment="2">
                            <div class="flex items-center mb-3">
                                <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                <h4 class="font-medium">High Performers</h4>
                            </div>
                            <p class="text-sm text-gray-700 mb-3">
                                Top performers with high satisfaction (Avg: 4.2/5)
                            </p>
                            <div class="grid grid-cols-3 gap-2 mb-4">
                                <div class="bg-yellow-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">High Income</p>
                                </div>
                                <div class="bg-yellow-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">Good Balance</p>
                                </div>
                                <div class="bg-yellow-100 rounded p-2 text-center">
                                    <p class="text-xs font-medium">Promoted</p>
                                </div>
                            </div>
                            <div class="bg-white border rounded-lg p-4">
                                <p class="text-sm text-gray-700">
                                    <span class="font-medium">Recommendations:</span> 
                                    Leadership development, challenging projects, retention bonuses.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h3 class="text-xl font-medium mb-4">Satisfaction Prediction</h3>
                <div class="bg-white rounded-lg border p-6 mb-6">
                    <div class="flex justify-between mb-4">
                        <span class="text-sm text-gray-600">Low (1)</span>
                        <span class="text-sm text-gray-600">Medium (2-3)</span>
                        <span class="text-sm text-gray-600">High (4)</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-4 mb-6">
                        <div class="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-4 rounded-full" style="width: 40%"></div>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-700 mb-2">
                            Predicted Satisfaction: <span class="font-medium">2 (Medium)</span> with <span class="font-medium">79.85 % confidence</span>
                        </p>
                        <p class="text-sm text-gray-600">
                            This employee is in the "Stable Contributors" segment.
                        </p>
                    </div>
                </div>
                
                <div class="bg-blue-50 rounded-lg p-6">
                    <h4 class="text-lg font-medium mb-4">Interpretation of KNN Results</h4>
                    <p class="text-gray-700 mb-4">
                        While the Neural Network model achieved the highest F1 score of 27.78% among tested models, 
                        the performance indicates significant challenges in predicting job satisfaction 
                        accurately from the available features.
                    </p>
                    <ul class="list-disc pl-6 space-y-2 text-gray-700">
                        <li>The model performs slightly better than random chance (25%)</li>
                        <li>Precision and recall are balanced at ~27%</li>
                        <li>Suggestive of either limited predictive power in features or inherent difficulty in satisfaction prediction</li>
                        <li>Recommend collecting additional employee sentiment data to improve model performance</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function createProjectConclusion() {
    return `
        <div class="section-fade-in">
            <div class="glass-card rounded-xl p-6 md:p-8">
                <h2 class="text-2xl font-bold mb-6">Conclusion & Recommendations</h2>
                
                <h3 class="text-xl font-semibold mb-4">Key Findings</h3>
                <ul class="list-disc pl-6 space-y-3 text-gray-700 mb-6">
                    <li>The salary hike prediction model achieved strong performance (R² = 0.6153) with performance rating and job level being the most important factors</li>
                    <li>Job satisfaction prediction reached 28.1% accuracy (Neural Network model), with work-life balance and manager relationship as top influencers</li>
                    <li>Employee segmentation revealed three distinct groups with different satisfaction levels and characteristics</li>
                </ul>
                
                <h3 class="text-xl font-semibold mb-4">Business Recommendations</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-blue-50 rounded-lg p-5">
                        <h4 class="font-medium text-blue-800 mb-3">For At-Risk Employees</h4>
                        <ul class="list-disc pl-6 space-y-2 text-sm text-gray-700">
                            <li>Conduct stay interviews to understand concerns</li>
                            <li>Review workload and overtime requirements</li>
                            <li>Provide career development opportunities</li>
                        </ul>
                    </div>
                    <div class="bg-green-50 rounded-lg p-5">
                        <h4 class="font-medium text-green-800 mb-3">For Compensation</h4>
                        <ul class="list-disc pl-6 space-y-2 text-sm text-gray-700">
                            <li>Use predictive model to guide salary adjustments</li>
                            <li>Ensure transparency in compensation decisions</li>
                            <li>Align raises with performance metrics</li>
                        </ul>
                    </div>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">Future Work</h3>
                <div class="bg-gray-50 rounded-lg p-5">
                    <ul class="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Incorporate additional data sources (e.g., employee surveys, exit interviews)</li>
                        <li>Develop real-time monitoring dashboard for HR</li>
                        <li>Implement A/B testing for different retention strategies</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}