import type { Env } from '../env';

export async function createDecision(env: Env, data: any) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO decisions
     (id, decision, reasoning, emotion, category, expectedOutcome, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    data.decision,
    data.reasoning,
    data.emotion,
    data.category,
    data.expectedOutcome,
    createdAt
  ).run();

  return { id, createdAt };
}

export async function getAllDecisions(env: Env) {
  return env.DB.prepare(
    `SELECT * FROM decisions ORDER BY createdAt DESC`
  ).all();
}

export async function getDecisionById(env: Env, id: string) {
  return env.DB.prepare(
    `SELECT * FROM decisions WHERE id = ?`
  ).bind(id).first();
}

export async function reviewDecision(env: Env, id: string, data: any) {
  await env.DB.prepare(
    `UPDATE decisions
     SET actualOutcome = ?, reviewedAt = ?, biasDetected = ?
     WHERE id = ?`
  ).bind(
    data.actualOutcome,
    new Date().toISOString(),
    JSON.stringify(data.biasDetected ?? []),
    id
  ).run();
}
