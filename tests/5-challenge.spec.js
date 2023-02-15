const { 
  getUserQuery,
  getExpectedResult,
  getConnectionSequelize,
  executeMySqlImport,
} = require('./utils');

const numberChallenge = 5;

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

  it('Deve retornar a quantidade de 2 supplies.', function () {
    expect(userResult[0]['COUNT(*)']).toBe(expectedResult);
  });
});