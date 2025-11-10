#!/usr/bin/env bash
# Add SmarterLogicWeb copyright headers
# Usage: bash ./add-copyright-headers.sh

set -euo pipefail

YEAR="2025"
AUTHOR="SmarterLogicWeb"
WEBSITE="https://smarterlogicweb.com"
LICENSE="MIT"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

is_text() {
  file "$1" | grep -qi "text"
}

has_header() {
  # Detect if header already present (first 10 lines)
  head -n 10 "$1" | grep -Eqi "SmarterLogicWeb|copyright|@license"
}

prepend_file() {
  local header="$1"
  local target="$2"
  local tmp
  tmp="$(mktemp)"
  printf "%s\n" "$header" > "$tmp"
  cat "$target" >> "$tmp"
  cat "$tmp" > "$target"
  rm -f "$tmp"
}

header_js_ts() {
  cat <<'EOF'
/**
 * @file Auto-added header by add-copyright-headers.sh
 * @author SmarterLogicWeb
 * @license MIT
 * @see https://smarterlogicweb.com
 * @copyright 2025 SmarterLogicWeb. All rights reserved.
 */
EOF
}

header_css() {
  cat <<'EOF'
/**
 * Auto-added header by add-copyright-headers.sh
 * 
 * @author SmarterLogicWeb
 * @see https://smarterlogicweb.com
 * @license MIT
 * @copyright 2025 SmarterLogicWeb. All rights reserved.
 */
EOF
}

should_skip() {
  local f="$1"
  # Skip generated or external dirs
  [[ "$f" =~ (^|/)(node_modules|.next|dist|out|.git|.vercel|.netlify|coverage|public)/ ]] && return 0
  # Skip lockfiles and binary assets
  [[ "$f" =~ \.(lock|png|jpg|jpeg|gif|webp|ico|svg|ttf|woff|woff2|eot|pdf)$ ]] && return 0
  # Skip specific files
  [[ "$(basename "$f")" == "LICENSE" ]] && return 0
  return 1
}

main() {
  local count=0
  while IFS= read -r -d '' file; do
    if should_skip "$file"; then
      continue
    fi
    if ! is_text "$file"; then
      continue
    fi
    if has_header "$file"; then
      continue
    fi

    case "$file" in
      *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs)
        prepend_file "$(header_js_ts)" "$file"
        ((count++))
        ;;
      *.css|*.scss)
        prepend_file "$(header_css)" "$file"
        ((count++))
        ;;
      *)
        # ignore other types
        ;;
    esac
  done < <(find "$ROOT" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.mjs" -o -name "*.cjs" -o -name "*.css" -o -name "*.scss" \) -print0)

  echo "Headers added to $count files."
}

main "$@"