/**
 * Dados exclusivamente simulados para a Etapa 3.
 * Substituir por consultas ao Firestore na Etapa 5; não representa persistência real.
 */
export type Contact = {
  id: string;
  nome: string;
  email: string;
  createdAt: string;
};

export const mockContacts: Contact[] = [
  {
    id: "mock-1",
    nome: "Mariana Costa",
    email: "mariana.costa@example.com",
    createdAt: "2026-10-15T10:30:00.000Z",
  },
  {
    id: "mock-2",
    nome: "Rafael Almeida",
    email: "rafael.almeida@example.com",
    createdAt: "2026-10-16T14:15:00.000Z",
  },
  {
    id: "mock-3",
    nome: "Camila Oliveira",
    email: "camila.oliveira@example.com",
    createdAt: "2026-10-18T09:00:00.000Z",
  },
];