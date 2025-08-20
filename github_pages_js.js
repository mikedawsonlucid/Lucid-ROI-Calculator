/**
 * Lucid ROI Calculator for GitHub Pages
 * Self-contained calculator with all functionality
 */

class LucidROICalculator {
    constructor(containerId) {
        this.containerId = containerId;
        this.state = {
            users: 10,
            avgSalary: 85000,
            enabledSections: {
                meetingEfficiency: true,
                meetingReduction: true,
                virtualEvents: true,
                workshopCollaboration: true,
                supportTimeReduction: true,
                brainstormingEfficiency: true,
                onboardingTimeReduction: true,
                adminTimeReduction: true,
                pipelineGeneration: true
            },
            results: {}
        };
        
        this.init();
    }

    // Utility functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount || 0);
    }

    formatHours(hours) {
        return new Intl.NumberFormat('en-US').format(Math.round(hours || 0));
    }

    // ROI Calculation Logic
    calculateROI() {
        const hourlyRate = this.state.avgSalary / 2080; // 40 hours/week * 52 weeks

        // Time Savings Calculations
        const meetingEfficiency = this.state.enabledSections.meetingEfficiency ? {
            hoursPerYear: this.state.users * 10,
            dollarValue: this.state.users * 10 * hourlyRate
        } : { hoursPerYear: 0, dollarValue: 0 };

        const meetingReduction = this.state.enabledSections.meetingReduction ? {
            hoursPerYear: this.state.users * 50,
            dollarValue: this.state.users * 50 * hourlyRate
        } : { hoursPerYear: 0, dollarValue: 0 };

        // Travel Cost Savings
        const virtualEvents = this.state.enabledSections.virtualEvents ? {
            costSavings: this.state.users * 0.3 * 2000 * 1 // 30% of users attend events
        } : { costSavings: 0 };

        const workshopCollaboration = this.state.enabledSections.workshopCollaboration ? {
            costSavings: this.state.users * 0.2 * 3500 * 0.5 // 20% do international travel
        } : { costSavings: 0 };

        // Productivity Improvements
        const supportTimeReduction = this.state.enabledSections.supportTimeReduction ? {
            hoursPerYear: this.state.users * 2.5 * 52,
            dollarValue: this.state.users * 2.5 * 52 * hourlyRate
        } : { hoursPerYear: 0, dollarValue: 0 };

        const brainstormingEfficiency = this.state.enabledSections.brainstormingEfficiency ? {
            hoursPerYear: this.state.users * 8 * 12 * 0.5, // 50% productivity gain
            dollarValue: this.state.users * 8 * 12 * 0.5 * hourlyRate
        } : { hoursPerYear: 0, dollarValue: 0 };

        // Additional ROI Categories
        const onboardingTimeReduction = this.state.enabledSections.onboardingTimeReduction ? {
            newHiresPerYear: Math.ceil(this.state.users * 0.15), // 15% turnover/growth
            totalSavings: Math.ceil(this.state.users * 0.15) * 2560
        } : { newHiresPerYear: 0, totalSavings: 0 };

        const adminTimeReduction = this.state.enabledSections.adminTimeReduction ? {
            dollarValue: this.state.users * 0.01 * 11 * 52 * hourlyRate // 1% are admins
        } : { dollarValue: 0 };

        const pipelineGeneration = this.state.enabledSections.pipelineGeneration ? {
            salesReps: Math.ceil(this.state.users * 0.05), // 5% are sales reps
            annualIncrease: Math.ceil(this.state.users * 0.05) * 75000 * 0.4 * 12
        } : { salesReps: 0, annualIncrease: 0 };

        // Calculate totals
        const totalTimeSavings = 
            meetingEfficiency.hoursPerYear + 
            meetingReduction.hoursPerYear + 
            supportTimeReduction.hoursPerYear + 
            brainstormingEfficiency.hoursPerYear;

        const totalCostSavings = 
            meetingEfficiency.dollarValue + 
            meetingReduction.dollarValue + 
            virtualEvents.costSavings + 
            workshopCollaboration.costSavings + 
            supportTimeReduction.dollarValue + 
            brainstormingEfficiency.dollarValue + 
            onboardingTimeReduction.totalSavings + 
            adminTimeReduction.dollarValue;

        const totalROI = totalCostSavings + pipelineGeneration.annualIncrease;

        this.state.results = {
            meetingEfficiency,
            meetingReduction,
            virtualEvents,
            workshopCollaboration,
            supportTimeReduction,
            brainstormingEfficiency,
            onboardingTimeReduction,
            adminTimeReduction,
            pipelineGeneration,
            totalTimeSavings,
            totalCostSavings,
            totalROI,
            hourlyRate
        };
    }

    // Event Handlers
    toggleSection(section) {
        this.state.enabledSections[section] = !this.state.enabledSections[section];
        this.calculateROI();
        this.render();
    }

    updateUsers(value) {
        const numValue = parseInt(value) || 1;
        this.state.users = Math.max(1, Math.min(10000, numValue));
        this.calculateROI();
        this.render();
    }

    updateSalary(value) {
        const numValue = parseInt(value) || 30000;
        this.state.avgSalary = Math.max(30000, Math.min(500000, numValue));
        this.calculateROI();
        this.render();
    }

    // UI Component Generators
    createSectionToggle(enabled, section) {
        const buttonClass = enabled ? 'toggle-button enabled' : 'toggle-button disabled';
        const iconName = enabled ? 'eye' : 'eye-off';
        const statusText = enabled ? 'Enabled' : 'Disabled';
        
        return `
            <button onclick="window.calculator.toggleSection('${section}')" class="${buttonClass}" title="Toggle ${section}">
                <i data-lucide="${iconName}" class="toggle-icon"></i>
                <span>${statusText}</span>
            </button>
        `;
    }

    createROICard(title, description, hours, dollarValue, section, enabled, colorClass) {
        const cardClass = enabled ? `roi-card enabled ${colorClass}` : 'roi-card disabled';
        
        return `
            <div class="${cardClass}">
                <div class="card-header">
                    <h4 class="card-title">${title}</h4>
                    ${this.createSectionToggle(enabled, section)}
                </div>
                <p class="card-description">${description}</p>
                ${hours !== undefined ? `
                    <div class="card-value ${colorClass}">
                        ${this.formatHours(hours)} hours
                    </div>
                    <div class="card-subvalue">
                        ${this.formatCurrency(dollarValue)} value
                    </div>
                ` : `
                    <div class="card-value ${colorClass}">
                        ${this.formatCurrency(dollarValue)}
                    </div>
                `}
            </div>
        `;
    }

    createAdditionalROICard(title, description, dollarValue, subtitle, section, enabled) {
        const cardClass = enabled ? 'roi-card enabled indigo' : 'roi-card disabled';
        
        return `
            <div class="${cardClass}">
                <div class="card-header">
                    <h4 class="card-title">${title}</h4>
                    ${this.createSectionToggle(enabled, section)}
                </div>
                <p class="card-description">${description}</p>
                <div class="card-value indigo">
                    ${this.formatCurrency(dollarValue)}
                </div>
                ${subtitle ? `<div class="card-subvalue">${subtitle}</div>` : ''}
            </div>
        `;
    }

    // Main Render Function
    render() {
        const container = document.getElementById(this.containerId);
        
        if (!container) {
            console.error(`Container with ID '${this.containerId}' not found`);
            return;
        }

        container.innerHTML = `
            <div class="calculator-wrapper">
                <div class="calculator-container">
                    <!-- Header -->
                    <div class="header">
                        <div class="header-content">
                            <div class="header-icon">
                                <i data-lucide="calculator" class="w-6 h-6"></i>
                            </div>
                            <div>
                                <h1 class="header-title">ROI Calculator</h1>
                                <p class="header-subtitle">Lucid Visual Collaboration Suite</p>
                            </div>
                        </div>
                        <p class="header-description">
                            Calculate your potential return on investment with Lucid's visual collaboration platform. 
                            Toggle sections on or off based on your specific use cases and organizational needs.
                        </p>
                    </div>

                    <!-- Input Section -->
                    <div class="input-section">
                        <div class="input-grid">
                            <div class="input-group">
                                <label class="input-label">
                                    <i data-lucide="users" class="label-icon"></i>
                                    Number of Lucid Users
                                </label>
                                <input
                                    type="number"
                                    value="${this.state.users}"
                                    onchange="window.calculator.updateUsers(this.value)"
                                    oninput="window.calculator.updateUsers(this.value)"
                                    class="input-field"
                                    min="1"
                                    max="10000"
                                    placeholder="Enter number of users"
                                />
                            </div>
                            <div class="input-group">
                                <label class="input-label">
                                    <i data-lucide="dollar-sign" class="label-icon"></i>
                                    Average Annual Salary
                                </label>
                                <input
                                    type="number"
                                    value="${this.state.avgSalary}"
                                    onchange="window.calculator.updateSalary(this.value)"
                                    oninput="window.calculator.updateSalary(this.value)"
                                    class="input-field"
                                    min="30000"
                                    max="500000"
                                    placeholder="Enter average salary"
                                />
                                <p class="input-help">
                                    Hourly rate: ${this.formatCurrency(this.state.results.hourlyRate)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Results Summary -->
                    <div class="results-section">
                        <div class="summary-grid">
                            <div class="summary-card emerald">
                                <div class="summary-header">
                                    <i data-lucide="clock" class="summary-icon"></i>
                                    <span class="summary-value">${this.formatHours(this.state.results.totalTimeSavings)}</span>
                                </div>
                                <p class="summary-label">Total Hours Saved Annually</p>
                            </div>
                            <div class="summary-card blue">
                                <div class="summary-header">
                                    <i data-lucide="dollar-sign" class="summary-icon"></i>
                                    <span class="summary-value">${this.formatCurrency(this.state.results.totalCostSavings)}</span>
                                </div>
                                <p class="summary-label">Cost Savings & Efficiency</p>
                            </div>
                            <div class="summary-card purple">
                                <div class="summary-header">
                                    <i data-lucide="trending-up" class="summary-icon"></i>
                                    <span class="summary-value">${this.formatCurrency(this.state.results.totalROI)}</span>
                                </div>
                                <p class="summary-label">Total Annual ROI</p>
                            </div>
                        </div>

                        <!-- Time Savings Section -->
                        <div class="section">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <i data-lucide="clock" class="section-icon emerald"></i>
                                    Time Savings
                                </h3>
                            </div>
                            <div class="card-grid">
                                ${this.createROICard(
                                    'Meeting Efficiency',
                                    'Asynchronous brainstorming replaces long meetings',
                                    this.state.results.meetingEfficiency?.hoursPerYear,
                                    this.state.results.meetingEfficiency?.dollarValue,
                                    'meetingEfficiency',
                                    this.state.enabledSections.meetingEfficiency,
                                    'emerald'
                                )}
                                ${this.createROICard(
                                    'Meeting Reduction',
                                    '83% reduction in cross-functional meetings',
                                    this.state.results.meetingReduction?.hoursPerYear,
                                    this.state.results.meetingReduction?.dollarValue,
                                    'meetingReduction',
                                    this.state.enabledSections.meetingReduction,
                                    'emerald'
                                )}
                            </div>
                        </div>

                        <!-- Travel Cost Savings Section -->
                        <div class="section">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <i data-lucide="plane" class="section-icon blue"></i>
                                    Travel Cost Savings
                                </h3>
                            </div>
                            <div class="card-grid">
                                ${this.createROICard(
                                    'Virtual Events',
                                    'Replace in-person events with virtual collaboration',
                                    undefined,
                                    this.state.results.virtualEvents?.costSavings,
                                    'virtualEvents',
                                    this.state.enabledSections.virtualEvents,
                                    'blue'
                                )}
                                ${this.createROICard(
                                    'Workshop Collaboration',
                                    'Online workshops replace travel',
                                    undefined,
                                    this.state.results.workshopCollaboration?.costSavings,
                                    'workshopCollaboration',
                                    this.state.enabledSections.workshopCollaboration,
                                    'blue'
                                )}
                            </div>
                        </div>

                        <!-- Productivity Improvements Section -->
                        <div class="section">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <i data-lucide="zap" class="section-icon purple"></i>
                                    Productivity Improvements
                                </h3>
                            </div>
                            <div class="card-grid">
                                ${this.createROICard(
                                    'Support Time Reduction',
                                    'Visual diagrams reduce triage time by 2.5 hours/week',
                                    this.state.results.supportTimeReduction?.hoursPerYear,
                                    this.state.results.supportTimeReduction?.dollarValue,
                                    'supportTimeReduction',
                                    this.state.enabledSections.supportTimeReduction,
                                    'purple'
                                )}
                                ${this.createROICard(
                                    'Brainstorming Efficiency',
                                    '2.5x more productive brainstorming sessions',
                                    this.state.results.brainstormingEfficiency?.hoursPerYear,
                                    this.state.results.brainstormingEfficiency?.dollarValue,
                                    'brainstormingEfficiency',
                                    this.state.enabledSections.brainstormingEfficiency,
                                    'purple'
                                )}
                            </div>
                        </div>

                        <!-- Additional ROI Benefits Section -->
                        <div class="section">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <i data-lucide="bar-chart-3" class="section-icon indigo"></i>
                                    Additional ROI Benefits
                                </h3>
                            </div>
                            <div class="card-grid three-col">
                                ${this.createAdditionalROICard(
                                    'Faster Onboarding',
                                    'Reduce engineer onboarding by 2-3 days',
                                    this.state.results.onboardingTimeReduction?.totalSavings,
                                    `${this.state.results.onboardingTimeReduction?.newHiresPerYear} new hires/year`,
                                    'onboardingTimeReduction',
                                    this.state.enabledSections.onboardingTimeReduction
                                )}
                                ${this.createAdditionalROICard(
                                    'Admin Time Reduction',
                                    '95% reduction in administrative tasks',
                                    this.state.results.adminTimeReduction?.dollarValue,
                                    null,
                                    'adminTimeReduction',
                                    this.state.enabledSections.adminTimeReduction
                                )}
                                ${this.createAdditionalROICard(
                                    'Pipeline Generation',
                                    '30-50% more time on pipeline activities',
                                    this.state.results.pipelineGeneration?.annualIncrease,
                                    `${this.state.results.pipelineGeneration?.salesReps} sales reps`,
                                    'pipelineGeneration',
                                    this.state.enabledSections.pipelineGeneration
                                )}
                            </div>
                        </div>

                        <!-- Assumptions Section -->
                        <div class="assumptions">
                            <h3 class="assumptions-title">Key Assumptions</h3>
                            <div class="assumptions-list">
                                <p>• Calculations based on real customer data from Lucid case studies</p>
                                <p>• Not all users will experience every benefit category</p>
                                <p>• Results may vary based on organization size, industry, and implementation</p>
                                <p>• Conservative estimates used for percentage of users affected by each benefit</p>
                                <p>• Annual salary converted to hourly rate using 2,080 hours (40 hours/week × 52 weeks)</p>
                                <p>• Use the toggle controls to enable only the sections relevant to your organization</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize Lucide icons after rendering
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    // Initialize the calculator
    init() {
        this.calculateROI();
        this.render();
        
        // Make calculator globally accessible for event handlers
        window.calculator = this;
        
        console.log('Lucid ROI Calculator initialized successfully');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        new LucidROICalculator('calculator-container');
    } catch (error) {
        console.error('Error initializing ROI Calculator:', error);
    }
});

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LucidROICalculator;
}