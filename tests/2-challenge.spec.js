const { 
  getUserQuery,
  getExpectedResult,
  getConnectionSequelize,
  executeMySqlImport,
} = require('./utils');

const numberChallenge = 2;

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

  it('Deve retornar uma lista com três supplies.', function () {
    expect(userResult).toHaveLength(3);
  });

  it('Os itens da lista devem ter os campos id, item_id, supplier_id e price.', function () {
    expect(userResult[0]).toHaveProperty('id');
    expect(userResult[0]).toHaveProperty('item_id');
    expect(userResult[0]).toHaveProperty('supplier_id');
    expect(userResult[0]).toHaveProperty('price');
  });
  
  it('Os itens das lista devem ter apenas os campos id, item_id, supplier_id e price.', function () {
    const keysResult = Object.keys(userResult[0]);
    const keysExpected = Object.keys(expectedResult[0]);
    expect(keysResult).toEqual(keysExpected);
  });

  it(`O primeiro item deve possuir os campos:
  id com valor 3,
  item_id com valor 2,
  supplier_id com valor CNF,
  price com valor 20.`, function () {
    expect(userResult[0].id).toBe(expectedResult[0].id);
    expect(userResult[0].item_id).toBe(expectedResult[0].item_id);
    expect(userResult[0].supplier_id).toBe(expectedResult[0].supplier_id);
    expect(userResult[0].price).toBe(expectedResult[0].price);
  });

  it(`O segundo item deve possuir os campos:
  id com valor 5,
  item_id com valor 2,
  supplier_id com valor MAP,
  price com valor 14.`, function () {
    expect(userResult[1].id).toBe(expectedResult[1].id);
    expect(userResult[1].item_id).toBe(expectedResult[1].item_id);
    expect(userResult[1].supplier_id).toBe(expectedResult[1].supplier_id);
    expect(userResult[1].price).toBe(expectedResult[1].price);
  });

  it(`O terceiro item deve possuir os campos:
  id com valor 4,
  item_id com valor 2,
  supplier_id com valor ROB,
  price com valor 25.`, function () {
    expect(userResult[2].id).toBe(expectedResult[2].id);
    expect(userResult[2].item_id).toBe(expectedResult[2].item_id);
    expect(userResult[2].supplier_id).toBe(expectedResult[2].supplier_id);
    expect(userResult[2].price).toBe(expectedResult[2].price);
  });
});