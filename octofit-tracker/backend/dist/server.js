"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const fitness_1 = require("./models/fitness");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-api' });
});
const makeResponse = (entity, payload) => ({
    ok: true,
    message: `${entity} endpoint is ready`,
    baseUrl: codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${PORT}`,
    data: payload,
});
app.get('/api/users/', async (_req, res) => {
    const users = await fitness_1.User.find({}).sort({ totalPoints: -1, name: 1 });
    res.json(makeResponse('Users', users));
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await fitness_1.Team.find({}).sort({ totalPoints: -1, name: 1 });
    res.json(makeResponse('Teams', teams));
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await fitness_1.Activity.find({}).sort({ date: -1 });
    res.json(makeResponse('Activities', activities));
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await fitness_1.LeaderboardEntry.find({}).sort({ points: -1, rank: 1 });
    res.json(makeResponse('Leaderboard', leaderboard));
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await fitness_1.Workout.find({}).sort({ difficulty: 1, durationMinutes: 1 });
    res.json(makeResponse('Workouts', workouts));
});
app.listen(PORT, () => {
    console.log(`Octofit Tracker API listening on port ${PORT}`);
    console.log(`API base URL: ${codespaceName ? `https://${codespaceName}-8000.app.github.dev` : `http://localhost:${PORT}`}`);
});
