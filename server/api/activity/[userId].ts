interface Activity {
  id: number;
  userId: number;
  workout: string;
  minutes: number;
}

const activity: Activity[] = [
  { id: 1, userId: 1, workout: 'Walking', minutes: 60 },
  { id: 2, userId: 1, workout: 'Running', minutes: 45 },
  { id: 3, userId: 1, workout: 'Lifting', minutes: 25 },
  { id: 4, userId: 2, workout: 'Golf', minutes: 30 },
  { id: 5, userId: 2, workout: 'Skiing', minutes: 240 },
  { id: 6, userId: 3, workout: 'Walking', minutes: 145 },
  { id: 7, userId: 4, workout: 'Golf', minutes: 320 },
  { id: 8, userId: 4, workout: 'Running', minutes: 15 },
  { id: 9, userId: 4, workout: 'Lifting', minutes: 34 },
  { id: 10, userId: 4, workout: 'Walking', minutes: 109 },
  { id: 11, userId: 5, workout: 'Walking', minutes: 36 },
  { id: 12, userId: 5, workout: 'Golf', minutes: 240 },
  { id: 13, userId: 6, workout: 'Walking', minutes: 49 },
  { id: 14, userId: 6, workout: 'Lifting', minutes: 40 },
  { id: 15, userId: 7, workout: 'Walking', minutes: 93 },
  { id: 16, userId: 7, workout: 'Lifting', minutes: 47 },
  { id: 17, userId: 7, workout: 'Walking', minutes: 25 },
  { id: 18, userId: 7, workout: 'Lifting', minutes: 33 },
];

export default defineEventHandler((event: any) => {
  const { userId } = event.context.params;
  const filteredActivity = activity.filter((item) => item.userId === parseInt(userId, 10));
  return {
    activity: filteredActivity,
  };
});
