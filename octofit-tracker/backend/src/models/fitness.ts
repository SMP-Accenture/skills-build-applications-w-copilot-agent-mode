import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    team: { type: String, required: true },
    goals: [{ type: String }],
    streakDays: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String }],
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    change: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], default: 'Moderate' },
    durationMinutes: { type: Number, required: true },
    equipment: [{ type: String }],
    description: { type: String, required: true },
    recommendedFor: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema, 'users');
export const Team = mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout = mongoose.model('Workout', workoutSchema, 'workouts');

export type UserDocument = InferSchemaType<typeof userSchema>;
export type TeamDocument = InferSchemaType<typeof teamSchema>;
export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;
export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
