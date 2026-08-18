import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/fitness';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@merington.edu',
        age: 16,
        fitnessLevel: 'Advanced',
        team: 'Blue Hawks',
        goals: ['Run 5K', 'Improve flexibility'],
        streakDays: 14,
        totalPoints: 1500,
      },
      {
        name: 'Leo Martinez',
        email: 'leo.martinez@merington.edu',
        age: 15,
        fitnessLevel: 'Intermediate',
        team: 'Blue Hawks',
        goals: ['Increase strength', 'Track daily steps'],
        streakDays: 10,
        totalPoints: 1320,
      },
      {
        name: 'Nina Patel',
        email: 'nina.patel@merington.edu',
        age: 17,
        fitnessLevel: 'Intermediate',
        team: 'Red Falcons',
        goals: ['Build endurance', 'Join team challenge'],
        streakDays: 9,
        totalPoints: 1280,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@merington.edu',
        age: 16,
        fitnessLevel: 'Beginner',
        team: 'Red Falcons',
        goals: ['Lose weight', 'Learn proper form'],
        streakDays: 7,
        totalPoints: 1110,
      },
    ]);

    await Team.insertMany([
      {
        name: 'Blue Hawks',
        sport: 'Cross Country',
        captain: 'Ava Thompson',
        members: users.slice(0, 2).map((user) => user.name),
        totalPoints: 2820,
      },
      {
        name: 'Red Falcons',
        sport: 'Basketball',
        captain: 'Nina Patel',
        members: users.slice(2).map((user) => user.name),
        totalPoints: 2390,
      },
    ]);

    await Activity.insertMany([
      {
        user: 'Ava Thompson',
        type: 'Running',
        durationMinutes: 42,
        distanceKm: 6.8,
        caloriesBurned: 520,
        date: new Date('2026-08-12T06:00:00Z'),
      },
      {
        user: 'Leo Martinez',
        type: 'Strength',
        durationMinutes: 35,
        distanceKm: 0,
        caloriesBurned: 410,
        date: new Date('2026-08-13T15:30:00Z'),
      },
      {
        user: 'Nina Patel',
        type: 'Cycling',
        durationMinutes: 50,
        distanceKm: 16.5,
        caloriesBurned: 610,
        date: new Date('2026-08-14T18:00:00Z'),
      },
      {
        user: 'Marcus Lee',
        type: 'Walking',
        durationMinutes: 30,
        distanceKm: 3.2,
        caloriesBurned: 210,
        date: new Date('2026-08-15T07:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: 'Ava Thompson', team: 'Blue Hawks', points: 1500, rank: 1, change: 1 },
      { user: 'Leo Martinez', team: 'Blue Hawks', points: 1320, rank: 2, change: 2 },
      { user: 'Nina Patel', team: 'Red Falcons', points: 1280, rank: 3, change: 0 },
      { user: 'Marcus Lee', team: 'Red Falcons', points: 1110, rank: 4, change: -1 },
    ]);

    await Workout.insertMany([
      {
        title: 'Sprint Intervals',
        focusArea: 'Cardio',
        difficulty: 'Challenging',
        durationMinutes: 25,
        equipment: ['Cones'],
        description: 'Alternate between sprinting and walking recovery to build endurance and speed.',
        recommendedFor: ['Advanced', 'Intermediate'],
      },
      {
        title: 'Core Circuit',
        focusArea: 'Core',
        difficulty: 'Moderate',
        durationMinutes: 20,
        equipment: ['Mat'],
        description: 'Target the abs, obliques, and lower back with bodyweight exercises.',
        recommendedFor: ['Beginner', 'Intermediate'],
      },
      {
        title: 'Leg Strength Builder',
        focusArea: 'Legs',
        difficulty: 'Moderate',
        durationMinutes: 30,
        equipment: ['Dumbbells', 'Bench'],
        description: 'Build lower body power with squats, lunges, and Romanian deadlifts.',
        recommendedFor: ['Intermediate', 'Advanced'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
