import { describe, it, expect } from 'vitest';
import { lightTheme, darkTheme } from '../theme/theme';

describe('theme', () => {
  it('light theme has correct primary color', () => {
    expect(lightTheme.palette.primary.main).toBe('#e8590c');
  });

  it('dark theme has correct primary color', () => {
    expect(darkTheme.palette.primary.main).toBe('#ff6b2b');
  });

  it('light theme has light mode background', () => {
    expect(lightTheme.palette.background.default).toBe('#f5f5f0');
  });

  it('dark theme has dark mode background', () => {
    expect(darkTheme.palette.background.default).toBe('#111110');
  });

  it('both themes use DM Sans', () => {
    expect(lightTheme.typography.fontFamily).toContain('DM Sans');
    expect(darkTheme.typography.fontFamily).toContain('DM Sans');
  });

  it('button border radius is pill (999)', () => {
    const btn = lightTheme.components?.MuiButton?.styleOverrides?.root as any;
    expect(btn.borderRadius).toBe(999);
  });

  it('card border radius is 20', () => {
    const card = lightTheme.components?.MuiCard?.styleOverrides?.root as any;
    expect(card.borderRadius).toBe(20);
  });

  it('h1 has negative letter spacing', () => {
    expect(lightTheme.typography.h1.letterSpacing).toBe('-0.03em');
  });

  it('light mode text primary is dark', () => {
    expect(lightTheme.palette.text.primary).toBe('#1a1816');
  });

  it('dark mode text primary is light', () => {
    expect(darkTheme.palette.text.primary).toBe('#eeede8');
  });

  it('success color exists in both themes', () => {
    expect(lightTheme.palette.success.main).toBeTruthy();
    expect(darkTheme.palette.success.main).toBeTruthy();
  });
});
