interface User {
  id: number;
  name: string;
  team: string;
}

const users: User[] = [
  { id: 1, name: 'Fred', team: 'A' },
  { id: 2, name: 'Patrick', team: 'B' },
  { id: 3, name: 'Jon', team: 'A' },
  { id: 4, name: 'Aaron', team: 'A' },
  { id: 5, name: 'Katie', team: 'B' },
  { id: 6, name: 'Pete', team: 'B' },
  { id: 7, name: 'Gerard', team: 'A' },
];

export default defineEventHandler(() => ({
  users,
}));
