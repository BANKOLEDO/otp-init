import { describe, it, expect } from 'vitest';
import { COUNTRIES } from '../data/countries';

describe('countries data', () => {
  it('has at least 200 countries', () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(200);
  });

  it('each country has code, name, iso, and flag', () => {
    for (const c of COUNTRIES) {
      expect(c.code).toBeTruthy();
      expect(c.name).toBeTruthy();
      expect(c.iso).toBeTruthy();
      expect(c.flag).toBeTruthy();
    }
  });

  it('includes common countries', () => {
    const names = COUNTRIES.map((c) => c.name);
    expect(names).toContain('United States');
    expect(names).toContain('United Kingdom');
    expect(names).toContain('Nigeria');
    expect(names).toContain('India');
    expect(names).toContain('Germany');
  });

  it('has unique isos', () => {
    const isos = COUNTRIES.map((c) => c.iso);
    expect(new Set(isos).size).toBe(isos.length);
  });

  it('US has dial code +1', () => {
    const us = COUNTRIES.find((c) => c.iso === 'US');
    expect(us?.code).toBe('+1');
  });
});
