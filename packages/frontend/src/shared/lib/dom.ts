export function getRootVariables() {
  type CSSRuleWithStyle = CSSRule & { style: CSSStyleDeclaration };

  return Array.from(document.styleSheets)
    .filter(
      (sheet: StyleSheet): sheet is CSSStyleSheet =>
        sheet.href === null || sheet.href.startsWith(window.location.origin),
    )
    .reduce<string[]>(
      (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce<string[]>(
            (def, rule) =>
              (def =
                (rule as CSSStyleRule).selectorText === ':root'
                  ? [
                      ...def,
                      ...Array.from((rule as CSSRuleWithStyle).style).filter(
                        (name) => name.startsWith('--'),
                      ),
                    ]
                  : def),
            [],
          ),
        ]),
      [],
    );
}
