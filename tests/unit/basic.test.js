import { describe, it, expect } from 'vitest';
import { execFileSync } from 'child_process';
import fs from 'fs';

describe('bulk-file-creator basic CLI', () => {
  it('Check if index.js exists', () => {
    expect(fs.existsSync('index.js')).toBe(true);
  });

  it('CLI can be started without help (no error)', () => {
    const output = execFileSync('node', ['index.js', '--help']).toString();
    expect(output).toMatch(/Usage|source|target/i);
  });
});
