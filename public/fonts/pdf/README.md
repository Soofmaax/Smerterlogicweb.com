Local PDF fonts

Place the following TTF files in this directory to enable brand fonts in generated PDFs:

Required files:
- Inter-Regular.ttf
- Inter-Bold.ttf
- DMSans-Regular.ttf
- DMSans-Bold.ttf

Recommended sources:
- Inter: https://github.com/google/fonts/tree/main/ofl/inter/static
  - Direct links: 
    - https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Regular.ttf
    - https://github.com/google/fonts/raw/main/ofl/inter/static/Inter-Bold.ttf
- DM Sans: https://github.com/google/fonts/tree/main/ofl/dmsans/static
  - Direct links:
    - https://github.com/google/fonts/raw/main/ofl/dmsans/static/DMSans-Regular.ttf
    - https://github.com/google/fonts/raw/main/ofl/dmsans/static/DMSans-Bold.ttf

Notes:
- Files are read by lib/pdf-brand.ts from process.cwd()/public/fonts/pdf/... at runtime (nodejs).
- If files are missing, PDFs fall back to Helvetica. Text normalization replaces U+202F narrow no-break spaces with standard spaces to ensure compatibility.
- Consider committing these font files to the repository for deterministic builds and avoiding any external network dependency during CI.