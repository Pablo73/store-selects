const { 
  getUserQuery,
  getExpectedResult,
  getConnectionSequelize,
  executeMySqlImport,
} = require('./utils');

const numberChallenge = 1;

describe(`Testa o exercício número: ${numberChallenge}`, function () {
  let sequelize;
  let userResult;
  let expectedResult;

  beforeAll(async function () {
    await executeMySqlImport();

    sequelize = getConnectionSequelize();

    expectedResult = await getExpectedResult(numberChallenge);
  
    const query = await getUserQuery(numberChallenge);

    userResult = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
  });

  afterAll(async function () {
    await sequelize.drop();
    await sequelize.close();
  });
  it('Deve retornar uma lista com dois itens.', function () {
    expect(userResult).toHaveLength(2);
  });
  
  it('Os itens da lista devem ter os campos id e name.', function () {
    expect(userResult[0]).toHaveProperty('id');
    expect(userResult[0]).toHaveProperty('name');
  });
  
  it('Os itens das lista devem ter apenas os campos id e name.', function () {
    const keysResult = Object.keys(userResult[0]);
    const keysExpected = Object.keys(expectedResult[0]);
    expect(keysResult).toEqual(keysExpected);
  });
  
  it('O primeiro item deve possuir o campo id com valor 3 e name com valor Grampola.', function () {
    expect(userResult[0].id).toBe(expectedResult[0].id);
    expect(userResult[0].name).toBe(expectedResult[0].name);
  });
  
  it('O segundo item deve possuir o campo id com valor 4 e name com valor Grapeta.', function () {
    expect(userResult[1].id).toBe(expectedResult[1].id);
    expect(userResult[1].name).toBe(expectedResult[1].name);
  });
});
