const {
  getUserQuery,
  getExpectedResult,
  getConnectionSequelize,
  executeMySqlImport,
} = require('./utils');

const numberChallenge = 3;

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

  it('Deve retornar uma lista com quatro supplies.', function () {
    expect(userResult).toHaveLength(4);
  });

  it('Os itens da lista devem ter os campos item_id, price e supplier_id.', function () {
    expect(userResult[0]).toHaveProperty('item_id');
    expect(userResult[0]).toHaveProperty('price');
    expect(userResult[0]).toHaveProperty('supplier_id');
  });

  it('Os itens das lista devem ter apenas os campos item_id, price e supplier_id.', function () {
    const keysResult = Object.keys(userResult[0]);
    const keysExpected = Object.keys(expectedResult[0]);
    expect(keysResult).toEqual(keysExpected);
  });

  it(`O primeiro item deve possuir os campos:
  item_id com valor 1,
  price com valor 10, 
  supplier_id com valor CNF.
  `, function () {
    expect(userResult[0].item_id).toBe(expectedResult[0].item_id);
    expect(userResult[0].price).toBe(expectedResult[0].price);
    expect(userResult[0].supplier_id).toBe(expectedResult[0].supplier_id);
  });

  it(`O segundo item deve possuir os campos:
  item_id com valor 2,
  price com valor 20,
  supplier_id com valor CNF.
  `, function () {
    expect(userResult[1].item_id).toBe(expectedResult[1].item_id);
    expect(userResult[1].price).toBe(expectedResult[1].price);
    expect(userResult[1].supplier_id).toBe(expectedResult[1].supplier_id);
  });

  it(`O terceiro item deve possuir os campos:
  item_id com valor 3,
  price com valor 50,
  supplier_id com valor INF.
  `, function () {
    expect(userResult[2].item_id).toBe(expectedResult[2].item_id);
    expect(userResult[2].price).toBe(expectedResult[2].price);
    expect(userResult[2].supplier_id).toBe(expectedResult[2].supplier_id);
  });

  it(`O quarto item deve possuir os campos:
  item_id com valor 4,
  price com valor 5,
  supplier_id com valor CNF.
  `, function () {
    expect(userResult[3].item_id).toBe(expectedResult[3].item_id);
    expect(userResult[3].price).toBe(expectedResult[3].price);
    expect(userResult[3].supplier_id).toBe(expectedResult[3].supplier_id);
  });
});