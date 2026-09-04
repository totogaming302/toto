/**
 * Crisis Room Simulator Macroeconomic Mathematical Engine
 * Models the interdependent trade-offs of central bank & fiscal policy levers.
 */

export interface SimulatorInputs {
  forexIntervention: number;   // 0 - 30 ($Billion USD sold from reserves)
  interestRateHike: number;    // 0 - 500 (Basis points added to BI-Rate)
  lcsExpansion: number;        // 0 - 60 (% bilateral trade under LCS)
  importSubstitution: boolean; // Active / Inactive
}

export type HealthStatusType = 'high' | 'vulnerable' | 'bailout' | 'crisis';

export interface SimulatorOutputs {
  spotRate: number;            // IDR / USD (e.g., 17,500 down to ~15,000)
  inflation: number;           // % (e.g., 8.5% down to ~3.5%)
  gdpGrowth: number;           // % (e.g., 4.2% down to 2.2% or up to 4.8%)
  forexReserves: number;       // $B (135 down to 105)
  importCoverMonths: number;   // Months of import capacity
  status: HealthStatusType;
  statusLabel: string;
  statusColor: string;
  summaryWarning: string;
}

export const BASE_CRISIS_INPUTS: SimulatorInputs = {
  forexIntervention: 0,
  interestRateHike: 0,
  lcsExpansion: 0,
  importSubstitution: false
};

const BASE_SPOT_RATE = 17500;
const BASE_INFLATION = 8.5;
const BASE_GDP_GROWTH = 4.2;
const BASE_RESERVES = 135.0;
const MONTHLY_IMPORT_REQUIREMENT = 18.75; // $B per month

/**
 * Calculates macroeconomic consequences based on user-manipulated policy levers.
 */
export function calculateMacroEconomy(inputs: SimulatorInputs): SimulatorOutputs {
  const { forexIntervention, interestRateHike, lcsExpansion, importSubstitution } = inputs;

  // 1. Forex Reserves ($B) and Import Cover (Months)
  const forexReserves = Math.max(0, BASE_RESERVES - forexIntervention);
  const importCoverMonths = +(forexReserves / MONTHLY_IMPORT_REQUIREMENT).toFixed(1);

  // 2. Spot Rate (USD/IDR)
  // Intervention directly injects USD liquidity (-Rp 68 per $1B)
  // Rate hikes curb capital outflow (-Rp 2 per 1 bps)
  // LCS reduces systemic USD reliance (-Rp 9 per 1% LCS)
  // Import substitution relieves structural FX demand (-Rp 260)
  let spotRate = BASE_SPOT_RATE
    - (forexIntervention * 68)
    - (interestRateHike * 2.1)
    - (lcsExpansion * 8.5)
    - (importSubstitution ? 260 : 0);

  // Bounded within realistic emergency range (Rp 14,800 to Rp 17,500)
  spotRate = Math.max(14800, Math.min(BASE_SPOT_RATE, Math.round(spotRate)));

  // 3. Inflation Rate (%)
  // Appreciation dampens imported inflation
  const currencyRelief = (BASE_SPOT_RATE - spotRate) * 0.00085;
  // Rate hike cools aggregate demand and credit creation
  const monetaryTighteningRelief = interestRateHike * 0.0048;
  // LCS minimizes currency conversion friction
  const lcsRelief = lcsExpansion * 0.009;
  // Import substitution buffers domestic costs
  const subRelief = importSubstitution ? 0.45 : 0;

  let inflation = BASE_INFLATION - currencyRelief - monetaryTighteningRelief - lcsRelief - subRelief;
  inflation = Math.max(2.8, Math.min(9.5, +inflation.toFixed(2)));

  // 4. GDP Growth Rate (%)
  // Benefit: Exchange rate stabilization restores business certainty
  const stabilityBenefit = (BASE_SPOT_RATE - spotRate) * 0.00028;
  // Trade-off: High interest rates cause credit crunch and cool consumption
  const interestPenalty = interestRateHike * 0.0036;
  // Benefit: Domestic import substitution spurs local factories and employment
  const substitutionBoost = importSubstitution ? 0.4 : 0;
  // Benefit: Frictionless bilateral settlements
  const lcsBoost = lcsExpansion * 0.006;
  // Trade-off: Depleted reserves raise country risk premium
  const reserveStrain = forexReserves < 115 ? ((115 - forexReserves) * 0.02) : 0;

  let gdpGrowth = BASE_GDP_GROWTH + stabilityBenefit - interestPenalty + substitutionBoost + lcsBoost - reserveStrain;
  gdpGrowth = Math.max(1.5, Math.min(5.5, +gdpGrowth.toFixed(2)));

  // 5. Health Status & Vulnerability Classification
  let status: HealthStatusType = 'crisis';
  let statusLabel = '[DARURAT KRISIS]';
  let statusColor = '#EF4444';
  let summaryWarning = 'Rupiah terdevaluasi parah (-30%), memicu gelombang imported inflation tak terkendali.';

  if (importCoverMonths < 5.8 || forexReserves <= 108) {
    status = 'bailout';
    statusLabel = '[RISIKO BAILOUT IMF]';
    statusColor = '#F97316';
    summaryWarning = 'Cadangan devisa terkuras drastis akibat intervensi agresif; mendekati ambang darurat likuiditas global.';
  } else if (gdpGrowth < 2.6) {
    status = 'crisis';
    statusLabel = '[DARURAT KRISIS // RESESI]';
    statusColor = '#EF4444';
    summaryWarning = 'Kenaikan suku bunga yang kelewat ekstrem melumpuhkan kredit perbankan dan membunuh pertumbuhan PDB.';
  } else if (inflation <= 5.2 && spotRate <= 15850 && gdpGrowth >= 3.6 && forexReserves >= 115) {
    status = 'high';
    statusLabel = '[RESILIENSI TINGGI]';
    statusColor = '#10B981';
    summaryWarning = 'Keseimbangan makro berhasil dipulihkan: kurs stabil, inflasi terkendali, tanpa membakar cadangan devisa nasional.';
  } else if (spotRate < BASE_SPOT_RATE || inflation < BASE_INFLATION) {
    status = 'vulnerable';
    statusLabel = '[RAWAN // TRANSISI]';
    statusColor = '#F59E0B';
    summaryWarning = 'Stabilitas mulai membaik, namun masih rentan terhadap tekanan likuiditas valas dan sentimen pasar.';
  }

  return {
    spotRate,
    inflation,
    gdpGrowth,
    forexReserves: +forexReserves.toFixed(1),
    importCoverMonths,
    status,
    statusLabel,
    statusColor,
    summaryWarning
  };
}

/**
 * Detects whether the current device has low computing power or high display constraints
 * (e.g., Android Smartboards, interactive flat panels, low CPU core counts, or budget mobile devices).
 */
export function isSluggishDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const isSmartBoard = /SmartTV|Tizen|NetCast|Web0S|LargeScreen|CrKey|SmartBoard|ViewSonic|IFP|Interactive/i.test(ua);
  const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
  const lowMemory = typeof (navigator as any).deviceMemory === 'number' && (navigator as any).deviceMemory <= 4;
  return isAndroid || isSmartBoard || lowCores || lowMemory;
}
