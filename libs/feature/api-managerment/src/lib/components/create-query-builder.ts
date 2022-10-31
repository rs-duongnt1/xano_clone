export const createQueryBuilder = (condition) => {
  let query = 'const queryBuilder = createQueryBuilder()';
  function createWhereQueryBuilder(condition) {
    if (condition.rules) {
      for (const [index, rule] of condition.rules.entries()) {
        if (rule.rules && rule.rules.length > 0) {
          if (rule.rules[0].operator) {
            const combinatorFunc =
              index === 0
                ? 'where'
                : condition.combinator === 'and'
                ? 'andWhere'
                : 'orWhere';
            query += `.${combinatorFunc}(new Brackets((qb) => { qb`;
            createWhereQueryBuilder(rule);
            query += '}))';
          }
        } else {
          if (rule.operator) {
            const combinatorFunc =
              index === 0
                ? 'where'
                : condition.combinator === 'and'
                ? 'andWhere'
                : 'orWhere';
            query += `.${combinatorFunc}("${rule.field} ${rule.operator} ${rule.value}")`;
          }
        }
      }
    }

    return query;
  }

  return createWhereQueryBuilder(condition);
};
