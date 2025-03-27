/**
 * Options storage utility for Tooltip Dictionary
 * Manages extension options using browser.storage
 */

import { browser } from 'wxt/browser';

/**
 * Interface for extension options
 */
export interface TooltipOptions {
  active: boolean;
  tooltipYOffset: number;
  tooltipYPosition: string;
  fontSize: number;
  fontWeight: string;
  textColor: string;
  backgroundGradColorTop: string;
  backgroundGradColorBottom: string;
  borderColor: string;
  delayTime: number;
}

/**
 * Default extension options
 */
export const defaultOptions: TooltipOptions = {
  active: true,
  tooltipYOffset: 30,
  tooltipYPosition: "down",
  fontSize: 9,
  fontWeight: "normal",
  textColor: "#333333", // Darker text for better contrast in light mode
  backgroundGradColorTop: "#ffffff",
  backgroundGradColorBottom: "#f9fafc", // Light gray background for Toss-inspired design
  borderColor: "#dfe3e9", // Subtle border color
  delayTime: 200
};

/**
 * Gets options from browser storage
 * @param keys - Optional array of option keys to retrieve
 * @returns Promise that resolves with the options
 */
export async function getOptions<K extends keyof TooltipOptions>(
  keys?: K[] | null
): Promise<Pick<TooltipOptions, K>> {
  const result = await browser.storage.sync.get(keys || null) as Partial<TooltipOptions>;
  
  // If no keys are specified, return all options with defaults
  if (!keys) {
    return { ...defaultOptions, ...result } as Pick<TooltipOptions, K>;
  }
  
  // Otherwise return only requested keys with defaults
  const options: Partial<Pick<TooltipOptions, K>> = {};
  for (const key of keys) {
    options[key] = key in result ? result[key] as TooltipOptions[K] : defaultOptions[key];
  }
  
  return options as Pick<TooltipOptions, K>;
}

/**
 * Saves options to browser storage
 * @param options - Options to save
 * @returns Promise that resolves when options are saved
 */
export async function setOptions(options: Partial<TooltipOptions>): Promise<void> {
  await browser.storage.sync.set(options);
}
