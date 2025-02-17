import mapFirst from 'mapFirst';

import type { TLazy } from 'genEnforceLazy';
import * as ruleReturn from 'ruleReturn';
import type { TRuleDetailedResult } from 'ruleReturn';
import runLazyRule from 'runLazyRule';

export function allOf(value: unknown, ...rules: TLazy[]): TRuleDetailedResult {
  return ruleReturn.defaultToPassing(
    mapFirst(rules, (rule, breakout) => {
      const res = runLazyRule(rule, value);
      if (!res.pass) {
        breakout(res);
      }
    })
  );
}
