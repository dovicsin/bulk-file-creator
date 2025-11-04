import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import xlsx from 'xlsx';

function mkdtemp() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'bfc-test-'));
}

describe('bulk-file-creator end-to-end', () => {
  let tmpIn, tmpOut;

  beforeAll(() => {
    tmpIn = path.join(mkdtemp(), 'input.xlsx');
    tmpOut = mkdtemp();

    const data = [
      ['name', 'extension', 'TITLE', 'DESC'],
      ['alpha', 'txt', 'Hello', 'World'],
      ['beta', 'env', 'KEY', 'VALUE']
    ];
    const ws = xlsx.utils.aoa_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, tmpIn);
  });

  afterAll(() => {
    fs.rmSync(tmpOut, { recursive: true, force: true });
  });

  it('creates the files', () => {
    execFileSync('node', [
      'index.js',
      '--source', tmpIn,
      '--target', tmpOut,
      '--dirs', 'true',
      '--addheaderkey', 'true'
    ], { stdio: 'inherit' });

    const f1 = path.join(tmpOut, 'Sheet1', 'alpha', 'alpha.txt');
    const f2 = path.join(tmpOut, 'Sheet1', 'beta', 'beta.env');
    expect(fs.existsSync(f1)).toBe(true);
    expect(fs.existsSync(f2)).toBe(true);

    const content1 = fs.readFileSync(f1, 'utf8');
    expect(content1).toContain('TITLE=Hello');
    expect(content1).toContain('DESC=World');
  });
});
