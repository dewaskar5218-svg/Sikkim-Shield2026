import { SecurityService, ServiceTier, Vehicle } from './types';

export const SERVICES: SecurityService[] = [
  {
    id: 'himalayan-guard',
    name: 'Himalayan Guard',
    tier: ServiceTier.BASIC,
    price: 4999,
    description: 'Essential security for urban driving in Gangtok.',
    features: ['GPS Tracking', 'Remote Lock/Unlock', 'Mobile App Access', 'Tamper Alerts']
  },
  {
    id: 'peak-sentry',
    name: 'Peak Sentry',
    tier: ServiceTier.ADVANCED,
    price: 12999,
    description: 'Enhanced surveillance for high-altitude explorers.',
    features: ['AI Intrusion Detection', 'Dual Dashcam Sync', 'Ignition Kill Switch', '24/7 Monitoring Center']
  },
  {
    id: 'skyline-surveillance',
    name: 'Skyline Surveillance',
    tier: ServiceTier.PREMIUM,
    price: 24999,
    description: 'The ultimate protection with live AI visual analysis.',
    features: ['Live Camera Feed', '360° Vision Scan', 'Emergency Response Link', 'Vehicle Health Diagnostics']
  }
];

export const VEHICLES: Vehicle[] = [
  { id: '1', brand: 'Mahindra', model: 'Thar', year: '2023', type: 'SUV' },
  { id: '2', brand: 'Tata', model: 'Nexon', year: '2022', type: 'SUV' },
  { id: '3', brand: 'Maruti Suzuki', model: 'Swift', year: '2024', type: 'Hatchback' },
  { id: '4', brand: 'Toyota', model: 'Hilux', year: '2023', type: 'SUV' }
];

export const SIKKIM_LOCATIONS = [
  'Gangtok', 'Namchi', 'Geyzing', 'Mangan', 'Ravangla', 'Pelling', 'Rangpo', 'Lachung'
];