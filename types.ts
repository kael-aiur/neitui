export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  logo: string;
  description?: string;
  type: 'Engineering' | 'Product' | 'Design' | 'Marketing' | 'Sales';
  postedAt: string;
}

export interface ReferrerStats {
  totalReferrals: number;
  interviews: number;
  offers: number;
}

export enum ReferrerTab {
  DASHBOARD = 'dashboard',
  MY_POSTS = 'my_posts',
  CREATE_POST = 'create_post'
}

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'ByteDance',
    location: 'Beijing',
    salary: '40k - 70k',
    tags: ['React', 'TypeScript', 'Next.js'],
    logo: 'https://picsum.photos/id/1/200/200',
    type: 'Engineering',
    postedAt: '2 days ago'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Tencent',
    location: 'Shenzhen',
    salary: '30k - 50k',
    tags: ['Social', 'Strategy', 'UX'],
    logo: 'https://picsum.photos/id/2/200/200',
    type: 'Product',
    postedAt: '1 day ago'
  },
  {
    id: '3',
    title: 'Backend Developer (Go)',
    company: 'Alibaba',
    location: 'Hangzhou',
    salary: '35k - 60k',
    tags: ['Go', 'Microservices', 'K8s'],
    logo: 'https://picsum.photos/id/3/200/200',
    type: 'Engineering',
    postedAt: '3 hours ago'
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: 'Meituan',
    location: 'Beijing',
    salary: '25k - 45k',
    tags: ['Figma', 'Design System'],
    logo: 'https://picsum.photos/id/4/200/200',
    type: 'Design',
    postedAt: '5 days ago'
  },
   {
    id: '5',
    title: 'Algorithm Engineer',
    company: 'ByteDance',
    location: 'Shanghai',
    salary: '50k - 90k',
    tags: ['ML', 'Python', 'Recommendation'],
    logo: 'https://picsum.photos/id/1/200/200',
    type: 'Engineering',
    postedAt: '1 week ago'
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    company: 'Nio',
    location: 'Shanghai',
    salary: '20k - 35k',
    tags: ['Brand', 'Events'],
    logo: 'https://picsum.photos/id/6/200/200',
    type: 'Marketing',
    postedAt: '1 day ago'
  }
];