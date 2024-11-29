import request from 'supertest';
import app from '../../Controller/app';

describe('User Controller Integration Tests', () => {
  let createdUserId: number;
  let cpf : string = generateRandomStringOfNumbers(11);
  let randomID : string = generateRandomString(6);
  const newUser = {
    nome: "teste " + randomID,
    dataNascimento: '1990-01-01',
    cpf: cpf,
    email: 'teste1'+randomID+'@example.com',
    senha: randomID,
    role: 'admin'
  };

  const updatedUser = {
    nome: "teste 2" + randomID,
    dataNascimento: '1990-01-01',
    cpf: cpf,
    email: 'teste2'+randomID+'@example.com',
    senha: 'novo'+randomID,
    role: 'admin'
  };

  test('Deve listar usuários (GET /api/usuarios)', async () => {
    const response = await request(app).get('/api/usuarios');
    console.log('Resposta - Listar Usuários:', response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Deve cadastrar um usuário (POST /api/usuario/cadastrar)', async () => {
    const response = await request(app).post('/api/usuario/cadastrar').send(newUser);
    
    console.log('Resposta - Cadastrar Usuário:', response.text);
    expect(response.status).toBe(201);

    const listResponse = await request(app).get('/api/usuarios');
    createdUserId = listResponse.body.find((user: any) => user.email == newUser.email && user.nome == newUser.nome)?.cod_usuario;
    expect(createdUserId).toBeDefined();
  });

  test('Deve buscar um usuário (GET /api/usuario/:cod_usuario)', async () => {
    const response = await request(app).get(`/api/usuario/${createdUserId}`);
    expect(response.status).toBe(302);
    expect(response.body).toHaveProperty('nome', newUser.nome);
  });

  test('Deve atualizar um usuário (PUT /api/usuario/atualizar/:cod_usuario)', async () => {

    const response = await request(app)
      .put(`/api/usuario/atualizar/${createdUserId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Usuário atualizado com sucesso.');

    const getResponse = await request(app).get(`/api/usuario/${createdUserId}`);
    expect(getResponse.body).toHaveProperty('email', updatedUser.email);
  });

  test('Deve deletar um usuário (DELETE /api/usuario/deletar/:cod_usuario)', async () => {
    const response = await request(app).delete(`/api/usuario/deletar/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Usuário deletado com sucesso.');

    // Verifica se foi realmente deletado
    const getResponse = await request(app).get(`/api/usuario/${createdUserId}`);
    expect(getResponse.status).toBe(404);
  });


  
});

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}

function generateRandomStringOfNumbers(length: number): string {
  const characters = '0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}
