const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

// RN 0.79 pins fmt 11.0.2, whose consteval format-string checking is rejected by
// Clang 21 (Xcode 26) as a non-constant expression, so Pods/fmt fails to build.
// Fixed upstream in fmt 11.1, and sidestepped entirely on RN 0.81+ which ships a
// prebuilt core. On 0.79 the only lever is the source, so force fmt's
// non-consteval path: format strings are then checked at runtime instead.
const PATCH = `
    fmt_base = File.join(__dir__, 'Pods', 'fmt', 'include', 'fmt', 'base.h')
    if File.exist?(fmt_base)
      original = File.read(fmt_base)
      patched = original.gsub(/^#  define FMT_USE_CONSTEVAL 1$/, '#  define FMT_USE_CONSTEVAL 0')
      if patched != original
        File.chmod(0644, fmt_base)
        File.write(fmt_base, patched)
      end
    end
`;

const ANCHOR = 'post_install do |installer|';

module.exports = function withFmtConstevalFix(config) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      const contents = fs.readFileSync(podfile, 'utf8');

      if (contents.includes('FMT_USE_CONSTEVAL')) {
        return cfg;
      }
      if (!contents.includes(ANCHOR)) {
        throw new Error(
          `withFmtConstevalFix: no "${ANCHOR}" hook found in ${podfile}; the Podfile template changed.`
        );
      }

      fs.writeFileSync(podfile, contents.replace(ANCHOR, `${ANCHOR}\n${PATCH}`));
      return cfg;
    },
  ]);
};
