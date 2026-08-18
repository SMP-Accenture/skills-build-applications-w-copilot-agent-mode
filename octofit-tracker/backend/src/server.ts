import express from 'express';
import dotenv from 'dotenv';
import './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/fitness';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-api' });
});

const makeResponse = (entity: string, payload: unknown) => ({
  ok: true,
  message: `${entity} endpoint is ready`,
  baseUrl: codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`,
  data: payload,
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find({}).sort({ totalPoints: -1, name: 1 });
  res.json(makeResponse('Users', users));
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find({}).sort({ totalPoints: -1, name: 1 });
  res.json(makeResponse('Teams', teams));
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find({}).sort({ date: -1 });
  res.json(makeResponse('Activities', activities));
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ points: -1, rank: 1 });
  res.json(makeResponse('Leaderboard', leaderboard));
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).sort({ difficulty: 1, durationMinutes: 1 });
  res.json(makeResponse('Workouts', workouts));
});

app.listen(PORT, () => {
  console.log(`Octofit Tracker API listening on port ${PORT}`);
  console.log(
    `API base URL: ${codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${PORT}`}`
  );
});
