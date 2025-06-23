// plans.js - UPDATED

const plansData = {
  // --- Attendance Product ---
  attendance: {
    basic: {
      key: 'basic',
      price: 5,
      descriptionKey: 'desc_attendance_basic',
      features: [
        'feature_platform_access', 
        'feature_all_reports', 
        'feature_entry_exit_stamping',
        'feature_realtime_data',
      ]
    },
    advanced: {
      key: 'advanced',
      price: 7,
      isRecommended: true,
      descriptionKey: 'desc_attendance_advanced',
      features: [
        'feature_platform_access', 'feature_all_reports', 'feature_entry_exit_stamping',
        'feature_realtime_data', 'feature_multi_device_sync', 'feature_pro_reminders',
        'feature_pro_gps_reporting', 'feature_pro_exceptions_handling'
      ]
    },
    premium: {
      key: 'premium',
      price: 9,
      descriptionKey: 'desc_attendance_premium',
      features: [
        'feature_platform_access', 'feature_all_reports', 'feature_entry_exit_stamping',
        'feature_realtime_data', 'feature_multi_device_sync', 'feature_pro_reminders',
        'feature_pro_gps_reporting', 'feature_pro_exceptions_handling', 
        'feature_prem_projects', 'feature_prem_api_access', 'feature_prem_custom_reports'
      ]
    }
  },
  // --- Shift Organization Product ---
  shift_organize: {
    basic: {
      key: 'basic',
      price: 9,
      descriptionKey: 'desc_shift_basic',
      features: [
        'feature_shift_templates', 
        'feature_employee_requests', 
        'feature_labor_law_alerts', 
        'feature_mobile_app_access'
      ]
    },
    advanced: {
      key: 'advanced',
      price: 11,
      isRecommended: true,
      descriptionKey: 'desc_shift_advanced',
      features: [
        'feature_shift_templates', 'feature_employee_requests', 'feature_auto_scheduling_basic',
        'feature_labor_law_alerts', 'feature_mobile_app_access', 'feature_pro_ai_scheduling',
        'feature_pro_shift_swaps', 'feature_pro_budget_management'
      ]
    },
    premium: {
      key: 'premium',
      price: 13,
      descriptionKey: 'desc_shift_premium',
      features: [
        'feature_shift_templates', 'feature_employee_requests', 'feature_auto_scheduling_basic',
        'feature_labor_law_alerts', 'feature_mobile_app_access', 'feature_pro_ai_scheduling',
        'feature_pro_shift_swaps', 'feature_pro_budget_management', 
        'feature_prem_multi_location', 'feature_prem_employee_rating', 'feature_prem_advanced_analytics'
      ]
    }
  },
  // --- Combined Product ---
  combined: {
    basic: {
      key: 'basic',
      price: 12,
      descriptionKey: 'desc_combined_basic',
      features: [
        'feature_all_reports', 
        'feature_entry_exit_stamping', 
        'feature_shift_templates',
        'feature_employee_requests'
      ]
    },
    advanced: {
      key: 'advanced',
      price: 15,
      isRecommended: true,
      descriptionKey: 'desc_combined_advanced',
      features: [
        'feature_all_reports', 'feature_entry_exit_stamping', 'feature_shift_templates',
        'feature_employee_requests', 'feature_realtime_data', 'feature_pro_gps_reporting',
        'feature_pro_ai_scheduling', 'feature_pro_budget_management'
      ]
    },
    premium: {
      key: 'premium',
      price: 18,
      descriptionKey: 'desc_combined_premium',
      features: [
        'feature_all_reports', 'feature_entry_exit_stamping', 'feature_shift_templates',
        'feature_employee_requests', 'feature_realtime_data', 'feature_pro_gps_reporting',
        'feature_pro_ai_scheduling', 'feature_pro_budget_management', 
        'feature_prem_api_access', 'feature_prem_multi_location', 'feature_prem_advanced_analytics'
      ]
    }
  }
};